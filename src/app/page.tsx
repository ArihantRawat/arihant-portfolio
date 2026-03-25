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
  description: string;
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
  { label: "Java", iconSrc: "https://cdn.simpleicons.org/openjdk", iconAlt: "Java" },
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
    description:
      "Built enterprise APIs and product workflows across Context Service and Data Cloud with cross-functional teams.",
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
    description:
      "Shipped user-facing app features across multiple products, worked closely with product and operations, and contributed during a high-growth phase as Cult.fit scaled into a unicorn startup.",
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
    name: "OffGrid",
    repo: "ArihantRawat/OffGrid",
    description:
      "Mobile app built to test real user behavior quickly. Focused on fast iteration, clean onboarding flow, and practical MVP delivery.",
    whatIBuilt: ["Flutter app foundation", "Core user journeys", "Release-ready mobile structure"],
    techStack: ["Flutter", "Dart", "Mobile UI"],
    link: "https://github.com/ArihantRawat/OffGrid",
  },
  {
    name: "To-Do-List-V1",
    repo: "ArihantRawat/To-Do-List-V1",
    description:
      "Productivity web app designed for simple daily use with frictionless task flows and clear state updates.",
    whatIBuilt: ["Task CRUD flow", "Responsive interaction patterns", "State handling"],
    techStack: ["JavaScript", "HTML/CSS", "Frontend Logic"],
    link: "https://github.com/ArihantRawat/To-Do-List-V1",
  },
  {
    name: "Sarcasm-Detector",
    repo: "ArihantRawat/Sarcasm-Detector",
    description:
      "AI/NLP project for text classification exploring how model performance changes with preprocessing and feature choices.",
    whatIBuilt: ["Text preprocessing pipeline", "Training and evaluation workflow", "Reusable prediction path"],
    techStack: ["Python", "NLP", "Classification Models"],
    link: "https://github.com/ArihantRawat/Sarcasm-Detector",
  },
  {
    name: "Image Captioning",
    repo: "ArihantRawat/Image-Captioning",
    description:
      "Computer vision project to generate natural language from images by combining vision features with language output quality.",
    whatIBuilt: ["Caption generation pipeline", "Experiment notebooks", "Model output evaluation"],
    techStack: ["Python", "Image Processing", "Deep Learning"],
    link: "https://github.com/ArihantRawat/Image-Captioning",
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
              <span key={`${letter}-${idx}`} className="name-letter">
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
            <p className="badge">PRODUCT DEVELOPER</p>
            <h1 className="hero-title">
              <span className="hero-line accent">BUILDING GOOD TECH</span>
              <span className="hero-line">FOR REAL USERS</span>
            </h1>
            <p className="hero-bio">
              I am Arihant Rawat. I build user-centric products from idea to launch, with experience across startups and
              enterprise teams. I am driven to build in the tech space, working on problems that matter and turning ideas into
              real, shipped outcomes.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn-neon" onClick={handleContactClick}>
                CONTACT ME
              </button>
              <a className="btn-ghost" href="/resume/arihant-rawat-pm.pdf" target="_blank" rel="noreferrer">
                Resume
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="photo-wrap">
              <Image src="/images/arihant-headshot.jpg" alt="Arihant Rawat" width={720} height={900} priority />
            </div>
            <div className="stats">
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
          <h2 className="section-title">About Me</h2>
          {ABOUT_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className="reveal-item">
              {paragraph}
            </p>
          ))}
        </section>

        <section id="skills" className="reveal-section section-gap">
          <h2 className="section-title">Skills</h2>
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
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            {EXPERIENCES.map((experience) => (
              <article className="card timeline-card" key={experience.title}>
                <span className="timeline-dot" />
                <p className="muted">
                  {experience.timeframe} • {experience.location}
                </p>
                <h3>{experience.title}</h3>
                <p>{experience.subtitle}</p>
                <p className="muted">{experience.description}</p>
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
          <h2 className="section-title">Education</h2>
          <div className="edu-grid">
            {EDUCATION.map((edu) => (
              <article className="card" key={edu.title}>
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
            <h2 className="section-title">Projects</h2>
            <a href="https://github.com/ArihantRawat" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <div className="project-grid">
            {PROJECTS.map((project) => (
              <article className="card" key={project.name}>
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
          <h2 className="section-title">Contact Me</h2>
          <div className="contact-grid">
            {CONTACT_LINKS.map((link) => (
              <a key={link.label} className="card" href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined}>
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
