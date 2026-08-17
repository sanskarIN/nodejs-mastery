export class TokenBucket {
  #tokens;
  #last;
  constructor({ capacity, refillPerSecond, clock = () => Date.now() }) {
    if (!(capacity > 0) || !(refillPerSecond > 0)) throw new Error('positive capacity and refill required');
    this.capacity = capacity;
    this.refillPerSecond = refillPerSecond;
    this.clock = clock;
    this.#tokens = capacity;
    this.#last = clock();
  }

  take(cost = 1) {
    const now = this.clock();
    const elapsedSeconds = Math.max(0, now - this.#last) / 1000;
    this.#tokens = Math.min(this.capacity, this.#tokens + elapsedSeconds * this.refillPerSecond);
    this.#last = now;
    if (this.#tokens < cost) return false;
    this.#tokens -= cost;
    return true;
  }

  remaining() { return this.#tokens; }
}
