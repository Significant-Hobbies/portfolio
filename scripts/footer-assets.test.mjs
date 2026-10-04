import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../public/fleet-footer/', import.meta.url);

test('the personal release contains the complete attributed footer asset graph', async () => {
  const manifest = JSON.parse(
    await readFile(new URL('manifest.json', root), 'utf8')
  );
  const expected = [
    'ai-chat-footer.js',
    'project-strip.js',
    'newsletter-capture.js',
    'feedback-launcher.js',
    'art/sarthakagrawal-personal.webp',
  ];
  for (const name of expected) {
    assert.ok(
      manifest.files.some((file) => file.path === name),
      `${name} must be deployed`
    );
  }
  for (const file of manifest.files) {
    assert.doesNotMatch(file.path, /(^|\/)\.\.(\/|$)/);
    const bytes = await readFile(new URL(file.path, root));
    assert.equal(bytes.length, file.bytes, file.path);
    assert.equal(
      createHash('sha256').update(bytes).digest('hex'),
      file.sha256,
      file.path
    );
  }
  for (const name of [
    'ai-chat-footer.js',
    'project-strip.js',
    'feedback-launcher.js',
  ]) {
    const source = await readFile(new URL(name, root), 'utf8');
    assert.doesNotThrow(
      () => new Function(source),
      `${name} must execute as a classic script`
    );
    assert.doesNotMatch(
      source,
      /<html[\s>]/i,
      'a loader must never be an HTML fallback'
    );
  }
  const coordinator = await readFile(
    new URL('ai-chat-footer.js', root),
    'utf8'
  );
  assert.match(coordinator, /new URL\('newsletter-capture\.js', assetBase\)/);
  assert.match(coordinator, /new URL\('feedback-launcher\.js', assetBase\)/);
  assert.match(
    coordinator,
    /https:\/\/api\.sassmaker\.com\/v1\/capture-config\//
  );
});

test('personal loaders stay scoped to visible footers and preserve project identity', async () => {
  const layout = await readFile(
    new URL('../src/layouts/BaseLayout.astro', import.meta.url),
    'utf8'
  );
  const strip = layout.indexOf('src="/fleet-footer/project-strip.js"');
  const ai = layout.indexOf('src="/fleet-footer/ai-chat-footer.js"');
  assert.ok(
    strip >= 0 && ai > strip,
    'the strip loader precedes the coordinator'
  );
  assert.equal(
    (layout.match(/src="\/fleet-footer\/ai-chat-footer\.js"/g) ?? []).length,
    1
  );
  assert.equal(
    (layout.match(/src="\/fleet-footer\/project-strip\.js"/g) ?? []).length,
    1
  );
  assert.match(
    layout.slice(strip, ai),
    /data-project="sarthakagrawal-personal"/
  );
  assert.match(layout.slice(ai), /data-host-only="true"/);
  assert.match(layout.slice(ai), /data-project="sarthakagrawal-personal"/);
});
