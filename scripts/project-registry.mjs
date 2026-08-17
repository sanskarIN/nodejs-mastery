import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PROJECTS_DIR = resolve('projects');
const PART_DIR = /^part-(\d{3})$/;

export function listProjects() {
  if (!existsSync(PROJECTS_DIR)) return [];

  return readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && PART_DIR.test(entry.name))
    .map((entry) => {
      const match = PART_DIR.exec(entry.name);
      const part = Number(match[1]);
      const cwd = resolve(PROJECTS_DIR, entry.name);
      const packagePath = resolve(cwd, 'package.json');
      const pkg = existsSync(packagePath)
        ? JSON.parse(readFileSync(packagePath, 'utf8'))
        : null;

      return {
        part,
        id: entry.name,
        cwd,
        packagePath,
        package: pkg
      };
    })
    .sort((a, b) => a.part - b.part);
}
