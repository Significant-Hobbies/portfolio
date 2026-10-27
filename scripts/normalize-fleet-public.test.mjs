import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizePublicCatalog } from './normalize-fleet-public.mjs';

function fixture() {
  const active = {
    id: 'active',
    name: 'Active',
    description: 'Public product',
    shareable: true,
    url: 'https://example.com',
    lifecycle: 'active',
  };
  const past = {
    id: 'past',
    name: 'Past',
    description: 'Public past project',
    shareable: true,
    repositoryUrl: 'https://github.com/example/past',
    lifecycle: 'inactive',
  };
  return {
    schemaVersion: 6,
    generatedFrom: ['public.json'],
    historySemantics: 'Retained history dates',
    directory: [
      {
        ...active,
        kind: 'product',
        domains: ['example.com'],
        privateNote: 'must-not-publish',
        purposeContract: {
          purpose: 'Public purpose',
          internal: 'must-not-publish',
        },
      },
      { id: 'unflagged', name: 'Unflagged', description: 'must-not-publish' },
      { id: 'private', shareable: false, description: 'must-not-publish' },
    ],
    products: [active],
    pastProjects: [past],
    archivedDirectory: [{ id: 'archive', description: 'must-not-publish' }],
    internal: 'must-not-publish',
  };
}

test('schema6 publishes only explicit shareable active and past records in the legacy shape', () => {
  const input = fixture();
  const original = structuredClone(input);
  const output = normalizePublicCatalog(input);
  assert.equal(output.schemaVersion, 5);
  assert.deepEqual(
    output.directory.map((project) => project.id),
    ['active', 'past']
  );
  assert.deepEqual(output.directory[0].domains, ['example.com']);
  assert.equal(output.directory[1].lifecycle, 'inactive');
  assert.equal(output.directory[1].kind, 'experiment');
  assert.deepEqual(output.directory[1].domains, []);
  assert.equal(JSON.stringify(output).includes('must-not-publish'), false);
  assert.deepEqual(input, original);
  assert.deepEqual(normalizePublicCatalog(output), output);
});

test('schema6 rejects missing, contradictory, duplicate or unsafe selected identities', () => {
  for (const mutate of [
    (data) => {
      data.products[0].shareable = false;
    },
    (data) => {
      data.pastProjects[0].shareable = false;
    },
    (data) => {
      data.directory[0].shareable = false;
    },
    (data) => {
      data.directory.shift();
    },
    (data) => {
      data.directory.push(data.directory[0]);
    },
    (data) => {
      data.pastProjects.push(data.products[0]);
    },
    (data) => {
      data.products[0].id = '';
    },
    (data) => {
      data.directory[0].url = 'javascript:alert(1)';
    },
    (data) => {
      data.pastProjects[0].repositoryUrl = 'https://user:password@example.com';
    },
    (data) => {
      data.directory[0].domains = { internal: 'private' };
    },
    (data) => {
      data.directory[0].purposeContract.purpose = { internal: 'private' };
    },
  ]) {
    const input = fixture();
    mutate(input);
    assert.throws(() => normalizePublicCatalog(input));
  }
});

test('schema6 preserves a shareable past directory entry and rejects conflicting visibility', () => {
  const input = fixture();
  input.directory.push({
    ...input.pastProjects[0],
    kind: 'product',
    url: 'https://past.example.com',
    domains: ['past.example.com'],
  });
  const [, past] = normalizePublicCatalog(input).directory;
  assert.equal(past.kind, 'product');
  assert.equal(past.url, 'https://past.example.com');
  assert.deepEqual(past.domains, ['past.example.com']);
  input.directory[3].shareable = false;
  assert.throws(() => normalizePublicCatalog(input));
  input.directory[3].shareable = undefined;
  assert.throws(() => normalizePublicCatalog(input));
});
