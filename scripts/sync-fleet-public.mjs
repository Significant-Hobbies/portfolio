import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { isDeepStrictEqual } from 'node:util';
import { fileURLToPath } from 'node:url';
import { normalizePublicCatalog } from './normalize-fleet-public.mjs';
const defaultSource = new URL(
  '../../saas-maker/catalog/generated/public.json',
  import.meta.url
);
const target = new URL('../src/data/fleet-public.json', import.meta.url);
const sourceArgument = process.argv.find((argument) =>
  argument.startsWith('--source=')
);
const source = sourceArgument?.slice('--source='.length);
let text;
if (source) {
  const url = new URL(source);
  if (url.protocol !== 'https:' || url.username || url.password)
    throw new Error('Hosted catalog requires a public HTTPS URL');
  const response = await fetch(url, {
    cache: 'no-store',
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok)
    throw new Error(`Catalog refresh failed: HTTP ${response.status}`);
  text = await response.text();
  if (text.length > 5_000_000)
    throw new Error('Public catalog exceeds size limit');
} else {
  text = await readFile(defaultSource, 'utf8');
}
const catalog = normalizePublicCatalog(JSON.parse(text));
if (process.argv.includes('--check')) {
  if (!isDeepStrictEqual(JSON.parse(await readFile(target, 'utf8')), catalog))
    throw new Error('Public projection is stale');
} else {
  await writeFile(target, JSON.stringify(catalog));
  execFileSync(
    fileURLToPath(
      new URL('../node_modules/@biomejs/biome/bin/biome', import.meta.url)
    ),
    [
      'format',
      '--write',
      '--json-formatter-enabled=true',
      fileURLToPath(target),
    ],
    {
      cwd: fileURLToPath(new URL('..', import.meta.url)),
      stdio: 'inherit',
    }
  );
}
console.log(`Public projection: ${catalog.directory.length} shareable entries`);
