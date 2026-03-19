export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  readTime: string;
  date: string;
  sourceUrl?: string;
  content: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "operation-water-cinelytic",
    title: "Operation Water: How Cinelytic Can Fit Into the Industry",
    summary:
      "How we reframed an AI-heavy analytics product into a workflow-first decision-support experience that creative and business teams can trust.",
    readTime: "9 min read",
    date: "March 2026",
    content: [
      {
        heading: "Context",
        paragraphs: [
          "Cinelytic had strong analytical depth and compelling model outputs, but broad adoption remained lower than expected. Product teams were seeing curiosity during demos, followed by hesitation in day-to-day use.",
          "The hesitation was not about whether forecasting mattered. It was about how the product fit inside existing workflows where financial logic, creative judgment, and stakeholder alignment all happen together.",
        ],
      },
      {
        heading: "Core Problem We Identified",
        paragraphs: [
          "The product often felt 'AI-first' in presentation, while users needed 'decision-first' experiences. Teams wanted guidance they could interrogate, tune, and defend in internal meetings.",
          "Without visible assumptions and easy scenario control, users interpreted outputs as a black box. That reduced confidence, even when the numbers were directionally useful.",
        ],
        bullets: [
          "Trust gap: recommendations felt opaque",
          "Control gap: teams could not quickly tune assumptions",
          "Workflow gap: insights were not packaged for planning rituals",
        ],
      },
      {
        heading: "Research and Validation",
        paragraphs: [
          "We ran a focused discovery sprint across key personas to map where confidence dropped and what artifacts were actually needed to move decisions forward.",
        ],
        bullets: [
          "10 stakeholder interviews across finance, strategy, and creative roles",
          "Signals gathered from 12 companies and adjacent forecasting workflows",
          "Secondary analysis on AI adoption behavior in high-judgment teams",
        ],
      },
      {
        heading: "Product Direction",
        paragraphs: [
          "We recommended repositioning Cinelytic as a predictive decision-support platform, not an AI replacement layer. The entry point should feel familiar (comps-style and scenario workflows), while still exposing the predictive depth underneath.",
          "The strategy focused on progressive confidence: let users start with known references, then layer advanced predictive scenarios when they are ready.",
        ],
        bullets: [
          "Comps-first onboarding to lower initial friction",
          "Modular controls for assumptions and what-if simulations",
          "Clear model rationale and comparison views for stakeholder alignment",
        ],
      },
      {
        heading: "Expected Outcome",
        paragraphs: [
          "This direction improves activation and repeat usage by aligning with how teams already make calls under uncertainty. It also supports better cross-functional conversations, because outputs become easier to explain and debate.",
          "The goal was not to make AI louder. It was to make decisions faster, clearer, and more collaborative.",
        ],
      },
    ],
  },
  {
    slug: "achieving-your-health-goals-with-cult-transform",
    title: "Achieving Your Health Goals with Cult Transform",
    summary:
      "A structured, coach-supported transformation journey that blends personalized nutrition, training consistency, and accountability for sustainable results.",
    readTime: "5 min read",
    date: "March 2026",
    sourceUrl: "https://blog.cult.fit/posts/achieving-your-health-goals-with-cult-transform",
    content: [
      {
        heading: "What the Program Emphasizes",
        paragraphs: [
          "Cult Transform positions fitness as a guided lifestyle shift, not a short-term challenge. The approach combines coaching, personalized plans, and progress checkpoints so people can build routines that hold up beyond the initial motivation window.",
          "The article highlights that visible changes come from consistency across food, movement, sleep, and recovery—not one extreme intervention.",
        ],
      },
      {
        heading: "Why It Works",
        paragraphs: [
          "The value proposition is clarity plus accountability: users know what to do each week, why it matters, and how to course-correct when life gets messy.",
        ],
        bullets: [
          "Personalized guidance based on goals and baseline",
          "Regular monitoring and feedback loops",
          "Sustainable behavior focus over crash tactics",
        ],
      },
      {
        heading: "Takeaway",
        paragraphs: [
          "For anyone trying to hit health goals, the message is simple: systems beat willpower. A guided framework can reduce decision fatigue and improve follow-through over time.",
        ],
      },
    ],
  },
  {
    slug: "flutter",
    title: "Flutter: Building Cross-Platform Experiences Faster",
    summary:
      "A practical look at Flutter’s value for product teams: one codebase, rapid UI iteration, and consistent app quality across platforms.",
    readTime: "4 min read",
    date: "March 2026",
    sourceUrl: "https://blog.cult.fit/posts/flutter",
    content: [
      {
        heading: "What Flutter Enables",
        paragraphs: [
          "The post frames Flutter as a speed and consistency layer for teams shipping to multiple platforms. Instead of splitting efforts early, teams can move faster with a unified development experience while preserving polished UI behavior.",
          "This shortens feedback cycles between product, design, and engineering—especially useful when experimenting with flows and refining UX details.",
        ],
      },
      {
        heading: "Product Impact",
        paragraphs: [
          "For product organizations, the real win is iteration velocity. Teams can validate ideas quickly, maintain design consistency, and reduce duplicated effort.",
        ],
        bullets: [
          "Faster prototypes and feature rollouts",
          "Shared UI language across iOS and Android",
          "Lower coordination overhead for multi-platform delivery",
        ],
      },
      {
        heading: "Takeaway",
        paragraphs: [
          "Flutter is most useful when teams prioritize speed-to-learning and cohesive user experience across devices. It helps convert product ideas into testable reality with less fragmentation.",
        ],
      },
    ],
  },
];