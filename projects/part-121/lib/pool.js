'use strict';
class ConnectionPool {
  constructor({ max = 4, acquireTimeoutMs = 1000, clock = () => Date.now() } = {}) {
    if (!Number.isInteger(max) || max < 1) throw new Error('max must be >= 1');
    this.max = max; this.acquireTimeoutMs = acquireTimeoutMs; this.clock = clock;
    this.inUse = new Map(); this.nextId = 1; this.waiters = [];
  }
  get stats() { return { max: this.max, inUse: this.inUse.size, waiting: this.waiters.length }; }
  async acquire() {
    if (this.inUse.size < this.max) return this.#grant();
    const start = this.clock();
    return new Promise((resolve, reject) => {
      const waiter = { resolve, reject, start };
      this.waiters.push(waiter);
      const timer = setTimeout(() => {
        const i = this.waiters.indexOf(waiter);
        if (i >= 0) this.waiters.splice(i, 1);
        reject(new Error('POOL_ACQUIRE_TIMEOUT'));
      }, this.acquireTimeoutMs);
      waiter.timer = timer;
    });
  }
  #grant() {
    const id = this.nextId++;
    const conn = { id, released: false, release: () => this.release(conn) };
    this.inUse.set(id, conn); return conn;
  }
  release(conn) {
    if (!conn || conn.released || !this.inUse.has(conn.id)) return false;
    conn.released = true; this.inUse.delete(conn.id);
    const waiter = this.waiters.shift();
    if (waiter) { clearTimeout(waiter.timer); waiter.resolve(this.#grant()); }
    return true;
  }
}
module.exports = { ConnectionPool };
