"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import PortfolioAvatarAssistant from "@/components/portfolio-avatar-assistant";
import { trackEvent } from "../lib/analytics";

type SkillBadge = {
  label: string;
  emoji?: string;
  iconSrc?: string;
  iconAlt?: string;
};

type ExternalLink = {
  label: string;
  href: string;
};

type TimelineItem = {
  title: string;
  subtitle: string;
  timeframe: string;
  location: string;
  description?: string;
  details?: string[];
  links: ExternalLink[];
};

type ProjectLink = {
  label: string;
  href: string;
  kind: "repository" | "website";
};

type ProjectSignal = {
  label: string;
  value: string;
  note: string;
};

type PortfolioProject = {
  name: string;
  repo: string;
  cardSummary: string;
  modalSummary: string;
  whatIBuilt: string[];
  signals: ProjectSignal[];
  techStack: string[];
  links: ProjectLink[];
};


type ContactLink = {
  label: string;
  href: string;
};

type Particle = {
  id: number;
  left: string;
  top: string;
  size: string;
  delay: string;
  opacity: number;
};

type HomeAnimationState = {
  isReady: boolean;
  shouldAnimate: boolean;
};

const IPAD_PORTFOLIO_URL =
  "https://arihantrawat.github.io/arihant-ipad-site/?utm_source=portfolio&utm_medium=button&utm_campaign=explore_another_way";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

const HERO_STATS = [
  { label: "Years of Experience", value: "4+" },
  { label: "Public Repos", value: "14" },
  { label: "Hours", value: "10K+" },
];

const ABOUT_PARAGRAPHS = [
  "I’m currently a first-year MBA student at USC Marshall, focused on growing as a product builder in the tech space. I studied engineering at NSIT (now NSUT) and worked at Cult.fit and Salesforce, where I built products across both startup and large-scale environments.",
  "Across these experiences, I’ve learned to combine engineering depth, product thinking, and strong execution to solve real user problems. I enjoy taking ideas from early ambiguity to shipped products that create tangible impact.",
  "I grew up in India and have lived and worked across Delhi, Bangalore, and now Los Angeles. This journey has shaped how I think, collaborate, and build with diverse teams to create products that are thoughtful, practical, and user-centered.",
];

const SKILLS: SkillBadge[] = [
  { label: "OpenClaw Workflows", emoji: "🦾" },
  { label: "AI Product Prototyping", emoji: "🤖" },
  { label: "LLM Integration in Products", emoji: "🧩" },
  { label: "Cursor", iconSrc: "https://www.cursor.com/favicon.ico", iconAlt: "Cursor" },
  { label: "Lovable", iconSrc: "https://lovable.dev/favicon.ico", iconAlt: "Lovable" },
  { label: "Base44", iconSrc: "/images/base44-logo.png", iconAlt: "Base44" },
  { label: "Product Development", emoji: "🛠️" },
  { label: "Software Development", emoji: "💻" },
  { label: "App Development", emoji: "📱" },
  { label: "Full Stack Development", emoji: "🌐" },
  { label: "Product Strategy", emoji: "🎯" },
  { label: "Roadmapping", emoji: "🗺️" },
  { label: "Cross-functional Leadership", emoji: "🤝" },
  { label: "User Research", emoji: "🔎" },
  { label: "SQL + Analytics", emoji: "🗄️" },
  { label: "Java", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", iconAlt: "Java" },
  { label: "TypeScript", iconSrc: "https://cdn.simpleicons.org/typescript", iconAlt: "TypeScript" },
  { label: "Python", iconSrc: "https://cdn.simpleicons.org/python", iconAlt: "Python" },
  { label: "JavaScript", iconSrc: "https://cdn.simpleicons.org/javascript", iconAlt: "JavaScript" },
  { label: "React", iconSrc: "https://cdn.simpleicons.org/react", iconAlt: "React" },
  { label: "Next.js", iconSrc: "https://cdn.simpleicons.org/nextdotjs/FFFFFF", iconAlt: "Next.js" },
  { label: "Flutter", iconSrc: "https://cdn.simpleicons.org/flutter", iconAlt: "Flutter" },
  { label: "REST API Design", emoji: "🔌" },
  { label: "NLP", emoji: "🧠" },
  { label: "Image Processing", emoji: "🖼️" },
  { label: "Classification Models", emoji: "📈" },
];

const EXPERIENCES: TimelineItem[] = [
  {
    title: "Salesforce",
    subtitle: "Senior Product Developer (MTS)",
    timeframe: "Oct 2023 - Jul 2025",
    location: "Bangalore, India",
    details: [
      "At Salesforce, I joined the Industries Cloud team and worked on a product called Context Service. We initially built it as an internal tool to simplify how teams access and manage data across backend systems, reducing latency and complexity while providing a simple interface to map and control data flows. The product gained strong adoption internally and was later turned into a paid product with API-based usage.",
      "I worked as a full stack developer, contributing to backend APIs, frontend development, and system design. I also collaborated closely with the Data Cloud team to integrate it into our platform, which became a key feature for growth.",
      "Alongside development, I mentored junior engineers and interns, and regularly gave demos and presentations.",
      "As AI started gaining momentum, I took initiative in exploring how it could fit into our systems and became the go-to person on the team for it. I worked on early implementations of Salesforce’s agentic AI and helped the team adopt new tools like Cursor, improving how we built and experimented with AI-driven features.",
    ],
    links: [
      { label: "Official site", href: "https://www.salesforce.com/" },
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Salesforce" },
    ],
  },
  {
    title: "Cult.fit (Unicorn Health and Fitness Startup)",
    subtitle: "Product Developer to Senior Product Developer",
    timeframe: "Jul 2021 - Oct 2023",
    location: "Bangalore, India",
    details: [
      "At Cult.fit, I started right after college as an app developer and joined the Digital Verticals team during COVID, where we were building digital health and fitness products like online workouts, weight loss programs, and fitness plans. Around the same time, we were migrating our app from React Native to Flutter, and since I was one of the few engineers familiar with Flutter, I ended up working on most of the core parts of the app. This included building key components, shaping the overall architecture, and helping onboard new engineers to the framework.",
      "Over time, my role expanded beyond app development into backend work and product-focused initiatives. I worked closely with data science teams on building data platforms, setting up funnels, and running A/B experiments. Because I understood both the technical systems and product needs, I often acted as a bridge between engineering, product, and data teams.",
      "Being in a startup environment also meant working across functions. I collaborated with design, operations, and even supported testing and customer issues when needed.",
      "After about 1.5 years, I became the app lead for the Digital Verticals team, managing a portfolio of six products, owning their architecture, and leading development of multiple products from scratch.",
    ],
    links: [
      { label: "Official site", href: "https://www.cult.fit/" },
      { label: "Tracxn", href: "https://tracxn.com/d/companies/cultfit/__-Wg3Ms2LDV2m_0_AEbIvAhRvY6C13zfasKWCh86DEW4" },
    ],
  },
];

const EDUCATION: TimelineItem[] = [
  {
    title: "University of Southern California (USC), Marshall School of Business",
    subtitle: "MBA (STEM)",
    timeframe: "Expected May 2027",
    location: "Los Angeles, CA",
    description: "Dean’s Merit Scholarship (100%) • Prediger Endowed Scholarship • GMAT FE 705",
    links: [
      { label: "Official site", href: "https://www.marshall.usc.edu/" },
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/USC_Marshall_School_of_Business" },
    ],
  },
  {
    title: "NSIT (now NSUT), Netaji Subhas Institute of Technology",
    subtitle: "B.E. in Information Technology (Computer Science)",
    timeframe: "May 2021",
    location: "Delhi, India",
    description: "First Class Distinction (CGPA 8.6/10.0)",
    links: [
      { label: "Official site", href: "https://www.nsut.ac.in/" },
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Netaji_Subhas_University_of_Technology" },
    ],
  },
];

const PROJECTS: PortfolioProject[] = [
  {
    name: "ExpertMind",
    repo: "ArihantRawat/ExpertMind",
    cardSummary:
      "ExpertMind explores how teams can capture critical expertise before it becomes a bottleneck or walks out the door. It combines knowledge-risk visibility with guided AI interviews to turn tacit context into reusable team memory.",
    modalSummary:
      "ExpertMind is built around a very practical product problem: how teams lose context when experts leave, silo knowledge, or become bottlenecks. The concept combines knowledge-risk visibility, guided knowledge capture, and AI-assisted interviews to make expert context reusable.",
    whatIBuilt: [
      "Product concept around knowledge risk, expertise visibility, and team memory",
      "Interview-driven capture flow with an AI interviewer named Vera",
      "Dashboard ideas for spotting single points of failure and missing context",
    ],
    signals: [
      { label: "Focus", value: "Knowledge capture", note: "Designed around preserving tacit expertise before it is lost" },
      { label: "Core flow", value: "AI interviews", note: "Uses guided capture rather than passive documentation alone" },
      { label: "Product angle", value: "Team memory", note: "Meant to reduce knowledge bottlenecks across organizations" },
    ],
    techStack: ["Product Design", "AI Workflow Thinking", "Knowledge Systems"],
    links: [{ label: "Open repository", href: "https://github.com/ArihantRawat/ExpertMind", kind: "repository" }],
  },
  {
    name: "Knowledge Graph Pro",
    repo: "ArihantRawat/knowledge-graph-pro",
    cardSummary:
      "Knowledge Graph Pro pulls signals from tools like Slack, Jira, GitHub, and Notion into one graph-style workspace. It makes fragmented work activity easier to browse, connect, and reuse as shared organizational context.",
    modalSummary:
      "Knowledge Graph Pro tackles the systems side of organizational memory. It pulls signals from tools like Slack, Jira, Confluence, Gmail, GitHub, Zoom, Notion, and Figma into one graph-oriented product with persistent integrations and source-level filtering.",
    whatIBuilt: [
      "A multi-source graph interface with integration setup and source filtering",
      "Persistent connector flows so the graph can be re-used beyond a one-off demo",
      "A product story that turns disconnected tooling activity into shared context",
    ],
    signals: [
      { label: "Connected sources", value: "11", note: "Slack, Jira, Confluence, Gmail, Notion, GitHub, Zoom, Figma, and more" },
      { label: "System type", value: "Knowledge graph", note: "Built to unify fragmented work signals into one view" },
      { label: "Persistence", value: "Integrated", note: "Includes reconnect-friendly auth and saved integration state" },
    ],
    techStack: ["HTML", "Node.js", "Vanilla JavaScript", "OAuth Connectors"],
    links: [{ label: "Open repository", href: "https://github.com/ArihantRawat/knowledge-graph-pro", kind: "repository" }],
  },
  {
    name: "OffGrid",
    repo: "ArihantRawat/OffGrid",
    cardSummary:
      "OffGrid is a taste-based travel product built around mood, vibe, and personal preference rather than generic rankings. The experience pairs a mobile-first discovery flow with a stronger concept layer around brand and destination storytelling.",
    modalSummary:
      "OffGrid is the most consumer-facing project in the set. Instead of generic top-10 travel recommendations, it frames discovery around personal taste, mood, and energy. The project pairs a Flutter codebase with a more polished public concept site to express both product logic and brand direction.",
    whatIBuilt: [
      "Mobile-first navigation and app shell for travel discovery journeys",
      "Preference-led recommendation thinking centered on vibe over popularity",
      "A live concept site that extends the product story beyond the repo",
    ],
    signals: [
      { label: "Positioning", value: "Taste-based", note: "Recommendations are shaped by vibe instead of generic rankings" },
      { label: "Experience", value: "Mobile-first", note: "Structured around app-style flows and travel use cases" },
      { label: "Shipping", value: "Code + concept", note: "Pairs the app repo with a more expressive live concept site" },
    ],
    techStack: ["Flutter", "Dart", "Mobile UI", "Consumer Product Design"],
    links: [
      { label: "Open repository", href: "https://github.com/ArihantRawat/OffGrid", kind: "repository" },
      { label: "Open website", href: "https://offgridla.lovable.app", kind: "website" },
    ],
  },
  {
    name: "Video Captioning",
    repo: "ArihantRawat/Video_Captioning",
    cardSummary:
      "Video Captioning is an ML project focused on turning short video clips into natural-language descriptions. It covers the full workflow from preprocessing and frame extraction to training and inference.",
    modalSummary:
      "This project explores video understanding through sequence-to-sequence modeling. It covers the full path from preprocessing and frame extraction to training and inference, making it more than just a notebook experiment.",
    whatIBuilt: [
      "Frame extraction and dataset-preparation utilities for video pipelines",
      "Training scripts and saved checkpoints for caption generation experiments",
      "Inference notebooks that generate captions on unseen clips",
    ],
    signals: [
      { label: "Domain", value: "Video understanding", note: "Focused on learning from temporal visual inputs" },
      { label: "Approach", value: "Seq2Seq", note: "Uses encoder-decoder style learning for caption output" },
      { label: "Workflow", value: "End-to-end", note: "Includes prep, training, and inference stages" },
    ],
    techStack: ["Python", "TensorFlow", "OpenCV", "NumPy"],
    links: [{ label: "Open repository", href: "https://github.com/ArihantRawat/Video_Captioning", kind: "repository" }],
  },
  {
    name: "Venue Intelligence Discovery",
    repo: "ArihantRawat/VenueIntelligenceDiscovery",
    cardSummary:
      "Venue Intelligence Discovery is a multi-agent workflow for comparing venues, markets, and ticketing signals at scale. It helps turn expansion research into clearer scoring and prioritization decisions.",
    modalSummary:
      "Venue Intelligence Discovery was built for the Tixr case competition and pushes more into orchestration and scoring logic. It combines venue, market, and ticketing signals into one pipeline so expansion prioritization becomes easier to compare and act on.",
    whatIBuilt: [
      "Multi-agent orchestration across venue, event, market, and ticketing signals",
      "Normalized scoring outputs for win probability, fit, and prioritization",
      "Both offline normalization and live API-enrichment paths",
    ],
    signals: [
      { label: "Coverage", value: "24K+ venues", note: "Designed to operate at a large geographic and venue scale" },
      { label: "Use case", value: "Expansion analysis", note: "Prioritizes where to focus next using comparable scoring" },
      { label: "Workflow", value: "Agentic", note: "Coordinates multiple research and enrichment steps together" },
    ],
    techStack: ["Python", "LangChain Agents", "Pandas", "Graph APIs"],
    links: [
      { label: "Open repository", href: "https://github.com/ArihantRawat/VenueIntelligenceDiscovery", kind: "repository" },
      { label: "Open website", href: "https://mehakjotsingh.github.io/tixrCaseComp/", kind: "website" },
    ],
  },
  {
    name: "iPad Portfolio Experience",
    repo: "ArihantRawat/arihant-ipad-site",
    cardSummary:
      "iPad Portfolio Experience reimagines a personal site as a tactile tablet-style product with windows, a dock, and gesture-like transitions. It makes the portfolio feel closer to an app demo than a standard scrolling website.",
    modalSummary:
      "This project pushes most directly into interaction design. It reframes a portfolio as an iPad-style product with a home screen, dock, app windows, and more tactile navigation patterns, which makes it feel like a product demo instead of a static resume site.",
    whatIBuilt: [
      "Home screen, dock interactions, app windows, and lockscreen-inspired moments",
      "Responsive motion and gesture-like transitions tuned for a tablet feel",
      "A more immersive storytelling structure for work, projects, and contact",
    ],
    signals: [
      { label: "Format", value: "Interactive portfolio", note: "Tells the story as a product experience instead of a standard site" },
      { label: "Motion", value: "Device-inspired", note: "Transitions are tuned to feel more native and tactile" },
      { label: "Delivery", value: "Static export", note: "Ships as a deployable interactive experience" },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Framer Motion"],
    links: [
      { label: "Open repository", href: "https://github.com/ArihantRawat/arihant-ipad-site", kind: "repository" },
      { label: "Open website", href: "https://arihantrawat.github.io/arihant-ipad-site/", kind: "website" },
    ],
  },
];

const CONTACT_LINKS: ContactLink[] = [
  { label: "arihantrawat@gmail.com", href: "mailto:arihantrawat@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arihantrawat" },
  { label: "(213) 563-6483", href: "tel:+12135636483" },
];

const PARTICLE_COUNT = 28;

const PARTICLES: Particle[] = Array.from({ length: PARTICLE_COUNT }).map((_, idx) => ({
    id: idx,
    left: `${(11 + idx * 17) % 100}%`,
    top: `${(7 + idx * 29) % 100}%`,
    size: `${6 + (idx % 5) * 2}px`,
    delay: `${(idx % 6) * 0.45}s`,
    opacity: 0.16 + (idx % 4) * 0.07,
  }));

export default function HomePage() {
  const [animationState, setAnimationState] = useState<HomeAnimationState>({
    isReady: false,
    shouldAnimate: true,
  });
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animationKey = "home-animation-played";
    const hasPlayed = window.sessionStorage.getItem(animationKey) === "1";

    const clearAnimationKey = () => window.sessionStorage.removeItem(animationKey);
    window.addEventListener("beforeunload", clearAnimationKey);

    if (hasPlayed) {
      const readyFrame = window.requestAnimationFrame(() => {
        setAnimationState({ isReady: true, shouldAnimate: false });
      });

      return () => {
        window.cancelAnimationFrame(readyFrame);
        window.removeEventListener("beforeunload", clearAnimationKey);
      };
    }

    window.sessionStorage.setItem(animationKey, "1");
    const timer = window.setTimeout(() => {
      setAnimationState({ isReady: true, shouldAnimate: true });
    }, 1000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("beforeunload", clearAnimationKey);
    };
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      if (!progressRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressRef.current.style.height = `${progress}%`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal-item"));

    if (!animationState.shouldAnimate) {
      items.forEach((item) => item.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [animationState.shouldAnimate]);

  useEffect(() => {
    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;
    let initialized = false;

    const animateRing = () => {
      if (!cursorRingRef.current) return;
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      cursorRingRef.current.style.left = `${ringX}px`;
      cursorRingRef.current.style.top = `${ringY}px`;
      rafId = window.requestAnimationFrame(animateRing);
    };

    const updateCursor = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!initialized) {
        ringX = targetX;
        ringY = targetY;
        initialized = true;
        if (cursorRingRef.current) {
          cursorRingRef.current.style.left = `${ringX}px`;
          cursorRingRef.current.style.top = `${ringY}px`;
        }
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${targetX}px`;
        cursorDotRef.current.style.top = `${targetY}px`;
      }
    };

    rafId = window.requestAnimationFrame(animateRing);
    window.addEventListener("mousemove", updateCursor);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleContactClick = useCallback(() => {
    trackEvent("cta_click", { cta: "contact_me", location: "hero" });
    const el = document.querySelector("#contact");
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleIpadSiteClick = useCallback((location: "top_nav" | "mobile_menu" | "hero" | "projects") => {
    trackEvent("opened_ipad_website", {
      location,
      label: "explore_in_another_way",
      destination: "arihant-ipad-site",
    });
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedProject]);

  const handleProjectLinkClick = useCallback(
    (project: string, type: ProjectLink["kind"], href: string) => {
      trackEvent("project_click", { type, project, href });
      if (href.includes("arihant-ipad-site")) {
        handleIpadSiteClick("projects");
      }
    },
    [handleIpadSiteClick]
  );

  return (
    <div className="site-shell">
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden />
      <div className="cursor-ring" ref={cursorRingRef} aria-hidden />
      <div className="progress-wrap">
        <div className="progress-bar" ref={progressRef} />
      </div>

      {PARTICLES.length > 0 && (
        <div className="particle-field" aria-hidden>
          {PARTICLES.map((particle) => (
            <span
              key={particle.id}
              className="particle"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
                animationDelay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      {!animationState.isReady && (
        <div className="preloader">
          <h1 className="preloader-name">
            {"Arihant Rawat".split("").map((letter, idx) => (
              <span key={`${letter}-${idx}`} className="name-letter" style={{ animationDelay: `${idx * 0.04}s` }}>
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
          <div className="load-bar" />
        </div>
      )}

      <header className="top-nav">
        <nav className="container nav-inner">
          <div className="nav-left">
            <a
              className="nav-explore-link"
              href={IPAD_PORTFOLIO_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => handleIpadSiteClick("top_nav")}
            >
              Explore in another way
            </a>

          </div>

          <div className="nav-right">
            <button
              className="menu-btn"
              onClick={() => {
                trackEvent("menu_toggle", { menu: "mobile", action: showMobileNav ? "close" : "open" });
                setShowMobileNav((prev) => !prev);
              }}
            >
              Menu
            </button>
            <div className="desktop-links">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  onClick={() => trackEvent("nav_click", { label: link.label, href: link.href, menu: "desktop" })}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
        {showMobileNav && (
          <div className="mobile-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                onClick={() => {
                  trackEvent("nav_click", { label: link.label, href: link.href, menu: "mobile" });
                  setShowMobileNav(false);
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={IPAD_PORTFOLIO_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                handleIpadSiteClick("mobile_menu");
                setShowMobileNav(false);
              }}
            >
              Explore in another way
            </a>
          </div>
        )}
      </header>

      <main id="top" className={`container main-space ${animationState.isReady ? "" : "content-hidden"}`}>
        <section className="hero reveal-section">
          <div>
            <p className="badge reveal-item">PRODUCT DEVELOPER</p>
            <h1 className="hero-title reveal-item">
              <span className="hero-line accent">BUILDING GOOD TECH</span>
              <span className="hero-line">FOR REAL USERS</span>
            </h1>
            <p className="hero-bio reveal-item">
              I am Arihant Rawat. I build user-centric products from idea to launch, with experience across startups and
              enterprise teams. I am driven to build in the tech space, working on problems that matter and turning ideas into
              real, shipped outcomes.
            </p>
            <div className="hero-actions reveal-item">
              <button type="button" className="btn-neon" onClick={handleContactClick}>
                CONTACT ME
              </button>
              <a
                className="btn-ghost"
                href="/resume/arihant-rawat-pm.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("resume_download", { file: "arihant-rawat-pm.pdf", location: "hero" })}
              >
                Resume
              </a>

            </div>
          </div>
          <div className="hero-right">
            <div className="photo-wrap reveal-item">
              <Image src="/images/arihant-headshot.jpg" alt="Arihant Rawat" width={720} height={900} priority />
            </div>
            <div className="stats reveal-item">
              {HERO_STATS.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <p className="stat-number">
                    <span>{stat.value}</span>
                  </p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="reveal-section section-gap about-section">
          <h2 className="section-title reveal-item">About Me</h2>
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className="reveal-item about-copy">
              {paragraph}
            </p>
          ))}
        </section>

        <section id="skills" className="reveal-section section-gap">
          <h2 className="section-title reveal-item">Skills</h2>
          <div className="chips">
            {SKILLS.map((skill) => (
              <span className="skill-chip" key={skill.label}>
                {skill.emoji && (
                  <span className="skill-emoji" aria-hidden>
                    {skill.emoji}
                  </span>
                )}
                {skill.iconSrc && (
                  <Image
                    className="skill-logo"
                    src={skill.iconSrc}
                    alt={skill.iconAlt ?? skill.label}
                    width={16}
                    height={16}
                    unoptimized
                  />
                )}
                <span>{skill.label}</span>
              </span>
            ))}
          </div>
        </section>

        <section id="experience" className="reveal-section section-gap">
          <h2 className="section-title reveal-item">Experience</h2>
          <div className="timeline">
            {EXPERIENCES.map((experience) => (
              <article className="card timeline-card reveal-item" key={experience.title}>
                <span className="timeline-dot" />
                <p className="muted">
                  {experience.timeframe} • {experience.location}
                </p>
                <h3>{experience.title}</h3>
                <p>{experience.subtitle}</p>
                {experience.description && <p className="muted">{experience.description}</p>}
                {experience.details?.map((detail) => (
                  <p key={detail} className="muted">
                    {detail}
                  </p>
                ))}
                <div className="link-row">
                  {experience.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent("outbound_click", { section: "experience", label: link.label, href: link.href })}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="reveal-section section-gap">
          <h2 className="section-title reveal-item">Education</h2>
          <div className="timeline">
            {EDUCATION.map((edu) => (
              <article className="card timeline-card reveal-item" key={edu.title}>
                <span className="timeline-dot" />
                <p className="muted">
                  {edu.location} • {edu.timeframe}
                </p>
                <h3>{edu.title}</h3>
                <p>{edu.subtitle}</p>
                <p className="muted">{edu.description}</p>
                <div className="link-row">
                  {edu.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent("outbound_click", { section: "education", label: link.label, href: link.href })}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="reveal-section section-gap">
          <div className="section-head">
            <h2 className="section-title reveal-item">Projects</h2>
          </div>
          <div className="projects-shell">
            <div className="project-gallery">
              {PROJECTS.map((project) => (
                <div className="card project-card reveal-item" key={project.name}>
                  <button
                    type="button"
                    className="project-card-trigger"
                    onClick={() => {
                      trackEvent("project_card_open", { project: project.name, repo: project.repo });
                      setSelectedProject(project);
                    }}
                  >
                    <div className="project-card-head">
                      <h3>{project.name}</h3>
                    </div>
                    <p className="project-card-summary">{project.cardSummary}</p>
                    <div className="project-stack compact">
                      {project.techStack.slice(0, 3).map((stack) => (
                        <span key={stack}>{stack}</span>
                      ))}
                    </div>
                  </button>
                  <div className="project-card-actions">
                    <button
                      type="button"
                      className="project-card-cta"
                      onClick={() => {
                        trackEvent("project_card_open", { project: project.name, repo: project.repo });
                        setSelectedProject(project);
                      }}
                    >
                      Click to explore
                    </button>
                    {project.links
                      .filter((link) => link.kind === "repository")
                      .map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => handleProjectLinkClick(project.name, link.kind, link.href)}
                        >
                          Open repository
                        </a>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="project-footer reveal-item">
              <a
                href="https://github.com/ArihantRawat"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("outbound_click", { section: "projects", label: "GitHub", href: "https://github.com/ArihantRawat" })}
              >
                Explore more on GitHub
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="reveal-section section-gap bottom-space">
          <h2 className="section-title reveal-item">Contact Me</h2>
          <div className="contact-grid">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                className="card reveal-item"
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                onClick={() => trackEvent("contact_click", { label: link.label, href: link.href })}
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      {selectedProject && (
        <div
          className="project-modal-overlay"
          role="presentation"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="project-modal-head">
              <div>
                <p className="project-modal-kicker">Project detail</p>
                <h3 id="project-modal-title">{selectedProject.name}</h3>
                <p className="project-repo">{selectedProject.repo}</p>
              </div>
              <button
                type="button"
                className="project-modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
              >
                ×
              </button>
            </div>

            <p className="project-modal-summary">{selectedProject.modalSummary}</p>

            <div className="project-signals">
              {selectedProject.signals.map((signal) => (
                <div className="project-signal" key={`${selectedProject.name}-${signal.label}`}>
                  <span className="project-signal-label">{signal.label}</span>
                  <strong>{signal.value}</strong>
                  <span>{signal.note}</span>
                </div>
              ))}
            </div>

            <div className="project-modal-body">
              <div>
                <p className="small-title">What I built</p>
                <ul>
                  {selectedProject.whatIBuilt.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="small-title">Tech stack</p>
                <div className="project-stack">
                  {selectedProject.techStack.map((stack) => (
                    <span key={stack}>{stack}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="link-row">
              {selectedProject.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => handleProjectLinkClick(selectedProject.name, link.kind, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="site-footer">Designed and built by Arihant Rawat</footer>
      <PortfolioAvatarAssistant />
    </div>
  );
}
