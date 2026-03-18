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
  quantifiedImpact: string[];
  link: string;
};

const projects: Project[] = [
  {
    title: "OffGrid",
    repo: "ArihantRawat/OffGrid",
    description: "Mobile app built with Flutter for fast MVP validation and user flow testing.",
    built: ["Flutter app foundation", "Core user flows", "Mobile release pipeline"],
    quantifiedImpact: ["3+ complete user journeys", "1 MVP shipped", "100% cross-platform codebase"],
    link: "https://github.com/ArihantRawat/OffGrid",
  },
  {
    title: "To-Do-List-V1",
    repo: "ArihantRawat/To-Do-List-V1",
    description: "Task app focused on simple UX and clean interaction patterns.",
    built: ["CRUD flows", "Frontend state logic", "Responsive layout"],
    quantifiedImpact: ["4 CRUD operations", "1 focused productivity workflow", "100% client-side execution"],
    link: "https://github.com/ArihantRawat/To-Do-List-V1",
  },
  {
    title: "Sarcasm-Detector",
    repo: "ArihantRawat/Sarcasm-Detector",
    description: "NLP project for sarcasm classification and model behavior testing.",
    built: ["Text preprocessing", "Model experiments", "Prediction pipeline"],
    quantifiedImpact: ["3-stage ML flow", "Multiple model runs", "1 reusable inference path"],
    link: "https://github.com/ArihantRawat/Sarcasm-Detector",
  },
  {
    title: "Image Captioning",
    repo: "ArihantRawat/Image-Captioning",
    description: "Computer vision prototype for generating natural-language captions.",
    built: ["Captioning pipeline", "Notebook experiments", "Output quality checks"],
    quantifiedImpact: ["2-stage CV architecture", "Multiple experiment notebooks", "1 end-to-end prototype"],
    link: "https://github.com/ArihantRawat/Image-Captioning",
  },
];

const skills = [
  "Product Development",
  "Product Strategy",
  "Roadmapping",
  "Cross-functional Leadership",
  "User Research",
  "SQL + Analytics",
  "Java / TypeScript / Python",
  "React / Next.js / Flutter",
  "REST API Design",
  "AI Product Prototyping",
];

function Counter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const valueRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: end,
      duration: 1.2,
      ease: "power3.out",
      onUpdate: () => {
        if (valueRef.current) valueRef.current.textContent = `${Math.floor(obj.value)}${suffix}`;
      },
      scrollTrigger: {
        trigger: valueRef.current,
        start: "top 85%",
      },
    });
  }, { scope: valueRef });

  return (
    <div className="stat-card reveal-item">
      <p className="stat-number"><span ref={valueRef}>0{suffix}</span></p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const name = "Arihant Rawat";
  const letters = useMemo(() => name.split(""), [name]);

  const preloaderRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);

  const particles = useMemo(() => {
    const count = typeof window !== "undefined" && window.innerWidth < 768 ? 50 : 90;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.4,
    }));
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
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power1.out" });
      gsap.to(cursorRingRef.current, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power1.out" });
    };

    const enter = () => gsap.to(cursorRingRef.current, { scale: 2, duration: 0.2, ease: "power1.inOut" });
    const leave = () => gsap.to(cursorRingRef.current, { scale: 1, duration: 0.2, ease: "power1.inOut" });

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
    gsap.fromTo(".name-letter", { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, ease: "power3.out" });

    const tl = gsap.timeline();
    tl.fromTo(".load-bar", { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35, ease: "power1.inOut" })
      .to(".load-bar", { y: -8, autoAlpha: 0, duration: 0.4, ease: "power1.inOut" })
      .to(preloaderRef.current, { yPercent: -100, autoAlpha: 0, duration: 0.7, delay: 1, ease: "power1.inOut" });

    gsap.fromTo(".hero-line", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.6, ease: "power3.out", delay: 1.1 });
    gsap.fromTo(".hero-bio", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay: 1.45, ease: "power1.inOut" });

    gsap.to(".particle", {
      x: "random(-28, 28)",
      y: "random(-28, 28)",
      duration: "random(5, 10)",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.02,
    });

    gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
      const items = section.querySelectorAll(".reveal-item");
      gsap.fromTo(
        items,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );
    });
  });

  return (
    <div className="site-shell">
      <div className="cursor-dot" ref={cursorRef} />
      <div className="cursor-ring" ref={cursorRingRef} />

      <div className="progress-wrap"><div className="progress-bar" style={{ height: `${progress}%` }} /></div>

      <div className="preloader" ref={preloaderRef}>
        <h1 className="preloader-name">
          {letters.map((char, i) => <span className="name-letter" key={`${char}-${i}`}>{char === " " ? "\u00A0" : char}</span>)}
        </h1>
        <div className="load-bar" />
      </div>

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
            <a href="#about">About</a><a href="#skills">Skills</a><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#contact">Contact</a>
            <Link href="/blog">Blog</Link>
          </div>
          <button className="menu-btn" onClick={() => setMenuOpen((p) => !p)}>Menu</button>
        </nav>
        {menuOpen && (
          <div className="mobile-links">
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
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
            <p className="hero-bio reveal-item">I am Arihant. I build products from idea to execution across startup and enterprise teams. I am open to Product Developer and Software Developer roles, and in general any strong tech role where I can build and ship.</p>
            <div className="hero-actions reveal-item">
              <a href="#contact" className="btn-neon">HIRE ME</a>
              <a href="/resume/arihant-rawat-pm.pdf" target="_blank" rel="noreferrer" className="btn-ghost">Resume</a>
            </div>
          </div>
          <div className="hero-right reveal-item">
            <div className="photo-wrap"><Image src="/images/arihant-headshot.jpg" alt="Arihant Rawat" width={720} height={900} /></div>
            <div className="stats">
              <Counter end={3} suffix="+" label="Years" />
              <Counter end={7} suffix="+" label="Projects" />
              <Counter end={10} suffix="K+" label="Hours" />
            </div>
          </div>
        </section>

        <section id="about" className="reveal-section section-gap">
          <h2 className="section-title reveal-item">About</h2>
          <p className="reveal-item">I am from India and have lived and worked across Delhi, Bangalore, and now Los Angeles. I like solving messy product problems with clear structure and strong execution.</p>
          <p className="reveal-item">My strength is connecting product thinking with technical delivery. I can work with users, business teams, and engineers to ship practical outcomes.</p>
        </section>

        <section id="skills" className="reveal-section section-gap">
          <h2 className="section-title reveal-item">Skills</h2>
          <div className="chips reveal-item">{skills.map((s) => <span key={s}>{s}</span>)}</div>
        </section>

        <section id="experience" className="reveal-section section-gap">
          <h2 className="section-title reveal-item">Experience</h2>
          <article className="card reveal-item">
            <p className="muted">Oct 2023 - Jul 2025</p>
            <h3>Salesforce</h3>
            <p>Senior Product Developer (MTS)</p>
            <a href="https://www.salesforce.com/" target="_blank" rel="noreferrer">Visit Salesforce</a>
          </article>
          <article className="card reveal-item">
            <p className="muted">Jul 2021 - Oct 2023</p>
            <h3>Cult.fit</h3>
            <p>Product Developer to Senior Product Developer</p>
            <a href="https://www.cult.fit/" target="_blank" rel="noreferrer">Visit Cult.fit</a>
          </article>
          <article className="card reveal-item">
            <p className="muted">Education</p>
            <p>USC Marshall (MBA STEM) - <a href="https://www.marshall.usc.edu/" target="_blank" rel="noreferrer">USC</a></p>
            <p>NSIT (now NSUT) - <a href="https://www.nsut.ac.in/" target="_blank" rel="noreferrer">NSUT</a></p>
          </article>
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
                <p className="small-title">Quantified highlights</p>
                <ul>{project.quantifiedImpact.map((item) => <li key={item}>{item}</li>)}</ul>
                <a href={project.link} target="_blank" rel="noreferrer">Open repository</a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="reveal-section section-gap bottom-space">
          <h2 className="section-title reveal-item">Contact</h2>
          <div className="contact-grid reveal-item">
            <a className="card" href="mailto:arihantr@usc.edu">arihantr@usc.edu</a>
            <a className="card" href="https://www.linkedin.com/in/arihantrawat" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="card" href="tel:+12135636483">(213) 563-6483</a>
          </div>
        </section>
      </main>
    </div>
  );
}
