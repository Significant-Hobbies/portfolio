import { getCollection } from 'astro:content';
import { privacy, privacyMarkdown } from './privacy';
import homeContent from '../content/home.json';
import { absoluteMarkdownLinks } from '../lib/agent-surfaces/format.mjs';

import { fleetProductGroups, fleetProjectCount } from './fleet-products';
import { rootDomains } from './root-domains';
import { getProjectGroups, getRepos } from '../lib/github';
import { education, experience } from './experience';
import { aboutParagraphs, toolbox } from './about';
import { getResume, type ResumeTrack, resumeTracks } from './resume';
import { site } from './site';
import { spotlightProducts } from './spotlight-products';

export type AgentSurface = {
  id: string;
  path: string;
  title: string;
  description: string;
  markdown: string;
  lastUpdated?: string;
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

  const home = renderHome(sortedWork.filter((entry) => entry.data.featured));
  const about = renderAbout();
  const projects = await renderProjects();
  const blogIndex = [
    '# Writing by Sarthak Agrawal',
    '',
    'Notes on systems & infrastructure.',
    '',
    ...sortedBlog.map(
      (entry) =>
        `- [${entry.data.title}](${site.url}/blog/${entry.id}) — ${new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(entry.data.date)}`
    ),
    '',
    '## Working notes, published from GitHub.',
    '',
    'Shorter ideas and experiments live in repository issues. I write and edit them on GitHub; this reading view updates without waiting for a site release.',
    '',
    '[Read the issue notes on GitHub.](https://github.com/sarthakagrawal927/portfolio/issues?q=is%3Aissue+label%3Aissues+author%3Asarthakagrawal927)',
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
        renderContentEntry(
          entry.data.title,
          `${entry.data.description}\n\nPublished: ${entry.data.date.toISOString().slice(0, 10)}\nTags: ${entry.data.tags.join(', ')}\n\nWritten by AI agents under ${site.name}’s direction.`,
          entry.body
        ),
        entry.data.date.toISOString().slice(0, 10)
      )
    ),
    surface(
      'privacy',
      '/privacy',
      'Privacy',
      'Privacy boundaries for the static portfolio site.',
      privacyMarkdown(),
      privacy.updated
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
            ...entry.data.metrics.map(
              (metric) => `${metric.label}: ${metric.value}`
            ),
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
  markdown: string,
  lastUpdated?: string
): AgentSurface {
  const canonical = new URL(path, site.url).href;
  const body = markdown.trim().replace(/^# [^\n]+\n*/, '');
  return {
    id,
    path,
    title,
    description,
    lastUpdated,
    markdown: absoluteMarkdownLinks(
      `# ${title}\n\n> ${description}\n\nCanonical: ${canonical}\n${lastUpdated ? `Last updated: ${lastUpdated}\n` : ''}\n${body}\n`,
      canonical
    ),
  };
}

function renderHome(work: Awaited<ReturnType<typeof getCollection<'work'>>>) {
  const { hero } = homeContent;
  const lines = [
    `# ${site.name}`,
    '',
    hero.eyebrow,
    '',
    hero.title,
    '',
    hero.lede,
    '',
    hero.status.label,
    '',
  ];
  for (const section of homeContent.sections) {
    lines.push(`## ${section.title}`, '', section.eyebrow, '');
    if (section.id === 'focus') {
      lines.push(
        section.lede,
        '',
        ...spotlightProducts.map(
          (product) =>
            `- [${product.label}](${product.url}): ${product.description}`
        ),
        ''
      );
    } else if (section.id === 'work') {
      lines.push(
        `${work.length} ${work.length === 1 ? 'project' : 'projects'} from my professional and personal work — what the problem was, what I built, and what changed.`,
        '',
        ...work.map(
          (entry) =>
            `- [${entry.data.title}](${site.url}/work/${entry.id}): ${entry.data.summary}`
        ),
        ''
      );
    }
  }
  lines.push(
    `## ${homeContent.closing.title}`,
    '',
    homeContent.closing.note,
    '',
    `[${homeContent.closing.primary.label}](${homeContent.closing.primary.href})`,
    '',
    `Contact: ${site.email}`
  );
  return lines.join('\n');
}

function renderAbout() {
  return [
    `# About ${site.name}`,
    '',
    'I like the hard, invisible parts.',
    '',
    ...aboutParagraphs.flatMap((parts) => [
      parts
        .map((part) =>
          part.href
            ? `[${part.text}](${new URL(part.href, site.url).href})`
            : part.text
        )
        .join(''),
      '',
    ]),
    '## Quick facts',
    '',
    `- Role: ${site.role}`,
    '- At: Vault Wealth',
    `- Based in: ${site.location}`,
    '- Focus: backend · infra · ai',
    `- Status: ${site.availability}`,
    '',
    '## Education',
    '',
    `${education.degree}, ${education.school} (${education.period}).`,
    '',
    `[View résumé](${new URL(site.resumeUrl, site.url).href})`,
    '',
    '## Experience',
    '',
    ...experience.flatMap((item) => [
      `### ${item.role} — ${item.company}`,
      '',
      `${item.period}. ${item.summary}`,
      ...(item.companyUrl ? [`Company: ${item.companyUrl}`] : []),
      ...(item.tag ? [item.tag] : []),
      `Stack: ${item.stack.join(', ')}`,
      '',
      ...item.highlights.map((highlight) => `- ${highlight}`),
      '',
    ]),
    '## What I build with.',
    '',
    'Tools earn their place by surviving production — not by being new.',
    '',
    ...toolbox.flatMap((group) => [
      `### ${group.group}`,
      '',
      ...group.items.map((item) => `- ${item}`),
      '',
    ]),
  ].join('\n');
}

async function renderProjects() {
  const [groups, repos] = await Promise.all([getProjectGroups(), getRepos()]);
  const bucketSummary = fleetProductGroups
    .map((group) => `${group.products.length} ${group.label.toLowerCase()}`)
    .join(' / ');
  const lines = [
    '# Projects',
    '',
    '## The product fleet.',
    '',
    `The public selection contains working experiments: ${bucketSummary}, ${fleetProjectCount} shareable entries total. For the canonical directory and product pages, visit SaaS Maker.`,
    '',
    'SaaS Maker is the broader directory for the fleet — product pages, supporting tools, and the operating layer behind them.',
    '',
    '[Open SaaS Maker](https://sassmaker.com)',
    '',
    '## Canonical roots.',
    '',
    'Public roots represented in the verified selection.',
    '',
    ...rootDomains.map(
      (root) =>
        `- [${root.name}](${root.url}) (${root.tier}; ${root.domain}): ${root.blurb}`
    ),
    '',
  ];
  for (const group of fleetProductGroups) {
    lines.push(
      `## ${group.label}`,
      '',
      group.intro,
      '',
      ...group.products.map(
        (product) =>
          `- [${product.name}](${product.url}) (${product.maturity.replace('-', ' ')}): ${product.description}${product.repo && product.repo !== product.url ? ` Source: ${product.repo}` : ''}`
      ),
      ''
    );
  }
  lines.push(
    '## Explore the source.',
    '',
    `Source repositories for the verified public selection. My GitHub archive contains ${repos.length} public repositories, including older work outside this selection.`,
    ''
  );
  if (!groups.length)
    lines.push("The live project list couldn't be fetched at build time.", '');
  for (const group of groups) {
    lines.push(
      `### ${group.label} (${group.repos.length})`,
      '',
      group.intro,
      ''
    );
    for (const repo of group.repos) {
      const updated = repo.updated
        ? new Intl.DateTimeFormat('en', {
            month: 'short',
            year: 'numeric',
          }).format(new Date(repo.updated))
        : '';
      lines.push(
        `- [${repo.name.replace(/[-_]/g, ' ')}](${repo.url}): ${repo.description ?? 'No description.'}${repo.language ? ` Language: ${repo.language}.` : ''}${repo.stars > 0 ? ` Stars: ${repo.stars}.` : ''}${repo.forks > 0 ? ` Forks: ${repo.forks}.` : ''}${updated ? ` Updated: ${updated}.` : ''}`
      );
    }
  }
  lines.push(
    '',
    `[Browse all on GitHub](https://github.com/${site.githubUser}?tab=repositories)`
  );
  return lines.join('\n');
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
      ...(item.context ? ['', item.context] : []),
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
