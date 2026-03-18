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
              Operation Water — How Cinelytic Can Flow Into the Industry
            </h1>
            <p className="text-zinc-300">
              <strong>TL;DR:</strong> Operation Water recommends a Persistent Flow Strategy for Cinelytic: enter the
              entertainment market through a familiar, lower-priced comps product, give users modular control so the tool
              feels like theirs, and reposition messaging away from “AI” toward “predictive analysis.” Our research (10
              interviews across 12 companies + academic/industry literature) shows studios want efficient, controllable
              comps and sensitivity tools — not an algorithm that replaces human judgment.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">The Problem</h2>
            <p className="text-zinc-300">
              Studios and creatives are skeptical of AI-driven decision-making. Even when teams use data, “AI” triggers
              resistance — creatives worry it threatens their craft, while finance teams need trustworthy, customizable
              workflows. Cinelytic already produces useful comp data and forecasts, but adoption stalls because the product
              feels unfamiliar, too black-box, or too AI-forward.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">The Strategy: Be Like Water</h2>
            <p className="text-zinc-300">
              Borrowing from Laozi and Bruce Lee, Operation Water proposes flowing into existing workflows instead of forcing
              a revolution. The goal is to penetrate the industry via what people already value — comp analysis — then expand
              trust and usage from the bottom up.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">How We Worked</h2>
            <ul className="list-disc space-y-2 pl-5 text-zinc-300">
              <li>
                <strong>Primary research:</strong> 10 semi-structured interviews with professionals across finance,
                forecasting, content strategy, creative, and talent.
              </li>
              <li>
                <strong>Secondary research:</strong> Academic and industry studies on forecasting accuracy, user ownership
                of digital tools, and AI adoption in media.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">Key Findings</h2>
            <ul className="list-disc space-y-2 pl-5 text-zinc-300">
              <li>Comps are familiar and valuable for budgeting, forecasting, and greenlight support.</li>
              <li>Manual SAP/Excel workflows still dominate in many teams, creating an efficiency gap.</li>
              <li>Comps are being commoditized through general tools, but outputs still need verification.</li>
              <li>Control builds trust: users want custom filters, momentum inputs, and sensitivity analysis.</li>
              <li>AI-forward messaging is a liability in creative departments.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">Three High-Impact Recommendations</h2>
            <ol className="list-decimal space-y-3 pl-5 text-zinc-300">
              <li>
                <strong>Launch a lower-priced comps tier:</strong> A standalone product that attracts finance/forecasting
                users and acts as a gateway to the full platform.
              </li>
              <li>
                <strong>Make the model feel like the users’ model:</strong> Add modular controls, what-if knobs,
                sensitivity analysis, and highly portable exports.
              </li>
              <li>
                <strong>Reposition messaging:</strong> Lead with “predictive analysis” and decision support, not AI
                replacement.
              </li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">Target Personas</h2>
            <ul className="list-disc space-y-2 pl-5 text-zinc-300">
              <li>
                <strong>Kathleen — VP of Finance (Power User):</strong> Wants defensible comps, customizable inputs, and
                portable data for internal models.
              </li>
              <li>
                <strong>Walt — Producer/Creative:</strong> Uses data for benchmarking but needs transparent,
                non-threatening framing.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">Bottom Line</h2>
            <p className="text-zinc-300">
              Start small, be flexible, and speak the industry’s language. Release a comps-first, user-controllable product
              at a lower price to win finance teams. Give users ownership through adjustable analytics so the tool becomes
              theirs. And swap “AI” for “predictive analysis” so creatives stop fighting the tool and start using the data.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
