import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { listProjects } from './project-registry.mjs';

const path = resolve(process.cwd(), 'dist', 'nodejs-mastery-sbom.cdx.json');
if (!existsSync(path)) {
  throw new Error('SBOM is missing; run npm run sbom before validating it');
}

const bom = JSON.parse(readFileSync(path, 'utf8'));
const projects = listProjects();
const errors = [];

if (bom.bomFormat !== 'CycloneDX') errors.push('bomFormat must be CycloneDX');
if (bom.specVersion !== '1.5') errors.push('specVersion must be 1.5');
if (bom.metadata?.component?.name !== 'nodejs-mastery-companion') errors.push('root component name is incorrect');
if (bom.metadata?.component?.version !== '1.1.0') errors.push('root component version is incorrect');
if (!Array.isArray(bom.components) || bom.components.length !== projects.length) {
  errors.push(`expected ${projects.length} companion components, found ${bom.components?.length ?? 0}`);
}

const refs = new Set();
for (const component of bom.components ?? []) {
  if (!component['bom-ref']) errors.push(`component ${component.name ?? '<unknown>'} is missing bom-ref`);
  else if (refs.has(component['bom-ref'])) errors.push(`duplicate bom-ref: ${component['bom-ref']}`);
  else refs.add(component['bom-ref']);

  const license = component.licenses?.[0]?.license?.id;
  if (license !== 'MIT') errors.push(`${component.name ?? '<unknown>'} must declare MIT in the public-code SBOM`);
}

if (!Array.isArray(bom.dependencies) || bom.dependencies.length !== projects.length) {
  errors.push('dependency graph must contain one node per companion project');
} else {
  for (const dependency of bom.dependencies) {
    if (!refs.has(dependency.ref)) errors.push(`dependency graph references unknown component: ${dependency.ref}`);
    if (!Array.isArray(dependency.dependsOn) || dependency.dependsOn.length !== 0) {
      errors.push(`dependency graph for ${dependency.ref} must remain empty while the npm allowlist is empty`);
    }
  }
}

const metadataProperties = new Map((bom.metadata?.properties ?? []).map((entry) => [entry.name, entry.value]));
if (metadataProperties.get('nodejs-mastery:commercial-edition') !== 'https://ramsandesh.gumroad.com') {
  errors.push('SBOM metadata is missing the official commercial-edition storefront');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  verified: true,
  format: `${bom.bomFormat} ${bom.specVersion}`,
  rootComponent: bom.metadata.component.name,
  companionComponents: bom.components.length,
  uniqueRefs: refs.size,
  dependencyEdges: 0
}, null, 2));
