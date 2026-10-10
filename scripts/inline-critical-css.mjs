import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { transform } from 'lightningcss';

// Home alone uses the gallery bundle. Keep static-page styles (including layout
// below the fold, so an early scroll never exposes unstyled content), while the
// library's other blocks, themes and dynamic states load asynchronously.
const file = new URL('../dist/index.html', import.meta.url);
const source = await readFile(file, 'utf8');
const styles = /<style[^>]*>([\s\S]*?)<\/style>/g;
// Use the same font policy in both CSS stages: a late font download must not
// rewrap text when the deferred stylesheet becomes active.
const css = [...source.matchAll(styles)]
  .map((match) => match[1])
  .join('\n')
  .replaceAll('font-display:swap', 'font-display:optional');
// CSS background URLs are otherwise fetched even far below the viewport.
// Keep geometry intact and let the home observer activate this decoration.
const html = source
  .replace(styles, '')
  .replace(
    /(<section id="directory"[^>]*>[\s\S]*?)style="background-image:url\(([^)]+)\)"/,
    '$1data-deferred-background="$2"'
  );
const initial = html.slice(0, html.search(/<section[^>]*id="focus"/));
const allClasses = new Set(
  [...html.matchAll(/class="([^"]*)"/g)].flatMap((match) =>
    match[1].replaceAll('&amp;', '&').split(/\s+/)
  )
);
const classes = new Set(
  [...initial.matchAll(/class="([^"]*)"/g)].flatMap((match) =>
    match[1].replaceAll('&amp;', '&').split(/\s+/)
  )
);
const types = new Set(
  [...initial.matchAll(/<([\w-]+)/g)].map((match) => match[1])
);

function matches(selector, aboveFold = true) {
  return selector.every((part) => {
    if (part.type === 'class')
      return (aboveFold ? classes : allClasses).has(part.name);
    if (part.type === 'type') return !aboveFold || types.has(part.name);
    if (part.type === 'id')
      return (aboveFold ? initial : html).includes(`id="${part.name}"`);
    if (part.type === 'attribute' && part.name.startsWith('data-')) {
      // The theme bootstrap can switch modes before paint.
      if (part.name === 'data-mode') return true;
      return part.operation?.operator === 'equal'
        ? html.includes(`${part.name}="${part.operation.value}"`)
        : html.includes(part.name);
    }
    if (part.type === 'pseudo-class' && ['where', 'is'].includes(part.kind)) {
      return part.selectors.some((nested) => matches(nested, aboveFold));
    }
    return true;
  });
}

// Keep below-fold geometry, then reveal its decoration when the full CSS is ready.
const layoutProperty =
  /^(display|position|inset|top|right|bottom|left|float|clear|box-sizing|width|height|min-|max-|margin|padding|gap|row-gap|column-gap|grid|flex|align|justify|order|font|line-height|letter-spacing|text-(align|wrap|transform|indent|overflow)|white-space|word|overflow|border(?!.*(?:color|radius))|aspect-ratio|columns|column-width|column-count|list-style|vertical-align|writing-mode)/;
function isVariable(declaration) {
  // Lightning CSS also represents unsupported standard properties (text-wrap,
  // font-optical-sizing, font-synthesis, etc.) as `custom` declarations.
  return (
    declaration.property === 'custom' && declaration.value.name.startsWith('--')
  );
}

function keepLayout(declaration) {
  const property =
    declaration.property === 'unparsed'
      ? declaration.value.propertyId.property
      : declaration.property === 'custom'
        ? declaration.value.name
        : declaration.property;
  return isVariable(declaration) || layoutProperty.test(property);
}

const faces = new Set();
const ruleContexts = [];
let layoutOnly = false;
const selected = transform({
  filename: 'home.css',
  code: Buffer.from(css),
  minify: true,
  visitor: {
    Rule(rule) {
      if (
        rule.type === 'style' &&
        !rule.value.selectors.some((selector) => matches(selector, false))
      )
        return [];
      if (rule.type === 'font-face') {
        const face = JSON.stringify(rule.value.properties, (key, value) =>
          key === 'loc' ? undefined : value
        );
        if (!face.includes('Geist') || faces.has(face)) return [];
        faces.add(face);
      }
      ruleContexts.push(layoutOnly);
      layoutOnly =
        rule.type === 'style' &&
        !rule.value.selectors.some((selector) => matches(selector));
    },
    RuleExit() {
      layoutOnly = ruleContexts.pop();
    },
    Declaration(declaration) {
      if (layoutOnly && !keepLayout(declaration)) return [];
    },
  },
}).code.toString();

// Follow variable dependencies rather than inlining every library token.
const variables = new Map();
const referenced = new Set();
transform({
  filename: 'home.css',
  code: Buffer.from(selected),
  visitor: {
    Declaration(declaration) {
      const value = JSON.stringify(declaration.value);
      const names = [...value.matchAll(/--[\w-]+/g)].map((match) => match[0]);
      if (isVariable(declaration)) {
        variables.set(declaration.value.name, [
          ...(variables.get(declaration.value.name) ?? []),
          ...names.filter((name) => name !== declaration.value.name),
        ]);
      } else {
        for (const name of names) referenced.add(name);
      }
    },
  },
});
for (const match of html.matchAll(/var\((--[\w-]+)/g)) referenced.add(match[1]);
for (const name of referenced) {
  for (const dependency of variables.get(name) ?? [])
    referenced.add(dependency);
}
const minimal = transform({
  filename: 'home.css',
  code: Buffer.from(selected),
  minify: true,
  visitor: {
    Declaration(declaration) {
      if (isVariable(declaration) && !referenced.has(declaration.value.name))
        return [];
    },
    Rule(rule) {
      if (rule.type === 'property' && !referenced.has(rule.value.name))
        return [];
    },
  },
}).code.toString();
const critical = transform({
  filename: 'home.css',
  code: Buffer.from(minimal),
  minify: true,
  visitor: {
    Rule(rule) {
      if (
        rule.type === 'style' &&
        !rule.value.selectors.some((selector) => matches(selector))
      )
        return [];
    },
  },
}).code.toString();

// Audit the generated page, not just a fixed list of typography properties.
// Expand grouped selectors and retain conditional contexts so every initial
// rule has the same declarations and values in both CSS stages.
function initialDeclarations(code) {
  const found = new Map();
  const contexts = [];
  transform({
    filename: 'home.css',
    code: Buffer.from(code),
    visitor: {
      Rule(rule) {
        const { rules, loc, ...condition } = rule.value;
        if (rule.type !== 'style') {
          contexts.push(JSON.stringify({ type: rule.type, ...condition }));
          return;
        }
        for (const selector of rule.value.selectors.filter((value) =>
          matches(value)
        )) {
          for (const key of ['declarations', 'importantDeclarations']) {
            for (const declaration of rule.value.declarations[key]) {
              if (
                isVariable(declaration) &&
                !referenced.has(declaration.value.name)
              )
                continue;
              const property =
                declaration.property === 'custom'
                  ? declaration.value.name
                  : declaration.property === 'unparsed'
                    ? declaration.value.propertyId.property
                    : declaration.property;
              found.set(
                JSON.stringify([contexts, selector, key, property]),
                JSON.stringify(declaration, (name, value) =>
                  name === 'loc' ? undefined : value
                )
              );
            }
          }
        }
      },
      RuleExit(rule) {
        if (rule.type !== 'style') contexts.pop();
      },
    },
  });
  return found;
}
const initialFull = initialDeclarations(css);
const initialCritical = initialDeclarations(critical);
for (const [key, value] of initialFull) {
  if (initialCritical.get(key) !== value) {
    throw new Error(
      `Critical CSS differs from full CSS for initial declaration ${key}: ${value}`
    );
  }
}
const layout = transform({
  filename: 'home.css',
  code: Buffer.from(minimal),
  minify: true,
  visitor: {
    Rule(rule) {
      if (['property', 'font-face', 'keyframes'].includes(rule.type)) return [];
      if (
        rule.type === 'style' &&
        rule.value.selectors.some((selector) => matches(selector))
      )
        return [];
    },
  },
}).code.toString();
const hash = createHash('sha256').update(css).digest('hex').slice(0, 12);
const href = `/_astro/home-rest.${hash}.css`;
await writeFile(new URL(`../dist${href}`, import.meta.url), css);
const cloak =
  'html:not([data-home-css-ready]) main>section:not(:first-child),html:not([data-home-css-ready]) footer,html:not([data-home-css-ready]) .home-contact{visibility:hidden}';
const links = `<link data-home-rest-css data-href="${href}" onload="document.documentElement.setAttribute('data-home-css-ready','')"><noscript><link rel="stylesheet" href="${href}"><style>${cloak.replaceAll('hidden', 'visible')}#directory [data-deferred-background]{background-image:url(/images/personal-workbench.webp)}</style></noscript>`;
const result = html
  .replace(/(?=<section[^>]*id="focus")/, `<style>${layout}</style>`)
  .replace('</head>', `<style>${critical}${cloak}</style>${links}</head>`);
if (Buffer.byteLength(result.split('</head>')[0]) >= 30_000) {
  throw new Error(
    `Home head exceeds the 30 KB critical-CSS budget: ${Buffer.byteLength(result.split('</head>')[0])} bytes (${critical.length} CSS)`
  );
}
await writeFile(file, result);
