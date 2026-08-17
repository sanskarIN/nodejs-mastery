import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const repository = 'https://github.com/sanskarIN/nodejs-mastery';
const root = process.cwd();
const projectsRoot = resolve(root, 'projects');
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

const rootPackage = readPackage(resolve(root, 'package.json'));
const components = [];

for (const entry of readdirSync(projectsRoot, { withFileTypes: true })) {
  if (!entry.isDirectory() || !/^part-\d{3}$/.test(entry.name)) continue;
  const packagePath = resolve(projectsRoot, entry.name, 'package.json');
  const pkg = readPackage(packagePath);
  components.push(componentFromPackage(pkg, `projects/${entry.name}`));
}

components.sort((a, b) => a.name.localeCompare(b.name));

const bom = {
  bomFormat: 'CycloneDX',
  specVersion: '1.5',
  version: 1,
  metadata: {
    component: componentFromPackage(rootPackage, '.', 'application'),
    properties: [
      { name: 'nodejs-mastery:source', value: repository },
      { name: 'nodejs-mastery:commercial-edition', value: 'https://ramsandesh.gumroad.com' }
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
