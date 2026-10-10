import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const source = await readFile(
  new URL('../src/components/astro/Clarity.astro', import.meta.url),
  'utf8'
);
const [, script] = source.match(/<script is:inline>([\s\S]*?)<\/script>/);

function boot() {
  const listeners = new Map();
  const injected = [];
  const timers = new Map();
  const window = {
    addEventListener(event, callback, options) {
      assert.equal(options.passive, true);
      assert.equal(options.once, true);
      listeners.set(event, callback);
    },
    removeEventListener(event) {
      listeners.delete(event);
    },
  };
  const context = {
    window,
    document: {
      createElement: () => ({}),
      getElementsByTagName: () => [
        { parentNode: { insertBefore: (tag) => injected.push(tag) } },
      ],
    },
    setTimeout(callback, delay) {
      timers.set(delay, callback);
      return delay;
    },
    clearTimeout: (id) => timers.delete(id),
  };
  runInNewContext(script, context);
  return { context, window, listeners, injected, timers };
}

test('Clarity queues immediately and injects once on each supported interaction', () => {
  for (const event of ['pointerdown', 'keydown', 'touchstart', 'scroll']) {
    const state = boot();
    assert.equal(state.injected.length, 0);
    assert.deepEqual(Array.from(state.window.clarity.q[0]), [
      'set',
      'project_id',
      'sarthakagrawal-personal',
    ]);
    state.window.clarity('set', 'example', 'queued');
    assert.equal(state.window.clarity.q.length, 2);
    const interact = state.listeners.get(event);
    const fallback = state.timers.get(90_000);
    interact();
    fallback();
    assert.equal(state.injected.length, 1);
    assert.equal(
      state.injected[0].src,
      'https://www.clarity.ms/tag/y6bw8jogxg'
    );
    assert.equal(state.injected[0].async, true);
    assert.equal(state.listeners.size, 0);
    assert.equal(state.timers.size, 0);
    runInNewContext(script, state.context);
    assert.equal(state.injected.length, 1);
    assert.equal(state.listeners.size, 0);
  }
});

test('Clarity loads after the 90 second fallback without interaction', () => {
  const state = boot();
  assert.deepEqual([...state.timers.keys()], [90_000]);
  state.timers.get(90_000)();
  assert.equal(state.injected.length, 1);
  assert.equal(state.listeners.size, 0);
});
