import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { transform } from 'lightningcss';
import ts from 'typescript';

const component = await readFile(
  new URL('../src/components/astro/DeferredScripts.astro', import.meta.url),
  'utf8'
);
const source = ts.transpileModule(
  component.match(/<script>([\s\S]*?)<\/script>/)[1],
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }
).outputText;

function harness() {
  const events = new Map();
  const idle = [];
  const inserted = [];
  let views = 0;
  const listen = (event, callback) => {
    const callbacks = events.get(event) ?? [];
    callbacks.push(callback);
    events.set(event, callbacks);
  };
  const placeholder = (src) => ({
    src,
    attributes: [
      { name: 'type', value: 'text/plain' },
      { name: 'data-after-load', value: '' },
      { name: 'src', value: src },
      { name: 'data-project', value: 'sarthakagrawal-personal' },
    ],
    replaceWith(script) {
      inserted.push(script);
    },
    remove() {},
  });
  const document = {
    body: {},
    readyState: 'loading',
    scripts: [
      placeholder('/app-health-log.js'),
      placeholder('/fleet-footer/project-strip.js'),
      placeholder('/fleet-footer/ai-chat-footer.js'),
    ],
    addEventListener: listen,
    querySelectorAll() {
      return this.scripts;
    },
    createElement() {
      return {
        attributes: {},
        setAttribute(name, value) {
          this.attributes[name] = value;
        },
      };
    },
  };
  runInNewContext(source, {
    document,
    window: {
      addEventListener: listen,
      requestIdleCallback: (callback) => idle.push(callback),
    },
    require: () => ({ emitPageView: () => views++ }),
  });
  return {
    document,
    idle,
    inserted,
    views: () => views,
    fire: (event) => events.get(event)?.forEach((callback) => callback()),
  };
}

test('nonessential scripts wait for load and idle, preserving footer order and attributes', async () => {
  const state = harness();
  state.fire('astro:page-load');
  assert.equal(state.inserted.length, 0);
  assert.equal(state.idle.length, 0);
  state.document.readyState = 'complete';
  state.fire('load');
  assert.equal(
    state.idle.length,
    1,
    'initial Astro event must not schedule a second page view'
  );
  assert.equal(state.inserted.length, 0);
  state.idle.shift()();
  await new Promise(setImmediate);
  assert.deepEqual(
    state.inserted.map((script) => script.attributes.src),
    state.document.scripts.map((script) => script.src)
  );
  for (const script of state.inserted) {
    assert.equal(script.async, false);
    assert.equal(script.attributes.type, undefined);
    assert.equal(script.attributes['data-project'], 'sarthakagrawal-personal');
  }
  assert.equal(state.views(), 1);
  state.document.body = {};
  state.fire('astro:page-load');
  state.idle.shift()();
  await new Promise(setImmediate);
  assert.equal(state.views(), 2);
  assert.equal(
    state.inserted.length,
    5,
    'health listeners are singleton; footer loaders rerun for the new body'
  );
});

test('a pending idle callback cannot activate scripts for an obsolete route', () => {
  const state = harness();
  state.document.readyState = 'complete';
  state.fire('load');
  state.document.body = {};
  state.idle.shift()();
  assert.equal(state.inserted.length, 0);
});

test('critical CSS preserves every initial declaration, including unsupported standard properties', async () => {
  const script = await readFile(
    new URL('./inline-critical-css.mjs', import.meta.url),
    'utf8'
  );
  const css = `
    :root { --font-display: sans-serif; --unused: red; }
    .font-display { font-family: var(--font-display); font-optical-sizing: auto; text-wrap: balance; letter-spacing: -.02em; }
    .text-balance { text-wrap: balance; }
    .font-display em, .font-display .accent { font-synthesis: none; letter-spacing: -.01em; font-weight: inherit; }
    .lede { text-wrap: pretty; line-height: 1.6; }
    .button { display: inline-flex; gap: .5rem; padding: 1rem; }
    @media (min-width: 40rem) { .font-display { font-size: 3rem; } }
    .below { text-wrap: balance; font-optical-sizing: auto; color: red; }
  `;
  const html = `<html><head><style>${css}</style></head><body><main><section><h1 class="font-display text-balance">Title <em class="accent">accent</em></h1><p class="lede">Lede</p><a class="button">Action</a></section><section id="focus" class="below"></section></main></body></html>`;
  const writes = new Map();
  await runInNewContext(
    `(async () => { ${script.replace(/^import .*;$/gm, '').replaceAll('import.meta.url', 'base')} })()`,
    {
      base: new URL('./inline-critical-css.mjs', import.meta.url).href,
      URL,
      Buffer,
      createHash,
      transform,
      readFile: async () => html,
      writeFile: async (file, value) => writes.set(file.pathname, value),
    }
  );
  const result = [...writes.values()].find((value) => value.includes('<html>'));
  const [head] = result.split('</head>');
  const critical = [...head.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
    .map((match) => match[1])
    .join('\n');
  const declarations = (code) => {
    const found = new Set();
    transform({
      code: Buffer.from(code),
      visitor: {
        Rule(rule) {
          if (rule.type !== 'style') return;
          for (const selector of rule.value.selectors) {
            const key = JSON.stringify(selector);
            if (key.includes('below')) continue;
            for (const declaration of rule.value.declarations.declarations) {
              if (declaration.value?.name === '--unused') continue;
              found.add(`${key}:${JSON.stringify(declaration)}`);
            }
          }
        },
      },
    });
    return found;
  };
  const actual = declarations(critical);
  for (const declaration of declarations(css)) {
    assert.ok(
      actual.has(declaration),
      `Missing initial declaration: ${declaration}`
    );
  }
  assert.ok(Buffer.byteLength(head) < 30_000);
  assert.doesNotMatch(critical, /--unused/);
});
