"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Project = {
  title: string;
  repo: string;
  description: string;
  built: string[];
  techStack: string[];
  link: string;
};

const projects: Project[] = [
  {
    title: "OffGrid",
    repo: "ArihantRawat/OffGrid",
    description: "Mobile app built to test real user behavior quickly. I focused on fast iteration, clean onboarding flow, and practical MVP delivery.",
    built: ["Flutter app foundation", "Core user journeys", "Release-ready mobile structure"],
    techStack: ["Flutter", "Dart", "Mobile UI"],
    link: "https://github.com/ArihantRawat/OffGrid",
  },
  {
    title: "To-Do-List-V1",
    repo: "ArihantRawat/To-Do-List-V1",
    description: "Productivity web app designed for simple daily use. I focused on frictionless task flows and clear state updates.",
    built: ["Task CRUD flow", "Responsive interaction patterns", "State handling"],
    techStack: ["JavaScript", "HTML/CSS", "Frontend Logic"],
    link: "https://github.com/ArihantRawat/To-Do-List-V1",
  },
  {
    title: "Sarcasm-Detector",
    repo: "ArihantRawat/Sarcasm-Detector",
    description: "AI/NLP project for text classification. I explored how model performance changes with preprocessing and feature choices.",
    built: ["Text preprocessing pipeline", "Training and evaluation workflow", "Reusable prediction path"],
    techStack: ["Python", "NLP", "Classification Models"],
    link: "https://github.com/ArihantRawat/Sarcasm-Detector",
  },
  {
    title: "Image Captioning",
    repo: "ArihantRawat/Image-Captioning",
    description: "Computer vision project to generate natural language from images. The focus was combining vision features with language output quality.",
    built: ["Caption generation pipeline", "Experiment notebooks", "Model output evaluation"],
    techStack: ["Python", "Image Processing", "Deep Learning"],
    link: "https://github.com/ArihantRawat/Image-Captioning",
  },
];

const skills = [
  "🚀 Product Development",
  "🧭 Product Strategy",
  "🗺️ Roadmapping",
  "🤝 Cross-functional Leadership",
  "🔍 User Research",
  "📊 SQL + Analytics",
  "💻 Java / TypeScript / Python",
  "⚛️ React / Next.js / Flutter",
  "🔌 REST API Design",
  "🧠 AI Product Prototyping",
  "🗣️ NLP",
  "🖼️ Image Processing",
  "🧪 Classification Models",
  "🤖 OpenClaw Workflows",
  "🧩 LLM Integration in Products",
];

function Counter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const valueRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: end,
      duration: 1.2,
      ease: "power3.out",
      delay: 1.45,
      onUpdate: () => {
        if (valueRef.current) valueRef.current.textContent = `${Math.floor(obj.value)}${suffix}`;
      },
    });
  }, { scope: valueRef });

  return (
    <div className="stat-card reveal-item">
      <p className="stat-number"><span ref={valueRef}>{end}{suffix}</span></p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPreloader, setShowPreloader] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; size: number; opacity: number }>>([]);
  const name = "Arihant Rawat";
  const letters = useMemo(() => name.split(""), [name]);

  const preloaderRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("ar-intro-seen") === "1";
    setShowPreloader(!seen);
    if (!seen) sessionStorage.setItem("ar-intro-seen", "1");

    const count = window.innerWidth < 768 ? 50 : 90;
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.4,
    }));
    setParticles(generated);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.12, ease: "power2.out" });
      gsap.to(cursorRingRef.current, { x: e.clientX, y: e.clientY, duration: 0.24, ease: "power2.out" });
    };

    const enter = () => gsap.to(cursorRingRef.current, { scale: 2, duration: 0.18, ease: "power2.inOut" });
    const leave = () => gsap.to(cursorRingRef.current, { scale: 1, duration: 0.18, ease: "power2.inOut" });

    window.addEventListener("mousemove", move);
    const targets = document.querySelectorAll("a, button");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  useGSAP(() => {
    if (showPreloader) {
      gsap.fromTo(".name-letter", { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, ease: "power3.out" });
      const tl = gsap.timeline();
      tl.fromTo(".load-bar", { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: "power1.inOut" })
        .to(".load-bar", { y: -8, autoAlpha: 0, duration: 0.4, ease: "power1.inOut" })
        .to(preloaderRef.current, { yPercent: -100, autoAlpha: 0, duration: 0.7, delay: 1, ease: "power1.inOut" });
    }

    gsap.fromTo(".hero-line", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.6, ease: "power3.out", delay: showPreloader ? 1.1 : 0.2 });
    gsap.fromTo(".hero-bio", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay: showPreloader ? 1.45 : 0.45, ease: "power1.inOut" });

    gsap.utils.toArray<HTMLElement>(".particle").forEach((particle) => {
      gsap.to(particle, {
        x: gsap.utils.random(-36, 36),
        y: gsap.utils.random(-30, 30),
        duration: gsap.utils.random(5.5, 12),
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        ease: "power1.inOut",
      });
    });

    gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
      const items = section.querySelectorAll(".reveal-item");
      gsap.fromTo(
        items,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );
    });
  }, { dependencies: [showPreloader, particles.length] });

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="site-shell">
      <div className="cursor-dot" ref={cursorRef} />
      <div className="cursor-ring" ref={cursorRingRef} />

      <div className="progress-wrap"><div className="progress-bar" style={{ height: `${progress}%` }} /></div>

      {showPreloader ? (
        <div className="preloader" ref={preloaderRef}>
          <h1 className="preloader-name">
            {letters.map((char, i) => <span className="name-letter" key={`${char}-${i}`}>{char === " " ? "\u00A0" : char}</span>)}
          </h1>
          <div className="load-bar" />
        </div>
      ) : null}

      <div className="particle-field" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, opacity: p.opacity }}
          />
        ))}
      </div>

      <header className="top-nav">
        <nav className="container nav-inner">
          <a href="#top" className="logo">AR</a>
          <div className="desktop-links">
            <a href="#about">About</a><a href="#skills">Skills</a><a href="#experience">Experience</a><a href="#education">Education</a><a href="#projects">Projects</a><a href="#contact">Contact</a>
            <Link href="/blog">Blog</Link>
          </div>
          <button className="menu-btn" onClick={() => setMenuOpen((p) => !p)}>Menu</button>
        </nav>
        {menuOpen && (
          <div className="mobile-links">
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
            <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          </div>
        )}
      </header>

      <main id="top" className="container main-space">
        <section className="hero reveal-section">
          <div>
            <p className="badge reveal-item">PRODUCT DEVELOPER</p>
            <h1 className="hero-title reveal-item">
              <span className="hero-line accent">BUILDING GOOD TECH</span>
              <span className="hero-line">FOR REAL USERS</span>
            </h1>
            <p className="hero-bio reveal-item">I’m Arihant. I build user-centric products from idea to launch, with experience across startups and enterprise teams. I’m driven to build in the tech space, working on problems that matter and turning ideas into real, shipped outcomes.</p>
            <div className="hero-actions reveal-item">
              <button type="button" className="btn-neon" onClick={scrollToContact}>CONTACT ME</button>
              <a href="/resume/arihant-rawat-pm.pdf" target="_blank" rel="noreferrer" className="btn-ghost">Resume</a>
            </div>
          </div>
          <div className="hero-right reveal-item">
            <div className="photo-wrap"><Image src="/images/arihant-headshot.jpg" alt="Arihant Rawat" width={720} height={900} /></div>
            <div className="stats">
              <Counter end={4} suffix="+" label="Years of Experience" />
              <Counter end={7} suffix="+" label="Completed Projects" />
              <Counter end={10} suffix="K+" label="Hours" />
            </div>
          </div>
        </section>

        <section id="about" className="reveal-section section-gap">
          <h2 className="section-title reveal-item">About Me</h2>
          <p className="reveal-item">I’m currently a first-year MBA student at USC Marshall, focused on growing as a product builder in the tech space. I studied engineering at NSIT (now NSUT) and worked at Cult.fit and Salesforce, where I built products across both startup and large-scale environments.</p>
          <p className="reveal-item">Across these experiences, I’ve learned to combine engineering depth, product thinking, and strong execution to solve real user problems. I enjoy taking ideas from early ambiguity to shipped products that create tangible impact.</p>
          <p className="reveal-item">I grew up in India and have lived and worked across Delhi, Bangalore, and now Los Angeles. This journey has shaped how I think, collaborate, and build with diverse teams to create products that are thoughtful, practical, and user-centered.</p>
        </section>

        <section id="skills" className="reveal-section section-gap">
          <h2 className="section-title reveal-item">Skills</h2>
          <div className="chips reveal-item">{skills.map((s) => <span key={s}>{s}</span>)}</div>
        </section>

        <section id="experience" className="reveal-section section-gap">
          <h2 className="section-title reveal-item">Experience</h2>
          <div className="timeline reveal-item">
            <article className="card timeline-card reveal-item">
              <span className="timeline-dot" />
              <p className="muted">Oct 2023 - Jul 2025 • Bangalore, India</p>
              <h3>Salesforce</h3>
              <p>Senior Product Developer (MTS)</p>
              <p className="muted">Built enterprise APIs and product workflows across Context Service and Data Cloud with cross-functional teams.</p>
              <a href="https://www.salesforce.com/" target="_blank" rel="noreferrer">Visit Salesforce</a>
            </article>
            <article className="card timeline-card reveal-item">
              <span className="timeline-dot" />
              <p className="muted">Jul 2021 - Oct 2023 • Bangalore, India</p>
              <h3>Cult.fit (Unicorn Health and Fitness Startup)</h3>
              <p>Product Developer to Senior Product Developer</p>
              <p className="muted">Shipped user-facing app features across multiple products, worked closely across product and operations, and contributed during a high-growth phase as Cult.fit scaled into a unicorn startup.</p>
              <a href="https://www.cult.fit/" target="_blank" rel="noreferrer">Visit Cult.fit</a>
            </article>
          </div>
        </section>

        <section id="education" className="reveal-section section-gap">
          <h2 className="section-title reveal-item">Education</h2>
          <div className="edu-grid">
            <article className="card reveal-item">
              <p className="muted">Los Angeles, CA • Expected May 2027</p>
              <h3>University of Southern California (USC), Marshall School of Business</h3>
              <p>MBA (STEM)</p>
              <p className="muted">Dean’s Merit Scholarship (100%) • Prediger Endowed Scholarship • GMAT FE 705</p>
              <a href="https://www.marshall.usc.edu/" target="_blank" rel="noreferrer">Visit USC Marshall</a>
            </article>
            <article className="card reveal-item">
              <p className="muted">Delhi, India • May 2021</p>
              <h3>NSIT (now NSUT), Netaji Subhas University of Technology</h3>
              <p>B.E. in Information Technology (Computer Science)</p>
              <p className="muted">First Class Distinction (CGPA 8.6/10.0)</p>
              <a href="https://www.nsut.ac.in/" target="_blank" rel="noreferrer">Visit NSUT</a>
            </article>
          </div>
        </section>

        <section id="projects" className="reveal-section section-gap">
          <div className="section-head reveal-item"><h2 className="section-title">Projects</h2><a href="https://github.com/ArihantRawat" target="_blank" rel="noreferrer">GitHub</a></div>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="card reveal-item">
                <h3>{project.title}</h3>
                <p className="muted">{project.repo}</p>
                <p>{project.description}</p>
                <p className="small-title">What I built</p>
                <ul>{project.built.map((item) => <li key={item}>{item}</li>)}</ul>
                <p className="small-title">Tech stack</p>
                <ul>{project.techStack.map((item) => <li key={item}>{item}</li>)}</ul>
                <a href={project.link} target="_blank" rel="noreferrer">Open repository</a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" ref={contactRef} className="reveal-section section-gap bottom-space">
          <h2 className="section-title reveal-item">Contact Me</h2>
          <div className="contact-grid reveal-item">
            <a className="card" href="mailto:arihantrawat@gmail.com">arihantrawat@gmail.com</a>
            <a className="card" href="https://www.linkedin.com/in/arihantrawat" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="card" href="tel:+12135636483">(213) 563-6483</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">Designed and built by Arihant Rawat</footer>
    </div>
  );
}
