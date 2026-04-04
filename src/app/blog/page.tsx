"use client";

import Link from "next/link";
import { blogPosts } from "./posts";
import { trackEvent } from "../../lib/analytics";

export default function BlogPage() {
  return (
    <main className="blog-shell">
      <div className="container blog-space">
        <div className="blog-header">
          <Link className="blog-home" href="/" onClick={() => trackEvent("nav_click", { label: "Home", href: "/", menu: "blog" })}>
            ← Home
          </Link>
          <span className="blog-pill">Blog</span>
        </div>

        <div className="blog-title-wrap">
          <h1 className="section-title">Blog</h1>
          <p className="muted">Thoughts on building user-centric products and AI-enabled product experiences.</p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card small"
              onClick={() => trackEvent("blog_card_click", { slug: post.slug, title: post.title })}
            >
              <p className="muted">{post.date} • {post.readTime}</p>
              <h2>{post.title}</h2>
              <p className="blog-excerpt">{post.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
