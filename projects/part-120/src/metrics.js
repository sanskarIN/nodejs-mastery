export class Metrics {
  constructor() { this.counters = new Map(); this.gauges = new Map(); }
  inc(name, labels = {}, value = 1) {
    const key = `${name}:${JSON.stringify(labels)}`;
    this.counters.set(key, (this.counters.get(key) ?? 0) + value);
  }
  gauge(name, labels = {}, value) {
    const key = `${name}:${JSON.stringify(labels)}`;
    this.gauges.set(key, value);
  }
}
