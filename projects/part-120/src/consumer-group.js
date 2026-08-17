function clone(v) { return structuredClone(v); }

export class ConsumerGroup {
  constructor({ log, topic, groupId, audit = null }) {
    this.log = log;
    this.topic = topic;
    this.groupId = groupId;
    this.audit = audit;
    this.members = new Set();
    this.assignments = new Map();
    this.committed = new Map();
    this.generation = 0;
  }

  join(memberId) {
    this.members.add(memberId);
    this.rebalance();
    return this.assignment(memberId);
  }

  leave(memberId) {
    this.members.delete(memberId);
    this.rebalance();
  }

  rebalance() {
    this.generation += 1;
    const members = [...this.members].sort();
    this.assignments = new Map(members.map(m => [m, []]));
    const count = this.log.topic(this.topic).partitions.length;
    if (members.length) {
      for (let p = 0; p < count; p++) this.assignments.get(members[p % members.length]).push(p);
    }
    this.audit?.append('group.rebalanced', { groupId: this.groupId, generation: this.generation, members });
  }

  assignment(memberId) {
    return { groupId: this.groupId, generation: this.generation, partitions: [...(this.assignments.get(memberId) ?? [])] };
  }

  poll(memberId, { maxPerPartition = 10 } = {}) {
    const a = this.assignment(memberId);
    return a.partitions.flatMap(partition => {
      const fromOffset = this.committed.get(partition) ?? this.log.topic(this.topic).floors[partition];
      return this.log.read(this.topic, partition, { fromOffset, limit: maxPerPartition });
    });
  }

  commit({ memberId, generation, partition, nextOffset }) {
    if (generation !== this.generation) throw new Error('stale group generation');
    if (!(this.assignments.get(memberId) ?? []).includes(partition)) throw new Error('partition not assigned');
    const current = this.committed.get(partition) ?? this.log.topic(this.topic).floors[partition];
    if (!Number.isInteger(nextOffset) || nextOffset < current || nextOffset > this.log.highWatermark(this.topic, partition)) {
      throw new Error('invalid checkpoint');
    }
    this.committed.set(partition, nextOffset);
    this.audit?.append('offset.committed', { groupId: this.groupId, memberId, generation, partition, nextOffset });
  }

  lag(partition) {
    const current = this.committed.get(partition) ?? this.log.topic(this.topic).floors[partition];
    return this.log.highWatermark(this.topic, partition) - current;
  }

  snapshot() {
    return clone({ groupId: this.groupId, generation: this.generation, assignments: [...this.assignments], committed: [...this.committed] });
  }
}
