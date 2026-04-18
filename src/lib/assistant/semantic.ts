import { ASSISTANT_KNOWLEDGE_VERSION, PORTFOLIO_KNOWLEDGE } from "./knowledge";
import type { SemanticDocument, SemanticScore } from "./semantic-core";

const DB_NAME = "portfolio-assistant-semantic";
const STORE_NAME = "indexes";

type WorkerRequest =
  | {
      type: "build";
      requestId: string;
      knowledge: typeof PORTFOLIO_KNOWLEDGE;
    }
  | {
      type: "hydrate";
      requestId: string;
      documents: SemanticDocument[];
    }
  | {
      type: "search";
      requestId: string;
      query: string;
      limit?: number;
    };

type WorkerResponse =
  | {
      type: "build-result";
      requestId: string;
      documents: SemanticDocument[];
    }
  | {
      type: "hydrate-result";
      requestId: string;
    }
  | {
      type: "search-result";
      requestId: string;
      results: SemanticScore[];
    };

type PendingRequest = {
  resolve: (value: WorkerResponse) => void;
  reject: (reason?: unknown) => void;
};

let workerInstance: Worker | null = null;
let semanticReadyPromise: Promise<void> | null = null;
const pendingRequests = new Map<string, PendingRequest>();

function canUseSemanticWorker() {
  return typeof window !== "undefined" && typeof Worker !== "undefined" && typeof indexedDB !== "undefined";
}

function createWorker() {
  if (!workerInstance) {
    workerInstance = new Worker(new URL("./semantic.worker.ts", import.meta.url), { type: "module" });
    workerInstance.addEventListener("message", (event: MessageEvent<WorkerResponse>) => {
      const payload = event.data;
      const pending = pendingRequests.get(payload.requestId);
      if (!pending) return;
      pendingRequests.delete(payload.requestId);
      pending.resolve(payload);
    });
  }

  return workerInstance;
}

function postToWorker(message: WorkerRequest) {
  const worker = createWorker();

  return new Promise<WorkerResponse>((resolve, reject) => {
    pendingRequests.set(message.requestId, { resolve, reject });
    worker.postMessage(message);
  });
}

function openSemanticDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getCachedDocuments() {
  const db = await openSemanticDb();

  return new Promise<SemanticDocument[] | null>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(ASSISTANT_KNOWLEDGE_VERSION);

    request.onsuccess = () => resolve((request.result as SemanticDocument[] | undefined) ?? null);
    request.onerror = () => reject(request.error);
  });
}

async function setCachedDocuments(documents: SemanticDocument[]) {
  const db = await openSemanticDb();

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(documents, ASSISTANT_KNOWLEDGE_VERSION);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function nextRequestId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

async function ensureSemanticReady() {
  if (!canUseSemanticWorker()) return;
  if (semanticReadyPromise) {
    return semanticReadyPromise;
  }

  semanticReadyPromise = (async () => {
    const cachedDocuments = await getCachedDocuments().catch(() => null);

    if (cachedDocuments?.length) {
      await postToWorker({
        type: "hydrate",
        requestId: nextRequestId("hydrate"),
        documents: cachedDocuments,
      });
      return;
    }

    const response = await postToWorker({
      type: "build",
      requestId: nextRequestId("build"),
      knowledge: PORTFOLIO_KNOWLEDGE,
    });

    if (response.type === "build-result") {
      await setCachedDocuments(response.documents).catch(() => undefined);
    }
  })();

  return semanticReadyPromise;
}

export async function preloadSemanticKnowledge() {
  await ensureSemanticReady();
}

export async function searchSemanticKnowledge(query: string, limit = 6) {
  if (!canUseSemanticWorker()) {
    return [] as SemanticScore[];
  }

  await ensureSemanticReady();
  const response = await postToWorker({
    type: "search",
    requestId: nextRequestId("search"),
    query,
    limit,
  });

  return response.type === "search-result" ? response.results : [];
}
