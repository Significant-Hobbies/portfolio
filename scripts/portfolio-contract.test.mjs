// Public portfolio contract: promotion follows the verified public projection.

import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

async function readSpotlightSource() {
  return readFile(`${ROOT}/src/data/spotlight-products.ts`, 'utf8');
}

async function readHomepageSource() {
  return readFile(`${ROOT}/src/pages/index.astro`, 'utf8');
}

async function readSiteSource() {
  return readFile(`${ROOT}/src/data/site.ts`, 'utf8');
}

async function readHeadSource() {
  return readFile(`${ROOT}/src/components/astro/Head.astro`, 'utf8');
}

test('spotlight follows only shareable primary work and the directory entry', async () => {
  const source = await readSpotlightSource();
  const catalog = JSON.parse(
    await readFile(`${ROOT}/src/data/fleet-public.json`, 'utf8')
  );
  assert.equal(
    catalog.directory.every((project) => project.shareable === true),
    true
  );
  assert.equal(
    catalog.directory.some((project) =>
      ['chess', 'journal'].includes(project.id)
    ),
    false
  );
  assert.deepEqual(
    catalog.products
      .filter((project) => project.spotlight)
      .map((project) => project.id),
    ['codevetter', 'posttrainllm']
  );
  assert.equal(
    catalog.products
      .filter((project) => project.spotlight)
      .every((project) => project.lifecycle === 'primary'),
    true
  );
  assert.match(source, /project.spotlight \|\| project.id === 'saas-maker'/);
});

test('homepage renders the spotlight set with a distinct directory CTA for SaaS Maker', async () => {
  const home = await readHomepageSource();
  const spotlightImport = await readSpotlightSource();
  // Homepage must import and render the spotlight data — not a parallel list.
  assert.match(
    home,
    new RegExp("from '@/data/spotlight-products'"),
    'homepage must consume spotlight-products data'
  );
  assert.match(
    home,
    /spotlightProducts\.map/,
    'homepage must render the spotlight collection'
  );
  // SaaS Maker must keep its distinct directory CTA copy so it is not
  // presented as a peer product.
  assert.match(
    home,
    /open the directory/,
    'SaaS Maker must keep its distinct directory CTA copy'
  );
  assert.match(spotlightImport, /publicCatalog.products/);
});

test('homepage declares one meaningful CTA in the hero', async () => {
  const home = await readHomepageSource();
  // Hero CTA: "See what I'm building" → #focus. This is the activation
  // surface on a static site (outbound click; no server-side event).
  assert.match(home, /See what I/, 'hero must declare the primary CTA');
  assert.match(
    home,
    /href="#focus"/,
    'hero CTA must anchor to the focus section'
  );
});

test('selected-work intro counts the rendered entries and covers personal work', async () => {
  const home = await readHomepageSource();
  const files = await readdir(`${ROOT}/src/content/work`);
  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const source = await readFile(
          `${ROOT}/src/content/work/${file}`,
          'utf8'
        );
        return source.split('---')[1];
      })
  );
  const featured = entries.filter((entry) => /^featured: true$/m.test(entry));
  assert.ok(featured.length > 0, 'selection contains featured case studies');
  assert.ok(featured.some((entry) => /^role: Personal/m.test(entry)));
  assert.match(
    home,
    /getCollection\('work'\)[\s\S]*?\.filter\(\(w\) => w\.data\.featured\)/
  );
  assert.match(home, /work\.map\(\(entry, i\) =>/);
  const intro = home.match(
    /kicker="\/\/ selected work"[\s\S]*?intro=\{(`[^`]+`)\}/
  )?.[1];
  assert.ok(
    intro,
    'intro must derive its count from the rendered work collection'
  );
  for (const count of [0, 1, featured.length, featured.length + 1]) {
    const copy = runInNewContext(intro, { work: new Array(count) });
    assert.equal(
      copy,
      `${count} ${count === 1 ? 'project' : 'projects'} from my professional and personal work — what the problem was, what I built, and what changed.`
    );
  }
});

test('local contact footer speaks for one person and preserves the pilot terms', async () => {
  const footer = await readFile(
    `${ROOT}/src/components/astro/Footer.astro`,
    'utf8'
  );
  const copy = footer.replace(/\s+/g, ' ');
  assert.match(
    copy,
    /I'm available for a \$500 USD feature verification pilot/
  );
  assert.match(copy, /I am the contact for scope and payment/);
  assert.match(copy, /\$250 to start, \$250 on delivery; three working days/);
  assert.match(copy, /Fixes are separately scoped\./);
  assert.doesNotMatch(copy, /\b(?:our team|contact us|we are|we're)\b/i);
});

test('hosted AI footer uses supported label and prompt attributes for a personal portfolio', async () => {
  const layout = await readFile(`${ROOT}/src/layouts/BaseLayout.astro`, 'utf8');
  const script = layout.match(
    /<script\s[^>]*src="https:\/\/sassmaker\.com\/ai-chat-footer\.js"[^>]*>/
  )?.[0];
  assert.ok(script);
  assert.match(script, /data-name="Sarthak Agrawal"/);
  assert.match(script, /data-label="Explore my work with AI"/);
  assert.match(
    script,
    /data-prompt="Summarize \{companyName\}'s engineering work and projects from this personal portfolio \(\{companyUrl\}\)\. Keep it concise\."/
  );
});

test('site publishes one canonical, externally corroborated person identity', async () => {
  const siteSource = await readSiteSource();
  const headSource = await readHeadSource();

  assert.match(
    siteSource,
    /personId: 'https:\/\/sarthakagrawal\.dev\/#person'/
  );
  assert.match(
    siteSource,
    /alternateNames: \['sarthakagrawal927', 'sarthakagrawal\.dev'\]/
  );
  assert.match(siteSource, /avatars\.githubusercontent\.com\/u\/43884471/);
  assert.match(siteSource, /linkedin\.com\/in\/sarthakagrawal927/);
  assert.match(siteSource, /github\.com\/sarthakagrawal927/);
  assert.match(siteSource, /x\.com\/sarthakcodes/);
  assert.match(headSource, /'@type': 'ProfilePage'/);
  assert.match(headSource, /const personNode = \{/);
  assert.match(headSource, /'@type': 'Person'/);
  assert.match(headSource, /'@id': site\.personId/);
  assert.match(headSource, /alternateName: site\.alternateNames/);
  assert.match(headSource, /sameAs: Object\.values\(site\.profiles\)/);
  assert.match(headSource, /if \(isHome\)/);
});
