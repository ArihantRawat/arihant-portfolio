# Arihant Portfolio (Next.js + Tailwind)

Recruiter-focused portfolio for a **technical hybrid profile (PM + SWE)**.

## Stack

- Next.js (App Router + TypeScript)
- Tailwind CSS
- Netlify-ready deployment

## Pages

- `/` Home (Hero, About, Impact, Projects, Working On, Resume, Blog preview, Contact)
- `/blog` Blog index (starter post cards)

## Run locally

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Required content updates

1. Add your profile photo:
   - Path: `public/images/arihant-headshot.jpg`
2. Add resume PDFs:
   - Path: `public/resume/arihant-rawat-pm.pdf`
   - Path: `public/resume/arihant-rawat-swe.pdf`
3. Replace placeholder projects with exact GitHub repos/case studies.
4. Add real blog posts (MDX optional next step).

## Netlify deploy

1. Push this folder to a GitHub repo.
2. In Netlify: **Add new site → Import from GitHub**.
3. Build settings (auto-detected for Next.js):
   - Build command: `npm run build`
   - Publish directory: `out`
4. Deploy.

## Suggested domain (when ready)

- `arihant.dev`
- `arihantbuilds.com`
- `arihantrawat.com`

Use Netlify subdomain first, then attach custom domain later.
