import { AuditChain } from './audit.js';
import { DurableQueue } from './queue.js';
import { Worker } from './worker.js';
import { WorkflowEngine, orderWorkflow } from './workflow.js';
import { Outbox } from './outbox.js';
import { Inbox } from './inbox.js';

const audit = new AuditChain();
const queue = new DurableQueue({ audit });
let paymentAttempts = 0;
const worker = new Worker({
  id: 'worker-a', queue, retry: { baseMs: 1, capMs: 2, jitterMs: 0 },
  handlers: {
    email: async ({ to }) => ({ deliveredTo: to }),
    payment: async ({ amount }) => {
      paymentAttempts += 1;
      if (paymentAttempts === 1) throw Object.assign(new Error('transient gateway failure'), { code: 'GATEWAY_TEMPORARY' });
      return { captured: amount };
    }
  }
});

const email = queue.enqueue({ type: 'email', payload: { to: 'demo@example.test' }, idempotencyKey: 'welcome:42' });
const duplicate = queue.enqueue({ type: 'email', payload: { to: 'demo@example.test' }, idempotencyKey: 'welcome:42' });
queue.enqueue({ type: 'payment', payload: { amount: 149 }, idempotencyKey: 'payment:order-42' });
await worker.runOne();
await worker.runOne();
await new Promise((resolve) => setTimeout(resolve, 3));
await worker.runOne();

const workflows = new WorkflowEngine({ audit });
workflows.register(orderWorkflow);
let wf = workflows.start({ name: 'order-fulfillment', input: { orderId: '42' }, idempotencyKey: 'order:42' });
wf = workflows.signal({ workflowId: wf.id, event: 'INVENTORY_RESERVED' });
wf = workflows.signal({ workflowId: wf.id, event: 'PAYMENT_CAPTURED' });
wf = workflows.signal({ workflowId: wf.id, event: 'SHIPPED' });

const outbox = new Outbox();
const event = outbox.stage({ aggregateId: 'order-42', eventType: 'OrderCompleted', payload: { orderId: 42 } });
const inbox = new Inbox();
const first = inbox.accept({ messageId: event.id });
const second = inbox.accept({ messageId: event.id });

console.log(JSON.stringify({ sameIdFromDedupe: email.id === duplicate.id, jobs: queue.list().map(({ id, state, attempts }) => ({ id, state, attempts })), workflow: { state: wf.state, status: wf.status }, inbox: { first, second }, auditValid: audit.verify() }, null, 2));
