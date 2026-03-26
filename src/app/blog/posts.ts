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
      "Helping Cinelytic grow adoption by building trust, starting with familiar workflows, and positioning data as a partner not a replacement.",
    readTime: "9 min read",
    date: "March 2026",
    content: [
      {
        heading: "Seeing adoption up close",
        paragraphs: [
          "As part of my college consulting project, I had the opportunity to work closely with Cinelytic (https://www.cinelytic.com), a platform that helps entertainment companies make better decisions using data.",
          "This project gave me a chance to look at the industry from a completely different perspective. Instead of just thinking about technology, we had to understand how real people in studios make decisions, what challenges they face, and why certain tools are or are not adopted.",
          "What made it even more interesting was this. The problem was not that the entertainment industry lacks data. The real problem is how that data is used, and more importantly, whether people trust it.",
          "We started with a simple question. How can a product like Cinelytic actually see wider adoption and build long term trust in an industry that is still very human at its core?",
          "To answer this, we spoke to people across the industry. From finance teams to creative leaders, from large studios to smaller companies. And something interesting kept coming up again and again.",
          "Everyone uses data. But not everyone trusts tools that feel like they are trying to replace human decisions.",
          "That insight shaped everything we worked on.",
          "We called our approach the \"be like water\" strategy. Instead of trying to force change, the idea was to slowly fit into existing workflows and build trust over time. Not breaking the system, but adapting to it and improving it from within.",
        ],
      },
      {
        heading: "Start where teams already work",
        paragraphs: [
          "From there, we focused on three key things. The first was making it easier for people to start using the product.",
          "We found that a lot of teams still do comp analysis manually. They use Excel, internal tools, and sometimes even tools like ChatGPT to piece things together. It is slow, inconsistent, and not always reliable.",
          "So instead of pushing a complex product from the start, the idea was simple. Start with something familiar.",
          "We focused on comp analysis as an entry point. A lower barrier, easier to adopt, and something that already fits into how teams work today. The goal was to help users get value quickly, and then grow from there.",
        ],
      },
      {
        heading: "Give people control",
        paragraphs: [
          "The second thing we focused on was control.",
          "One major gap we noticed was that most tools feel like a black box. You put something in and get an output, but you do not really know how it got there.",
          "That does not work well in industries where decisions matter a lot.",
          "So we pushed for a more flexible system. Something where users can adjust inputs, test scenarios, and actually feel like they are part of the process. Because when people feel ownership, they trust the product more.",
          "In fact, every person we spoke to wanted more customization in how they run their analysis.",
        ],
      },
      {
        heading: "Position it as a partner",
        paragraphs: [
          "The third and probably most important shift was around positioning.",
          "We realized the resistance was not really about data. It was about the word AI.",
          "Creative professionals are open to using data. They already do. But they do not want a tool that feels like it is replacing their judgment.",
          "So instead of leading with AI, the idea was to present Cinelytic as a predictive analysis tool. Something that supports decisions, not replaces them.",
          "That small change in framing makes a big difference. It makes the product feel like a partner, not a threat.",
        ],
      },
      {
        heading: "What it taught me",
        paragraphs: [
          "When you put all of this together, the bigger picture becomes clear. This was not just about building recommendations for a product. It was about understanding how adoption actually works in a real industry.",
          "If you look at how decisions are made today, it is still a mix of human instinct and manual data work. What Cinelytic does is bring structure, speed, and consistency into that process without taking away the human element. And that is what makes it powerful.",
          "Working on this project changed how I think about product building. It is not just about what your product can do. It is about how people feel when they use it. Whether they trust it. Whether it fits into their world.",
          "And sometimes, the best way to create change is not to push harder. It is to flow around the problem, find the gaps, and grow from there. Just like water.",
        ],
      },
    ],
  },
  {
    slug: "achieving-your-health-goals-with-cult-transform",
    title: "Achieving Your Health Goals with Cult Transform",
    summary:
      "A firsthand look at building Cult Transform that prioritizes personalization, expert guidance, and sustainable habits over quick fixes.",
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
          "When your entire product lives on a screen, even small delays or glitches can completely break the experience. People don’t wait around. If something feels slow or unresponsive, they simply leave.",
          "That’s exactly the challenge we were facing.",
        ],
      },
      {
        heading: "Where React Native Fell Short",
        paragraphs: [
          "For a long time, we were using React Native to power our mobile app. It helped us get started quickly and build a strong foundation. But as we grew and started focusing more on performance and design, we began to see some limitations.",
          "One of the biggest issues was how React Native handled communication between layers. There was a constant back and forth between the JavaScript side and the native side, which started becoming a bottleneck. Over time, this led to delays, especially on lower-end devices. Even simple interactions like switching tabs could feel slow.",
          "At the same time, our design team was working on something new: a completely fresh design system called Aurora. It was more dynamic, more visual, and needed stronger performance support from the app.",
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
          "This was not just a tech change. It was a product decision, a choice to invest in speed, smoothness, and consistency for our users.",
          "With Flutter, we were able to bring our design ideas to life in a much better way. Animations felt smoother, interactions became faster, and the overall experience improved significantly.",
        ],
      },
      {
        heading: "What I Learned",
        paragraphs: [
          "Looking back, this transition taught me something important.",
          "Technology choices are not just about what works today. They are about what helps you build better experiences for the future.",
          "And for us, Flutter became that foundation.",
          "It helped us move closer to what we always wanted to build: an app that feels fast, smooth, and enjoyable to use, every single time.",
        ],
      },
    ],
  },
  {
    slug: "aurora-design",
    title: "Aurora Design: Building a Design System That Scales",
    summary:
      "How we built Aurora to unify Cult's experience across products by anchoring on motion, modularity, and a design system that scales.",
    readTime: "5 min read",
    date: "March 2026",
    sourceUrl: "https://blog.cult.fit/posts/aurora-design",
    content: [
      {
        heading: "Why Aurora Had to Exist",
        paragraphs: [
          "While working on the Cult app, one thing we kept running into again and again was this problem. As the product kept growing, the experience started becoming inconsistent.",
          "Cult was no longer just about workouts. It had expanded into so many areas like mental wellness, nutrition, and more. Each of these had different user journeys, different needs, and often, slightly different designs. Over time, we realized we were solving the same design problems again and again, but in different ways across teams.",
          "This led to something we could not ignore anymore. The experience started feeling disconnected.",
          "That’s when we knew we needed a stronger foundation. Not just small design fixes, but a complete rethink of how we design products at scale.",
          "That is how Aurora started.",
        ],
      },
      {
        heading: "Defining the Language",
        paragraphs: [
          "Aurora is the design language we built for Cult. But it’s more than just how things look. It’s a system that helps us create consistent, scalable, and better user experiences across all our products.",
          "When we started working on Aurora, we didn’t jump straight into designing screens. We explored a lot first. We looked at some of the best global fitness apps, studied patterns, tested different styles, and gathered feedback continuously.",
          "One interesting thing we noticed was that users naturally connected with darker, more immersive interfaces. That aligned well with our brand, so we leaned into it and kept refining from there.",
          "Eventually, we arrived at a style that felt right.",
          "Aurora is inspired by the northern lights. It uses a dynamic background that feels alive and active, instead of static and flat. This helped us reduce visual monotony and make the experience feel more energetic and engaging.",
          "But we were careful with it. Too much movement can be distracting. So we spent a lot of time fine tuning motion to make sure it adds to the experience, not takes away from it.",
          "Another important decision we made was around surfaces and layouts. Instead of heavy, solid blocks, we introduced softer, glass-like elements. This made the interface feel lighter and more open, while still keeping everything readable and structured.",
          "We also started thinking of motion in a different way. Not just as something that looks good, but something that helps users understand what’s happening. Smooth transitions, subtle animations, and clear feedback became an important part of the experience.",
        ],
      },
      {
        heading: "Turning It into a System",
        paragraphs: [
          "But designing a visual language was only half the job.",
          "The real challenge was scaling it.",
          "We had multiple products, multiple teams, and a lot of existing screens. So we needed a way to make Aurora easy to use and consistent everywhere.",
          "That’s where the design system came in.",
          "We built Aurora as a full design system. A shared library of components, patterns, and guidelines that both designers and developers could use. This made it easier to build new features faster and keep everything consistent.",
          "We followed a modular approach, breaking everything down into smaller reusable parts, from basic elements like colors and typography to components and full pages. This helped us scale across the entire product without starting from scratch every time.",
          "Interestingly, this also influenced our tech decisions. Some of the visual ideas we had, like dynamic backgrounds and blur effects, were not easy to implement with our existing setup. That pushed us to explore better technologies that could support what we wanted to build.",
        ],
      },
      {
        heading: "What Aurora Changed",
        paragraphs: [
          "Looking back, Aurora was not just a design project. It became a bridge between design and engineering.",
          "It helped us move from isolated decisions to a more unified way of building products. It reduced inconsistencies, improved speed, and allowed us to focus more on solving real user problems instead of redesigning the same things repeatedly.",
          "And personally, working on Aurora changed how I think about design.",
          "It’s not just about making things look good. It’s about creating systems that make it easier to build better experiences, again and again.",
          "That’s what Aurora is for us. Not just a design language, but a foundation for everything we build next.",
        ],
      },
    ],
  },
];