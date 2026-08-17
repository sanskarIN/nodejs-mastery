export class ReplicaMirror {
  constructor() { this.frontiers = new Map(); this.records = []; }
  apply(record, verify) {
    if (!verify(record)) throw new Error('corrupt record');
    const key = `${record.topic}:${record.partition}`;
    const expected = this.frontiers.get(key) ?? 0;
    if (record.offset < expected) return { duplicate: true };
    if (record.offset > expected) throw new Error(`replication gap: expected ${expected}, got ${record.offset}`);
    this.records.push(structuredClone(record));
    this.frontiers.set(key, record.offset + 1);
    return { duplicate: false };
  }
  frontier(topic, partition) { return this.frontiers.get(`${topic}:${partition}`) ?? 0; }
}
