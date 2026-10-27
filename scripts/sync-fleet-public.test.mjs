import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

test('hosted refresh validates catalog before touching the last good snapshot', () => {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const target = join(root, 'src/data/fleet-public.json');
  const original = readFileSync(target, 'utf8');
  const catalog = JSON.parse(original);
  const activeIds = new Set(catalog.products.map((project) => project.id));
  const expanded = {
    ...catalog,
    schemaVersion: 6,
    directory: [
      ...catalog.directory.filter((project) => activeIds.has(project.id)),
      {
        id: 'not-shareable',
        shareable: false,
        description: 'must-not-publish',
      },
    ],
    archivedDirectory: [
      { id: 'archive-only', description: 'must-not-publish' },
    ],
  };
  const temporary = mkdtempSync(join(tmpdir(), 'portfolio-feed-check-'));
  try {
    for (const [response, expected] of [
      [catalog, 0],
      [expanded, 0],
      [
        {
          ...expanded,
          products: [{ ...expanded.products[0], shareable: false }],
        },
        1,
      ],
      [{ ...catalog, directory: [] }, 1],
      [
        {
          ...catalog,
          directory: [{ ...catalog.directory[0], shareable: false }],
        },
        1,
      ],
      [
        {
          ...catalog,
          products: [
            { ...catalog.products[0], shareable: false },
            ...catalog.products.slice(1),
          ],
        },
        1,
      ],
      [
        {
          ...catalog,
          directory: catalog.directory.map((p, i) =>
            i ? p : { ...p, url: 'javascript:alert(1)' }
          ),
        },
        1,
      ],
    ]) {
      const preload = join(temporary, 'fetch.mjs');
      writeFileSync(
        preload,
        `globalThis.fetch = async () => Response.json(${JSON.stringify(response)});`
      );
      const result = spawnSync(
        process.execPath,
        [
          '--import',
          preload,
          'scripts/sync-fleet-public.mjs',
          '--source=https://sassmaker.com/portfolio.json',
          '--check',
        ],
        { cwd: root }
      );
      assert.equal(result.status, expected, result.stderr.toString());
      assert.equal(readFileSync(target, 'utf8'), original);
    }
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
