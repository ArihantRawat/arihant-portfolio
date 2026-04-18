import type { PortfolioKnowledgeItem } from "./types";

export type SemanticScore = {
  id: string;
  score: number;
};

export type SemanticDocument = {
  id: string;
  weights: Record<string, number>;
  magnitude: number;
};

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "about",
  "at",
  "be",
  "for",
  "from",
  "he",
  "her",
  "his",
  "how",
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
  "which",
  "who",
  "why",
  "with",
  "you",
]);

const CONCEPT_GROUPS: Record<string, string[]> = {
  product: ["product", "builder", "user value", "roadmap", "strategy", "execution", "customer", "product thinking", "product manager", "pm"],
  engineering: ["engineering", "backend", "frontend", "full stack", "system design", "api", "architecture", "software", "technical"],
  leadership: ["leadership", "lead", "mentored", "mentor", "manager", "ownership", "cross functional", "stakeholder", "decision making"],
  ai: ["ai", "llm", "agentic", "machine learning", "ml", "automation", "prototype", "workflow", "ai product"],
  knowledge: ["knowledge", "expertise", "context", "memory", "documentation", "team memory", "knowledge capture"],
  graph: ["graph", "knowledge graph", "workspace", "integrations", "signals", "connected sources", "organizational memory"],
  consumer: ["consumer", "travel", "taste", "vibe", "recommendation", "discovery", "mobile", "brand", "storytelling"],
  interaction: ["interactive", "portfolio", "motion", "gesture", "ipad", "storytelling", "experience design"],
  education: ["education", "usc", "marshall", "mba", "nsit", "nsut", "school"],
  contact: ["contact", "email", "linkedin", "phone", "reach out", "connect"],
  resume: ["resume", "cv", "pdf"],
  salesforce: ["salesforce", "industries cloud", "context service", "data cloud"],
  cultfit: ["cult", "cultfit", "cult fit", "digital verticals", "flutter migration"],
  expertmind: ["expertmind", "knowledge capture", "team memory", "ai interviews", "vera"],
  offgrid: ["offgrid", "travel app", "travel discovery", "vibe travel"],
  venue: ["venue intelligence", "venues", "expansion", "ticketing", "market research"],
  video: ["video captioning", "captioning", "seq2seq", "opencv", "tensorflow"],
  enterprise: ["enterprise", "scale", "industries cloud", "paid offering", "system design"],
  startup: ["startup", "fast moving", "cult fit", "zero to one", "from scratch"],
  recruiter: ["fit", "why hire", "candidate", "profile", "background", "resume story"],
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stemToken(token: string) {
  if (token.endsWith("ies") && token.length > 4) return `${token.slice(0, -3)}y`;
  if (token.endsWith("ing") && token.length > 5) return token.slice(0, -3);
  if (token.endsWith("ed") && token.length > 4) return token.slice(0, -2);
  if (token.endsWith("s") && token.length > 3) return token.slice(0, -1);
  return token;
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(" ")
    .map(stemToken)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function incrementWeight(weights: Record<string, number>, key: string, amount: number) {
  weights[key] = (weights[key] ?? 0) + amount;
}

function addTextFeatures(weights: Record<string, number>, text: string, baseWeight: number) {
  const normalized = normalizeText(text);
  if (!normalized) return;

  const tokens = tokenize(normalized);
  tokens.forEach((token) => incrementWeight(weights, `token:${token}`, baseWeight));

  for (let index = 0; index < tokens.length - 1; index += 1) {
    incrementWeight(weights, `bigram:${tokens[index]}_${tokens[index + 1]}`, baseWeight * 1.15);
  }

  Object.entries(CONCEPT_GROUPS).forEach(([concept, terms]) => {
    const hasConceptMatch = terms.some((term) => normalized.includes(term));
    if (hasConceptMatch) {
      incrementWeight(weights, `concept:${concept}`, baseWeight * 2.5);
    }
  });
}

function finalizeVector(weights: Record<string, number>) {
  const magnitude = Math.sqrt(Object.values(weights).reduce((total, value) => total + value * value, 0));
  return {
    weights,
    magnitude: magnitude || 1,
  };
}

export function buildSemanticDocument(item: PortfolioKnowledgeItem): SemanticDocument {
  const weights: Record<string, number> = {};

  addTextFeatures(weights, item.title, 2.4);
  item.aliases.forEach((alias) => addTextFeatures(weights, alias, 2.2));
  item.keywords.forEach((keyword) => addTextFeatures(weights, keyword, 1.8));
  item.answerSentences.forEach((sentence) => addTextFeatures(weights, sentence, 1.1));
  addTextFeatures(weights, item.section, 1.2);
  addTextFeatures(weights, item.category, 1.2);

  if (item.featured) {
    incrementWeight(weights, "meta:featured", 1.2);
  }

  return {
    id: item.id,
    ...finalizeVector(weights),
  };
}

export function buildQueryDocument(query: string) {
  const weights: Record<string, number> = {};
  addTextFeatures(weights, query, 2.4);
  return finalizeVector(weights);
}

export function cosineSimilarity(query: SemanticDocument | ReturnType<typeof buildQueryDocument>, doc: SemanticDocument) {
  let dot = 0;

  Object.entries(query.weights).forEach(([key, value]) => {
    const candidate = doc.weights[key];
    if (candidate) {
      dot += value * candidate;
    }
  });

  return dot / (query.magnitude * doc.magnitude);
}

export function scoreSemanticQuery(query: string, documents: SemanticDocument[], limit = 5): SemanticScore[] {
  const queryVector = buildQueryDocument(query);

  return documents
    .map((document) => ({
      id: document.id,
      score: cosineSimilarity(queryVector, document),
    }))
    .filter((entry) => entry.score > 0.02)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
