import { markdownDocuments } from '../data/markdown-documents';
export const prerender = true;
export async function GET() {
  return (await markdownDocuments()).handler(
    new Request('https://sarthakagrawal.dev/llms.txt')
  );
}
