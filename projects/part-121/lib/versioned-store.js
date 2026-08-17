'use strict';
const { createHash } = require('node:crypto');
const clone = (v) => structuredClone(v);
class ConflictError extends Error { constructor(code, message = code) { super(message); this.code = code; } }
class VersionedStore {
  constructor() { this.rows = new Map(); this.commitVersion = 0; }
  seed(key, value) { if (this.rows.has(key)) throw new Error('EXISTS'); this.rows.set(key, { value: clone(value), version: ++this.commitVersion }); }
  read(key) { const r = this.rows.get(key); return r ? { value: clone(r.value), version: r.version } : null; }
  compareAndSet(key, expectedVersion, value) {
    const cur = this.rows.get(key); const actual = cur?.version ?? 0;
    if (actual !== expectedVersion) throw new ConflictError('VERSION_CONFLICT');
    const next = { value: clone(value), version: ++this.commitVersion }; this.rows.set(key, next); return clone(next);
  }
  begin({ isolation = 'snapshot' } = {}) { return new Transaction(this, isolation); }
  digest() {
    const entries = [...this.rows].sort(([a],[b]) => a.localeCompare(b));
    return createHash('sha256').update(JSON.stringify(entries)).digest('hex');
  }
}
class Transaction {
  constructor(store, isolation) {
    this.store = store; this.isolation = isolation; this.startVersion = store.commitVersion;
    this.readSet = new Map(); this.writeSet = new Map(); this.done = false;
  }
  read(key) {
    if (this.done) throw new Error('TX_DONE');
    if (this.writeSet.has(key)) return clone(this.writeSet.get(key));
    if (this.readSet.has(key)) return clone(this.readSet.get(key).value);
    const row = this.store.read(key); const snap = row ? row : { value: null, version: 0 };
    this.readSet.set(key, snap); return clone(snap.value);
  }
  write(key, value) { if (this.done) throw new Error('TX_DONE'); if (!this.readSet.has(key)) this.read(key); this.writeSet.set(key, clone(value)); }
  commit() {
    if (this.done) throw new Error('TX_DONE');
    for (const key of this.writeSet.keys()) {
      const expected = this.readSet.get(key)?.version ?? 0;
      const actual = this.store.read(key)?.version ?? 0;
      if (actual !== expected) throw new ConflictError('WRITE_CONFLICT');
    }
    if (this.isolation === 'serializable') {
      for (const [key, read] of this.readSet) {
        const actual = this.store.read(key)?.version ?? 0;
        if (actual !== read.version && !this.writeSet.has(key)) throw new ConflictError('SERIALIZATION_FAILURE');
      }
    }
    const result = [];
    for (const [key, value] of this.writeSet) result.push([key, this.store.compareAndSet(key, this.readSet.get(key)?.version ?? 0, value)]);
    this.done = true; return result;
  }
  rollback() { this.done = true; }
}
module.exports = { VersionedStore, ConflictError };
