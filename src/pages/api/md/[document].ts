import {
  markdownDocuments,
  markdownIdentity,
} from '../../../data/markdown-documents';
export function getStaticPaths() {
  return [
    { params: { document: '_catalog' } },
    { params: { document: '_identity' } },
  ];
}
export async function GET({ params }: { params: { document: string } }) {
  return new Response(
    JSON.stringify(
      params.document === '_catalog'
        ? (await markdownDocuments()).routes
        : markdownIdentity
    ),
    {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }
  );
}
