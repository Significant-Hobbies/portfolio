import assert from 'node:assert/strict';
import test from 'node:test';

test('page, case and contact events share only an expiring in-memory journey', async (t) => {
  let now = 1000;
  let caseId;
  const events = [];
  const listeners = [];
  class ClickTarget {
    closest(selector) {
      assert.equal(selector, 'a[href^="mailto:"]');
      return this;
    }
  }
  const mocks = t.mock;
  mocks.method(Date, 'now', () => now);
  mocks.method(globalThis, 'fetch', async (_url, options) => {
    events.push(JSON.parse(options.body));
    return new Response('{}');
  });
  const original = Object.fromEntries(
    ['window', 'document', 'Element'].map((key) => [
      key,
      Object.getOwnPropertyDescriptor(globalThis, key),
    ])
  );
  Object.assign(globalThis, {
    window: { location: { pathname: '/', search: '?secret=private' } },
    document: {
      querySelector: () => (caseId ? { dataset: { caseStudy: caseId } } : null),
      addEventListener: (name, listener) => {
        assert.equal(name, 'click');
        listeners.push(listener);
      },
    },
    Element: ClickTarget,
  });
  t.after(() => {
    for (const [key, descriptor] of Object.entries(original)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  });
  const { emitPageView } = await import('../src/lib/product-analytics.ts');
  emitPageView();
  caseId = 'example-case';
  window.location.pathname = '/work/example-case/';
  emitPageView();
  listeners[0]({ target: new ClickTarget(), defaultPrevented: false });
  assert.deepEqual(
    events.map(({ event }) => event),
    ['page_view', 'page_view', 'case_viewed', 'contact_intent']
  );
  assert.equal(new Set(events.map(({ distinct_id }) => distinct_id)).size, 1);
  assert.equal(listeners.length, 1);
  assert.deepEqual(events[3].properties, {
    page_kind: 'case_study',
    case_id: 'example-case',
    method: 'email',
    project_id: 'sarthakagrawal-personal',
  });
  assert.doesNotMatch(
    JSON.stringify(events),
    /private|mailto:|example\.com|secret|\/work\//
  );

  now += 30 * 60 * 1000;
  caseId = 'private?query';
  emitPageView();
  assert.notEqual(events.at(-1).distinct_id, events[0].distinct_id);
  assert.deepEqual(events.at(-1).properties, {
    page_kind: 'other',
    project_id: 'sarthakagrawal-personal',
  });
  const beforePrevented = events.length;
  listeners[0]({ target: new ClickTarget(), defaultPrevented: true });
  assert.equal(events.length, beforePrevented);

  mocks.method(globalThis, 'fetch', async () => {
    throw new Error('offline');
  });
  assert.doesNotThrow(emitPageView);
  await new Promise((resolve) => setImmediate(resolve));
  Reflect.deleteProperty(globalThis, 'window');
  assert.doesNotThrow(emitPageView);
});
