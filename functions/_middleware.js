import {
  createStaticAssetHandler,
  advertiseMarkdown,
} from '../src/lib/agent-surfaces/adapters/static-assets.mjs';

const handleMarkdown = createStaticAssetHandler({
  preserveMarkdownPaths: [
    '/fleet-footer/README.md',
    '/fleet-footer/fonts/fleet-footer-precise-v1/README.md',
  ],
});
export async function onRequest(context) {
  const path = new URL(context.request.url).pathname;
  if (
    ['/_astro/', '/images/', '/fleet-footer/'].some((prefix) =>
      path.startsWith(prefix)
    )
  )
    return context.next();
  const result = await handleMarkdown(context.request, context.env.ASSETS);
  if (result) return result;
  const response = await context.next();
  return response.headers.get('content-type')?.includes('text/html')
    ? advertiseMarkdown(response, 'https://sarthakagrawal.dev')
    : response;
}
