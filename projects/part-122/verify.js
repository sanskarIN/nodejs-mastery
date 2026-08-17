import fs from 'node:fs'; import crypto from 'node:crypto';
const required=['package.json','src/platform.js','test/platform.test.js','demo.js'];
for(const f of required) if(!fs.existsSync(f)) throw new Error(`missing ${f}`);
const hash=crypto.createHash('sha256').update(fs.readFileSync('src/platform.js')).digest('hex');
console.log(JSON.stringify({ok:true,requiredFiles:required.length,platformSha256:hash},null,2));
