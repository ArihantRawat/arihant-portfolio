"use client";

import { useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type AnswerEntry = {
  match: string[];
  answer: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const ANSWERS: AnswerEntry[] = [
  {
    match: ["who are you", "about", "tell me about arihant", "introduce", "background", "overview"],
    answer:
      "Arihant Rawat is a product-minded technologist with experience at Salesforce and Cult.fit, and he is currently pursuing an MBA at USC Marshall.",
    ctaLabel: "Jump to About",
    ctaHref: "#about",
  },
  {
    match: ["experience", "salesforce", "cult", "work history", "career"],
    answer:
      "His experience spans enterprise and startup-style environments, especially Salesforce and Cult.fit, where he worked across product, engineering, and execution.",
    ctaLabel: "See Experience",
    ctaHref: "#experience",
  },
  {
    match: ["project", "projects", "portfolio work", "what has he built"],
    answer:
      "Arihant’s projects range from AI and intelligence systems to product experiences, including Venue Intelligence Discovery, OffGrid, and an iPad-style portfolio.",
    ctaLabel: "Open Projects",
    ctaHref: "#projects",
  },
  {
    match: ["skills", "tech stack", "what tools", "what does he know"],
    answer:
      "He works across product development, software, AI prototyping, analytics, and app development, with tools like TypeScript, Python, React, Next.js, Flutter, and REST APIs.",
    ctaLabel: "See Skills",
    ctaHref: "#skills",
  },
  {
    match: ["education", "usc", "mba", "nsit", "nsut", "school"],
    answer:
      "He is currently an MBA candidate at USC Marshall and previously studied Information Technology at NSIT, now NSUT, in Delhi.",
    ctaLabel: "See Education",
    ctaHref: "#education",
  },
  {
    match: ["contact", "email", "linkedin", "reach", "phone"],
    answer:
      "You can reach Arihant through email, LinkedIn, or phone from the contact section. LinkedIn or email is usually the cleanest first move.",
    ctaLabel: "Contact Arihant",
    ctaHref: "#contact",
  },
  {
    match: ["resume", "cv"],
    answer:
      "Yes, there is a resume link right in the hero section if you want the formal version alongside the site story.",
    ctaLabel: "View Resume",
    ctaHref: "/resume/arihant-rawat-pm.pdf",
  },
  {
    match: ["ipad", "another way", "interactive"],
    answer:
      "There is also an iPad-style portfolio experience linked from this site if you want a more playful interactive version.",
    ctaLabel: "Open iPad Portfolio",
    ctaHref:
      "https://arihantrawat.github.io/arihant-ipad-site/?utm_source=portfolio&utm_medium=avatar&utm_campaign=explore_another_way",
  },
];

const DEFAULT_REPLY =
  "I can help with Arihant’s background, experience, projects, skills, education, resume, and contact info.";

const QUICK_PROMPTS = [
  "Give me a quick overview of Arihant.",
  "What did Arihant do at Salesforce?",
  "What projects has Arihant built?",
];

function findAnswer(question: string): AnswerEntry | null {
  const normalized = question.toLowerCase();
  return ANSWERS.find((entry) => entry.match.some((token) => normalized.includes(token))) ?? null;
}

export default function PortfolioAvatarAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hey, I’m Yuki. I can help you explore Arihant’s work, background, projects, and contact info while you browse.",
    },
  ]);
  const messageIdRef = useRef(2);

  const promptList = useMemo(() => QUICK_PROMPTS, []);

  const askQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setShowQuickPrompts(false);

    const match = findAnswer(trimmed);
    const userMessage: ChatMessage = {
      id: messageIdRef.current++,
      role: "user",
      text: trimmed,
    };

    const assistantMessage: ChatMessage = {
      id: messageIdRef.current++,
      role: "assistant",
      text: match?.answer ?? DEFAULT_REPLY,
      ctaLabel: match?.ctaLabel,
      ctaHref: match?.ctaHref,
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
    setIsOpen(true);

    trackEvent("avatar_question", {
      question: trimmed.slice(0, 120),
      matched: Boolean(match),
    });
  };

  return (
    <div className={`portfolio-avatar ${isOpen ? "open docked" : "roaming"} side-right bubble-above`}>
      <aside id="portfolio-avatar-panel" className="portfolio-avatar-panel" aria-live="polite">
        <div className="portfolio-avatar-panel-header">
          <div>
            <p className="portfolio-avatar-eyebrow">Portfolio companion</p>
            <h3>Ask Yuki</h3>
          </div>
          <button type="button" className="portfolio-avatar-close" onClick={() => setIsOpen(false)} aria-label="Close assistant">
            ×
          </button>
        </div>

        <div className="portfolio-avatar-status-row">
          <span className="portfolio-avatar-status-pill">Overview</span>
          <span className="portfolio-avatar-status-copy">I can answer quick portfolio questions while visitors browse.</span>
        </div>

        <div className="portfolio-avatar-messages">
          {messages.map((message) => {
            const isExternal = Boolean(message.ctaHref?.startsWith("http"));
            const isAsset = Boolean(message.ctaHref?.startsWith("/resume/"));

            return (
              <div key={message.id} className={`portfolio-avatar-message ${message.role}`}>
                <span className="portfolio-avatar-message-label">{message.role === "assistant" ? "Yuki" : "You"}</span>
                <span>{message.text}</span>
                {message.role === "assistant" && message.ctaLabel && message.ctaHref && (
                  <a
                    className="portfolio-avatar-inline-cta"
                    href={message.ctaHref}
                    target={isExternal || isAsset ? "_blank" : undefined}
                    rel={isExternal || isAsset ? "noreferrer" : undefined}
                  >
                    {message.ctaLabel}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {showQuickPrompts && input.trim().length === 0 && (
          <div className="portfolio-avatar-prompts">
            {promptList.map((prompt) => (
              <button key={prompt} type="button" onClick={() => askQuestion(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
        )}

        <form
          className="portfolio-avatar-form"
          onSubmit={(event) => {
            event.preventDefault();
            askQuestion(input);
          }}
        >
          <input
            value={input}
            onChange={(event) => {
              const nextValue = event.target.value;
              setInput(nextValue);
              if (nextValue.trim().length > 0) {
                setShowQuickPrompts(false);
              }
            }}
            placeholder="Ask Yuki about projects, experience, USC, resume..."
            aria-label="Ask a question about Arihant"
          />
          <button type="submit">Send</button>
        </form>
      </aside>

      {!isOpen && (
        <div className="portfolio-avatar-bubble" aria-live="polite">
          <span className="portfolio-avatar-bubble-kicker">Yuki • Overview</span>
          <p>Hi, I’m Yuki. Ask me about Arihant’s background, projects, or experience.</p>
        </div>
      )}

      <button
        type="button"
        className="portfolio-avatar-fab"
        onClick={() => {
          const next = !isOpen;
          setIsOpen(next);
          trackEvent("avatar_toggle", {
            state: next ? "open" : "closed",
          });
        }}
        aria-expanded={isOpen}
        aria-controls="portfolio-avatar-panel"
      >
        <div className="portfolio-avatar-penguin-anchor" aria-hidden>
          <div className="penguin-stage">
            <div className="penguin-placeholder">🐧</div>
          </div>
        </div>
      </button>
    </div>
  );
}
