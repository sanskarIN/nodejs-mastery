import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { AuditChain, EventLog, ConsumerGroup } from '../src/index.js';

const required = [
  'README.md','package.json','demo.js','src/index.js','src/event-log.js','src/consumer-group.js',
  'src/idempotent-processor.js','src/projection.js','src/schema-registry.js','src/cdc.js','src/replicator.js','src/audit-chain.js','test/stream.test.js'
];
for (const file of required) await access(resolve(file));
const pkg = JSON.parse(await readFile('package.json','utf8'));
if (!pkg.scripts?.test || !pkg.scripts?.demo || !pkg.scripts?.verify) throw new Error('missing release scripts');

const audit = new AuditChain();
const log = new EventLog({ audit });
log.createTopic('verify',{partitions:1});
log.append({topic:'verify',key:'k',value:{ok:true},producerId:'p',sequence:0});
const group = new ConsumerGroup({log,topic:'verify',groupId:'verify',audit});
const a = group.join('worker');
const [record] = group.poll('worker');
group.commit({memberId:'worker',generation:a.generation,partition:0,nextOffset:record.offset+1});
if (group.lag(0) !== 0) throw new Error('lag verification failed');
if (!audit.verify()) throw new Error('audit verification failed');
console.log('verify: required files, append/read, checkpoint, lag, and audit integrity passed');
