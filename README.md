# Arihant Portfolio

Personal portfolio built with Next.js App Router and exported as a static site.

## What is in the site

- recruiter-friendly landing page with experience, skills, education, projects, and contact
- blog index plus statically generated blog detail pages
- floating portfolio assistant (`Yuki`) with frontend-only retrieval and semantic ranking
- analytics hooks for navigation, project clicks, resume opens, contact actions, and iPad portfolio opens

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- static export build (`out/`)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Quality checks

```bash
npm run lint
npm run build
```

`npm run build` generates the static export in `out/`.

## Assistant architecture

The portfolio assistant is fully frontend-only, so it can be deployed on GitHub Pages or any static host.

- structured portfolio knowledge lives in `src/lib/assistant/knowledge.ts`
- retrieval and answer composition live in `src/lib/assistant/engine.ts`
- semantic scoring lives in `src/lib/assistant/semantic-core.ts`
- browser-side semantic work runs in `src/lib/assistant/semantic.worker.ts`
- semantic index caching uses IndexedDB through `src/lib/assistant/semantic.ts`

There is no backend or server API required for the assistant.

## Deploying

### GitHub Pages

This project is static-export friendly.

1. Run:

```bash
npm run build
```

2. Deploy the contents of `out/` to GitHub Pages.

### Netlify

Use these settings:

- Build command: `npm run build`
- Publish directory: `out`

## Important paths

- headshot: `public/images/arihant-headshot.jpg`
- resume PDF: `public/resume/arihant-rawat-pm.pdf`
- homepage: `src/app/page.tsx`
- portfolio assistant: `src/components/portfolio-avatar-assistant.tsx`
- blog routes: `src/app/blog`

## Analytics notes

Analytics events are sent through `src/lib/analytics.ts`.

Tracked areas include:

- nav clicks
- project card opens and project link clicks
- resume download
- contact clicks
- assistant interactions
- iPad portfolio opens (`explore_in_another_way`)

The iPad portfolio open event is tracked from:

- top nav
- mobile menu
- project links
- assistant CTA
