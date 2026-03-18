"use client";

import Link from "next/link";
import { useState } from "react";

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

const posts: BlogPost[] = [
  {
    slug: "operation-water-cinelytic",
    title: "Operation Water: How Cinelytic Can Fit Into the Industry",
    date: "March 2026",
    readTime: "8 min read",
    excerpt:
      "A research project on why a useful analytics product still faces adoption friction, and what to change in product strategy and positioning.",
    sections: [
      {
        heading: "Problem Statement",
        paragraphs: [
          "Cinelytic already produced useful comp data and forecasting output, but adoption was slower than expected in day-to-day team workflows.",
          "Across interviews, we heard similar concerns: workflows felt unfamiliar, controls felt limited, and AI-heavy messaging made creative teams uneasy.",
        ],
      },
      {
        heading: "What We Did",
        paragraphs: ["We ran a focused research sprint with both interviews and secondary research."],
        bullets: [
          "10 semi-structured interviews across finance, forecasting, creative, content, and talent functions",
          "Coverage across 12 companies with studio and streaming backgrounds",
          "Secondary review of forecasting research, user ownership behavior, and AI adoption in media",
        ],
      },
      {
        heading: "What We Found",
        paragraphs: ["The product challenge was not data quality alone. It was trust, control, and workflow fit."],
        bullets: [
          "Comps are trusted and already central to budgeting and greenlight discussions",
          "Many teams still rely on manual SAP and Excel workflows",
          "Users want control over assumptions and sensitivity analysis before trusting outputs",
          "Creative teams respond better to decision-support framing than AI-replacement framing",
        ],
      },
      {
        heading: "Recommendation",
        paragraphs: [
          "We proposed a comps-first entry strategy called Operation Water. Enter through familiar workflows, then expand as trust grows.",
        ],
        bullets: [
          "Launch a lower-priced comps tier for faster adoption",
          "Add modular controls and sensitivity tools to increase ownership",
          "Position as predictive analysis and decision support",
        ],
      },
    ],
  },
];

export default function BlogPage() {
  const [activeSlug, setActiveSlug] = useState<string | null>(posts[0]?.slug ?? null);

  return (
    <main className="blog-shell">
      <div className="container blog-space">
        <div className="blog-header">
          <Link className="blog-home" href="/">
            ← Home
          </Link>
          <span className="blog-pill">Blog</span>
        </div>

        <div className="blog-title-wrap">
          <h1 className="section-title">Blog</h1>
          <p className="muted">Right now there is one post. More will be added as cards here.</p>
        </div>

        <div className="blog-grid">
          {posts.map((post) => {
            const expanded = activeSlug === post.slug;
            return (
              <article key={post.slug} className={`blog-card ${expanded ? "open" : ""}`}>
                <button
                  type="button"
                  className="blog-card-head"
                  onClick={() => setActiveSlug((prev) => (prev === post.slug ? null : post.slug))}
                  aria-expanded={expanded}
                >
                  <div>
                    <p className="muted">{post.date} • {post.readTime}</p>
                    <h2>{post.title}</h2>
                  </div>
                  <span className="blog-toggle">{expanded ? "−" : "+"}</span>
                </button>

                <p className="blog-excerpt">{post.excerpt}</p>

                <div className={`blog-content ${expanded ? "show" : ""}`}>
                  {post.sections.map((section) => (
                    <section key={section.heading} className="blog-section">
                      <h3>{section.heading}</h3>
                      {section.paragraphs.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                      {section.bullets ? (
                        <ul>
                          {section.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
