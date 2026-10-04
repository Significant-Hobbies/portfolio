/**
 * Full résumé content — the single source of truth for the /resume pages,
 * their markdown agent surfaces, and the PDFs generated at build time
 * (src/lib/resume-pdf.ts). This is more detailed than `experience.ts`,
 * which is trimmed for the marketing pages.
 *
 * Three tracks share one pool of bullets: each bullet, project and skill
 * group lists the tracks it belongs to, so a fact is written once and every
 * résumé that uses it stays in sync. Project claims were checked against the
 * public repos (2026-10-04); keep them to what the repos can back up.
 */

import { site } from './site';

export const resumeTracks = ['ai-infra', 'backend', 'full-stack'] as const;
export type ResumeTrack = (typeof resumeTracks)[number];

const ALL: readonly ResumeTrack[] = resumeTracks;

type Tagged<T> = T & { tracks: readonly ResumeTrack[] };

export const resumeTrackMeta: Record<
  ResumeTrack,
  {
    label: string;
    headline: string;
    path: string;
    pdfPath: string;
    pdfFileName: string;
    summary: string;
  }
> = {
  'ai-infra': {
    label: 'AI infra',
    headline: 'Backend & AI Infrastructure Engineer',
    path: site.resumeUrl,
    pdfPath: site.resumePdf,
    pdfFileName: 'Sarthak_Agrawal_Resume_AI_Infra.pdf',
    summary:
      'Backend and AI infrastructure engineer with 4+ years building production services, real-time data pipelines, LLM agents, and developer tools in Go, Python, TypeScript, and Rust. Own a Go financial-planning backend, shipped systems that scaled from 15K to 200K DAU, and build AI pipelines where models transcribe and code does the math.',
  },
  backend: {
    label: 'Backend',
    headline: 'Backend Software Engineer',
    path: '/resume/backend',
    pdfPath: '/resume-backend.pdf',
    pdfFileName: 'Sarthak_Agrawal_Resume_Backend.pdf',
    summary:
      'Backend engineer with 4+ years building production services, real-time data pipelines, and durable workflows in Go, Node.js/TypeScript, and Python. Own a Go financial-planning backend validated against 96 years of market history, built a Kafka stock-data pipeline that scaled from 15K to 200K DAU, and cut workflow failures by 90% with Temporal.',
  },
  'full-stack': {
    label: 'Full stack',
    headline: 'Full-Stack Software Engineer',
    path: '/resume/full-stack',
    pdfPath: '/resume-full-stack.pdf',
    pdfFileName: 'Sarthak_Agrawal_Resume_Full_Stack.pdf',
    summary:
      'Full-stack engineer with 4+ years shipping products end to end: Go and Node.js services, React and Tailwind front ends, real-time features over Socket.IO, payments, and notifications. Shipped an English/Arabic right-to-left fintech app, helped a consumer fintech app grow from 15K to 200K DAU, and launched personal products on web and mobile.',
  },
};

/**
 * `tracks` decides which web résumés show a bullet; `pdf`, when set, narrows
 * which one-page PDFs also carry it (the web page is the full version).
 */
type Bullet = Tagged<{ text: string; pdf?: readonly ResumeTrack[] }>;

type Experience = {
  role: string;
  company: string;
  note: string;
  context?: string;
  period: string;
  bullets: Bullet[];
};

const experience: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'Vault Wealth',
    note: 'Peak XV-backed',
    context: 'Wealth-management fintech serving the UAE and Saudi Arabia',
    period: 'Feb 2025 — Present',
    bullets: [
      {
        text: 'Built and own the Go financial-planning backend for the UAE and Saudi markets, from its API and scheduled jobs to the projection, recommendation, and data-import engines below.',
        tracks: ALL,
      },
      {
        text: 'Built the retirement and goal projection engine, validated against 68 rolling 30-year S&P 500 periods (1928–2024) to within 2% of an independently written simulation; merged three diverging engine versions into one.',
        tracks: ALL,
        pdf: ['ai-infra', 'backend'],
      },
      {
        text: 'Built a recommendations engine that precomputes every option’s what-if result, so the numbers always match what the client sees on click: 0 mismatches across 1,416 options on real accounts, at 18 ms per account. It replaced a 20-type system in which only 7 types ever fired.',
        tracks: ALL,
      },
      {
        text: 'Built a pre-merge safety net that replays every planning-engine change against a copy of all client profiles and diffs it with production, plus a 50,000-case randomized test that money is never created or lost; together they caught bugs unit tests missed, including a seven-figure double count of retirement savings.',
        tracks: ['ai-infra', 'backend'],
      },
      {
        text: 'Replaced random-return simulations with replays of real market crises (1929, 1973, the dot-com crash, 2008) across 7 asset classes using 1928–2025 data, exposing that the old model overstated diversification and nearly halving worst-case cushions once modelled correctly.',
        tracks: ['ai-infra', 'backend'],
        pdf: [],
      },
      {
        text: 'Integrated Lean open banking for the UAE and Saudi Arabia with signed webhooks and Temporal sync jobs, and built an in-house transaction-categorization pipeline for accurate spending analysis.',
        tracks: ['backend', 'full-stack'],
        pdf: ['backend'],
      },
      {
        text: 'Built AI document-import pipelines where the model can’t get the math wrong: the model only transcribes and labels, while Go code does the arithmetic and checks it against the statement’s running balance; 893 of 895 transactions reconciled to the smallest currency unit. Also built a monthly fund-factsheet pipeline with Claude.',
        tracks: ALL,
        pdf: ['ai-infra', 'full-stack'],
      },
      {
        text: 'Added direct GCC market-data feeds for Tadawul, ADX, DFM, and Nasdaq Dubai, plus 348 Saudi mutual funds the existing market-data vendor doesn’t cover, at no extra vendor cost.',
        tracks: ['backend'],
        pdf: [],
      },
      {
        text: 'Migrated critical workflows to Temporal, eliminating 90% of unexpected failures and freeing about 3 engineering hours per day.',
        tracks: ALL,
      },
      {
        text: 'Cut the release end-to-end test gate from about 80 minutes (it timed out on every release) to about 7, with 315 tests passing after fixing 48 already failing on main; made the local suite 12.8× faster (30 to 2.5 minutes) and freed about 363 CI minutes a day.',
        tracks: ALL,
        pdf: ['backend', 'full-stack'],
      },
      {
        text: 'Translated the app into English and Arabic with right-to-left layout, taking hardcoded strings from 9,308 to 0 across 5,844 translation keys, with a build check that fails on untranslated text.',
        tracks: ['full-stack'],
      },
      {
        text: 'Built out the Storybook design system, brought web and iOS to 94.8% visual match across 78 screens, and migrated the web app from MUI to Tailwind.',
        tracks: ['full-stack'],
      },
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Front.Page',
    note: 'YC S’21',
    period: 'Jan 2022 — Jan 2025',
    bullets: [
      {
        text: 'Built a real-time stock-data pipeline with Go, Kafka, and Protocol Buffers, supporting product growth from 15K to 200K DAU in 14 weeks.',
        tracks: ALL,
      },
      {
        text: 'Built RAG assistants on OpenAI APIs for support, learning, and general help; the moderation bot reduced human intervention in support queries by 90%.',
        tracks: ALL,
      },
      {
        text: 'Built a personalized-feed pipeline using BERT embeddings, Milvus, GPT calls, and real-time BigQuery events for richer user vectors, increasing home-feed engagement by 40%.',
        tracks: ALL,
        pdf: ['ai-infra', 'backend'],
      },
      {
        text: 'Added queue-based batching and granular session controls, reducing session-refresh database calls by 92%.',
        tracks: ALL,
        pdf: ['backend'],
      },
      {
        text: 'Cut HTML build and load time from 600 ms to 60 ms with Redis caching, improving SEO performance.',
        tracks: ALL,
        pdf: [],
      },
      {
        text: 'Built a Node.js and MySQL (Prisma) microservice to manage the complete lifecycle of stock-fundamentals data.',
        tracks: ['backend', 'full-stack'],
        pdf: [],
      },
      {
        text: 'Launched a Hot News feed with read/unread and last-visit tracking, aggregating events through RudderStack and ClickHouse; tripled average news scroll count in 3 weeks.',
        tracks: ALL,
        pdf: [],
      },
      {
        text: 'Served unread-news and global-notification counts in O(1) time and space using Redis.',
        tracks: ['backend', 'full-stack'],
        pdf: [],
      },
      {
        text: 'Designed real-time stock-tick delivery over Socket.IO with room-based, in-memory, and Redis-backed subscription modes, connected to web clients through window events.',
        tracks: ALL,
      },
      {
        text: 'Implemented FCM topic-based notifications, reducing delivery time by 90% and increasing delivery rate by 30%.',
        tracks: ['backend', 'full-stack'],
        pdf: ['full-stack'],
      },
      {
        text: 'Integrated Razorpay payments in Node.js, opening a new revenue stream and contributing to a 50% increase in overall revenue.',
        tracks: ['backend', 'full-stack'],
      },
    ],
  },
];

type Project = Tagged<{
  name: string;
  tagline: string;
  stack: string;
  href?: string;
  bullets: Bullet[];
}>;

const projects: Project[] = [
  {
    name: 'PostTrainLLM',
    tagline: 'Mac-first LLM factory, runtime, and evaluation platform',
    stack: 'Swift/MLX, Python, TypeScript/WebGPU, C++/WASM',
    href: 'https://github.com/PostTrainLLM/posttrainllm',
    tracks: ['ai-infra', 'backend'],
    bullets: [
      {
        text: 'Built a local Swift/MLX pipeline for data preparation, post-training (LoRA, distillation), evaluation gates, trace capture, packaging, and OpenAI-compatible serving, with Python reference implementations and a browser WebGPU/WASM runtime.',
        tracks: ['ai-infra', 'backend'],
        pdf: [],
      },
      {
        text: 'Implemented a KV-cached multi-turn agent runtime over OpenAI tool schemas with bounded steps, per-tool timeouts, output limits, and JSONL audit transcripts.',
        tracks: ['ai-infra', 'backend'],
      },
      {
        text: 'Distilled a 4B specialist from ~99 frontier rollouts that scored 100% on a frontier-validated hard multi-turn tool-calling gate.',
        tracks: ['ai-infra'],
      },
    ],
  },
  {
    name: 'CodeVetter',
    tagline: 'Local-first verification layer for agent-generated code',
    stack: 'Rust, SQLite, SwiftUI, MCP',
    href: 'https://github.com/Codevetter/codevetter',
    tracks: ALL,
    bullets: [
      {
        text: 'Shipped a native SwiftUI macOS workbench backed by a Rust CLI and SQLite that runs provider-neutral coding agents, persists findings with execution evidence, and drives fix, re-review, and verification-handoff loops.',
        tracks: ALL,
        pdf: ['ai-infra', 'full-stack'],
      },
      {
        text: 'Built a read-only Rust MCP server with scoped graph/history tools, versioned resources, concurrency limits, secret filtering, bounded responses, and audit history; ~2.2 ms p50 steady queries on a 10K-event fixture.',
        tracks: ['ai-infra', 'backend'],
      },
    ],
  },
  {
    name: 'Pace',
    tagline: 'On-device, screen-aware Mac voice agent',
    stack: 'Swift, MLX, local LLM planners, streaming TTS',
    href: 'https://github.com/HeyPace/pace',
    tracks: ['ai-infra'],
    bullets: [
      {
        text: 'Built an 8-step plan-act-observe loop over local planners (OpenAI-compatible servers, MLX, Apple Foundation Models) for screen-grounded click, type, scroll, and keyboard actions.',
        tracks: ['ai-infra'],
      },
      {
        text: 'Added model prewarming, prompt caching, screen-pixel hashing, and streaming sentence TTS, targeting a sub-500 ms first spoken response.',
        tracks: ['ai-infra'],
        pdf: [],
      },
    ],
  },
  {
    name: 'Stumble',
    tagline: 'Location-based social app',
    stack: 'Node.js, PostgreSQL/PostGIS, Redis, Flutter, Docker, AWS',
    tracks: ['backend', 'full-stack'],
    bullets: [
      {
        text: 'Launched an app for meeting people nearby, with real-time chat, location-based profile filtering, face recognition, Google sign-in, and push notifications.',
        tracks: ['backend', 'full-stack'],
        pdf: ['full-stack'],
      },
    ],
  },
  {
    name: 'Significant Hobbies',
    tagline: 'Life management app',
    stack: 'Next.js, Go, PostgreSQL, Tailwind, Docker, AWS',
    href: 'https://significanthobbies.com',
    tracks: ['full-stack'],
    bullets: [
      {
        text: 'Launched a personal productivity app for tasks, habits, food logs, journals, and schedules, with custom form validation and preference-based schedule generation.',
        tracks: ['full-stack'],
      },
    ],
  },
];

const skills: Tagged<{ label: string; items: string }>[] = [
  {
    label: 'Languages',
    items: 'Go, Python, TypeScript/JavaScript, Rust, C/C++',
    tracks: ['ai-infra', 'backend'],
  },
  {
    label: 'Languages',
    items: 'TypeScript/JavaScript, Go, Python, Dart, Swift',
    tracks: ['full-stack'],
  },
  {
    label: 'LLM & Agents',
    items:
      'OpenAI-compatible APIs, function/tool calling, MCP, agent orchestration, RAG, embeddings/vector search, evaluation, local inference (MLX)',
    tracks: ['ai-infra'],
  },
  {
    label: 'Backend & Data',
    items:
      'REST APIs, microservices, Kafka, Protocol Buffers, Temporal, MySQL, PostgreSQL, SQLite, Redis, Elasticsearch, ClickHouse, BigQuery, Milvus',
    tracks: ['ai-infra', 'backend'],
  },
  {
    label: 'Frontend & Mobile',
    items: 'React, Next.js, Astro, Tailwind CSS, MUI, Socket.IO, Flutter',
    tracks: ['full-stack'],
  },
  {
    label: 'Backend & Data',
    items:
      'Node.js, REST APIs, Prisma, MySQL, PostgreSQL/PostGIS, Redis, Kafka, Temporal, ClickHouse, BigQuery',
    tracks: ['full-stack'],
  },
  {
    label: 'AI',
    items: 'RAG, embeddings, OpenAI APIs, MCP',
    tracks: ['backend', 'full-stack'],
  },
  {
    label: 'Infrastructure',
    items:
      'Linux, Docker, Kubernetes, AWS, GCP, Cloudflare Workers, Prometheus, GitHub Actions',
    tracks: ['ai-infra', 'backend'],
  },
  {
    label: 'Infrastructure',
    items:
      'Docker, AWS, GCP, Cloudflare Pages/Workers, Firebase (FCM), GitHub Actions',
    tracks: ['full-stack'],
  },
];

const resumeEducation = {
  school: 'Manipal Institute of Technology',
  degree: 'B.Tech, Computer Science and Engineering',
  period: 'Aug 2018 — Jul 2022',
  detail:
    'Coursework: Algorithms, Data Structures, DBMS, OOP, Operating Systems, Computer Networks. Built several internal college portals (recommendations, placement, fest, library management).',
};

const has = (item: { tracks: readonly ResumeTrack[] }, track: ResumeTrack) =>
  item.tracks.includes(track);

export type ResumeMedium = 'web' | 'pdf';

export function getResume(track: ResumeTrack, medium: ResumeMedium = 'web') {
  const keep = (bullet: Bullet) =>
    has(bullet, track) &&
    (medium === 'web' || (bullet.pdf ?? bullet.tracks).includes(track));
  return {
    track,
    ...resumeTrackMeta[track],
    experience: experience.map((job) => ({
      role: job.role,
      company: job.company,
      note: job.note,
      context: job.context,
      period: job.period,
      bullets: job.bullets.filter(keep).map((b) => b.text),
    })),
    projects: projects
      .filter((p) => has(p, track))
      .map((p) => ({
        name: p.name,
        tagline: p.tagline,
        stack: p.stack,
        href: p.href,
        bullets: p.bullets.filter(keep).map((b) => b.text),
      }))
      .filter((p) => p.bullets.length > 0),
    skills: skills
      .filter((s) => has(s, track))
      .map(({ label, items }) => ({ label, items })),
    education: resumeEducation,
  };
}
