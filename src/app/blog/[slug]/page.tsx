import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "../posts";
import { TrackPageEvent, TrackedAnchor } from "../../../components/analytics";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <main className="blog-shell">
      <TrackPageEvent eventName="blog_post_view" params={{ slug: post.slug, title: post.title }} />
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

            {post.sourceUrl ? (
              <section className="blog-section">
                <h3>Read the Original Post</h3>
                <TrackedAnchor
                  className="blog-source-link"
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  eventName="blog_source_click"
                  eventParams={{ slug: post.slug, title: post.title, href: post.sourceUrl }}
                >
                  {post.sourceUrl}
                </TrackedAnchor>
              </section>
            ) : null}
          </div>
        </article>
      </div>
    </main>
  );
}
