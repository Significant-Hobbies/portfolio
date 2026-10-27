const publicFields = [
  'id',
  'name',
  'description',
  'url',
  'repositoryUrl',
  'changelogUrl',
  'roadmapUrl',
  'kind',
  'category',
  'lifecycle',
  'shareable',
  'domains',
  'form',
  'platforms',
  'technologies',
  'group',
  'makerNote',
  'deployed',
  'deploymentProviders',
  'firstCommitAt',
  'latestCommitAt',
  'tier',
  'priority',
  'spotlight',
  'maturity',
  'pillarId',
];
const purposeFields = [
  'purpose',
  'audience',
  'outcome',
  'mechanism',
  'proof',
  'nextAction',
];

function publicProject(project) {
  if (project?.shareable !== true) throw new Error('Invalid public project');
  const result = Object.fromEntries(
    publicFields
      .filter((key) => Object.hasOwn(project, key))
      .map((key) => [key, project[key]])
  );
  for (const [key, value] of Object.entries(result)) {
    const valid = [
      'domains',
      'platforms',
      'technologies',
      'deploymentProviders',
    ].includes(key)
      ? Array.isArray(value) && value.every((item) => typeof item === 'string')
      : ['shareable', 'spotlight', 'deployed'].includes(key)
        ? typeof value === 'boolean'
        : typeof value === 'string';
    if (!valid) throw new Error('Invalid public project field');
  }
  if (project.purposeContract) {
    if (
      typeof project.purposeContract !== 'object' ||
      Array.isArray(project.purposeContract)
    )
      throw new Error('Invalid public purpose contract');
    result.purposeContract = Object.fromEntries(
      purposeFields
        .filter((key) => Object.hasOwn(project.purposeContract, key))
        .map((key) => [key, project.purposeContract[key]])
    );
    if (
      !Object.values(result.purposeContract).every(
        (value) => typeof value === 'string'
      )
    )
      throw new Error('Invalid public purpose contract');
  }
  return result;
}

export function normalizePublicCatalog(input) {
  if (
    !input ||
    ![5, 6].includes(input.schemaVersion) ||
    !Array.isArray(input.directory) ||
    !input.directory.length ||
    !Array.isArray(input.products) ||
    !Array.isArray(input.pastProjects) ||
    new Set(input.directory.map((project) => project.id)).size !==
      input.directory.length
  )
    throw new Error('Only a verified public projection may be synchronized');

  let catalog = input;
  if (input.schemaVersion === 6) {
    // Schema 6's directory is a broader roster. Explicit shareability still
    // defines this portfolio; archivedDirectory is never a publication source.
    const products = input.products.map(publicProject);
    const pastProjects = input.pastProjects.map(publicProject);
    if (
      !Array.isArray(input.generatedFrom) ||
      !input.generatedFrom.every((value) => typeof value === 'string') ||
      typeof input.historySemantics !== 'string'
    )
      throw new Error('Invalid public projection metadata');
    const directory = products.map((product) => {
      const entry = input.directory.find(
        (project) => project.id === product.id
      );
      const publicEntry = publicProject(entry);
      if (
        !['primary', 'active'].includes(publicEntry.lifecycle) ||
        !['product', 'platform', 'experiment'].includes(
          publicEntry.kind ?? 'product'
        )
      )
        throw new Error('Invalid active project classification');
      return {
        ...publicEntry,
        kind: publicEntry.kind ?? 'product',
        domains: publicEntry.domains ?? [],
      };
    });
    directory.push(
      ...pastProjects.map((project) => {
        const entry = input.directory.find((item) => item.id === project.id);
        const publicEntry = entry ? publicProject(entry) : project;
        return {
          ...publicEntry,
          kind: publicEntry.kind ?? 'experiment',
          domains: publicEntry.domains ?? [],
          lifecycle: 'inactive',
        };
      })
    );
    catalog = {
      schemaVersion: 5,
      generatedFrom: input.generatedFrom,
      historySemantics: input.historySemantics,
      directory,
      products,
      pastProjects,
    };
  }
  const ids = new Set(catalog.directory.map((project) => project.id));
  const derived = [...catalog.products, ...catalog.pastProjects];
  if (
    derived.length !== ids.size ||
    new Set(derived.map((project) => project.id)).size !== ids.size
  )
    throw new Error('Derived public lists do not match the directory');
  for (const project of [...catalog.directory, ...derived]) {
    if (
      project.shareable !== true ||
      !ids.has(project.id) ||
      ![project.id, project.name, project.description].every(
        (value) => typeof value === 'string' && value.trim()
      )
    )
      throw new Error('Invalid public project');
    for (const value of [
      project.url,
      project.repositoryUrl,
      project.changelogUrl,
      project.roadmapUrl,
    ].filter(Boolean)) {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.username || url.password)
        throw new Error(
          'Public project URLs must use HTTPS without credentials'
        );
    }
  }
  return catalog;
}
