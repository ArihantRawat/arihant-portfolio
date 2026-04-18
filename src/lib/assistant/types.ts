export type AssistantSection = "top" | "about" | "skills" | "experience" | "education" | "projects" | "contact";

export type KnowledgeCategory =
  | "overview"
  | "experience"
  | "project"
  | "skills"
  | "education"
  | "contact"
  | "resume"
  | "interactive";

export type KnowledgeCTA = {
  label: string;
  href: string;
};

export type PortfolioKnowledgeItem = {
  id: string;
  title: string;
  section: AssistantSection;
  category: KnowledgeCategory;
  aliases: string[];
  keywords: string[];
  answerSentences: string[];
  cta?: KnowledgeCTA;
  prompts?: string[];
  featured?: boolean;
  priority?: number;
};

export type RetrievalContext = {
  currentSection: AssistantSection;
  recentKnowledgeIds: string[];
};

export type RetrievalResult = {
  answer: string;
  ctaLabel?: string;
  ctaHref?: string;
  matchedKnowledgeIds: string[];
  suggestedPrompts: string[];
  confidence: number;
};
