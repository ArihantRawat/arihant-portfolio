"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Project = {
  title: string;
  repo: string;
  description: string;
  built: string[];
  impact: string;
  skillsShown: string[];
  link: string;
};

const projects: Project[] = [
  {
    title: "OffGrid",
    repo: "ArihantRawat/OffGrid",
    description:
      "Mobile app built with Flutter to validate user journeys quickly and ship an MVP experience.",
    built: ["Flutter app foundation", "Core UI flows", "Mobile release pipeline"],
    impact: "Turned product ideas into testable mobile experiences with fast iteration cycles.",
    skillsShown: ["Flutter", "Dart", "MVP Delivery"],
    link: "https://github.com/ArihantRawat/OffGrid",
  },
  {
    title: "To-Do-List-V1",
    repo: "ArihantRawat/To-Do-List-V1",
    description:
      "Task management app focused on useful UX, clear interactions, and execution fundamentals.",
    built: ["Task CRUD interactions", "Simple productivity UX", "Frontend state flow"],
    impact: "Improved day-to-day usability through focused, low-friction task workflows.",
    skillsShown: ["JavaScript", "Web Fundamentals", "UX Thinking"],
    link: "https://github.com/ArihantRawat/To-Do-List-V1",
  },
  {
    title: "Sarcasm-Detector",
    repo: "ArihantRawat/Sarcasm-Detector",
    description: "NLP experimentation for sarcasm classification and model behavior analysis.",
    built: ["Text processing pipeline", "Model experimentation", "Prediction workflow"],
    impact: "Explored model quality trade-offs and practical ML evaluation patterns.",
    skillsShown: ["Python", "NLP", "AI/ML"],
    link: "https://github.com/ArihantRawat/Sarcasm-Detector",
  },
  {
    title: "Image Captioning",
    repo: "ArihantRawat/Image-Captioning",
    description: "Computer vision experiments around generating natural-language captions from visual input.",
    built: ["Captioning pipeline", "Notebook-based experimentation", "Output quality evaluation"],
    impact: "Demonstrated practical CV prototyping and fast iteration in research-style projects.",
    skillsShown: ["Python", "Deep Learning", "Computer Vision"],
    link: "https://github.com/ArihantRawat/Image-Captioning",
  },
];

const skills = [
  "Product Strategy",
  "Roadmapping & Prioritization",
  "Cross-functional Leadership",
  "User Discovery & Interviews",
  "A/B Testing",
  "SQL + Analytics",
  "Java + TypeScript + Python",
  "REST API Design",
  "Flutter / React / React Native",
  "Predictive Analysis Product Thinking",
];

const marketPositioning = [
  "I connect product strategy with technical execution so teams move from idea to shipped outcomes faster.",
  "I present work in a Problem → Approach → Impact format that US recruiters and hiring managers can scan quickly.",
  "I balance startup speed with enterprise-quality decision making and cross-functional communication.",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-fuchsia-500/30">
      <header className="sticky top-0 z-30 border-b border-zinc-800/70 bg-zinc-950/90 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="#top" className="text-sm font-semibold tracking-[0.2em] text-zinc-300">
            AR
          </a>

          <div className="hidden items-center gap-4 text-sm md:flex">
            <a className="text-zinc-300 transition hover:text-white" href="#about">About</a>
            <a className="text-zinc-300 transition hover:text-white" href="#skills">Skills</a>
            <a className="text-zinc-300 transition hover:text-white" href="#experience">Experience</a>
            <a className="text-zinc-300 transition hover:text-white" href="#education">Education</a>
            <a className="text-zinc-300 transition hover:text-white" href="#projects">Projects</a>
            <a className="text-zinc-300 transition hover:text-white" href="#contact">Contact</a>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 p-1 text-sm md:flex">
            <a className="rounded-full bg-zinc-800 px-4 py-1.5 font-medium text-zinc-100" href="#top">
              Home
            </a>
            <Link className="rounded-full px-4 py-1.5 font-medium text-zinc-300 hover:text-white" href="/blog">
              Blog
            </Link>
          </div>

          <button
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 md:hidden"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </nav>

        {menuOpen ? (
          <div className="border-t border-zinc-800 bg-zinc-950 px-6 py-3 md:hidden">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                ["About", "#about"],
                ["Skills", "#skills"],
                ["Experience", "#experience"],
                ["Education", "#education"],
                ["Projects", "#projects"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  className="rounded-md border border-zinc-800 px-3 py-2 text-zinc-300"
                  href={href}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <Link
                className="rounded-md border border-zinc-800 px-3 py-2 text-zinc-300"
                href="/blog"
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      <main id="top" className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-14 md:py-20">
        <section className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-6 animate-fade-up">
            <p className="inline-flex rounded-full border border-fuchsia-400/40 bg-fuchsia-400/10 px-4 py-1 text-xs font-semibold tracking-[0.15em] text-fuchsia-200">
              TECHNICAL PRODUCT + ENGINEERING PROFILE
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              Arihant Rawat
              <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 bg-clip-text text-2xl text-transparent md:text-3xl">
                Building user-loved products with product judgment and hands-on technical execution.
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-zinc-300">
              Product-minded engineer with startup + enterprise experience, now at USC Marshall (MBA). I build and communicate
              products in a way that makes technical depth legible to business and hiring stakeholders.
            </p>
            <div className="flex flex-wrap gap-3">
              <a className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:scale-[1.03] hover:bg-zinc-200" href="#contact">
                Let’s Connect
              </a>
              <a className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:scale-[1.03] hover:border-zinc-500" href="/resume/arihant-rawat-pm.pdf" target="_blank" rel="noreferrer">
                Resume
              </a>
              <a className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:scale-[1.03] hover:border-zinc-500" href="https://github.com/ArihantRawat" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:scale-[1.03] hover:border-zinc-500" href="https://www.linkedin.com/in/arihantrawat" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4 shadow-2xl shadow-fuchsia-900/20 animate-float">
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
              <Image
                src="/images/arihant-headshot.jpg"
                alt="Arihant Rawat"
                width={720}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <p className="mt-3 text-center text-xs text-zinc-400">Los Angeles, CA • Open to Product + Technical roles</p>
          </div>
        </section>

        <section id="about" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">About Me</h2>
          <p className="max-w-4xl text-zinc-300">
            I’m a product-driven technologist pursuing my MBA at USC Marshall, with prior experience at Salesforce and Cult.fit.
            My edge is bridging user understanding, business priorities, and technical delivery.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {marketPositioning.map((point) => (
              <article key={point} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:-translate-y-1 hover:border-cyan-400/40">
                <p className="text-sm text-zinc-200">{point}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="space-y-5">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Core Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-200 transition hover:border-fuchsia-400/40"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="experience" className="space-y-6">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Experience</h2>
          <div className="relative space-y-5 border-l border-zinc-800 pl-6">
            <article className="relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <span className="absolute -left-[33px] top-7 h-3 w-3 rounded-full bg-cyan-300" />
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Oct 2023 – Jul 2025 • Bangalore, India</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Salesforce</h3>
              <p className="mt-1 text-sm text-zinc-300">Senior Product Developer / Senior Software Developer (MTS)</p>
              <p className="mt-3 text-zinc-300">
                Built enterprise APIs and UI workflows across Context Service and Data Cloud initiatives, partnering with
                design, operations, and product stakeholders across clouds.
              </p>
            </article>

            <article className="relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <span className="absolute -left-[33px] top-7 h-3 w-3 rounded-full bg-fuchsia-300" />
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Jul 2021 – Oct 2023 • Bangalore, India</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Cult.fit</h3>
              <p className="mt-1 text-sm text-zinc-300">Product Developer → Senior Product / Software Developer</p>
              <p className="mt-3 text-zinc-300">
                Led app-side delivery across multiple consumer products, collaborated on roadmap priorities, and shipped in
                fast startup cycles with strong cross-functional execution.
              </p>
            </article>
          </div>
        </section>

        <section id="education" className="space-y-6">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Education</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Los Angeles, CA • Expected May 2027</p>
              <h3 className="mt-2 text-lg font-semibold text-white">University of Southern California (USC) — Marshall School of Business</h3>
              <p className="mt-2 text-zinc-300">MBA (STEM)</p>
              <p className="mt-2 text-sm text-zinc-400">Dean’s Merit Scholarship (100%) • Prediger Endowed Scholarship • GMAT FE 705</p>
            </article>

            <article className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Delhi, India • May 2021</p>
              <h3 className="mt-2 text-lg font-semibold text-white">NSIT (now NSUT) — Netaji Subhas University of Technology</h3>
              <p className="mt-2 text-zinc-300">B.E. in Information Technology (Computer Science)</p>
              <p className="mt-2 text-sm text-zinc-400">First Class Distinction (CGPA 8.6/10.0)</p>
            </article>
          </div>
        </section>

        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Projects (Problem → Build → Impact)</h2>
            <a
              className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
              href="https://github.com/ArihantRawat"
              target="_blank"
              rel="noreferrer"
            >
              View profile →
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:-translate-y-1 hover:border-fuchsia-400/40"
              >
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-500">{project.repo}</p>
                <p className="mt-3 text-zinc-300">{project.description}</p>

                <div className="mt-4">
                  <p className="text-sm font-semibold text-zinc-200">What I built</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                    {project.built.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 text-sm text-zinc-300">
                  <span className="font-semibold text-zinc-100">Impact:</span> {project.impact}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.skillsShown.map((item) => (
                    <span key={item} className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                >
                  Open repository →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="blog" className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Featured Blog</h2>
            <Link className="text-sm font-semibold text-cyan-300 hover:text-cyan-200" href="/blog">
              Read post →
            </Link>
          </div>
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">March 2026 • 8 min read</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Operation Water — How Cinelytic Can Flow Into the Industry</h3>
            <p className="mt-3 text-zinc-300">
              A research-backed GTM and product strategy memo: launch a comps-first tier, make analytics controllable, and
              frame the product as predictive analysis (not AI replacement) to improve trust and adoption.
            </p>
          </article>
        </section>

        <section id="contact" className="space-y-4 pb-24 md:pb-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Let’s Build Something Great</h2>
          <p className="text-zinc-300">Open to Product Management, Technical PM, and Product-focused Engineering opportunities in the US.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <a className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 hover:border-zinc-700" href="mailto:arihantr@usc.edu">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Email</p>
              <p className="mt-1 text-sm font-medium text-zinc-100">arihantr@usc.edu</p>
            </a>
            <a
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 hover:border-zinc-700"
              href="https://www.linkedin.com/in/arihantrawat"
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">LinkedIn</p>
              <p className="mt-1 text-sm font-medium text-zinc-100">linkedin.com/in/arihantrawat</p>
            </a>
            <a className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 hover:border-zinc-700" href="tel:+12135636483">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Phone</p>
              <p className="mt-1 text-sm font-medium text-zinc-100">(213) 563-6483</p>
            </a>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800 bg-zinc-950/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex w-full max-w-6xl gap-2">
          <a
            className="flex-1 rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-zinc-900"
            href="/resume/arihant-rawat-pm.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Download Resume
          </a>
          <a className="rounded-full border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-100" href="mailto:arihantr@usc.edu">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
