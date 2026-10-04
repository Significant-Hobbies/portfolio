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
      'Backend and AI infrastructure engineer with 4+ years building production services, real-time data pipelines, LLM agents, and developer tools in Go, Python, TypeScript, and Rust. Shipped systems that scaled from 15K to 200K DAU, cut workflow failures by 90%, and built an OpenAI-compatible tool-calling runtime and a read-only MCP server.',
  },
  backend: {
    label: 'Backend',
    headline: 'Backend Software Engineer',
    path: '/resume/backend',
    pdfPath: '/resume-backend.pdf',
    pdfFileName: 'Sarthak_Agrawal_Resume_Backend.pdf',
    summary:
      'Backend engineer with 4+ years building production services, real-time data pipelines, and durable workflows in Go, Node.js/TypeScript, and Python. Built a Kafka stock-data pipeline that scaled from 15K to 200K DAU, cut workflow failures by 90% with Temporal, and cut session-refresh database calls by 92%.',
  },
  'full-stack': {
    label: 'Full stack',
    headline: 'Full-Stack Software Engineer',
    path: '/resume/full-stack',
    pdfPath: '/resume-full-stack.pdf',
    pdfFileName: 'Sarthak_Agrawal_Resume_Full_Stack.pdf',
    summary:
      'Full-stack engineer with 4+ years shipping products end to end: Go and Node.js services, React and Tailwind front ends, real-time features over Socket.IO, payments, and notifications. Helped a consumer fintech app grow from 15K to 200K DAU and launched personal products on web and mobile.',
  },
};

type Experience = {
  role: string;
  company: string;
  note: string;
  period: string;
  bullets: Tagged<{ text: string }>[];
};

const experience: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'Vault Wealth',
    note: 'Peak XV-backed',
    period: 'Feb 2025 — Present',
    bullets: [
      {
        text: 'Designed and shipped a financial planning service in Go and MySQL, implementing the proprietary logic that calculates clients’ financial health scores.',
        tracks: ALL,
      },
      {
        text: 'Migrated critical workflows to Temporal, eliminating 90% of unexpected failures and freeing about 3 engineering hours per day.',
        tracks: ALL,
      },
      {
        text: 'Migrated the web app from MUI to Tailwind and built responsive React components for the planning experience.',
        tracks: ['ai-infra', 'full-stack'],
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
        text: 'Developed RAG assistants on OpenAI APIs for support, learning, and moderation; the moderation bot reduced human intervention in support queries by 90%.',
        tracks: ALL,
      },
      {
        text: 'Built a personalized-feed pipeline using BERT embeddings, Milvus, GPT calls, and real-time BigQuery events for richer user vectors, increasing home-feed engagement by 40%.',
        tracks: ALL,
      },
      {
        text: 'Added queue-based batching and granular session controls, reducing session-refresh database calls by 92%.',
        tracks: ALL,
      },
      {
        text: 'Cut HTML build and load time from 600 ms to 60 ms with Redis caching, improving SEO performance.',
        tracks: ALL,
      },
      {
        text: 'Built a Node.js and MySQL (Prisma) microservice to manage the complete lifecycle of stock-fundamentals data.',
        tracks: ['backend', 'full-stack'],
      },
      {
        text: 'Launched a Hot News feed with read/unread and last-visit tracking, aggregating events through RudderStack and ClickHouse; tripled average news scroll count in 3 weeks.',
        tracks: ALL,
      },
      {
        text: 'Served unread-news and global-notification counts in O(1) time and space using Redis.',
        tracks: ['backend', 'full-stack'],
      },
      {
        text: 'Designed real-time stock-tick delivery over Socket.IO with room-based, in-memory, and Redis-backed subscription modes, connected to web clients through window events.',
        tracks: ALL,
      },
      {
        text: 'Implemented FCM topic-based notifications, reducing delivery time by 90% and increasing delivery rate by 30%.',
        tracks: ['backend', 'full-stack'],
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
  bullets: Tagged<{ text: string }>[];
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

export function getResume(track: ResumeTrack) {
  return {
    track,
    ...resumeTrackMeta[track],
    experience: experience.map((job) => ({
      role: job.role,
      company: job.company,
      note: job.note,
      period: job.period,
      bullets: job.bullets.filter((b) => has(b, track)).map((b) => b.text),
    })),
    projects: projects
      .filter((p) => has(p, track))
      .map((p) => ({
        name: p.name,
        tagline: p.tagline,
        stack: p.stack,
        href: p.href,
        bullets: p.bullets.filter((b) => has(b, track)).map((b) => b.text),
      })),
    skills: skills
      .filter((s) => has(s, track))
      .map(({ label, items }) => ({ label, items })),
    education: resumeEducation,
  };
}
