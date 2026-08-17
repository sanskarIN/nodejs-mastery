import test from 'node:test';
import assert from 'node:assert/strict';
import { WorkflowEngine, orderWorkflow } from '../src/workflow.js';
import { Inbox } from '../src/inbox.js';
import { Outbox } from '../src/outbox.js';
import { Scheduler } from '../src/scheduler.js';
import { TokenBucket } from '../src/limiter.js';

function engine() { const e = new WorkflowEngine(); e.register(orderWorkflow); return e; }

test('workflow follows success path', () => {
  const e = engine();
  let w = e.start({ name: 'order-fulfillment', input: { id: 1 }, idempotencyKey: 'o1' });
  w = e.signal({ workflowId: w.id, event: 'INVENTORY_RESERVED' });
  w = e.signal({ workflowId: w.id, event: 'PAYMENT_CAPTURED' });
  w = e.signal({ workflowId: w.id, event: 'SHIPPED' });
  assert.equal(w.state, 'completed');
  assert.equal(w.status, 'succeeded');
});

test('workflow failure path includes compensation', () => {
  const e = engine();
  let w = e.start({ name: 'order-fulfillment', input: {}, idempotencyKey: 'o2' });
  w = e.signal({ workflowId: w.id, event: 'INVENTORY_RESERVED' });
  w = e.signal({ workflowId: w.id, event: 'PAYMENT_FAILED' });
  assert.equal(w.state, 'release_inventory');
  w = e.signal({ workflowId: w.id, event: 'INVENTORY_RELEASED' });
  assert.equal(w.status, 'cancelled');
});

test('inbox detects duplicate delivery', () => {
  const inbox = new Inbox();
  assert.equal(inbox.accept({ messageId: 'm1' }).duplicate, false);
  assert.equal(inbox.accept({ messageId: 'm1' }).duplicate, true);
});

test('outbox exposes pending event then marks it published', () => {
  const outbox = new Outbox();
  const row = outbox.stage({ aggregateId: 'a', eventType: 'X', payload: {} });
  assert.equal(outbox.pending().length, 1);
  outbox.markPublished(row.id);
  assert.equal(outbox.pending().length, 0);
});

test('scheduler advances over missed periods without firing an unbounded catch-up burst', () => {
  let now = 0;
  const scheduler = new Scheduler({ clock: () => now });
  scheduler.upsert({ key: 'cleanup', everyMs: 100, firstAt: 0, payload: {} });
  assert.equal(scheduler.due().length, 1);
  now = 550;
  assert.equal(scheduler.due().length, 1);
  assert.equal(scheduler.due().length, 0);
});

test('token bucket limits bursts and refills', () => {
  let now = 0;
  const bucket = new TokenBucket({ capacity: 2, refillPerSecond: 1, clock: () => now });
  assert.equal(bucket.take(), true);
  assert.equal(bucket.take(), true);
  assert.equal(bucket.take(), false);
  now = 1000;
  assert.equal(bucket.take(), true);
});
