import PDFDocument from 'pdfkit';

import { getResume, type ResumeTrack } from '@/data/resume';
import { site } from '@/data/site';

// Renders a résumé track to a one-page A4 PDF at build time, from the same
// data as the /resume pages, so the download can never drift from the site.
// Uses the built-in Helvetica family: real selectable text for ATS parsers
// and no font files to embed. Those fonts are WinAnsi-encoded, so résumé
// copy must avoid glyphs outside it (arrows, ≈, emoji).

type Doc = PDFKit.PDFDocument;
type Resume = ReturnType<typeof getResume>;

const A4_WIDTH = 595.28;
const LEFT = 40;
const WIDTH = A4_WIDTH - LEFT * 2;

const INK = '#111827';
const MUTED = '#4b5563';
const ACCENT = '#1f3a8a';
const RULE = '#9ca3af';

const BODY = 9.4;
const BULLET_INDENT = 10;
const SEPARATOR = '  |  ';

const bareUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '');
const plainDash = (period: string) => period.replace('—', '-');

function drawHeader(doc: Doc, headline: string) {
  doc
    .font('Helvetica-Bold')
    .fontSize(21)
    .fillColor(INK)
    .text(site.name, LEFT, LEFT, { width: WIDTH, align: 'center' });
  doc
    .moveDown(0.15)
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(ACCENT)
    .text(headline.toUpperCase(), {
      width: WIDTH,
      align: 'center',
      characterSpacing: 0.6,
    });

  const contacts = [
    { text: site.location, link: undefined },
    { text: site.email, link: `mailto:${site.email}` },
    { text: bareUrl(site.url), link: site.url },
    { text: bareUrl(site.profiles.github), link: site.profiles.github },
    { text: bareUrl(site.profiles.linkedin), link: site.profiles.linkedin },
  ];
  doc.moveDown(0.25).font('Helvetica').fontSize(8.6).fillColor(MUTED);
  const line = contacts.map((c) => c.text).join(SEPARATOR);
  let x = LEFT + (WIDTH - doc.widthOfString(line)) / 2;
  const { y } = doc;
  for (const [i, c] of contacts.entries()) {
    const w = doc.widthOfString(c.text);
    doc.text(c.text, x, y, { lineBreak: false });
    if (c.link) doc.link(x, y, w, doc.currentLineHeight(), c.link);
    x += w;
    if (i < contacts.length - 1) {
      doc.text(SEPARATOR, x, y, { lineBreak: false });
      x += doc.widthOfString(SEPARATOR);
    }
  }
  doc.x = LEFT;
  doc.y = y + 12;
}

function drawSection(doc: Doc, title: string) {
  doc.moveDown(0.55);
  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(INK)
    .text(title.toUpperCase(), LEFT, doc.y, {
      width: WIDTH,
      characterSpacing: 0.5,
    });
  const ruleY = doc.y + 1;
  doc
    .moveTo(LEFT, ruleY)
    .lineTo(LEFT + WIDTH, ruleY)
    .lineWidth(0.6)
    .strokeColor(RULE)
    .stroke();
  doc.y = ruleY + 4;
}

type Heading = { title: string; subtitle: string; right?: string };

function drawHeading(doc: Doc, heading: Heading) {
  const top = doc.y;
  const { title, subtitle, right } = heading;
  if (right) {
    doc
      .font('Helvetica')
      .fontSize(BODY)
      .fillColor(MUTED)
      .text(right, LEFT, top, { width: WIDTH, align: 'right' });
  }
  doc
    .font('Helvetica-Bold')
    .fontSize(BODY + 0.4)
    .fillColor(INK)
    .text(title, LEFT, top, { continued: true })
    .font('Helvetica')
    .fillColor(MUTED)
    .text(`${SEPARATOR}${subtitle}`);
  doc.y += 1.5;
}

function drawBullets(doc: Doc, items: string[]) {
  doc.font('Helvetica').fontSize(BODY).fillColor(INK);
  for (const item of items) {
    const top = doc.y;
    doc.text('•', LEFT + 2, top, { lineBreak: false });
    doc.text(item, LEFT + BULLET_INDENT, top, {
      width: WIDTH - BULLET_INDENT,
      lineGap: 0.6,
    });
    doc.y += 1.2;
  }
  doc.y += 2.5;
}

function drawBody(doc: Doc, resume: Resume) {
  drawSection(doc, 'Summary');
  doc
    .font('Helvetica')
    .fontSize(BODY)
    .fillColor(INK)
    .text(resume.summary, LEFT, doc.y, { width: WIDTH, lineGap: 0.8 });

  drawSection(doc, 'Experience');
  for (const job of resume.experience) {
    drawHeading(doc, {
      title: `${job.company} (${job.note})`,
      subtitle: job.role,
      right: plainDash(job.period),
    });
    drawBullets(doc, job.bullets);
  }

  drawSection(doc, 'Selected projects');
  for (const project of resume.projects) {
    drawHeading(doc, {
      title: project.name,
      subtitle: project.tagline,
      right: project.href && bareUrl(project.href),
    });
    drawBullets(doc, project.bullets);
  }

  drawSection(doc, 'Technical skills');
  for (const group of resume.skills) {
    doc
      .font('Helvetica-Bold')
      .fontSize(BODY)
      .fillColor(INK)
      .text(`${group.label}: `, LEFT, doc.y, {
        width: WIDTH,
        continued: true,
        lineGap: 0.6,
      })
      .font('Helvetica')
      .text(group.items);
    doc.y += 1.5;
  }

  drawSection(doc, 'Education');
  drawHeading(doc, {
    title: resume.education.school,
    subtitle: resume.education.degree,
    right: plainDash(resume.education.period),
  });
}

function renderResumePdf(track: ResumeTrack): Promise<Buffer> {
  const resume = getResume(track);
  const doc = new PDFDocument({
    size: 'A4',
    margin: LEFT,
    info: {
      Title: `${site.name} — ${resume.headline}`,
      Author: site.name,
      Subject: 'Résumé',
      Keywords: resume.skills.map((s) => s.items).join(', '),
    },
  });

  const chunks: Buffer[] = [];
  doc.on('data', (chunk: Buffer) => chunks.push(chunk));
  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });

  drawHeader(doc, resume.headline);
  drawBody(doc, resume);
  doc.end();
  return done;
}

export async function resumePdfResponse(track: ResumeTrack) {
  const pdf = await renderResumePdf(track);
  return new Response(new Uint8Array(pdf), {
    headers: { 'Content-Type': 'application/pdf' },
  });
}
