import test from 'node:test';
import assert from 'node:assert/strict';
import { DurableQueue } from '../src/queue.js';
import { AuditChain } from '../src/audit.js';

function fakeClock(start = 1000) {
  let now = start;
  return { clock: () => now, advance: (ms) => { now += ms; } };
}

test('idempotency key returns the original job', () => {
  const q = new DurableQueue();
  const a = q.enqueue({ type: 'x', payload: { n: 1 }, idempotencyKey: 'same' });
  const b = q.enqueue({ type: 'x', payload: { n: 999 }, idempotencyKey: 'same' });
  assert.equal(a.id, b.id);
  assert.deepEqual(b.payload, { n: 1 });
});

test('stale lease token cannot complete a re-leased job', () => {
  const time = fakeClock();
  const q = new DurableQueue({ clock: time.clock });
  const job = q.enqueue({ type: 'x', payload: {}, idempotencyKey: 'lease' });
  const first = q.claim({ workerId: 'a', leaseMs: 10 });
  time.advance(11);
  q.reapExpiredLeases();
  const second = q.claim({ workerId: 'b', leaseMs: 10 });
  assert.equal(second.id, job.id);
  assert.throws(() => q.complete({ jobId: job.id, workerId: 'a', leaseToken: first.leaseToken, result: {} }), /stale|invalid/);
  q.complete({ jobId: job.id, workerId: 'b', leaseToken: second.leaseToken, result: { ok: true } });
  assert.equal(q.get(job.id).state, 'succeeded');
});

test('retry eventually becomes dead letter', () => {
  const time = fakeClock();
  const q = new DurableQueue({ clock: time.clock });
  const job = q.enqueue({ type: 'x', payload: {}, idempotencyKey: 'dead', maxAttempts: 2 });
  let lease = q.claim({ workerId: 'a', leaseMs: 100 });
  q.fail({ jobId: job.id, workerId: 'a', leaseToken: lease.leaseToken, retry: { baseMs: 1, capMs: 1, jitterMs: 0 } });
  time.advance(1);
  lease = q.claim({ workerId: 'a', leaseMs: 100 });
  q.fail({ jobId: job.id, workerId: 'a', leaseToken: lease.leaseToken, errorCode: 'BOOM', retry: { baseMs: 1, capMs: 1, jitterMs: 0 } });
  assert.equal(q.get(job.id).state, 'dead');
});

test('audit chain stays valid', () => {
  const audit = new AuditChain();
  const q = new DurableQueue({ audit });
  const j = q.enqueue({ type: 'x', payload: {}, idempotencyKey: 'audit' });
  const lease = q.claim({ workerId: 'w' });
  q.complete({ jobId: j.id, workerId: 'w', leaseToken: lease.leaseToken, result: 1 });
  assert.equal(audit.verify(), true);
});
