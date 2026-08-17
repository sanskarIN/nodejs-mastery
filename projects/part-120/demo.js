import { AuditChain, ConsumerGroup, EventLog, IdempotentProcessor, Projection, ReplicaMirror, partitionForKey } from './src/index.js';

const audit = new AuditChain();
const log = new EventLog({ audit });
log.createTopic('orders', { partitions: 3 });

const producerSeq = new Map();
for (let i = 0; i < 6; i++) {
  const key = `order-${i % 3}`;
  const partition = partitionForKey(key, 3);
  const sequence = producerSeq.get(partition) ?? 0;
  log.append({ topic: 'orders', key, value: { type: 'OrderUpdated', amount: 100 + i }, producerId: 'api-a', sequence });
  producerSeq.set(partition, sequence + 1);
}

const group = new ConsumerGroup({ log, topic: 'orders', groupId: 'billing', audit });
const assignment = group.join('worker-1');
const processor = new IdempotentProcessor();
const records = group.poll('worker-1', { maxPerPartition: 20 });
for (const record of records) {
  processor.process(record, r => ({ charged: r.value.amount }));
  group.commit({ memberId: 'worker-1', generation: assignment.generation, partition: record.partition, nextOffset: record.offset + 1 });
}

const projection = new Projection({ initialState: { count: 0 }, apply: (state) => ({ count: state.count + 1 }) });
projection.rebuild(records);

const mirror = new ReplicaMirror();
for (const record of records.sort((a,b) => a.partition-b.partition || a.offset-b.offset)) {
  mirror.apply(record, r => log.verifyRecord(r));
}

console.log(JSON.stringify({
  assignedPartitions: assignment.partitions,
  processedEffects: processor.effects.length,
  projection: projection.state,
  lags: assignment.partitions.map(p => [p, group.lag(p)]),
  auditValid: audit.verify()
}, null, 2));
