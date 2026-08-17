import { canonicalJson, sha256 } from './hash.js';

export class AuditChain {
  constructor() { this.records = []; }
  append(type, data = {}) {
    const previousHash = this.records.at(-1)?.hash ?? 'GENESIS';
    const record = { index: this.records.length, type, data, previousHash };
    record.hash = sha256(canonicalJson(record));
    this.records.push(record);
    return structuredClone(record);
  }
  verify() {
    let prev = 'GENESIS';
    for (let i = 0; i < this.records.length; i++) {
      const r = this.records[i];
      if (r.index !== i || r.previousHash !== prev) return false;
      const { hash, ...body } = r;
      if (sha256(canonicalJson(body)) !== hash) return false;
      prev = hash;
    }
    return true;
  }
}
