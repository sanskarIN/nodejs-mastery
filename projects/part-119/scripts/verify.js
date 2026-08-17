import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { AuditChain } from '../src/audit.js';
import { DurableQueue } from '../src/queue.js';

const root = new URL('..', import.meta.url).pathname;
const required = ['package.json', 'README.md', 'src/queue.js', 'src/workflow.js', 'src/worker.js', 'src/outbox.js', 'src/inbox.js', 'src/scheduler.js', 'src/limiter.js', 'src/audit.js', 'test/queue.test.js', 'test/workflow.test.js'];
for (const file of required) await access(join(root, file));
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
if (!pkg.engines?.node) throw new Error('Node engine contract missing');
const audit = new AuditChain();
const queue = new DurableQueue({ audit });
const job = queue.enqueue({ type: 'verify', payload: {}, idempotencyKey: 'verify:1' });
const lease = queue.claim({ workerId: 'verifier' });
queue.complete({ jobId: job.id, workerId: 'verifier', leaseToken: lease.leaseToken, result: { ok: true } });
if (!audit.verify() || queue.get(job.id).state !== 'succeeded') throw new Error('release evidence failed');
console.log(JSON.stringify({ verified: true, requiredFiles: required.length, auditEvents: audit.list().length }, null, 2));
