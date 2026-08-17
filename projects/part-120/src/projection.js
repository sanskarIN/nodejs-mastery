export class Projection {
  constructor({ initialState, apply }) {
    this.initialState = structuredClone(initialState);
    this.state = structuredClone(initialState);
    this.applyFn = apply;
    this.checkpoints = new Map();
  }

  apply(record) {
    this.state = this.applyFn(structuredClone(this.state), record);
    this.checkpoints.set(record.partition, record.offset + 1);
  }

  rebuild(records) {
    this.state = structuredClone(this.initialState);
    this.checkpoints.clear();
    for (const r of records) this.apply(r);
    return structuredClone(this.state);
  }
}
