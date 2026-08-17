export class IdempotentProcessor {
  constructor() {
    this.inbox = new Map();
    this.effects = [];
  }

  process(record, handler) {
    if (this.inbox.has(record.eventId)) return { duplicate: true, result: this.inbox.get(record.eventId) };
    const result = handler(record);
    this.inbox.set(record.eventId, structuredClone(result));
    this.effects.push({ eventId: record.eventId, result: structuredClone(result) });
    return { duplicate: false, result };
  }
}
