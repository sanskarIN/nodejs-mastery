import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AuditChain, ConsumerGroup, EventLog, IdempotentProcessor, Projection,
  ReplicaMirror, SchemaRegistry, cdcEnvelope, partitionForKey
} from '../src/index.js';

function makeLog(partitions = 3) {
  const audit = new AuditChain();
  const log = new EventLog({ audit, clock: () => 1000 });
  log.createTopic('t', { partitions });
  return { log, audit };
}

test('same key maps to same partition', () => {
  assert.equal(partitionForKey('customer-42', 8), partitionForKey('customer-42', 8));
});

test('append assigns monotonic offsets per partition', () => {
  const { log } = makeLog(1);
  const a = log.append({ topic: 't', key: 'k', value: { n: 1 } }).record;
  const b = log.append({ topic: 't', key: 'k', value: { n: 2 } }).record;
  assert.deepEqual([a.offset, b.offset], [0, 1]);
  assert.ok(log.verifyRecord(a));
});

test('producer sequence makes retried append idempotent', () => {
  const { log } = makeLog(1);
  const a = log.append({ topic: 't', key: 'k', value: { n: 1 }, producerId: 'p', sequence: 0 });
  const b = log.append({ topic: 't', key: 'k', value: { n: 999 }, producerId: 'p', sequence: 0 });
  assert.equal(b.duplicate, true);
  assert.equal(a.record.eventId, b.record.eventId);
  assert.equal(log.highWatermark('t', 0), 1);
});

test('producer sequence gap is rejected', () => {
  const { log } = makeLog(1);
  assert.throws(() => log.append({ topic: 't', key: 'k', value: {}, producerId: 'p', sequence: 2 }), /gap/);
});

test('consumer group rebalances and fences stale generation commits', () => {
  const { log } = makeLog(2);
  log.append({ topic: 't', key: 'a', value: { n: 1 } });
  const g = new ConsumerGroup({ log, topic: 't', groupId: 'g' });
  const old = g.join('a');
  g.join('b');
  assert.throws(() => g.commit({ memberId: 'a', generation: old.generation, partition: old.partitions[0], nextOffset: 1 }), /stale/);
});

test('idempotent processor suppresses duplicate business effects', () => {
  const { log } = makeLog(1);
  const r = log.append({ topic: 't', key: 'k', value: { n: 1 } }).record;
  const p = new IdempotentProcessor();
  p.process(r, rec => ({ n: rec.value.n }));
  const again = p.process(r, rec => ({ n: rec.value.n + 1 }));
  assert.equal(again.duplicate, true);
  assert.equal(p.effects.length, 1);
});

test('projection rebuild is deterministic for same ordered records', () => {
  const { log } = makeLog(1);
  for (let i=0;i<3;i++) log.append({ topic: 't', key: 'k', value: { delta: i+1 } });
  const records = log.read('t', 0, { fromOffset: 0, limit: 10 });
  const pr = new Projection({ initialState: { total: 0 }, apply: (s,r) => ({ total: s.total + r.value.delta }) });
  assert.deepEqual(pr.rebuild(records), { total: 6 });
  assert.deepEqual(pr.rebuild(records), { total: 6 });
});

test('schema registry rejects missing required fields', () => {
  const reg = new SchemaRegistry();
  reg.register('order', 1, { required: ['id','amount'] });
  assert.equal(reg.assert('order',1,{id:'1',amount:10}), true);
  assert.throws(() => reg.assert('order',1,{id:'1'}), /missing required/);
});

test('retention floor rejects stale reads', () => {
  const { log } = makeLog(1);
  for (let i=0;i<5;i++) log.append({ topic:'t', key:String(i), value:{i} });
  log.retainFrom('t',0,3);
  assert.throws(() => log.read('t',0,{fromOffset:0}), /retention floor/);
  assert.equal(log.read('t',0,{fromOffset:3}).length,2);
});

test('log compaction retains latest record per key', () => {
  const { log } = makeLog(1);
  log.append({ topic:'t', key:'a', value:{v:1} });
  log.append({ topic:'t', key:'b', value:{v:1} });
  log.append({ topic:'t', key:'a', value:{v:2} });
  const result = log.compact('t',0);
  assert.deepEqual(result,{before:3,after:2});
  const values = log.topic('t').partitions[0].map(r => [r.key,r.value.v]);
  assert.deepEqual(values,[['b',1],['a',2]]);
});

test('CDC envelope preserves before/after and operation type', () => {
  const e = cdcEnvelope({ source:'db1', table:'orders', primaryKey:{id:1}, op:'u', before:{state:'new'}, after:{state:'paid'}, commitId:'c9', commitTs:123 });
  assert.equal(e.op,'u');
  assert.equal(e.after.state,'paid');
});

test('replica mirror rejects gaps and verifies hashes', () => {
  const { log } = makeLog(1);
  const a = log.append({ topic:'t',key:'a',value:{v:1} }).record;
  const b = log.append({ topic:'t',key:'b',value:{v:2} }).record;
  const mirror = new ReplicaMirror();
  assert.throws(() => mirror.apply(b, r => log.verifyRecord(r)), /gap/);
  assert.equal(mirror.apply(a, r => log.verifyRecord(r)).duplicate, false);
  assert.equal(mirror.apply(b, r => log.verifyRecord(r)).duplicate, false);
  assert.equal(mirror.frontier('t',0),2);
});

test('audit chain detects mutation', () => {
  const audit = new AuditChain();
  audit.append('x',{a:1}); audit.append('y',{b:2});
  assert.equal(audit.verify(),true);
  audit.records[0].data.a=9;
  assert.equal(audit.verify(),false);
});
