import type { APIRoute } from 'astro';

import { resumePdfResponse } from '@/lib/resume-pdf';

// Default download (/resume.pdf) — the AI infra track the site is positioned
// around. Generated at build time from src/data/resume.ts.
export const GET: APIRoute = () => resumePdfResponse('ai-infra');
