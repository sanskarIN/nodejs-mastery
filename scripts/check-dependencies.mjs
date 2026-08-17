import { readFileSync } from 'node:fs';
import { listProjects } from './project-registry.mjs';

const policy = JSON.parse(readFileSync('config/dependency-policy.json', 'utf8'));
const dependencyFields = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];
const errors = [];

function declaredDependencies(pkg) {
  return [...new Set(dependencyFields.flatMap((field) => Object.keys(pkg?.[field] ?? {})))].sort();
}

function validate(name, pkg, allowed) {
  const declared = declaredDependencies(pkg);
  const allow = new Set(allowed ?? []);
  for (const dependency of declared) {
    if (!allow.has(dependency)) errors.push(`${name}: dependency '${dependency}' is not allowlisted`);
  }
  for (const dependency of allow) {
    if (!declared.includes(dependency)) errors.push(`${name}: allowlisted dependency '${dependency}' is not declared`);
  }
}

const rootPackage = JSON.parse(readFileSync('package.json', 'utf8'));
validate('root', rootPackage, policy.root);

for (const project of listProjects()) {
  const allowed = policy.projects?.[project.id] ?? policy.defaultProject ?? [];
  validate(project.id, project.package, allowed);
}

if (errors.length) {
  console.error('Dependency policy violations:');
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  verified: true,
  rootDependencies: declaredDependencies(rootPackage).length,
  projects: listProjects().length,
  policy: 'explicit allowlist required',
  storefront: 'https://ramsandesh.gumroad.com'
}, null, 2));
