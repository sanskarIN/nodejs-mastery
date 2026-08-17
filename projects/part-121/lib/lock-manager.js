'use strict';
class LockManager {
  constructor() { this.owner = new Map(); this.waiting = new Map(); }
  acquire(tx, resource) {
    const owner = this.owner.get(resource);
    if (!owner || owner === tx) { this.owner.set(resource, tx); return { acquired: true }; }
    this.waiting.set(tx, { resource, owner });
    const cycle = this.detectCycle(tx);
    if (cycle) { this.waiting.delete(tx); return { acquired: false, deadlock: cycle }; }
    return { acquired: false, waitingFor: owner };
  }
  releaseAll(tx) {
    for (const [res, owner] of this.owner) if (owner === tx) this.owner.delete(res);
    this.waiting.delete(tx);
    for (const [w, edge] of this.waiting) if (edge.owner === tx) this.waiting.delete(w);
  }
  detectCycle(start) {
    const seen = new Set(); let cur = start; const path = [];
    while (this.waiting.has(cur)) {
      if (seen.has(cur)) { const i = path.indexOf(cur); return path.slice(i).concat(cur); }
      seen.add(cur); path.push(cur); cur = this.waiting.get(cur).owner;
    }
    return null;
  }
}
module.exports = { LockManager };
