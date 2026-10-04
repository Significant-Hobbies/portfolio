import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://sarthakagrawal.dev';

const sitemap = await readFile(path.join(DIST, 'sitemap-0.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
  const url = new URL(match[1]);
  return url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '');
});
const catalog = JSON.parse(
  await readFile(path.join(DIST, 'api', 'ai'), 'utf8')
);

assert.equal(catalog.name, 'Sarthak Agrawal');
assert.equal(catalog.url, ORIGIN);
assert.equal(catalog.llms, `${ORIGIN}/llms.txt`);
assert.equal(catalog.llmsFull, `${ORIGIN}/llms-full.txt`);
assert.equal(catalog.surfaces.length, routes.length);

const catalogRoutes = new Set(
  catalog.surfaces.map((surface) => new URL(surface.url).pathname)
);
for (const route of routes) {
  const normalizedRoute = route === '/' ? '/' : route;
  assert.ok(
    catalogRoutes.has(normalizedRoute),
    `${route} is missing from /api/ai`
  );

  const markdownPath = route === '/' ? 'index.md' : `${route.slice(1)}.md`;
  await access(path.join(DIST, markdownPath));

  const htmlPath = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  const html = await readFile(path.join(DIST, htmlPath), 'utf8');
  const canonicalUrl = new URL(route, ORIGIN).href;
  assert.equal(
    html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1],
    canonicalUrl,
    `${route} canonical must match its sitemap URL`
  );
  assert.equal(
    html.match(/<meta\b[^>]*property="og:url"[^>]*content="([^"]+)"/)?.[1],
    canonicalUrl,
    `${route} Open Graph URL must match its sitemap URL`
  );
  if (route === '/') {
    const identity = JSON.parse(
      html.match(
        /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/
      )?.[1] ?? 'null'
    );
    const profile = identity?.['@graph']?.find(
      (node) => node['@type'] === 'ProfilePage'
    );
    assert.ok(profile, 'homepage must publish the person ProfilePage');
    assert.equal(profile.url, ORIGIN);
    assert.equal(profile.mainEntity?.['@id'], `${ORIGIN}/#person`);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.equal(title, profile.name.replace(/&/g, '&amp;'));
  }
  // Public contact links must remain usable without Cloudflare's decode JS.
  const unprotectedHtml = html.replace(
    /<!--email_off-->[\s\S]*?<!--\/email_off-->/g,
    ''
  );
  assert.equal(
    /<a\b[^>]*\bhref=["']mailto:/i.test(unprotectedHtml),
    false,
    `${route} has an email link without Cloudflare email_off markers`
  );
}

const fullCorpus = await readFile(path.join(DIST, 'llms-full.txt'), 'utf8');
for (const surface of catalog.surfaces) {
  assert.match(
    fullCorpus,
    new RegExp(`Source page: ${escapeRegex(surface.url)}`)
  );
}

console.log(
  `agent surfaces verified: ${routes.length} sitemap routes, ${catalog.surfaces.length} catalog entries, ${routes.length} Markdown counterparts`
);

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
