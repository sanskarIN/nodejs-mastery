import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const DIR=resolve('supplemental');
export function listSupplemental(){ if(!existsSync(DIR)) return []; return readdirSync(DIR,{withFileTypes:true}).filter(e=>e.isDirectory()).map(e=>{const cwd=resolve(DIR,e.name); const packagePath=resolve(cwd,'package.json'); const pkg=existsSync(packagePath)?JSON.parse(readFileSync(packagePath,'utf8')):null; return {id:e.name,cwd,packagePath,package:pkg};}).sort((a,b)=>a.id.localeCompare(b.id)); }
