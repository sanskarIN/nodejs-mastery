export class Scheduler {
  #entries = new Map();
  #clock;
  constructor({ clock = () => Date.now() } = {}) { this.#clock = clock; }

  upsert({ key, everyMs, firstAt = this.#clock(), payload }) {
    if (!key || !(everyMs > 0)) throw new Error('key and positive everyMs required');
    this.#entries.set(key, { key, everyMs, nextAt: firstAt, payload: structuredClone(payload) });
  }

  due() {
    const now = this.#clock();
    const fired = [];
    for (const entry of this.#entries.values()) {
      if (entry.nextAt <= now) {
        fired.push(structuredClone(entry));
        const periodsMissed = Math.floor((now - entry.nextAt) / entry.everyMs);
        entry.nextAt += (periodsMissed + 1) * entry.everyMs;
      }
    }
    return fired.sort((a, b) => a.nextAt - b.nextAt || a.key.localeCompare(b.key));
  }
}
