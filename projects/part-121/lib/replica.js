'use strict';
class ReplicaSet {
  constructor(primaryStore) { this.primary = primaryStore; this.replicas = new Map(); }
  addReplica(name) { this.replicas.set(name, { frontier: 0, rows: new Map() }); }
  replicate(name, throughVersion = this.primary.commitVersion) {
    const r = this.replicas.get(name); if (!r) throw new Error('NO_REPLICA');
    for (const [key, row] of this.primary.rows) if (row.version <= throughVersion) r.rows.set(key, structuredClone(row));
    r.frontier = Math.max(r.frontier, Math.min(throughVersion, this.primary.commitVersion)); return r.frontier;
  }
  read(name, key, { minVersion = 0 } = {}) {
    const r = this.replicas.get(name); if (!r) throw new Error('NO_REPLICA');
    if (r.frontier < minVersion) return { stale: true, frontier: r.frontier, value: null };
    const row = r.rows.get(key); return { stale: false, frontier: r.frontier, value: row ? structuredClone(row.value) : null };
  }
  lag(name) { const r = this.replicas.get(name); return this.primary.commitVersion - r.frontier; }
}
module.exports = { ReplicaSet };
