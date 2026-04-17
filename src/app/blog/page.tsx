import { blogPosts } from "./posts";
import { TrackedLink } from "../../components/analytics";

export default function BlogPage() {
  return (
    <main className="blog-shell">
      <div className="container blog-space">
        <div className="blog-header">
          <TrackedLink
            className="blog-home"
            href="/"
            eventName="nav_click"
            eventParams={{ label: "Home", href: "/", menu: "blog" }}
          >
            ← Home
          </TrackedLink>
          <span className="blog-pill">Blog</span>
        </div>

        <div className="blog-title-wrap">
          <h1 className="section-title">Blog</h1>
          <p className="muted">Thoughts on building user-centric products and AI-enabled product experiences.</p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <TrackedLink
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card small"
              eventName="blog_card_click"
              eventParams={{ slug: post.slug, title: post.title }}
            >
              <p className="muted">
                {post.date} • {post.readTime}
              </p>
              <h2>{post.title}</h2>
              <p className="blog-excerpt">{post.summary}</p>
            </TrackedLink>
          ))}
        </div>
      </div>
    </main>
  );
}
