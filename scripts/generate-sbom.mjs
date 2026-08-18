import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const repository = 'https://github.com/sanskarIN/nodejs-mastery';
const root = process.cwd();
const projectsRoot = resolve(root, 'projects');
const supplementalRoot = resolve(root, 'supplemental');
const output = resolve(root, 'dist', 'nodejs-mastery-sbom.cdx.json');

function readPackage(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function componentFromPackage(pkg, path, type = 'application') {
  return {
    type,
    'bom-ref': `pkg:npm/${encodeURIComponent(pkg.name)}@${pkg.version}`,
    name: pkg.name,
    version: pkg.version,
    licenses: [{ license: { id: pkg.license ?? 'NOASSERTION' } }],
    properties: [
      { name: 'nodejs-mastery:path', value: path },
      { name: 'nodejs-mastery:node-engine', value: String(pkg.engines?.node ?? 'unspecified') }
    ],
    externalReferences: [
      { type: 'vcs', url: path === '.' ? repository : `${repository}/tree/main/${path}` }
    ]
  };
}

function collectPackages(directory, prefix, predicate = () => true) {
  if (!existsSync(directory)) return [];
  const result = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || !predicate(entry.name)) continue;
    const packagePath = resolve(directory, entry.name, 'package.json');
    if (!existsSync(packagePath)) continue;
    const pkg = readPackage(packagePath);
    result.push(componentFromPackage(pkg, `${prefix}/${entry.name}`));
  }
  return result;
}

const rootPackage = readPackage(resolve(root, 'package.json'));
const components = [
  ...collectPackages(projectsRoot, 'projects', (name) => /^part-\d{3}$/.test(name)),
  ...collectPackages(supplementalRoot, 'supplemental')
].sort((a, b) => a.name.localeCompare(b.name));

const bom = {
  bomFormat: 'CycloneDX',
  specVersion: '1.5',
  version: 1,
  metadata: {
    component: componentFromPackage(rootPackage, '.', 'application'),
    properties: [
      { name: 'nodejs-mastery:source', value: repository },
      { name: 'nodejs-mastery:commercial-edition', value: 'https://ramsandesh.gumroad.com' },
      { name: 'nodejs-mastery:supplemental-labs', value: String(components.filter((c) => c.properties.some((p) => p.value.startsWith('supplemental/'))).length) }
    ]
  },
  components,
  dependencies: components.map((component) => ({ ref: component['bom-ref'], dependsOn: [] }))
};

mkdirSync(resolve(root, 'dist'), { recursive: true });
writeFileSync(output, `${JSON.stringify(bom, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({
  generated: true,
  format: 'CycloneDX 1.5',
  output: 'dist/nodejs-mastery-sbom.cdx.json',
  components: components.length + 1,
  thirdPartyRuntimeDependencies: 0
}, null, 2));
