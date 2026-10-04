import { getCollection } from 'astro:content';

import { catalogGroups, fleetCatalog } from './fleet-catalog';
import { education, experience } from './experience';
import { domains } from './expertise';
import { getResume, type ResumeTrack, resumeTracks } from './resume';
import { site } from './site';
import { spotlightProducts } from './spotlight-products';

export type AgentSurface = {
  id: string;
  path: string;
  title: string;
  description: string;
  markdown: string;
};

export function markdownPathFor(path: string) {
  return path === '/' ? '/index.md' : `${path}.md`;
}

export async function getAgentSurfaces(): Promise<AgentSurface[]> {
  const [workEntries, blogEntries] = await Promise.all([
    getCollection('work'),
    getCollection('blog', ({ data }) => !data.draft),
  ]);

  const sortedWork = [...workEntries].sort(
    (a, b) => a.data.order - b.data.order
  );
  const sortedBlog = [...blogEntries].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const home = renderHome();
  const about = renderAbout();
  const projects = renderProjects();
  const blogIndex = [
    '# Writing by Sarthak Agrawal',
    '',
    'Technical notes about AI infrastructure, distributed systems, product engineering, and operating a public software fleet.',
    '',
    ...sortedBlog.map(
      (entry) =>
        `- [${entry.data.title}](${site.url}/blog/${entry.id}): ${entry.data.description}`
    ),
  ].join('\n');

  return [
    surface('home', '/', site.name, site.description, home),
    surface(
      'about',
      '/about',
      `About ${site.name}`,
      `${site.name}'s engineering background, experience, education, and technical focus.`,
      about
    ),
    surface(
      'projects',
      '/projects',
      'Projects',
      'Selected public products and the canonical SaaS Maker directory.',
      projects
    ),
    ...resumeTracks.map((track) => {
      const resume = getResume(track);
      return surface(
        track === 'ai-infra' ? 'resume' : `resume-${track}`,
        resume.path,
        `${site.name} resume — ${resume.headline}`,
        `${resume.headline} résumé: work experience, selected projects, skills, and education.`,
        renderResume(track)
      );
    }),
    surface(
      'blog',
      '/blog',
      'Writing',
      'Technical writing by Sarthak Agrawal.',
      blogIndex
    ),
    ...sortedBlog.map((entry) =>
      surface(
        `blog-${entry.id}`,
        `/blog/${entry.id}`,
        entry.data.title,
        entry.data.description,
        renderContentEntry(entry.data.title, entry.data.description, entry.body)
      )
    ),
    surface(
      'privacy',
      '/privacy',
      'Privacy',
      'Privacy boundaries for the static portfolio site.',
      [
        '# Privacy',
        '',
        'This is a static portfolio site. It has no account system, application database, advertising tracker, or user-content upload.',
        '',
        'The site may fetch public GitHub repository metadata at build time. Visiting linked products or external profiles is governed by those destinations.',
        '',
        `Contact: ${site.email}`,
      ].join('\n')
    ),
    ...sortedWork.map((entry) =>
      surface(
        `work-${entry.id}`,
        `/work/${entry.id}`,
        entry.data.title,
        entry.data.summary,
        renderContentEntry(
          entry.data.title,
          [
            entry.data.summary,
            '',
            `Role: ${entry.data.role}`,
            `Year: ${entry.data.year}`,
            `Stack: ${entry.data.stack.join(', ')}`,
            ...(entry.data.repo ? [`Source: ${entry.data.repo}`] : []),
            ...(entry.data.demo ? [`Demo: ${entry.data.demo}`] : []),
          ].join('\n'),
          entry.body
        )
      )
    ),
  ];
}

function surface(
  id: string,
  path: string,
  title: string,
  description: string,
  markdown: string
): AgentSurface {
  return { id, path, title, description, markdown: `${markdown.trim()}\n` };
}

function renderHome() {
  const profileLinks = Object.entries(site.profiles).map(
    ([name, url]) => `- ${formatLabel(name)}: ${url}`
  );
  const productLinks = spotlightProducts.map(
    (product) => `- [${product.label}](${product.url}): ${product.description}`
  );

  return [
    `# ${site.name}`,
    '',
    `${site.role}. ${site.tagline}`,
    '',
    site.description,
    '',
    '## Current work',
    '',
    ...experience.map(
      (item) =>
        `- ${item.role}, ${item.company} (${item.period}): ${item.summary}`
    ),
    '',
    '## Selected products',
    '',
    ...productLinks,
    '',
    '## Canonical identity',
    '',
    `- Person ID: ${site.personId}`,
    `- Image: ${site.image}`,
    `- Location: ${site.location}`,
    ...profileLinks,
    `- Email: ${site.email}`,
  ].join('\n');
}

function renderAbout() {
  return [
    `# About ${site.name}`,
    '',
    site.description,
    '',
    '## Experience',
    '',
    ...experience.flatMap((item) => [
      `### ${item.role} — ${item.company}`,
      '',
      `${item.period}. ${item.summary}`,
      '',
      ...item.highlights.map((highlight) => `- ${highlight}`),
      '',
    ]),
    '## Technical focus',
    '',
    ...domains.flatMap((domain) => [
      `### ${domain.title}`,
      '',
      domain.blurb,
      '',
      `Tools: ${domain.items.join(', ')}`,
      '',
    ]),
    '## Education',
    '',
    `${education.degree}, ${education.school} (${education.period}).`,
  ].join('\n');
}

function renderProjects() {
  return [
    '# Projects',
    '',
    'The selected products below are the primary public work. The full live fleet catalog follows — every maintained product, platform, and experiment with its tier, URL, and description.',
    '',
    '## Spotlight products',
    '',
    ...spotlightProducts.flatMap((product) => [
      `### ${product.label}`,
      '',
      product.description,
      '',
      `- Product: ${product.url}`,
      `- Source: ${product.repositoryUrl}`,
      `- Organization: ${product.organizationUrl}`,
      '',
    ]),
    '## Full fleet catalog',
    '',
    `${fleetCatalog.length} live projects across four tiers. SaaS Maker (https://sassmaker.com) is the canonical human-readable directory.`,
    '',
    ...catalogGroups.flatMap((group) => [
      `### ${group.label}`,
      '',
      group.intro,
      '',
      ...group.entries.flatMap((entry) => {
        const lines = [
          `- **${entry.name}** (${entry.tier}, ${entry.priority}) — ${entry.description}`,
          `  URL: ${entry.url}`,
        ];
        if (entry.repo) lines.push(`  Repo: ${entry.repo}`);
        if (entry.domains.length > 1) {
          lines.push(`  Domains: ${entry.domains.join(', ')}`);
        }
        lines.push('');
        return lines;
      }),
    ]),
  ].join('\n');
}

function renderResume(track: ResumeTrack) {
  const resume = getResume(track);
  return [
    `# ${site.name} — ${resume.headline}`,
    '',
    `Location: ${site.location}`,
    `Email: ${site.email}`,
    `LinkedIn: ${site.profiles.linkedin}`,
    `GitHub: ${site.profiles.github}`,
    `PDF: ${site.url}${resume.pdfPath}`,
    `Other versions: ${resumeTracks
      .filter((t) => t !== track)
      .map((t) => `${site.url}${getResume(t).path}`)
      .join(', ')}`,
    '',
    resume.summary,
    '',
    '## Experience',
    '',
    ...resume.experience.flatMap((item) => [
      `### ${item.role} — ${item.company}`,
      '',
      `${item.period} · ${item.note}`,
      '',
      ...item.bullets.map((bullet) => `- ${bullet}`),
      '',
    ]),
    '## Selected projects',
    '',
    ...resume.projects.flatMap((project) => [
      `### ${project.name} — ${project.tagline}`,
      '',
      `Stack: ${project.stack}`,
      ...(project.href ? [`Link: ${project.href}`] : []),
      '',
      ...project.bullets.map((bullet) => `- ${bullet}`),
      '',
    ]),
    '## Skills',
    '',
    ...resume.skills.map((group) => `- **${group.label}:** ${group.items}`),
    '',
    '## Education',
    '',
    `${resume.education.degree}, ${resume.education.school} (${resume.education.period}).`,
    '',
    resume.education.detail,
  ].join('\n');
}

function renderContentEntry(
  title: string,
  description: string,
  body: string | undefined
) {
  return [`# ${title}`, '', description, '', body?.trim() || ''].join('\n');
}

function formatLabel(value: string) {
  return value === 'huggingFace'
    ? 'Hugging Face'
    : `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
