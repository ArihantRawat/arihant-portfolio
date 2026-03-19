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
      "A project where I worked on reframing Cinelytic from an AI-heavy pitch into a practical decision-support workflow people could actually trust and use.",
    readTime: "9 min read",
    date: "March 2026",
    content: [
      {
        heading: "What I worked on",
        paragraphs: [
          "In this project, my role was to help close the gap between a technically strong platform and real day-to-day product usage. Teams liked the concept, but adoption stalled because outputs felt hard to trust and hard to plug into existing decision meetings.",
          "I focused on turning that feedback into product direction: less black-box presentation, more controllable workflows, and clearer framing for cross-functional stakeholders.",
        ],
      },
      {
        heading: "How I approached it",
        paragraphs: [
          "I drove a research-heavy sprint with users across strategy, finance, and creative functions, then mapped their decision patterns against how the product currently behaved.",
          "From there, I translated findings into concrete UX and product principles—especially around assumptions visibility, what-if controls, and confidence-building interaction design.",
        ],
        bullets: [
          "Interviewed stakeholders across multiple teams and company contexts",
          "Identified trust, control, and workflow-friction as the core blockers",
          "Proposed a comps-first and scenario-first product flow",
        ],
      },
      {
        heading: "What changed",
        paragraphs: [
          "The final recommendation was to position Cinelytic as predictive decision support, not 'AI deciding for you'. That shift made the product feel more collaborative and easier to defend in internal conversations.",
          "This work was a good example of how I like to build: start with user behavior, clarify the product narrative, and ship toward confidence and adoption—not just feature depth.",
        ],
      },
    ],
  },
  {
    slug: "achieving-your-health-goals-with-cult-transform",
    title: "Achieving Your Health Goals with Cult Transform",
    summary:
      "How I contributed to shaping user-facing transformation journeys around accountability, personalization, and long-term habit consistency.",
    readTime: "5 min read",
    date: "March 2026",
    sourceUrl: "https://blog.cult.fit/posts/achieving-your-health-goals-with-cult-transform",
    content: [
      {
        heading: "What I did",
        paragraphs: [
          "On this side of the Cult.fit experience, I worked on making transformation programs feel structured but realistic for users with messy schedules. The key was reducing friction in how users understand their plan and stay accountable week to week.",
          "I focused on product flows that connect goal setting, coaching touchpoints, and progress reflection into one continuous user journey rather than disconnected features.",
        ],
      },
      {
        heading: "Where I added product value",
        paragraphs: [
          "A lot of my contribution was in translating broad health goals into concrete app behavior: what the user should see first, where they might drop off, and how to re-engage them without overwhelming them.",
        ],
        bullets: [
          "Worked on clearer progression and milestone visibility",
          "Helped align coaching/accountability touchpoints with in-app moments",
          "Pushed for consistency-first behavior over extreme short-term tactics",
        ],
      },
      {
        heading: "What I learned",
        paragraphs: [
          "Fitness product outcomes are often won in tiny daily decisions, not one big feature. This project reinforced my approach of building systems that help users stay consistent, especially after their initial motivation drops.",
        ],
      },
    ],
  },
  {
    slug: "flutter",
    title: "Flutter: Building Cross-Platform Experiences Faster",
    summary:
      "My perspective on using Flutter to move faster on product experiments while keeping a consistent and polished experience across platforms.",
    readTime: "4 min read",
    date: "March 2026",
    sourceUrl: "https://blog.cult.fit/posts/flutter",
    content: [
      {
        heading: "What I did with Flutter",
        paragraphs: [
          "I used Flutter in product environments where speed-to-iteration mattered. My focus was on shipping improvements quickly, testing user response early, and avoiding platform drift in core journeys.",
          "Instead of treating it as only an engineering choice, I approached it as a product acceleration tool—faster idea validation, tighter design-feedback loops, and fewer handoff delays.",
        ],
      },
      {
        heading: "How it helped product execution",
        paragraphs: [
          "The biggest gain for me was execution clarity: one codebase made prioritization easier and reduced context switching when we were moving quickly across experiments.",
        ],
        bullets: [
          "Shipped and iterated features faster across iOS/Android",
          "Maintained UI consistency while still moving quickly",
          "Improved collaboration across product, design, and engineering",
        ],
      },
      {
        heading: "My takeaway",
        paragraphs: [
          "Flutter worked best when we used it to learn faster from users, not just to save engineering effort. The real win was cycle time—turning ideas into usable product behavior quickly and confidently.",
        ],
      },
    ],
  },
];