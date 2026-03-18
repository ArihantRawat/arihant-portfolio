import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <Link className="text-sm font-semibold text-cyan-300 hover:text-cyan-200" href="/">
            ← Home
          </Link>
          <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-1.5 text-sm font-medium text-zinc-200">Blog</span>
        </div>

        <article className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-7">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">March 2026 • 8 min read</p>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Operation Water: How Cinelytic Can Fit Into the Industry
            </h1>
            <p className="text-zinc-300">
              This project started with one simple question: if the data is useful, why are teams still hesitant to use the
              product every day?
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">Problem Statement</h2>
            <p className="text-zinc-300">
              Cinelytic already produces strong comp data and forecasting outputs. But adoption was slower than expected,
              especially in creative teams. In interviews, we kept hearing the same concerns: workflows felt unfamiliar,
              controls felt limited, and AI-heavy messaging made people feel like judgment was being replaced.
            </p>
            <p className="text-zinc-300">
              So the core problem was not a lack of analytics. The real problem was trust, control, and fit with existing
              studio workflows.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">What We Did</h2>
            <p className="text-zinc-300">
              We ran a focused research sprint and combined qualitative interviews with secondary research.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-zinc-300">
              <li>10 semi-structured interviews across finance, forecasting, creative, content, and talent functions.</li>
              <li>Coverage across 12 companies, including leaders from studios and streaming backgrounds.</li>
              <li>Secondary review of forecasting literature, user ownership behavior, and AI adoption patterns in media.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">What We Found</h2>
            <ul className="list-disc space-y-2 pl-5 text-zinc-300">
              <li>Comps are already trusted and widely used for budgeting and greenlight discussions.</li>
              <li>Many teams still rely on manual workflows in SAP and Excel, which is slow and repetitive.</li>
              <li>Users want control over assumptions, filters, and what-if analysis before trusting outputs.</li>
              <li>Creative teams respond better to practical decision support language than AI-first language.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">Our Recommendation</h2>
            <p className="text-zinc-300">
              We proposed a comps-first entry strategy called <strong>Operation Water</strong>. The idea was to enter through
              familiar use cases, then expand over time as trust grows.
            </p>
            <ol className="list-decimal space-y-2 pl-5 text-zinc-300">
              <li>
                Launch a lower-priced comps tier so finance and forecasting teams can adopt quickly without a full platform
                commitment.
              </li>
              <li>
                Add modular controls and sensitivity tools so users can shape assumptions and feel ownership of the model.
              </li>
              <li>
                Reframe messaging from AI replacement to predictive analysis and decision support.
              </li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">Why This Matters</h2>
            <p className="text-zinc-300">
              In entertainment, adoption happens when tools fit the culture of decision making. This approach makes the product
              familiar first, useful fast, and trustworthy over time.
            </p>
            <p className="text-zinc-300">
              For me, this project reinforced a product lesson I care about deeply: strong models are not enough. The product
              has to respect how real people work.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
