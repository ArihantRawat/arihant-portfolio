"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

type CompanionMood = "idle" | "wave" | "curious" | "thinking" | "excited" | "helpful" | "celebrate" | "pointing";

type SectionState = {
  label: string;
  mood: CompanionMood;
  hint: string;
  quickPrompt: string;
  cloudLines: string[];
};

type PositionState = {
  x: number;
  y: number;
  side: "left" | "right";
  bubblePlacement: "above" | "below";
  showCloud: boolean;
};

const ANSWERS: AnswerEntry[] = [
  {
    match: ["who are you", "about", "tell me about arihant", "introduce", "background", "overview"],
    answer:
      "Arihant Rawat is a product-minded technologist with experience at Salesforce and Cult.fit, and he is currently pursuing an MBA at USC Marshall. He tends to work where product thinking, engineering depth, and execution all meet.",
    ctaLabel: "Jump to About",
    ctaHref: "#about",
  },
  {
    match: ["experience", "salesforce", "cult", "work history", "career"],
    answer:
      "His experience spans enterprise and startup-style environments. At Salesforce, he worked on Industries Cloud and Context Service. At Cult.fit, he helped build core app experiences, partnered closely with product and data teams, and eventually led app development across multiple products.",
    ctaLabel: "See Experience",
    ctaHref: "#experience",
  },
  {
    match: ["project", "projects", "portfolio work", "what has he built"],
    answer:
      "Arihant’s projects range from AI and intelligence systems to product experiences. Highlights include Venue Intelligence Discovery, OffGrid, and an iPad-style portfolio experience, alongside multiple machine learning projects in captioning and NLP.",
    ctaLabel: "Open Projects",
    ctaHref: "#projects",
  },
  {
    match: ["skills", "tech stack", "what tools", "what does he know"],
    answer:
      "He works across product development, full stack software, AI product prototyping, LLM integrations, analytics, and app development. On the technical side, the site highlights TypeScript, Python, Java, React, Next.js, Flutter, REST APIs, NLP, and image processing.",
    ctaLabel: "See Skills",
    ctaHref: "#skills",
  },
  {
    match: ["education", "usc", "mba", "nsit", "nsut", "school"],
    answer:
      "He is currently an MBA candidate at USC Marshall and previously studied Information Technology at NSIT, now NSUT, in Delhi. The portfolio also notes major scholarships and academic distinctions.",
    ctaLabel: "See Education",
    ctaHref: "#education",
  },
  {
    match: ["contact", "email", "linkedin", "reach", "phone"],
    answer:
      "You can reach Arihant through email, LinkedIn, or phone from the contact section. For professional outreach, LinkedIn or email is probably the best first move.",
    ctaLabel: "Contact Arihant",
    ctaHref: "#contact",
  },
  {
    match: ["resume", "cv"],
    answer:
      "Yes, there is a resume link right in the hero section. The site itself already tells a strong story, but the PDF is there if you want the formal version.",
    ctaLabel: "View Resume",
    ctaHref: "/resume/arihant-rawat-pm.pdf",
  },
  {
    match: ["ipad", "another way", "interactive"],
    answer:
      "There is also an iPad-style portfolio experience linked from this site. It is a more playful, interactive way to explore the same story.",
    ctaLabel: "Open iPad Portfolio",
    ctaHref:
      "https://arihantrawat.github.io/arihant-ipad-site/?utm_source=portfolio&utm_medium=avatar&utm_campaign=explore_another_way",
  },
  {
    match: ["why mba", "why usc", "what is he doing now"],
    answer:
      "Right now Arihant is at USC Marshall pursuing an MBA, which fits the overall arc of product, technology, and business leadership that runs through the rest of the site.",
    ctaLabel: "See Education",
    ctaHref: "#education",
  },
];

const DEFAULT_REPLY =
  "I can help with Arihant’s background, experience, projects, skills, education, resume, and contact info. Try asking something like ‘What did he do at Salesforce?’ or ‘What projects has he built?’";

const SECTION_STATES = {
  top: {
    label: "Overview",
    mood: "wave",
    hint: "I can give you the quick summary while you explore.",
    quickPrompt: "Give me a quick overview of Arihant.",
    cloudLines: [
      "Hi, I’m Yuki. Want the quick intro?",
      "Hi, I can give the 20 second version.",
      "Hi, this is the fast overview section.",
    ],
  },
  about: {
    label: "About",
    mood: "curious",
    hint: "This section is the personal story behind the resume.",
    quickPrompt: "What is Arihant’s background?",
    cloudLines: [
      "Hi, this is Arihant’s story.",
      "Hi, want a short background summary?",
      "Hi, this explains the arc behind the work.",
    ],
  },
  skills: {
    label: "Skills",
    mood: "thinking",
    hint: "Here I can translate the skill list into a cleaner summary.",
    quickPrompt: "What are Arihant’s strongest skills?",
    cloudLines: [
      "Hi, I can group the skill set.",
      "Hi, want the strongest stack only?",
      "Hi, this section shows the core tools.",
    ],
  },
  experience: {
    label: "Experience",
    mood: "helpful",
    hint: "This is where the Salesforce and Cult.fit story really lands.",
    quickPrompt: "What did Arihant do at Salesforce?",
    cloudLines: [
      "Hi, this is the strongest proof section.",
      "Hi, I can compare Salesforce and Cult.fit.",
      "Hi, this is the best deep-read section.",
    ],
  },
  education: {
    label: "Education",
    mood: "curious",
    hint: "This section covers USC Marshall and his engineering background.",
    quickPrompt: "Tell me about Arihant’s education.",
    cloudLines: [
      "Hi, this is the MBA plus engineering story.",
      "Hi, I can explain the USC chapter.",
      "Hi, scholarships and academics live here.",
    ],
  },
  projects: {
    label: "Projects",
    mood: "excited",
    hint: "Projects are the fastest way to see how he actually builds.",
    quickPrompt: "What projects has Arihant built?",
    cloudLines: [
      "Hi, projects show how he actually builds.",
      "Hi, I can point to the best project here.",
      "Hi, this is the builder-energy section.",
    ],
  },
  contact: {
    label: "Contact",
    mood: "pointing",
    hint: "If you like what you see, this is the clean handoff point.",
    quickPrompt: "How can I contact Arihant?",
    cloudLines: [
      "Hi, this is the contact handoff.",
      "Hi, LinkedIn and email are the cleanest paths.",
      "Hi, I can suggest the fastest outreach route.",
    ],
  },
} satisfies Record<string, SectionState>;

type SectionId = keyof typeof SECTION_STATES;

const SECTION_IDS = Object.keys(SECTION_STATES).filter((id) => id !== "top") as SectionId[];
const SECTION_ORDER = Object.keys(SECTION_STATES) as SectionId[];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function findAnswer(question: string): AnswerEntry | null {
  const normalized = question.toLowerCase();
  return ANSWERS.find((entry) => entry.match.some((token) => normalized.includes(token))) ?? null;
}

function getRoamingPosition(
  section: SectionId,
  viewportWidth: number,
  viewportHeight: number,
  scrollProgress: number,
  contentRight: number
): PositionState {
  const isMobile = viewportWidth < 768;
  const margin = isMobile ? 10 : 22;
  const footprintWidth = isMobile ? 92 : 110;
  const footprintHeight = isMobile ? 112 : 126;
  const sectionIndex = SECTION_ORDER.indexOf(section);
  const rightGutter = Math.max(0, viewportWidth - contentRight - margin);
  const cloudFits = !isMobile && rightGutter >= 112;

  if (isMobile) {
    const baseX = viewportWidth - footprintWidth - margin;
    const baseY = clamp(viewportHeight * (0.58 + sectionIndex * 0.03), 112, viewportHeight - footprintHeight - margin);
    const driftY = Math.cos(scrollProgress * Math.PI * 5 + sectionIndex * 0.8) * 5;

    return {
      x: clamp(baseX, margin, viewportWidth - footprintWidth - margin),
      y: clamp(baseY + driftY, 100, viewportHeight - footprintHeight - margin),
      side: "right",
      bubblePlacement: "above",
      showCloud: false,
    };
  }

  const xRight = clamp(contentRight + 18, margin, viewportWidth - footprintWidth - margin);
  const yTop = 92;
  const yUpper = clamp(viewportHeight * 0.22, 128, viewportHeight - footprintHeight - margin);
  const yMiddle = clamp(viewportHeight * 0.42, 184, viewportHeight - footprintHeight - margin);
  const yLower = clamp(viewportHeight * 0.64, 244, viewportHeight - footprintHeight - margin);

  const anchors: Record<SectionId, { x: number; y: number }> = {
    top: { x: xRight, y: yTop },
    about: { x: xRight, y: yUpper },
    skills: { x: xRight, y: yUpper + 10 },
    experience: { x: xRight, y: yMiddle },
    education: { x: xRight, y: yMiddle + 16 },
    projects: { x: xRight, y: yLower },
    contact: { x: xRight, y: yLower + 18 },
  };

  const anchor = anchors[section];
  const driftY = Math.cos(scrollProgress * Math.PI * 5 + sectionIndex * 0.65) * 7;

  return {
    x: clamp(anchor.x, margin, viewportWidth - footprintWidth - margin),
    y: clamp(anchor.y + driftY, 88, viewportHeight - footprintHeight - margin),
    side: "right",
    bubblePlacement: "above",
    showCloud: cloudFits,
  };
}

function getDockedPosition(viewportWidth: number, viewportHeight: number): PositionState {
  const isMobile = viewportWidth < 768;
  const margin = isMobile ? 10 : 18;
  const panelWidth = isMobile ? viewportWidth - margin * 2 : Math.min(392, viewportWidth - 32);
  const panelHeight = isMobile ? Math.min(Math.round(viewportHeight * 0.64), 520) : Math.min(Math.round(viewportHeight * 0.72), 620);

  return {
    x: Math.max(margin, viewportWidth - panelWidth - margin),
    y: Math.max(margin, viewportHeight - panelHeight - margin),
    side: "right",
    bubblePlacement: "above",
    showCloud: false,
  };
}

function PenguinCompanion({ mood }: { mood: CompanionMood }) {
  return (
    <div className={`penguin-stage mood-${mood}`} aria-hidden>
      <svg className="penguin-svg" viewBox="0 0 170 190" focusable="false">
        <ellipse className="penguin-shadow" cx="85" cy="172" rx="38" ry="10" />
        <ellipse className="penguin-aura" cx="85" cy="104" rx="56" ry="68" />
        <g className="penguin-character">
          <rect className="penguin-pack" x="38" y="88" width="16" height="40" rx="8" />
          <ellipse className="penguin-body" cx="85" cy="104" rx="42" ry="54" />
          <ellipse className="penguin-belly" cx="85" cy="114" rx="27" ry="36" />
          <ellipse className="penguin-wing penguin-wing-left" cx="48" cy="108" rx="13" ry="31" />
          <ellipse className="penguin-wing penguin-wing-right" cx="122" cy="108" rx="13" ry="31" />
          <circle className="penguin-helmet-ring" cx="85" cy="68" r="38" />
          <circle className="penguin-helmet-glass" cx="85" cy="68" r="33" />
          <g className="penguin-head">
            <ellipse className="penguin-face" cx="85" cy="68" rx="31" ry="28" />
            <ellipse className="penguin-eye" cx="73" cy="63" rx="8.5" ry="10.5" />
            <ellipse className="penguin-eye" cx="97" cy="63" rx="8.5" ry="10.5" />
            <circle className="penguin-pupil penguin-pupil-left" cx="73" cy="64" r="3.7" />
            <circle className="penguin-pupil penguin-pupil-right" cx="97" cy="64" r="3.7" />
            <path className="penguin-beak" d="M78 74 Q85 82 92 74 Q85 88 78 74Z" />
          </g>
          <ellipse className="penguin-foot penguin-foot-left" cx="73" cy="156" rx="11" ry="6.5" />
          <ellipse className="penguin-foot penguin-foot-right" cx="97" cy="156" rx="11" ry="6.5" />
        </g>
      </svg>
    </div>
  );
}

export default function PortfolioAvatarAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState("");
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const [currentSection, setCurrentSection] = useState<SectionId>("top");
  const [cloudLineIndex, setCloudLineIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [contentRight, setContentRight] = useState(0);
  const [interactionMood, setInteractionMood] = useState<CompanionMood | null>(null);
  const [ambientMood, setAmbientMood] = useState<CompanionMood | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hey, I’m Yuki. I can help you explore Arihant’s work, background, projects, and contact info while you browse.",
    },
  ]);
  const messageIdRef = useRef(2);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const interactionTimeoutRef = useRef<number | null>(null);
  const suppressScrollTrackingRef = useRef(false);
  const scrollTrackingResetRef = useRef<number | null>(null);
  const lastScrollTrackRef = useRef(0);

  useEffect(() => {
    let frameId = 0;
    let revealTimeout: number | null = null;

    const waitForLanding = () => {
      const mainContent = document.querySelector<HTMLElement>("main.container");
      const preloader = document.querySelector<HTMLElement>(".preloader");
      const mainReady = !mainContent || !mainContent.classList.contains("content-hidden");
      const preloaderGone = !preloader;

      if (mainReady && preloaderGone) {
        revealTimeout = window.setTimeout(() => setIsVisible(true), 260);
        return;
      }

      frameId = window.requestAnimationFrame(waitForLanding);
    };

    waitForLanding();

    return () => {
      window.cancelAnimationFrame(frameId);
      if (revealTimeout) {
        window.clearTimeout(revealTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
      const mainContent = document.querySelector<HTMLElement>("main.container");
      const rect = mainContent?.getBoundingClientRect();
      setContentRight(rect?.right ?? window.innerWidth * 0.92);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    suppressScrollTrackingRef.current = true;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });

    if (scrollTrackingResetRef.current) {
      window.clearTimeout(scrollTrackingResetRef.current);
    }

    scrollTrackingResetRef.current = window.setTimeout(() => {
      suppressScrollTrackingRef.current = false;
      scrollTrackingResetRef.current = null;
    }, 450);

    return () => {
      if (scrollTrackingResetRef.current) {
        window.clearTimeout(scrollTrackingResetRef.current);
        scrollTrackingResetRef.current = null;
      }
      suppressScrollTrackingRef.current = false;
    };
  }, [messages, isOpen]);

  useEffect(() => {
    const updateScrollProgress = () => {
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      setScrollProgress(progress);
      if (window.scrollY < 120) {
        setCurrentSection("top");
      }
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      if (window.scrollY < 120) {
        setCurrentSection("top");
        return;
      }

      const probeY = window.innerHeight * 0.42;
      const sectionElements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      if (!sectionElements.length) return;

      const containing = sectionElements.find((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom >= probeY;
      });

      if (containing?.id) {
        setCurrentSection(containing.id as SectionId);
        return;
      }

      const nearest = sectionElements
        .map((element) => ({ element, distance: Math.abs(element.getBoundingClientRect().top - probeY) }))
        .sort((a, b) => a.distance - b.distance)[0];

      if (nearest?.element.id) {
        setCurrentSection(nearest.element.id as SectionId);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const resetFrame = window.requestAnimationFrame(() => {
      setCloudLineIndex(0);
    });

    return () => window.cancelAnimationFrame(resetFrame);
  }, [currentSection]);

  useEffect(() => {
    const lines = SECTION_STATES[currentSection].cloudLines;
    if (lines.length <= 1 || isOpen) return;

    const interval = window.setInterval(() => {
      setCloudLineIndex((current) => (current + 1) % lines.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [currentSection, isOpen]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("a, button")) return;

      if (interactionTimeoutRef.current) {
        window.clearTimeout(interactionTimeoutRef.current);
      }

      setInteractionMood("celebrate");
      interactionTimeoutRef.current = window.setTimeout(() => {
        setInteractionMood(null);
      }, 900);
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      if (interactionTimeoutRef.current) {
        window.clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || isOpen) {
      const resetFrame = window.requestAnimationFrame(() => {
        setAmbientMood(null);
      });
      return () => window.cancelAnimationFrame(resetFrame);
    }

    let triggerTimeout: number | null = null;
    let clearTimeoutId: number | null = null;

    const queueMoment = () => {
      const delay = 4200 + Math.random() * 2600;
      triggerTimeout = window.setTimeout(() => {
        const moods: CompanionMood[] = ["wave", "curious", "thinking", "excited"];
        const nextMood = moods[Math.floor(Math.random() * moods.length)];
        setAmbientMood(nextMood);

        clearTimeoutId = window.setTimeout(() => {
          setAmbientMood(null);
          queueMoment();
        }, nextMood === "wave" ? 1350 : 1050);
      }, delay);
    };

    queueMoment();

    return () => {
      if (triggerTimeout) {
        window.clearTimeout(triggerTimeout);
      }
      if (clearTimeoutId) {
        window.clearTimeout(clearTimeoutId);
      }
    };
  }, [isOpen, isVisible]);

  const sectionState = SECTION_STATES[currentSection];
  const effectiveMood = interactionMood ?? ambientMood ?? (isOpen ? "helpful" : sectionState.mood);
  const promptList = useMemo(
    () =>
      Array.from(
        new Set([
          sectionState.quickPrompt,
          "What did Arihant do at Salesforce?",
          "What projects has Arihant built?",
          "How can I contact Arihant?",
        ])
      ).slice(0, 3),
    [sectionState.quickPrompt]
  );

  const position =
    viewport.width > 0 && viewport.height > 0
      ? isOpen
        ? getDockedPosition(viewport.width, viewport.height)
        : getRoamingPosition(currentSection, viewport.width, viewport.height, scrollProgress, contentRight)
      : { x: 0, y: 0, side: "right" as const, bubblePlacement: "above" as const, showCloud: false };

  if (!isVisible) {
    return null;
  }

  const handleToggle = (nextOpen: boolean, source: "avatar_button" | "close_button") => {
    setIsOpen(nextOpen);
    trackEvent("avatar_toggle", {
      state: nextOpen ? "open" : "closed",
      section: currentSection,
      mood: effectiveMood,
      source,
    });
  };

  const askQuestion = (question: string, source: "quick_prompt" | "input_submit" = "input_submit") => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setShowQuickPrompts(false);

    trackEvent("avatar_chat_interaction", {
      action: "question_submitted",
      source,
      section: currentSection,
      question_length: trimmed.length,
    });

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
      section: currentSection,
    });
  };

  return (
    <div
      className={`portfolio-avatar ${isOpen ? "open docked" : "roaming"} side-${position.side} bubble-${position.bubblePlacement}`}
      data-section={currentSection}
      data-mood={effectiveMood}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      <aside id="portfolio-avatar-panel" className="portfolio-avatar-panel" aria-live="polite">
        <div className="portfolio-avatar-panel-header">
          <div className="portfolio-avatar-panel-title-wrap">
            <div className="portfolio-avatar-panel-avatar" aria-hidden>
              <PenguinCompanion mood={effectiveMood} />
            </div>
            <div>
              <p className="portfolio-avatar-eyebrow">Portfolio companion</p>
              <h3>Ask Yuki</h3>
            </div>
          </div>
          <button
            type="button"
            className="portfolio-avatar-close"
            onClick={() => handleToggle(false, "close_button")}
            aria-label="Close assistant"
          >
            ×
          </button>
        </div>

        <div className="portfolio-avatar-status-row">
          <span className="portfolio-avatar-status-pill">{sectionState.label}</span>
          <span className="portfolio-avatar-status-copy">{sectionState.hint}</span>
        </div>

        <div
          ref={messagesContainerRef}
          className="portfolio-avatar-messages"
          onScroll={(event) => {
            if (suppressScrollTrackingRef.current) {
              return;
            }

            const now = Date.now();
            if (now - lastScrollTrackRef.current < 1200) {
              return;
            }

            lastScrollTrackRef.current = now;
            const target = event.currentTarget;
            trackEvent("avatar_chat_interaction", {
              action: "messages_scrolled",
              section: currentSection,
              scroll_top: Math.round(target.scrollTop),
            });
          }}
        >
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
                    onClick={() => {
                      trackEvent("avatar_chat_interaction", {
                        action: "cta_clicked",
                        section: currentSection,
                        cta_label: message.ctaLabel,
                        cta_href: message.ctaHref,
                      });
                    }}
                  >
                    {message.ctaLabel}
                  </a>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {showQuickPrompts && input.trim().length === 0 && (
          <div className="portfolio-avatar-prompts">
            {promptList.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  trackEvent("avatar_chat_interaction", {
                    action: "quick_prompt_clicked",
                    section: currentSection,
                    prompt,
                  });
                  askQuestion(prompt, "quick_prompt");
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <form
          className="portfolio-avatar-form"
          onSubmit={(event) => {
            event.preventDefault();
            askQuestion(input, "input_submit");
          }}
        >
          <input
            value={input}
            onFocus={() => {
              trackEvent("avatar_chat_interaction", {
                action: "input_focused",
                section: currentSection,
              });
            }}
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

      {!isOpen && position.showCloud && (
        <div className="portfolio-avatar-bubble" aria-live="polite">
          <span className="portfolio-avatar-bubble-kicker">Yuki • {sectionState.label}</span>
          <p>{sectionState.cloudLines[cloudLineIndex] ?? sectionState.hint}</p>
        </div>
      )}

      {!isOpen && (
        <button
          type="button"
          className="portfolio-avatar-fab"
          onClick={() => {
            trackEvent("avatar_chat_interaction", {
              action: "avatar_clicked",
              section: currentSection,
              mood: effectiveMood,
            });
            handleToggle(true, "avatar_button");
          }}
          aria-expanded={isOpen}
          aria-controls="portfolio-avatar-panel"
          aria-label="Open assistant"
        >
          <div className="portfolio-avatar-penguin-anchor">
            <PenguinCompanion mood={effectiveMood} />
          </div>
        </button>
      )}
    </div>
  );
}
