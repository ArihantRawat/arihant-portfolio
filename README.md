# Arihant Rawat Portfolio

Personal portfolio site built with Next.js App Router and exported as a static site.

## Overview

The site is designed to present Arihant Rawat's background as a product-minded technologist with experience across startups, enterprise teams, and current MBA work at USC Marshall.

It includes:

- a landing page with about, skills, experience, education, projects, and contact sections
- a floating portfolio assistant named `Yuki`
- a small blog with statically generated post pages
- analytics hooks for navigation, project exploration, resumes, contact actions, and the alternate iPad portfolio experience

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- static export output through `next build`

## Local development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Default local URL:

```text
http://localhost:3000
```

## Quality checks

Run:

```bash
npm run lint
npm run build
```

The production build generates static output in `out/`.

## Assistant architecture

`Yuki` is frontend-only. There is no server API or backend retrieval layer.

Core files:

- `src/components/portfolio-avatar-assistant.tsx`: assistant UI, prompts, roaming behavior, and chat flow
- `src/lib/assistant/knowledge.ts`: structured portfolio knowledge base
- `src/lib/assistant/engine.ts`: retrieval logic, scoring, and answer composition
- `src/lib/assistant/semantic-core.ts`: semantic scoring helpers
- `src/lib/assistant/semantic.ts`: browser-side semantic loading and IndexedDB caching
- `src/lib/assistant/semantic.worker.ts`: worker for semantic processing off the main thread

## Content and entry points

- homepage: `src/app/page.tsx`
- global styles: `src/app/globals.css`
- app layout: `src/app/layout.tsx`
- blog index and posts: `src/app/blog`
- headshot image: `public/images/arihant-headshot.jpg`
- PM resume PDF: `public/resume/arihant-rawat-pm.pdf`
- SWE resume PDF: `public/resume/arihant-rawat-swe.pdf`

## Deployment

This project is static-export friendly and can be hosted on GitHub Pages, Netlify, or similar static hosting.

Build the site with:

```bash
npm run build
```

Deploy the generated `out/` directory.

## Analytics

Analytics events are routed through `src/lib/analytics.ts`.

Tracked interactions include:

- navigation clicks
- project card opens and outbound project link clicks
- resume opens
- contact actions
- assistant interactions
- opens of the alternate iPad portfolio experience
