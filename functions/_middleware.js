import {
  createStaticAssetHandler,
  advertiseMarkdown,
} from '../src/lib/agent-surfaces/adapters/static-assets.mjs';

const handleMarkdown = createStaticAssetHandler({});
export async function onRequest(context) {
  const result = await handleMarkdown(context.request, context.env.ASSETS);
  if (result) return result;
  return advertiseMarkdown(await context.next(), 'https://sarthakagrawal.dev');
}
