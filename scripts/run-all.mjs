import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const command = process.argv[2] ?? 'test';
const parts = ['077','084','118','119','120','121','122','123','124','125'];
let failed = 0;

for (const part of parts) {
  const cwd = resolve(`projects/part-${part}`);
  const pkgPath = resolve(cwd, 'package.json');
  if (!existsSync(pkgPath)) {
    console.error(`[part-${part}] missing package.json`);
    failed++;
    continue;
  }
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  if (!pkg.scripts?.[command]) {
    console.log(`[part-${part}] skip: no ${command} script`);
    continue;
  }
  console.log(`\n=== part-${part}: npm run ${command} ===`);
  const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', command], {
    cwd,
    stdio: 'inherit'
  });
  if (result.status !== 0) failed++;
}

if (failed) {
  console.error(`\n${failed} project(s) failed '${command}'.`);
  process.exit(1);
}
console.log(`\nAll available companion projects passed '${command}'.`);
