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
      "A firsthand look at building Cult Transform—prioritizing personalization, expert guidance, and sustainable habits over quick fixes.",
    readTime: "5 min read",
    date: "March 2026",
    sourceUrl: "https://blog.cult.fit/posts/achieving-your-health-goals-with-cult-transform",
    content: [
      {
        heading: "Why We Built Cult Transform",
        paragraphs: [
          "As someone who worked on building Cult Transform, I got to see a side of fitness that most people don’t usually think about.",
          "Before this, I always believed fitness was just about eating right and working out regularly. But while working on this project, I realized the real challenge is not starting. It’s staying consistent.",
          "We spoke to a lot of people during the process, and one thing was clear. Most people already know what they should be doing. The problem is that typical fitness plans don’t fit into real life. They feel too strict, too overwhelming, or simply not sustainable.",
          "That’s exactly the problem we wanted to solve with Cult Transform.",
          "Instead of creating another rigid program, the idea was to build something that adapts to people, not the other way around. Something that focuses on small, practical changes that can actually become part of your daily routine.",
          "One of the key things we focused on was personalization. Everyone has a different lifestyle, different habits, and different challenges. So it didn’t make sense to give everyone the same plan. Cult Transform is designed to guide you based on where you are and help you move forward step by step.",
          "Another important part of the product is guidance. We made sure that users are not left guessing what to do next. The program connects you with experts who understand your journey and help you make better decisions along the way.",
          "When it came to nutrition, we were very clear about one thing. We did not want to create strict meal plans that people would eventually quit. Instead, the goal was to help users understand food better, so they can make smarter choices on their own. This makes the results more sustainable in the long run.",
          "We also wanted to shift the focus away from just weight loss. While that can be a goal, it is not the only measure of progress. Building healthy habits, improving energy levels, sleeping better, and feeling stronger are just as important.",
          "Another big decision we made was to avoid quick fixes completely. No crash diets, no extreme routines, and no shortcuts. Everything in Cult Transform is designed to be realistic and sustainable, because that’s what actually works.",
          "And something that mattered a lot to us while building this was creating a judgement-free experience. People should feel supported, not pressured. Progress looks different for everyone, and that’s completely okay.",
          "Working on Cult Transform changed the way I personally look at fitness. It’s no longer about doing everything perfectly. It’s about doing the right things consistently, in a way that fits your life.",
          "If you have ever struggled to stay on track or felt like nothing really works long term, this is exactly what we built Cult Transform for.",
          "Not just to help you start, but to help you keep going.",
          "For the original post, see here: https://blog.cult.fit/posts/achieving-your-health-goals-with-cult-transform",
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
        heading: "Why Performance Became the Priority",
        paragraphs: [
          "While working on the Cult app, one thing became very clear to us. User experience is everything.",
          "When your entire product lives on a screen, even small delays or glitches can completely break the experience. People don’t wait around. If something feels slow or unresponsive, they simply leave. (Cult.fit Blog)",
          "That’s exactly the challenge we were facing.",
        ],
      },
      {
        heading: "Where React Native Fell Short",
        paragraphs: [
          "For a long time, we were using React Native to power our mobile app. It helped us get started quickly and build a strong foundation. But as we grew and started focusing more on performance and design, we began to see some limitations.",
          "One of the biggest issues was how React Native handled communication between layers. There was a constant back and forth between the JavaScript side and the native side, which started becoming a bottleneck. Over time, this led to delays, especially on lower-end devices. Even simple interactions like switching tabs could feel slow. (Cult.fit Blog)",
          "At the same time, our design team was working on something new—a completely fresh design system called Aurora. It was more dynamic, more visual, and needed stronger performance support from the app.",
          "That’s when we started asking an important question. Can our current tech actually support the experience we want to build?",
        ],
      },
      {
        heading: "Exploring Flutter",
        paragraphs: [
          "This led us to explore Flutter.",
          "Flutter gave us a different way to think about building the app. Instead of relying heavily on bridges between layers, it allowed us to create smoother and more consistent experiences directly. This meant better performance, faster interactions, and more control over how things look and feel.",
          "But the decision was not instant. We spent a lot of time testing. We built prototypes, compared performance, and checked how things worked across devices. We had multiple discussions across teams, going back and forth before making the call.",
          "Eventually, it became clear. If we wanted to truly improve the user experience and support our new design system, moving to Flutter was the right step.",
        ],
      },
      {
        heading: "Making the Shift",
        paragraphs: [
          "So we made the shift.",
          "This was not just a tech change. It was a product decision—a decision to invest in speed, smoothness, and consistency for our users.",
          "With Flutter, we were able to bring our design ideas to life in a much better way. Animations felt smoother, interactions became faster, and the overall experience improved significantly.",
        ],
      },
      {
        heading: "What I Learned",
        paragraphs: [
          "Looking back, this transition taught me something important.",
          "Technology choices are not just about what works today. They are about what helps you build better experiences for the future.",
          "And for us, Flutter became that foundation.",
          "It helped us move closer to what we always wanted to build—an app that feels fast, smooth, and enjoyable to use, every single time.",
          "For the original post, see here: https://blog.cult.fit/posts/flutter?utm_source=chatgpt.com",
        ],
      },
    ],
  },
  {
    slug: "aurora-design",
    title: "Aurora Design: Building a Design System That Scales",
    summary:
      "How I approached design-system thinking to improve consistency, speed up product delivery, and reduce UI decision friction across teams.",
    readTime: "5 min read",
    date: "March 2026",
    sourceUrl: "https://blog.cult.fit/posts/aurora-design",
    content: [
      {
        heading: "What I worked on",
        paragraphs: [
          "For this initiative, I focused on making product UI decisions more reusable and less ad-hoc. The core idea was to create a consistent design language that helps teams ship faster without compromising user experience quality.",
          "I worked on bridging product needs with design structure—so common components, patterns, and interaction rules could be used confidently across multiple user journeys.",
        ],
      },
      {
        heading: "How I contributed",
        paragraphs: [
          "My role was to bring product clarity into the system effort: where standardization helps velocity, where flexibility is needed, and how teams can adopt patterns without slowing execution.",
        ],
        bullets: [
          "Defined reusable patterns for recurring user flows",
          "Helped align design consistency with real product priorities",
          "Reduced back-and-forth during implementation by improving shared UI vocabulary",
        ],
      },
      {
        heading: "Why this mattered",
        paragraphs: [
          "Beyond visual consistency, the biggest win was execution speed. A good design system reduces ambiguity, improves collaboration, and lets teams focus more on solving user problems than re-deciding basic UI structure every sprint.",
        ],
      },
    ],
  },
];