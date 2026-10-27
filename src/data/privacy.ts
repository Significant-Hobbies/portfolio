import { site } from './site';

export const privacy = {
  updated: '2026-10-24',
  displayedDate: 'October 24, 2026',
  introduction: `${site.url} is a personal portfolio and writing site. It does not require an account and does not collect form submissions on this domain. Contact links open your email client. This site does not receive the email's contents.`,
  collections: [
    {
      label: 'Edge logs:',
      text: 'Cloudflare may log standard request metadata (IP address, user agent, path) for security and performance.',
    },
    {
      label: 'Product analytics:',
      text: 'PostHog records page views, the public case study viewed and email-link clicks. A random identifier links these events within the current tab\'s page session and expires after 30 minutes without an event. It is held only in page memory, clears on reload or tab closure and is not stored in a cookie or browser storage. The events do not include the email address, message, URL query or a claim that an inquiry was received. Microsoft Clarity records aggregate usage and session-replay data so I can understand how this public portfolio is used. App Health records page views and the named Projects navigation action using session-only identity. This site does not send contact form content because it has no contact form.',
    },
    {
      label: 'Third-party links:',
      text: 'Linked products and external profiles operate on their own domains with separate policies.',
    },
  ],
};

export function privacyMarkdown() {
  return [
    '# Privacy Policy',
    '',
    '## What this site is',
    '',
    privacy.introduction,
    '',
    '## What may be collected',
    '',
    ...privacy.collections.map((item) => `- **${item.label}** ${item.text}`),
    '',
    '## Contact',
    '',
    `Questions: [${site.email}](mailto:${site.email})`,
  ].join('\n');
}
