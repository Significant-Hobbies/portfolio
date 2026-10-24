const PROJECT_ID = 'sarthakagrawal-personal';
const POSTHOG_KEY = 'phc_qgiAarw4Co4pw9fz3Fxj4UJaHmqzFetqs4JrXhGc35Nd';
const POSTHOG_HOST = 'https://us.i.posthog.com';
const JOURNEY_IDLE_MS = 30 * 60 * 1000;
let journey: { id: string; lastActivityAt: number } | undefined;
let contactListenerAdded = false;

function pageContext() {
  const caseId = document.querySelector<HTMLElement>('[data-case-study]')
    ?.dataset.caseStudy;
  if (caseId && /^[a-z0-9-]{1,100}$/.test(caseId)) {
    return { page_kind: 'case_study', case_id: caseId };
  }
  return { page_kind: window.location.pathname === '/' ? 'home' : 'other' };
}

function emit(event: 'page_view' | 'case_viewed' | 'contact_intent', properties: ReturnType<typeof pageContext> & { method?: 'email' }) {
  if (typeof window === 'undefined') return;
  const now = Date.now();
  if (!journey || now - journey.lastActivityAt >= JOURNEY_IDLE_MS) {
    journey = { id: crypto.randomUUID(), lastActivityAt: now };
  }
  journey.lastActivityAt = now;
  void fetch(`${POSTHOG_HOST}/i/v0/e/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: POSTHOG_KEY,
      event,
      distinct_id: journey.id,
      properties: { ...properties, project_id: PROJECT_ID },
    }),
    keepalive: true,
  }).catch(() => {
    // Analytics must never break the page.
  });
}

export function emitPageView(): void {
  if (typeof window === 'undefined') return;
  const context = pageContext();
  emit('page_view', context);
  if (context.case_id) emit('case_viewed', context);
  if (contactListenerAdded) return;
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || !(event.target instanceof Element)) return;
    const link = event.target.closest('a[href^="mailto:"]');
    if (link) emit('contact_intent', { ...pageContext(), method: 'email' });
  });
  contactListenerAdded = true;
}
