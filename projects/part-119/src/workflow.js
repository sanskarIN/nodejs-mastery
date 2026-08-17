import { makeId } from './util.js';

export class WorkflowEngine {
  #instances = new Map();
  #definitions = new Map();
  #audit;

  constructor({ audit } = {}) { this.#audit = audit; }
  register(definition) { if (!definition?.name || !definition?.initial || !definition?.states) throw new Error('invalid workflow definition'); this.#definitions.set(definition.name, structuredClone(definition)); }

  start({ name, input, idempotencyKey }) {
    const definition = this.#definitions.get(name); if (!definition) throw new Error('workflow definition not found');
    const existing = [...this.#instances.values()].find((item) => item.name === name && item.idempotencyKey === idempotencyKey); if (existing) return structuredClone(existing);
    const instance = { id: makeId('wf'), name, version: definition.version ?? 1, idempotencyKey, state: definition.initial, input: structuredClone(input), data: {}, history: [], status: 'running' };
    this.#instances.set(instance.id, instance); this.#record(instance, 'started', { state: instance.state }); return structuredClone(instance);
  }

  signal({ workflowId, event, data = {} }) {
    const instance = this.#instances.get(workflowId); if (!instance || instance.status !== 'running') throw new Error('workflow is not running');
    const definition = this.#definitions.get(instance.name); const stateDef = definition.states[instance.state]; const transition = stateDef?.on?.[event];
    if (!transition) throw new Error(`event ${event} is not valid from ${instance.state}`); const target = typeof transition === 'string' ? transition : transition.target; if (!definition.states[target]) throw new Error('workflow target state missing');
    instance.data = { ...instance.data, ...structuredClone(data) }; const from = instance.state; instance.state = target; if (definition.states[target].terminal) instance.status = definition.states[target].terminal;
    this.#record(instance, 'transition', { from, event, to: target, data }); return structuredClone(instance);
  }

  get(id) { return this.#instances.has(id) ? structuredClone(this.#instances.get(id)) : null; }
  #record(instance, type, data) { const entry = { index: instance.history.length, at: Date.now(), type, data: structuredClone(data) }; instance.history.push(entry); this.#audit?.append(`workflow.${type}`, { workflowId: instance.id, ...data }); }
}

export const orderWorkflow = { name: 'order-fulfillment', version: 1, initial: 'reserve', states: {
  reserve: { on: { INVENTORY_RESERVED: 'charge', INVENTORY_REJECTED: 'cancelled' } },
  charge: { on: { PAYMENT_CAPTURED: 'ship', PAYMENT_FAILED: 'release_inventory' } },
  ship: { on: { SHIPPED: 'completed', SHIPPING_FAILED: 'refund' } },
  release_inventory: { on: { INVENTORY_RELEASED: 'cancelled' } },
  refund: { on: { PAYMENT_REFUNDED: 'release_inventory' } }, completed: { terminal: 'succeeded' }, cancelled: { terminal: 'cancelled' }
} };
