"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Lens = "pm" | "swe";

type Project = {
  title: string;
  summary: string;
  stack: string[];
  impact: string;
  href: string;
  status: "Shipped" | "In Progress";
};

const repoProjects: Project[] = [
  {
    title: "To-Do-List-V1",
    summary: "Task management web app for tracking and completing personal work.",
    stack: ["JavaScript", "Frontend"],
    impact: "Solid fundamentals project demonstrating practical UI logic and product utility.",
    href: "https://github.com/ArihantRawat/To-Do-List-V1",
    status: "Shipped",
  },
  {
    title: "Blog-Site",
    summary: "Blog-oriented web experience built with JavaScript and web fundamentals.",
    stack: ["JavaScript", "Web"],
    impact: "Shows content-first UX thinking and front-end implementation skills.",
    href: "https://github.com/ArihantRawat/Blog-Site",
    status: "Shipped",
  },
  {
    title: "Sarcasm-Detector",
    summary: "NLP experimentation project for sarcasm classification.",
    stack: ["Python", "NLP", "ML"],
    impact: "Highlights early AI/ML curiosity and experimentation mindset.",
    href: "https://github.com/ArihantRawat/Sarcasm-Detector",
    status: "Shipped",
  },
  {
    title: "AI Travel Planner (Case Study)",
    summary: "AI-powered itinerary generator based on destination and traveler preferences.",
    stack: ["AI", "Product Discovery", "Full-stack"],
    impact: "In progress — converting into a full product + GTM case study for PM recruiting.",
    href: "https://github.com/ArihantRawat",
    status: "In Progress",
  },
];

const lensContent = {
  pm: {
    headline: "Technical Product Manager who ships",
    about:
      "I enjoy turning ambiguous opportunities into clear product directions and practical execution plans. At Cult.fit, I helped launch and scale digital experiences across multiple consumer products. At Salesforce, I collaborated across engineering, product, design, and operations to deliver enterprise workflows and AI-enabled customer support improvements.",
    bullets: [
      "$4.1M generated in 9 months by launching new digital fitness products at Cult.fit.",
      "$90K incremental revenue in 3 months from freemium-to-paid monetization design.",
      "60% faster customer query resolution and +6 NPS via AI-driven support workflows.",
    ],
    resumeLabel: "Technical PM Resume",
  },
  swe: {
    headline: "Senior Full-Stack Engineer with product depth",
    about:
      "I like building reliable systems and interfaces that scale without losing simplicity. I have delivered Java REST APIs, enterprise UI workflows, and AI-backed automations at Salesforce, and led high-traffic mobile product development at Cult.fit across Flutter, React Native, and cloud integrations.",
    bullets: [
      "Built and optimized Java REST APIs and integration flows for enterprise-scale context services.",
      "Led React Native to Flutter migration, cutting app load times by 40%.",
      "Owned production stability and release quality for high-usage mobile products.",
    ],
    resumeLabel: "Senior SWE Resume",
  },
} as const;

const skillHighlights = [
  "Product Strategy & Roadmapping",
  "Cross-functional Leadership",
  "User Research & Prioritization",
  "A/B Testing & Analytics",
  "Java / TypeScript / Python",
  "REST APIs & System Design",
  "Flutter / React / React Native",
  "AI Product Prototyping",
];

export default function Home() {
  const [lens, setLens] = useState<Lens>("pm");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const active = lensContent[lens];

  useEffect(() => {
    setMounted(true);
  }, []);

  const shipped = useMemo(() => repoProjects.filter((p) => p.status === "Shipped"), []);
  const inProgress = useMemo(() => repoProjects.filter((p) => p.status === "In Progress"), []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-fuchsia-500/30">
      <header className="sticky top-0 z-30 border-b border-zinc-800/70 bg-zinc-950/90 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <span className="text-sm font-semibold tracking-[0.2em] text-zinc-300">AR</span>

          <div className="hidden items-center gap-4 text-sm md:flex">
            <a className="text-zinc-300 transition hover:text-white" href="#skills">Skills</a>
            <a className="text-zinc-300 transition hover:text-white" href="#experience">Experience</a>
            <a className="text-zinc-300 transition hover:text-white" href="#education">Education</a>
            <a className="text-zinc-300 transition hover:text-white" href="#projects">Projects</a>
            <a className="text-zinc-300 transition hover:text-white" href="#contact">Contact</a>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 p-1 text-sm md:flex">
            <a className="rounded-full px-4 py-1.5 font-medium text-zinc-100 bg-zinc-800" href="#top">
              Home
            </a>
            <Link className="rounded-full px-4 py-1.5 font-medium text-zinc-300 hover:text-white" href="/blog">
              Blog
            </Link>
          </div>

          <button
            className="md:hidden rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </nav>

        {menuOpen ? (
          <div className="border-t border-zinc-800 bg-zinc-950 px-6 py-3 md:hidden">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a className="rounded-md border border-zinc-800 px-3 py-2 text-zinc-300" href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
              <a className="rounded-md border border-zinc-800 px-3 py-2 text-zinc-300" href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
              <a className="rounded-md border border-zinc-800 px-3 py-2 text-zinc-300" href="#education" onClick={() => setMenuOpen(false)}>Education</a>
              <a className="rounded-md border border-zinc-800 px-3 py-2 text-zinc-300" href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
              <a className="rounded-md border border-zinc-800 px-3 py-2 text-zinc-300" href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
              <Link className="rounded-md border border-zinc-800 px-3 py-2 text-zinc-300" href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
            </div>
          </div>
        ) : null}
      </header>

      <main id="top" className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-14 md:py-20">
        <section className={`grid gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-center transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-fuchsia-400/40 bg-fuchsia-400/10 px-4 py-1 text-xs font-semibold tracking-[0.15em] text-fuchsia-200">
              TECHNICAL HYBRID • USC MBA • EX-SALESFORCE • EX-CULT.FIT
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              Arihant Rawat
              <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 bg-clip-text text-2xl text-transparent md:text-3xl">
                {active.headline}
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-zinc-300">
              Building user-centered products with business context, engineering rigor, and strong execution velocity.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setLens("pm")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  lens === "pm"
                    ? "bg-white text-zinc-900"
                    : "border border-zinc-700 text-zinc-200 hover:border-zinc-500"
                }`}
              >
                Product Lens
              </button>
              <button
                onClick={() => setLens("swe")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  lens === "swe"
                    ? "bg-white text-zinc-900"
                    : "border border-zinc-700 text-zinc-200 hover:border-zinc-500"
                }`}
              >
                Engineering Lens
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <a className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200" href="#resume">
                View Resume
              </a>
              <a className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500" href="mailto:arihantr@usc.edu">
                Email Me
              </a>
              <a className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500" href="https://www.linkedin.com/in/arihantrawat" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500" href="https://github.com/ArihantRawat" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4 shadow-2xl shadow-fuchsia-900/20">
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
              <Image src="/images/arihant-headshot.jpg" alt="Arihant Rawat" width={720} height={900} className="h-auto w-full object-cover transition duration-500 hover:scale-[1.02]" priority />
            </div>
            <p className="mt-3 text-center text-xs text-zinc-400">Los Angeles, CA • Open to PM + Technical Product roles</p>
          </div>
        </section>

        <section id="skills" className={`space-y-5 transition-all duration-700 delay-75 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Core Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skillHighlights.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-200 transition hover:border-fuchsia-400/40"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="about" className={`space-y-4 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">About Me</h2>
          <p className="max-w-4xl text-zinc-300">{active.about}</p>
          <p className="max-w-4xl text-zinc-300">
            Personally, I care deeply about building products that improve everyday decisions and routines — especially at the
            intersection of AI, wellness, and productivity.
          </p>
        </section>

        <section id="experience" className={`space-y-6 transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Experience</h2>
          <div className="relative space-y-5 border-l border-zinc-800 pl-6">
            <article className="relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <span className="absolute -left-[33px] top-7 h-3 w-3 rounded-full bg-cyan-300" />
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Oct 2023 – Jul 2025 • Bangalore, India</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Salesforce</h3>
              <p className="mt-1 text-sm text-zinc-300">Senior Product Developer / Senior Software Developer (MTS)</p>
              <p className="mt-3 text-zinc-300">
                Worked on Context Service and Data Cloud integrations, building APIs and UI workflows with cross-functional
                teams. Focused on reliable execution, internal adoption, and delivering clean user experiences in an enterprise setting.
              </p>
            </article>

            <article className="relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <span className="absolute -left-[33px] top-7 h-3 w-3 rounded-full bg-fuchsia-300" />
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Jul 2021 – Oct 2023 • Bangalore, India</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Cult.fit (Unicorn Startup)</h3>
              <p className="mt-1 text-sm text-zinc-300">Product Developer → Senior Product / Software Developer</p>
              <p className="mt-3 text-zinc-300">
                Led app-side delivery across multiple consumer products, helped shape roadmap priorities, and partnered closely
                with design, product, and engineering to launch features quickly in a startup environment.
              </p>
            </article>
          </div>
        </section>

        <section id="education" className={`space-y-6 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Education</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Los Angeles, CA • May 2027</p>
              <h3 className="mt-2 text-lg font-semibold text-white">University of Southern California, Marshall School of Business</h3>
              <p className="mt-2 text-zinc-300">MBA (STEM)</p>
              <p className="mt-2 text-sm text-zinc-400">Dean’s Merit Scholarship (100%), Prediger Endowed Scholarship, GMAT FE 705</p>
            </article>
            <article className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Delhi, India • May 2021</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Netaji Subhas Institute of Technology</h3>
              <p className="mt-2 text-zinc-300">B.E. in Information Technology (Computer Science)</p>
              <p className="mt-2 text-sm text-zinc-400">First Class Distinction (CGPA 8.6/10.0)</p>
            </article>
          </div>
        </section>

        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Featured Projects</h2>
            <a className="text-sm font-semibold text-cyan-300 hover:text-cyan-200" href="https://github.com/ArihantRawat" target="_blank" rel="noreferrer">
              View all on GitHub →
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {shipped.map((project) => (
              <article key={project.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:-translate-y-1 hover:border-fuchsia-400/40">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-300">{project.status}</p>
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-zinc-300">{project.summary}</p>
                <p className="mt-3 text-sm text-zinc-400">{project.impact}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
                <a href={project.href} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">
                  View project →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="working-on" className="space-y-6">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Things I’m Working On</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {inProgress.map((project) => (
              <article key={project.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:-translate-y-1 hover:border-amber-400/40">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-amber-300">{project.status}</p>
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-zinc-300">{project.summary}</p>
                <p className="mt-3 text-sm text-zinc-400">{project.impact}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="resume" className="space-y-6">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Resume</h2>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
            <h3 className="text-lg font-semibold text-white">{active.resumeLabel}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
              {active.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <a className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 hover:border-zinc-500" href="/resume/arihant-rawat-pm.pdf" target="_blank" rel="noreferrer">
                PM Resume PDF
              </a>
              <a className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 hover:border-zinc-500" href="/resume/arihant-rawat-swe.pdf" target="_blank" rel="noreferrer">
                SWE Resume PDF
              </a>
            </div>
          </div>
        </section>

        <section id="blog" className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Blog</h2>
            <Link className="text-sm font-semibold text-cyan-300 hover:text-cyan-200" href="/blog">
              Open blog tab →
            </Link>
          </div>
          <p className="text-zinc-300">I write short, practical posts on product strategy, AI experiments, and technical execution tradeoffs.</p>
        </section>

        <section id="contact" className="space-y-4 pb-24 md:pb-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Contact</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <a className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 hover:border-zinc-700" href="mailto:arihantr@usc.edu">
              <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Email</p>
              <p className="mt-1 text-sm font-medium text-zinc-100">arihantr@usc.edu</p>
            </a>
            <a className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 hover:border-zinc-700" href="https://www.linkedin.com/in/arihantrawat" target="_blank" rel="noreferrer">
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
          <a
            className="rounded-full border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-100"
            href="mailto:arihantr@usc.edu"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
