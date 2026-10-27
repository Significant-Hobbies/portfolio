import { getAgentSurfaces } from './agent-surfaces';
import { site } from './site';
import { createAgentSurfaceManifest } from '../lib/agent-surfaces/manifest.mjs';
import { createAgentSurfaceHandler } from '../lib/agent-surfaces/handler.mjs';
import { listMarkdownRoutes } from '../lib/agent-surfaces/documents.mjs';

export const markdownIdentity = {
  name: site.name,
  url: site.url,
  summary: site.description,
  contact: site.email,
  trainingAllowed: true,
  excludedPaths: ['/admin', '/auth', '/dashboard'],
  sitemap: `${site.url}/sitemap-index.xml`,
};

export async function markdownDocuments() {
  const surfaces = await getAgentSurfaces();
  const manifest = createAgentSurfaceManifest({
    ...markdownIdentity,
    pages: Object.fromEntries(
      surfaces.map((surface) => [surface.path, surface.markdown])
    ),
  });
  const routes = listMarkdownRoutes(manifest).map((route) => ({
    ...route,
    lastModified: surfaces.find((surface) => surface.path === route.path)
      ?.lastUpdated,
  }));
  return {
    routes,
    handler: createAgentSurfaceHandler({
      manifest,
      listMarkdownRoutes: () => routes,
    }),
  };
}
