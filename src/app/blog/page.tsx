import Link from "next/link";

const posts = [
  {
    slug: "turning-engineering-work-into-product-signal",
    title: "Turning Engineering Work Into Product Signal",
    excerpt:
      "How I translate architecture and API decisions into user and business outcomes that recruiters and stakeholders can quickly understand.",
    date: "March 2026",
    readTime: "4 min",
  },
  {
    slug: "startup-vs-enterprise-shipping",
    title: "Startup vs Enterprise: How My Shipping Style Changes",
    excerpt:
      "A practical comparison of speed, quality bars, and decision-making at Cult.fit and Salesforce.",
    date: "March 2026",
    readTime: "5 min",
  },
  {
    slug: "building-ai-with-user-trust",
    title: "Building AI Features Without Losing User Trust",
    excerpt:
      "Notes from health and enterprise contexts on privacy, explainability, and responsible rollout.",
    date: "March 2026",
    readTime: "6 min",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <Link className="text-sm font-semibold text-cyan-300 hover:text-cyan-200" href="/">
            ← Home
          </Link>
          <div className="rounded-full border border-zinc-700 bg-zinc-900 p-1 text-sm">
            <Link className="rounded-full px-4 py-1.5 font-medium text-zinc-300 hover:text-white" href="/">
              Home
            </Link>
            <span className="rounded-full bg-zinc-800 px-4 py-1.5 font-medium text-zinc-100">Blog</span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-white">Blog & Insights</h1>
          <p className="max-w-2xl text-zinc-300">
            Quick, practical writing on product execution, technical tradeoffs, and lessons from startup + enterprise builds.
          </p>
        </div>

        <div className="grid gap-5">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:-translate-y-1 hover:border-fuchsia-400/40">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-zinc-400">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-white">{post.title}</h2>
              <p className="mt-2 text-zinc-300">{post.excerpt}</p>
              <p className="mt-4 text-sm text-zinc-500">Draft mode — I can convert this to full MDX posts next.</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
