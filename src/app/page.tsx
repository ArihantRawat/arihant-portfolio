"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

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

type Project = {
  name: string;
  repo: string;
  description: string;
  whatIBuilt: string[];
  techStack: string[];
  link: string;
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
  { label: "Completed Projects", value: "7+" },
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
  { label: "Base44", iconSrc: "https://base44.com/favicon.ico", iconAlt: "Base44" },
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
      "At Salesforce, I joined the Industries Cloud team and worked on a product called Content Services. We initially built it as an internal tool to simplify how teams access and manage data across backend systems, reducing latency and complexity while providing a simple interface to map and control data flows. The product gained strong adoption internally and was later turned into a paid product with API-based usage.",
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
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Cure.fit" },
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

const PROJECTS: Project[] = [
  {
    name: "Venue Intelligence Discovery",
    repo: "ArihantRawat/VenueIntelligenceDiscovery",
    description:
      "Multi-agent intelligence stack built for the Tixr Case Competition to score 24K+ global venues for expansion across EMEA, LATAM, and Southeast Asia.",
    whatIBuilt: [
      "Layered orchestrator that coordinates venue, ticketing, event, and market agents and deduplicates their signals",
      "Normalized schema plus Excel workbook with win probability, premium fit, and priority scoring",
      "CLI + pipeline scripts that can run offline normalization or live API enrichment when keys are provided",
    ],
    techStack: ["Python", "LangChain Agents", "Pandas", "REST / Graph APIs"],
    link: "https://github.com/ArihantRawat/VenueIntelligenceDiscovery",
  },
  {
    name: "Video Captioning",
    repo: "ArihantRawat/Video_Captioning",
    description:
      "Sequence-to-sequence system that turns short video clips into natural-language captions using CNN encoders and LSTM decoders.",
    whatIBuilt: [
      "Frame extraction, cleaning, and mapping utilities for curating training datasets",
      "Seq2Seq training scripts plus saved encoder/decoder checkpoints for quick experimentation",
      "Inference notebooks that visualize attention maps and generate captions on unseen clips",
    ],
    techStack: ["Python", "TensorFlow / Keras", "OpenCV", "NumPy"],
    link: "https://github.com/ArihantRawat/Video_Captioning",
  },
  {
    name: "Image Captioning",
    repo: "ArihantRawat/Image-Captioning",
    description:
      "Vision-language playground that pairs CNN feature extractors with language models to narrate what’s happening inside an image.",
    whatIBuilt: [
      "Reusable caption generation pipeline with configurable encoders and decoders",
      "Experiment notebooks that compare BLEU scores across architectures",
      "Evaluation harness for quickly validating captions on curated test sets",
    ],
    techStack: ["Python", "PyTorch", "Computer Vision"],
    link: "https://github.com/ArihantRawat/Image-Captioning",
  },
  {
    name: "Sarcasm Detector",
    repo: "ArihantRawat/Sarcasm-Detector",
    description:
      "NLP classifier that labels headlines as sarcastic or literal by combining traditional feature engineering with modern embeddings.",
    whatIBuilt: [
      "Data cleaning and balancing scripts for multiple headline datasets",
      "Model zoo ranging from TF-IDF + Logistic Regression to deeper neural nets",
      "Evaluation notebook with precision/recall tracking and exportable models",
    ],
    techStack: ["Python", "scikit-learn", "NLP"],
    link: "https://github.com/ArihantRawat/Sarcasm-Detector",
  },
  {
    name: "OffGrid",
    repo: "ArihantRawat/OffGrid",
    description:
      "Flutter playground I use to prototype mobile product ideas quickly with a focus on fast iteration and frictionless onboarding.",
    whatIBuilt: ["App shell + navigation", "Core user journeys", "Release-ready CI-friendly structure"],
    techStack: ["Flutter", "Dart", "Mobile UI"],
    link: "https://github.com/ArihantRawat/OffGrid",
  },
  {
    name: "To-Do List V1",
    repo: "ArihantRawat/To-Do-List-V1",
    description:
      "Lightweight productivity web app with instant CRUD interactions and a clean responsive layout.",
    whatIBuilt: ["Task management logic", "Responsive interaction patterns", "Vanilla JS state handling"],
    techStack: ["JavaScript", "HTML/CSS"],
    link: "https://github.com/ArihantRawat/To-Do-List-V1",
  },
];

const CONTACT_LINKS: ContactLink[] = [
  { label: "arihantrawat@gmail.com", href: "mailto:arihantrawat@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arihantrawat" },
  { label: "(213) 563-6483", href: "tel:+12135636483" },
];

const PARTICLE_COUNT = 28;

const createParticles = (): Particle[] =>
  Array.from({ length: PARTICLE_COUNT }).map((_, idx) => ({
    id: idx,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${6 + Math.random() * 8}px`,
    delay: `${Math.random() * 4}s`,
    opacity: 0.15 + Math.random() * 0.35,
  }));

export default function HomePage() {
  const [isReady, setIsReady] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setParticles(createParticles());
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
  }, []);

  useEffect(() => {
    const updateCursor = (event: MouseEvent) => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      }
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  const handleContactClick = useCallback(() => {
    const el = document.querySelector("#contact");
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="site-shell">
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden />
      <div className="cursor-ring" ref={cursorRingRef} aria-hidden />
      <div className="progress-wrap">
        <div className="progress-bar" ref={progressRef} />
      </div>

      {particles.length > 0 && (
        <div className="particle-field" aria-hidden>
          {particles.map((particle) => (
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

      {!isReady && (
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
          <Link href="#top" className="logo">
            AR
          </Link>
          <div className="desktop-links">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} prefetch={false}>
                {link.label}
              </Link>
            ))}
          </div>
          <button className="menu-btn" onClick={() => setShowMobileNav((prev) => !prev)}>
            Menu
          </button>
        </nav>
        {showMobileNav && (
          <div className="mobile-links">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} prefetch={false} onClick={() => setShowMobileNav(false)}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main id="top" className={`container main-space ${isReady ? "" : "content-hidden"}`}>
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
              <a className="btn-ghost" href="/resume/arihant-rawat-pm.pdf" target="_blank" rel="noreferrer">
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

        <section id="about" className="reveal-section section-gap">
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
                  // Using <img> to avoid remote image domain configuration for icon favicons
                  <img className="skill-logo" src={skill.iconSrc} alt={skill.iconAlt ?? skill.label} loading="lazy" />
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
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
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
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
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
            <a href="https://github.com/ArihantRawat" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <div className="project-grid">
            {PROJECTS.map((project) => (
              <article className="card reveal-item" key={project.name}>
                <h3>{project.name}</h3>
                <p className="muted">{project.repo}</p>
                <p>{project.description}</p>
                <p className="small-title">What I built</p>
                <ul>
                  {project.whatIBuilt.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="small-title">Tech stack</p>
                <ul>
                  {project.techStack.map((stack) => (
                    <li key={stack}>{stack}</li>
                  ))}
                </ul>
                <a href={project.link} target="_blank" rel="noreferrer">
                  Open repository
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="reveal-section section-gap bottom-space">
          <h2 className="section-title reveal-item">Contact Me</h2>
          <div className="contact-grid">
            {CONTACT_LINKS.map((link) => (
              <a key={link.label} className="card reveal-item" href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined}>
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">Designed and built by Arihant Rawat</footer>
    </div>
  );
}
