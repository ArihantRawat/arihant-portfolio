import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "../posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <main className="blog-shell">
      <div className="container blog-space">
        <div className="blog-header">
          <Link className="blog-home" href="/blog">
            ← All Blogs
          </Link>
          <span className="blog-pill">{post.readTime}</span>
        </div>

        <article className="blog-card open full">
          <p className="muted">{post.date}</p>
          <h1 className="section-title" style={{ marginTop: "0.35rem" }}>{post.title}</h1>
          <p className="blog-excerpt">{post.summary}</p>

          <div className="blog-content show">
            {post.content.map((section) => (
              <section key={section.heading} className="blog-section">
                <h3>{section.heading}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
