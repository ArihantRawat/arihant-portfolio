import { DEFAULT_SUGGESTED_PROMPTS, PORTFOLIO_KNOWLEDGE, SECTION_FALLBACK_ITEM } from "./knowledge";
import { searchSemanticKnowledge } from "./semantic";
import type {
  AssistantSection,
  KnowledgeCategory,
  PortfolioKnowledgeItem,
  RetrievalContext,
  RetrievalResult,
} from "./types";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "about",
  "at",
  "do",
  "does",
  "for",
  "from",
  "he",
  "her",
  "him",
  "his",
  "i",
  "in",
  "is",
  "it",
  "me",
  "of",
  "on",
  "or",
  "the",
  "to",
  "what",
  "who",
  "why",
  "tell",
  "show",
  "please",
  "best",
  "strongest",
  "with",
  "you",
]);

type DetectedIntent = {
  categoryBiases: KnowledgeCategory[];
  compare: boolean;
  genericFollowUp: boolean;
  asksForPlural: boolean;
  asksForBestProject: boolean;
  audience: "recruiter" | "pm" | "founder" | null;
};

type ScoredKnowledgeItem = PortfolioKnowledgeItem & {
  score: number;
  semanticScore: number;
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function unique<T>(values: T[]) {
  return Array.from(new Set(values));
}

function countAliasMatches(query: string, aliases: string[]) {
  return aliases.reduce((count, alias) => {
    const normalizedAlias = normalizeText(alias);
    return normalizedAlias.length > 0 && query.includes(normalizedAlias) ? count + 1 : count;
  }, 0);
}

function countTokenOverlap(queryTokens: string[], candidateTokens: string[]) {
  const candidateSet = new Set(candidateTokens);
  return queryTokens.reduce((count, token) => count + (candidateSet.has(token) ? 1 : 0), 0);
}

function detectIntent(query: string): DetectedIntent {
  const normalized = normalizeText(query);
  const categoryBiases: KnowledgeCategory[] = [];

  if (/(project|projects|built|repo|repository|portfolio work|case stud|builder work|things has he built)/.test(normalized)) {
    categoryBiases.push("project");
  }
  if (/(experience|career|salesforce|cult|work history|role|company|companies|enterprise|startup)/.test(normalized)) {
    categoryBiases.push("experience");
  }
  if (/(skills|tech stack|tools|strengths|product manager|pm|technical skill|stack)/.test(normalized)) {
    categoryBiases.push("skills");
  }
  if (/(education|usc|mba|school|college|nsit|nsut)/.test(normalized)) {
    categoryBiases.push("education");
  }
  if (/(contact|email|linkedin|phone|reach|connect)/.test(normalized)) {
    categoryBiases.push("contact");
  }
  if (/(resume|cv|pdf)/.test(normalized)) {
    categoryBiases.push("resume");
  }
  if (/(ipad|interactive|another way)/.test(normalized)) {
    categoryBiases.push("interactive");
  }
  if (/(overview|introduce|background|who is|who are you|about|summary|quick intro)/.test(normalized)) {
    categoryBiases.push("overview");
  }

  return {
    categoryBiases: unique(categoryBiases),
    compare: /(compare|difference|different|vs|versus)/.test(normalized),
    genericFollowUp: /^(tell me more|more|expand|go deeper|what about that|what about this|and that|this|that)$/.test(normalized),
    asksForPlural: /(projects|things|examples|highlights|options|best ones|which ones|top projects|best projects)/.test(normalized),
    asksForBestProject:
      /(best|strongest|most impressive|most product|most technical|first|one project|which project|standout)/.test(normalized) &&
      /(project|repo|portfolio work|built|case study|example)/.test(normalized),
    audience: /(recruiter|hiring manager|why hire|candidate|fit for role|good fit)/.test(normalized)
      ? "recruiter"
      : /(product manager|pm role|pm fit|product sense|product thinking)/.test(normalized)
        ? "pm"
        : /(startup|founder|early stage|zero to one|fast moving|cofounder)/.test(normalized)
          ? "founder"
          : null,
  };
}

function buildFallbackPrompts(currentSection: AssistantSection, matchedItems: PortfolioKnowledgeItem[]) {
  const prompts = matchedItems.flatMap((item) => item.prompts ?? []);
  const sectionFallback = PORTFOLIO_KNOWLEDGE.find((item) => item.id === SECTION_FALLBACK_ITEM[currentSection]);

  return unique([
    ...prompts,
    ...(sectionFallback?.prompts ?? []),
    ...DEFAULT_SUGGESTED_PROMPTS,
  ]).slice(0, 3);
}

function buildAudiencePrompts(audience: DetectedIntent["audience"]) {
  if (audience === "recruiter") {
    return [
      "Why is Arihant a strong candidate?",
      "What kind of roles fit Arihant best?",
      "What projects show the strongest product thinking?",
    ];
  }

  if (audience === "pm") {
    return [
      "What shows Arihant's product sense?",
      "Which projects feel most like PM case studies?",
      "How does Arihant combine product and engineering?",
    ];
  }

  if (audience === "founder") {
    return [
      "What shows Arihant can operate in a founder-style environment?",
      "Which projects show zero-to-one thinking?",
      "How did Cult.fit shape his builder profile?",
    ];
  }

  return [];
}

function isGenericQuery(query: string, intent: DetectedIntent) {
  const normalized = normalizeText(query);
  return normalized.length < 10 || intent.genericFollowUp || /^(tell me|show me|help|explain)$/.test(normalized);
}

function buildAudienceSentence(
  audience: DetectedIntent["audience"],
  primaryItem: PortfolioKnowledgeItem,
  supportingItem?: PortfolioKnowledgeItem
) {
  if (audience === "recruiter") {
    return supportingItem
      ? `Taken together, ${primaryItem.title} and ${supportingItem.title} make the profile read as both technically credible and product-minded.`
      : "Taken together, this makes the profile read as technically credible, product-minded, and able to work across functions.";
  }

  if (audience === "pm") {
    return supportingItem
      ? `${primaryItem.title} is a good example of product framing, while ${supportingItem.title} helps show range in execution and packaging.`
      : "The through-line here is product framing: he tends to start with the user or business problem and then build toward a clear experience.";
  }

  if (audience === "founder") {
    return supportingItem
      ? `${primaryItem.title} plus ${supportingItem.title} shows comfort with ambiguity, shipping, and turning rough ideas into clearer products.`
      : "The founder-style signal here is comfort with ambiguity, fast iteration, and shipping practical solutions instead of staying at the concept stage.";
  }

  return null;
}

function scoreKnowledgeItem(
  item: PortfolioKnowledgeItem,
  query: string,
  queryTokens: string[],
  intent: DetectedIntent,
  context: RetrievalContext
) {
  let score = item.priority ?? 0;
  const aliasMatches = countAliasMatches(query, [item.title, ...item.aliases]);
  const itemTokens = tokenize([item.title, ...item.aliases, ...item.keywords].join(" "));
  const tokenOverlap = countTokenOverlap(queryTokens, itemTokens);

  score += aliasMatches * 5;
  score += tokenOverlap * 1.25;

  if (intent.categoryBiases.includes(item.category)) {
    score += 3;
  }

  if (item.section === context.currentSection) {
    score += 1.5;
  }

  if (context.recentKnowledgeIds.includes(item.id)) {
    score += intent.genericFollowUp ? 4 : 1;
  }

  if (intent.asksForPlural && item.category === "project" && item.featured) {
    score += 1.25;
  }

  if (intent.asksForBestProject && item.category === "project" && item.featured) {
    score += 3;
  }

  if (intent.compare && item.featured) {
    score += 0.75;
  }

  if (intent.audience === "recruiter" && /(overview|experience|skills)/.test(item.category)) {
    score += 1.25;
  }

  if (intent.audience === "pm" && /(project|skills|overview)/.test(item.category)) {
    score += 1.25;
  }

  if (intent.audience === "founder" && (item.id === "cultfit" || item.category === "project")) {
    score += 1.25;
  }

  if (isGenericQuery(query, intent) && item.id === SECTION_FALLBACK_ITEM[context.currentSection]) {
    score += 5;
  }

  return score;
}

function shouldAskClarifyingQuestion(topItems: ScoredKnowledgeItem[], intent: DetectedIntent) {
  if (intent.compare || intent.asksForPlural) return false;
  if (topItems.length < 2) return false;

  const [first, second] = topItems;
  const scoreGap = first.score - second.score;
  const mixedCategories = first.category !== second.category;
  const weakTopSignal = first.score < 8;

  return mixedCategories && scoreGap < 1.6 && weakTopSignal;
}

function buildClarifyingResponse(topItems: ScoredKnowledgeItem[], context: RetrievalContext, intent: DetectedIntent): RetrievalResult {
  const categoryLabels = unique(
    topItems.slice(0, 3).map((item) => {
      if (item.category === "experience") return "experience";
      if (item.category === "project" || item.category === "interactive") return "projects";
      if (item.category === "skills") return "skills";
      if (item.category === "education") return "education";
      return item.section;
    })
  );

  const answer = `I can take that in a couple of directions. Do you want the answer framed around ${categoryLabels.join(", ")}?`;
  const prompts = unique([
    ...topItems.slice(0, 3).flatMap((item) => item.prompts ?? []),
    ...buildAudiencePrompts(intent.audience),
    ...buildFallbackPrompts(context.currentSection, topItems.slice(0, 1)),
  ]).slice(0, 3);

  return {
    answer,
    ctaLabel: undefined,
    ctaHref: undefined,
    matchedKnowledgeIds: topItems.slice(0, 2).map((item) => item.id),
    suggestedPrompts: prompts,
    confidence: 0.45,
  };
}

function composeSpecificAnswer(
  item: PortfolioKnowledgeItem,
  context: RetrievalContext,
  intent: DetectedIntent,
  supportingItem?: PortfolioKnowledgeItem
) {
  const sentences = item.answerSentences.slice(0, item.answerSentences.length >= 4 ? 4 : 3);
  const sectionHint =
    item.section !== context.currentSection && item.cta?.href?.startsWith("#")
      ? `The ${item.section} section is the best place to see that story in more detail.`
      : null;

  const supportSentence =
    supportingItem && supportingItem.id !== item.id
      ? supportingItem.answerSentences[0]
      : null;

  const audienceSentence = buildAudienceSentence(intent.audience, item, supportingItem);

  return unique([
    ...sentences,
    ...(supportSentence ? [supportSentence] : []),
    ...(audienceSentence ? [audienceSentence] : []),
    ...(sectionHint ? [sectionHint] : []),
  ])
    .slice(0, 5)
    .join("\n\n");
}

function composeProjectOverview(projects: PortfolioKnowledgeItem[]) {
  const [first, second, third] = projects;
  const names = [first?.title, second?.title, third?.title].filter(Boolean).join(", ");

  const sentences = [
    "Arihant's projects are strongest when they connect a clear product idea to a specific user or organizational problem.",
    names
      ? `A good snapshot of that range is ${names}, which together cover organizational memory, consumer travel, and decision-support workflows.`
      : "A good snapshot of that range spans organizational memory, consumer travel, and decision-support workflows.",
    "That mix makes the projects section useful because it shows both technical breadth and how he frames ideas as products.",
  ];

  return sentences.join("\n\n");
}

function composeBestProjectAnswer(projects: PortfolioKnowledgeItem[], intent: DetectedIntent) {
  const projectPool = projects.filter((item) => item.category === "project");
  const audiencePick =
    intent.audience === "pm"
      ? projectPool.find((item) => item.id === "offgrid" || item.id === "expertmind")
      : intent.audience === "founder"
        ? projectPool.find((item) => item.id === "expertmind" || item.id === "venue-intelligence-discovery")
        : projectPool.find((item) => item.id === "expertmind" || item.id === "knowledge-graph-pro" || item.id === "offgrid");

  const primary = audiencePick ?? projectPool[0] ?? projects[0];
  const supporting = projectPool.find((item) => item.id !== primary.id);
  const reason =
    intent.audience === "pm"
      ? "It gives the clearest read on product taste, user framing, and packaging."
      : intent.audience === "founder"
        ? "It shows comfort with ambiguity, a concrete pain point, and a shippable product angle."
        : "It balances a real problem, AI/product thinking, and a clear story a visitor can understand quickly.";

  return unique([
    `If someone only has time for one project, I would start with ${primary.title}.`,
    primary.answerSentences[0],
    reason,
    supporting ? `${supporting.title} is the next best follow-up because it shows a different side of the same builder profile.` : null,
  ].filter(Boolean) as string[])
    .slice(0, 4)
    .join("\n\n");
}

function composeComparisonAnswer(items: PortfolioKnowledgeItem[], intent: DetectedIntent) {
  const [first, second] = items;
  if (!first || !second) {
    return composeSpecificAnswer(items[0], { currentSection: items[0]?.section ?? "top", recentKnowledgeIds: [] }, intent);
  }

  const audienceSentence = buildAudienceSentence(intent.audience, first, second);

  return [
    `${first.title} and ${second.title} are related, but they solve different parts of the problem.`,
    `${first.title} is more focused on ${first.answerSentences[0].replace(/\.$/, "").toLowerCase()}, while ${second.title} leans more into ${second.answerSentences[0].replace(/\.$/, "").toLowerCase()}.`,
    audienceSentence ?? "Together they show a strong pattern in Arihant's work around product framing, information flow, and reusable context.",
  ].join("\n\n");
}

function composeBroadAnswer(topItems: ScoredKnowledgeItem[], context: RetrievalContext, intent: DetectedIntent) {
  if (intent.compare && topItems.length >= 2) {
    return composeComparisonAnswer(topItems.slice(0, 2), intent);
  }

  const category = topItems[0]?.category;
  if (intent.asksForBestProject && topItems.some((item) => item.category === "project")) {
    return composeBestProjectAnswer(topItems, intent);
  }

  if (category === "project" && (intent.asksForPlural || topItems.length > 1)) {
    const featuredProjects = topItems.filter((item) => item.category === "project").slice(0, 3);
    return composeProjectOverview(featuredProjects);
  }

  return composeSpecificAnswer(topItems[0], context, intent, topItems[1]);
}

function buildPrimaryCta(items: PortfolioKnowledgeItem[]) {
  return items.find((item) => item.cta)?.cta;
}

export async function answerPortfolioQuestion(question: string, context: RetrievalContext): Promise<RetrievalResult> {
  const normalizedQuestion = normalizeText(question);
  const queryTokens = tokenize(question);
  const intent = detectIntent(question);
  const semanticResults = await searchSemanticKnowledge(question, 6).catch(() => []);
  const semanticScores = new Map(semanticResults.map((entry) => [entry.id, entry.score]));

  const scoredItems = PORTFOLIO_KNOWLEDGE.map((item) => ({
    ...item,
    semanticScore: semanticScores.get(item.id) ?? 0,
    score:
      scoreKnowledgeItem(item, normalizedQuestion, queryTokens, intent, context) +
      (semanticScores.get(item.id) ?? 0) * 6,
  }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const topItems = scoredItems.slice(0, 4);
  const bestScore = topItems[0]?.score ?? 0;
  const confidentItems = topItems.filter((item, index) => {
    if (index === 0) return true;
    return item.score >= bestScore - 2.5;
  });

  if (bestScore < 3) {
    const fallbackItem = PORTFOLIO_KNOWLEDGE.find((item) => item.id === SECTION_FALLBACK_ITEM[context.currentSection]);
    const fallbackPrompts = unique([
      ...buildFallbackPrompts(context.currentSection, fallbackItem ? [fallbackItem] : []),
      ...buildAudiencePrompts(intent.audience),
    ]).slice(0, 3);

    return {
      answer:
        "I can help best with Arihant's background, experience, projects, skills, education, resume, and contact details.\n\nAsk about a specific company, project, role fit, or section and I will keep it concise.",
      ctaLabel: fallbackItem?.cta?.label,
      ctaHref: fallbackItem?.cta?.href,
      matchedKnowledgeIds: fallbackItem ? [fallbackItem.id] : [],
      suggestedPrompts: fallbackPrompts,
      confidence: 0.2,
    };
  }

  if (shouldAskClarifyingQuestion(topItems, intent)) {
    return buildClarifyingResponse(topItems, context, intent);
  }

  const selectedItems =
    intent.compare && confidentItems.length >= 2
      ? confidentItems.slice(0, 2)
      : intent.asksForBestProject && topItems.some((item) => item.category === "project")
        ? topItems.filter((item) => item.category === "project").slice(0, 2)
      : intent.asksForPlural && confidentItems[0]?.category === "project"
        ? confidentItems.filter((item) => item.category === "project").slice(0, 3)
        : confidentItems.slice(0, 1);

  const primaryCta = buildPrimaryCta(selectedItems);
  const answer = composeBroadAnswer(selectedItems, context, intent);

  return {
    answer,
    ctaLabel: primaryCta?.label,
    ctaHref: primaryCta?.href,
    matchedKnowledgeIds: selectedItems.map((item) => item.id),
    suggestedPrompts: unique([
      ...buildFallbackPrompts(context.currentSection, selectedItems),
      ...buildAudiencePrompts(intent.audience),
    ]).slice(0, 3),
    confidence: Math.min(1, bestScore / 12),
  };
}

export function getSuggestedPromptsForSection(section: AssistantSection) {
  const fallbackItem = PORTFOLIO_KNOWLEDGE.find((item) => item.id === SECTION_FALLBACK_ITEM[section]);
  return buildFallbackPrompts(section, fallbackItem ? [fallbackItem] : []);
}
