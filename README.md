# sarthakagrawal.dev

Personal site & portfolio for **Sarthak Agrawal — AI Infrastructure & Product
Engineer**. *I build dependable AI products, from infrastructure to interface.*

A dark, "systems" aesthetic built to make one thing obvious: this person builds
AI infrastructure and ships the products that use it. The landing page leads
with featured products from the SaaS Maker public catalog; the full project
archive remains available at `/projects`. The site includes a focused
homepage, engineering case studies, technical writing, a compact contact
footer, and a project directory sourced from that same catalog.

## Stack

- **[Astro 5](https://astro.build)** — static output, ships ~zero JS by default
- **Tailwind CSS v4** — via the `@tailwindcss/vite` plugin; tokens in `src/styles/global.css`
- **React 19 islands** — the command palette hydrates while core pages remain static
- **MDX content collections** — case studies (`work`) and writing (`blog`)
- **`cmdk`** — the command menu (the only hydrated island)
- Deployed on **Cloudflare Pages**

## Develop

```bash
pnpm install
pnpm run dev      # http://localhost:4321
pnpm run build    # static build → dist/
pnpm run preview  # serve the production build
pnpm run check    # type-check
```

Node version is pinned in `.nvmrc` (22).

## Pages

| Route | What |
|---|---|
| `/` | Focused hero, spotlight products, and selected production case studies |
| `/work/[slug]` | Engineering case studies (real work — vector feeds, real-time pipeline, RAG agents, durable workflows) |
| `/projects` | Reviewed public selection from the shared SaaS Maker catalog |
| `/about` | Bio, full experience timeline, education, toolbox |
| `/resume` | On-site résumé + "Download PDF" |
| `/blog` | Technical writing with an AI-authorship disclosure on every article, plus IssuePages notes |
| `/privacy` | Analytics disclosure (PostHog and Microsoft Clarity boundary) |
| `/llms.txt`, `/llms-full.txt`, `/api/ai`, `*.md` | Agent-readable surfaces, one Markdown counterpart per sitemap route |

## Editing content

Everything you'd want to change lives in a few files:

| What | Where |
|---|---|
| Name, role, tagline, email, availability | `src/data/site.ts` |
| Work history / timeline | `src/data/experience.ts` |
| Full résumé content | `src/data/resume.ts` |
| Expertise panels | `src/data/expertise.ts` |
| Social links | `src/data/socials.ts` |
| Case studies | `src/content/work/*.mdx` |
| About-page toolbox | `src/pages/about.astro` |
| Blog posts | drop `.mdx` into `src/content/blog/` |

Project selection comes from `src/data/fleet-public.json`, the checked-in SaaS
Maker public projection. GitHub API data (`src/lib/github.ts`) supplements
repository statistics; it does not decide which projects belong in the directory.

## Résumé → PDF

`src/data/resume.ts` is the single source of truth for three résumé tracks:
AI infra (`/resume`), backend (`/resume/backend`), and full stack
(`/resume/full-stack`). Each bullet, project, and skill row lists the tracks
it belongs to, so a fact is written once.

The PDFs (`/resume.pdf`, `/resume-backend.pdf`, `/resume-full-stack.pdf`) are
generated at build time from the same data by `src/lib/resume-pdf.ts`
(pdfkit, built-in Helvetica for ATS-friendly text). Run `pnpm run build` and
open `dist/resume.pdf` to preview. Keep résumé copy inside the WinAnsi
character set (no arrows or emoji); the standard PDF fonts can't encode them.

The phone number is intentionally left out of both the web pages and the PDFs.
The retired LaTeX source is kept at `docs/archive/resume.tex`.

## Deploy — Cloudflare Pages

Static site (`output: 'static'`) — deployment is just static assets.

Every push to `main` and every pull request runs the full `pnpm run quality`
gate (format, lint, types, coverage, build, agent-surface contract, and the
code-health ratchets) in `.github/workflows/deploy.yml`. Nothing is deployed
on push.

Production deployment is manual: dispatch the `Portfolio CI / Deploy` workflow.
It refreshes the public catalog from `https://sassmaker.com/portfolio.json`,
validates and rebuilds, then publishes `dist/` to the Cloudflare Pages project
`sarthakagrawal` with `wrangler pages deploy` using the `CLOUDFLARE_API_TOKEN`
repo secret. Without that secret the dispatch builds and skips the deploy.

**Local CLI alternative:** `pnpm dlx wrangler pages deploy dist` (config in
`wrangler.jsonc`).

The build-time GitHub fetch (`src/lib/github.ts`) reads an optional
`GITHUB_TOKEN` env var to raise the API rate limit. The workflow does not
currently set one; the fetch falls back gracefully without it.

## Latest public release

The September 7 verified 21-entry selection is live. Desktop/mobile homepage,
project directory and command-menu navigation passed; Chess and Journal are
absent from the public selection. [Deployment and browser receipt](artifacts/releases/2026-09-07/README.md).

## Portfolio projection

Public project lists use `src/data/fleet-public.json`, copied from SaaS Maker’s privacy-filtered canonical projection, `catalog/generated/public.json`. SaaS Maker publishes that file at `/portfolio.json`; its landing page and directory use the same data, and the GitHub profile refresh workflow consumes that feed.

Run `pnpm run catalog:sync-hosted` to refresh from the published feed, or `node scripts/sync-fleet-public.mjs` to refresh from the local SaaS Maker checkout. Run `pnpm run check` and `pnpm run test:contract` afterward. Use `pnpm run catalog:check-hosted` to verify published parity, or `node scripts/sync-fleet-public.mjs --check` for local parity. Invalid or empty feeds fail before replacing the snapshot. Publish the SaaS Maker feed before dispatching a portfolio release. Never copy the private Site Health catalog into this repository.

## Retained publication drafts

GitHub issues #28, #29, #30 and #33 are writing drafts, not engineering tasks. They remain the original manuscript/discussion records; publishing or closing them requires editorial completion. The portfolio cleanup does not mark them done.
