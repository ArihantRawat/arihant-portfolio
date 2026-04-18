import { buildSemanticDocument, scoreSemanticQuery } from "./semantic-core";
import type { SemanticDocument } from "./semantic-core";
import type { PortfolioKnowledgeItem } from "./types";

type BuildMessage = {
  type: "build";
  requestId: string;
  knowledge: PortfolioKnowledgeItem[];
};

type HydrateMessage = {
  type: "hydrate";
  requestId: string;
  documents: SemanticDocument[];
};

type SearchMessage = {
  type: "search";
  requestId: string;
  query: string;
  limit?: number;
};

type WorkerMessage = BuildMessage | HydrateMessage | SearchMessage;

let semanticDocuments: SemanticDocument[] = [];

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const message = event.data;

  if (message.type === "build") {
    semanticDocuments = message.knowledge.map((item) => buildSemanticDocument(item));
    self.postMessage({
      type: "build-result",
      requestId: message.requestId,
      documents: semanticDocuments,
    });
    return;
  }

  if (message.type === "hydrate") {
    semanticDocuments = message.documents;
    self.postMessage({
      type: "hydrate-result",
      requestId: message.requestId,
    });
    return;
  }

  if (message.type === "search") {
    const results = scoreSemanticQuery(message.query, semanticDocuments, message.limit ?? 6);
    self.postMessage({
      type: "search-result",
      requestId: message.requestId,
      results,
    });
  }
};
