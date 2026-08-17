export class Inbox {
  #seen = new Map();

  accept({ messageId, handlerVersion = 'v1', now = Date.now() }) {
    const key = `${handlerVersion}:${messageId}`;
    if (this.#seen.has(key)) return { duplicate: true, firstSeenAt: this.#seen.get(key) };
    this.#seen.set(key, now);
    return { duplicate: false, firstSeenAt: now };
  }

  size() { return this.#seen.size; }
}
