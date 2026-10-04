import type { APIRoute, GetStaticPaths } from 'astro';

import type { ResumeTrack } from '@/data/resume';
import { resumePdfResponse } from '@/lib/resume-pdf';

export const getStaticPaths: GetStaticPaths = () =>
  (['backend', 'full-stack'] satisfies ResumeTrack[]).map((track) => ({
    params: { track },
  }));

export const GET: APIRoute = ({ params }) =>
  resumePdfResponse(params.track as ResumeTrack);
