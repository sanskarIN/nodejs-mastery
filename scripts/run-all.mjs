import { spawnSync } from 'node:child_process';
import { listProjects } from './project-registry.mjs';

const command = process.argv[2] ?? 'test';
const projects = listProjects();
let failed = 0;

if (projects.length === 0) {
  console.error('No companion projects were discovered under projects/part-NNN.');
  process.exit(1);
}

for (const project of projects) {
  if (!project.package) {
    console.error(`[${project.id}] missing package.json`);
    failed++;
    continue;
  }

  if (!project.package.scripts?.[command]) {
    console.log(`[${project.id}] skip: no ${command} script`);
    continue;
  }

  console.log(`\n=== ${project.id}: npm run ${command} ===`);
  const result = spawnSync(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', command],
    { cwd: project.cwd, stdio: 'inherit' }
  );

  if (result.status !== 0) failed++;
}

if (failed) {
  console.error(`\n${failed} project(s) failed '${command}'.`);
  process.exit(1);
}

console.log(`\nAll ${projects.length} available companion projects passed '${command}'.`);
