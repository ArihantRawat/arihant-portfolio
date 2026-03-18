export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  readTime: string;
  date: string;
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
      "How we reframed an AI-heavy analytics product into a user-trusted, workflow-friendly decision support tool.",
    readTime: "8 min read",
    date: "March 2026",
    content: [
      {
        heading: "Problem",
        paragraphs: [
          "Cinelytic had useful data outputs, but adoption was slower than expected. Teams said workflows felt unfamiliar and the AI-first framing created resistance, especially in creative functions.",
          "The real issue was not lack of analytics. It was trust, control, and fit with the way teams already worked.",
        ],
      },
      {
        heading: "What We Did",
        paragraphs: ["We ran a focused research sprint across industry stakeholders."],
        bullets: [
          "10 interviews across finance, forecasting, creative, and strategy",
          "Coverage across 12 companies",
          "Secondary research on forecasting and AI adoption behavior",
        ],
      },
      {
        heading: "Recommendation",
        paragraphs: [
          "We proposed a comps-first product strategy with lower friction entry, modular controls, and predictive-analysis positioning.",
          "The goal was simple: make the product feel familiar, controllable, and useful before trying to transform behavior.",
        ],
      },
    ],
  },
  {
    slug: "designing-for-user-trust-in-ai-products",
    title: "Designing for User Trust in AI Products",
    summary:
      "A practical framework for building AI features users trust: transparent inputs, controllable outputs, and clear decision boundaries.",
    readTime: "5 min read",
    date: "March 2026",
    content: [
      {
        heading: "Why Trust Breaks",
        paragraphs: [
          "Most AI products fail adoption not because models are weak, but because users cannot understand or control how decisions are made.",
        ],
      },
      {
        heading: "What Works",
        paragraphs: ["Trust improves when users can inspect assumptions and adjust parameters."],
        bullets: [
          "Show what inputs matter",
          "Provide what-if controls",
          "Position output as support, not replacement",
        ],
      },
    ],
  },
  {
    slug: "from-feature-requests-to-user-centric-roadmaps",
    title: "From Feature Requests to User-Centric Roadmaps",
    summary:
      "How to convert noisy requests into roadmaps that prioritize real user pain and measurable product outcomes.",
    readTime: "6 min read",
    date: "March 2026",
    content: [
      {
        heading: "The Common Mistake",
        paragraphs: [
          "Teams often prioritize the loudest request instead of the highest user impact problem.",
        ],
      },
      {
        heading: "A Better Process",
        paragraphs: ["I use a simple sequence to keep roadmaps user-centered."],
        bullets: [
          "Map requests to user jobs",
          "Quantify pain and frequency",
          "Prioritize outcomes before features",
        ],
      },
    ],
  },
];
