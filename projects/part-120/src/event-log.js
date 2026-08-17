import { canonicalJson, sha256 } from './hash.js';
import { partitionForKey } from './partitioner.js';

function clone(v) { return structuredClone(v); }

export class EventLog {
  constructor({ audit = null, clock = () => Date.now() } = {}) {
    this.topics = new Map();
    this.producers = new Map();
    this.audit = audit;
    this.clock = clock;
  }

  createTopic(name, { partitions = 3 } = {}) {
    if (!name || !Number.isInteger(partitions) || partitions <= 0) throw new Error('invalid topic');
    if (this.topics.has(name)) throw new Error('topic exists');
    this.topics.set(name, {
      name,
      partitions: Array.from({ length: partitions }, () => []),
      floors: Array(partitions).fill(0)
    });
    this.audit?.append('topic.created', { name, partitions });
  }

  topic(name) {
    const topic = this.topics.get(name);
    if (!topic) throw new Error(`unknown topic ${name}`);
    return topic;
  }

  append({ topic: topicName, key, value, headers = {}, schema = null, producerId = null, sequence = null, eventId = null, timestamp = this.clock() }) {
    const topic = this.topic(topicName);
    const partition = partitionForKey(key, topic.partitions.length);

    if (producerId !== null) {
      if (!Number.isInteger(sequence) || sequence < 0) throw new Error('producer sequence required');
      const pkey = `${topicName}:${partition}:${producerId}`;
      const state = this.producers.get(pkey) ?? { lastSequence: -1, bySequence: new Map() };
      if (sequence <= state.lastSequence) {
        const existing = state.bySequence.get(sequence);
        if (!existing) throw new Error('producer sequence regression');
        return { duplicate: true, record: clone(existing) };
      }
      if (sequence !== state.lastSequence + 1) throw new Error('producer sequence gap');
      this.producers.set(pkey, state);
    }

    const records = topic.partitions[partition];
    const offset = topic.floors[partition] + records.length;
    const envelope = {
      eventId: eventId ?? `${topicName}-${partition}-${offset}`,
      topic: topicName,
      partition,
      offset,
      key: String(key ?? ''),
      value: clone(value),
      headers: clone(headers),
      schema: schema ? clone(schema) : null,
      producerId,
      sequence,
      timestamp
    };
    envelope.hash = sha256(canonicalJson(envelope));
    records.push(envelope);

    if (producerId !== null) {
      const pkey = `${topicName}:${partition}:${producerId}`;
      const state = this.producers.get(pkey);
      state.lastSequence = sequence;
      state.bySequence.set(sequence, envelope);
    }
    this.audit?.append('event.appended', { topic: topicName, partition, offset, eventId: envelope.eventId });
    return { duplicate: false, record: clone(envelope) };
  }

  read(topicName, partition, { fromOffset = 0, limit = 100 } = {}) {
    const topic = this.topic(topicName);
    const floor = topic.floors[partition];
    if (fromOffset < floor) throw new Error(`offset below retention floor ${floor}`);
    const start = Math.max(0, fromOffset - floor);
    return topic.partitions[partition].slice(start, start + limit).map(clone);
  }

  highWatermark(topicName, partition) {
    const topic = this.topic(topicName);
    return topic.floors[partition] + topic.partitions[partition].length;
  }

  compact(topicName, partition) {
    const topic = this.topic(topicName);
    const old = topic.partitions[partition];
    const lastOffsetByKey = new Map();
    for (const rec of old) lastOffsetByKey.set(rec.key, rec.offset);
    const kept = old.filter(rec => lastOffsetByKey.get(rec.key) === rec.offset);
    topic.partitions[partition] = kept;
    this.audit?.append('partition.compacted', { topic: topicName, partition, before: old.length, after: kept.length });
    return { before: old.length, after: kept.length };
  }

  retainFrom(topicName, partition, newFloor) {
    const topic = this.topic(topicName);
    const oldFloor = topic.floors[partition];
    if (!Number.isInteger(newFloor) || newFloor < oldFloor || newFloor > this.highWatermark(topicName, partition)) {
      throw new Error('invalid retention floor');
    }
    topic.partitions[partition] = topic.partitions[partition].filter(rec => rec.offset >= newFloor);
    topic.floors[partition] = newFloor;
    this.audit?.append('partition.retained', { topic: topicName, partition, floor: newFloor });
  }

  verifyRecord(record) {
    const { hash, ...body } = record;
    return sha256(canonicalJson(body)) === hash;
  }
}
