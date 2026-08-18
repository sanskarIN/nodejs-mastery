import { AsyncLocalStorage } from 'node:async_hooks';

export class RequestContext {
  constructor() { this.storage = new AsyncLocalStorage(); }
  run(context, fn) {
    if (!context || typeof context.requestId !== 'string' || !context.requestId) throw new TypeError('requestId is required');
    const safe = Object.freeze({ requestId: context.requestId, traceId: context.traceId ?? null, tenantId: context.tenantId ?? null });
    return this.storage.run(safe, fn);
  }
  get() { return this.storage.getStore() ?? null; }
  require() { const value = this.get(); if (!value) throw new Error('request context is unavailable'); return value; }
}
