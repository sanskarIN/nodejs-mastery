import { makeId } from './util.js';

export class Outbox {
  #rows = [];

  stage({ aggregateId, eventType, payload, now = Date.now() }) {
    const row = { id: makeId('evt'), aggregateId, eventType, payload: structuredClone(payload), createdAt: now, publishedAt: null, attempts: 0 };
    this.#rows.push(row);
    return structuredClone(row);
  }

  pending(limit = 100) {
    return this.#rows.filter((row) => row.publishedAt === null).slice(0, limit).map((row) => structuredClone(row));
  }

  markPublished(id, now = Date.now()) {
    const row = this.#rows.find((candidate) => candidate.id === id);
    if (!row) throw new Error('outbox row not found');
    row.attempts += 1;
    row.publishedAt = now;
    return structuredClone(row);
  }
}
