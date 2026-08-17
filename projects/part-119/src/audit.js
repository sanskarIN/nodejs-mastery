import { sha256, stableJson } from './util.js';

export class AuditChain {
  #events = [];

  append(type, data, at = Date.now()) {
    const previousHash = this.#events.at(-1)?.hash ?? 'GENESIS';
    const body = { index: this.#events.length, at, type, data, previousHash };
    const event = { ...body, hash: sha256(stableJson(body)) };
    this.#events.push(event);
    return structuredClone(event);
  }

  list() {
    return structuredClone(this.#events);
  }

  verify() {
    let previousHash = 'GENESIS';
    for (let index = 0; index < this.#events.length; index += 1) {
      const event = this.#events[index];
      const body = { index: event.index, at: event.at, type: event.type, data: event.data, previousHash: event.previousHash };
      if (event.index !== index || event.previousHash !== previousHash || sha256(stableJson(body)) !== event.hash) return false;
      previousHash = event.hash;
    }
    return true;
  }
}
