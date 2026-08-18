export class BoundedJobQueue {
  constructor({ capacity = 100, maxAttempts = 3, baseDelayMs = 10 } = {}) {
    if (!Number.isInteger(capacity) || capacity < 1) throw new TypeError('capacity must be a positive integer');
    if (!Number.isInteger(maxAttempts) || maxAttempts < 1) throw new TypeError('maxAttempts must be a positive integer');
    this.capacity = capacity; this.maxAttempts = maxAttempts; this.baseDelayMs = baseDelayMs;
    this.pending = []; this.deadLetters = []; this.completed = new Map(); this.ids = new Set();
  }
  submit(job) {
    if (!job || typeof job.id !== 'string' || !job.id) throw new TypeError('job.id is required');
    if (this.ids.has(job.id)) return { accepted: false, duplicate: true };
    if (this.pending.length >= this.capacity) return { accepted: false, reason: 'capacity' };
    const item = { ...job, attempts: 0, availableAt: 0 };
    this.ids.add(job.id); this.pending.push(item); return { accepted: true };
  }
  next(now = 0) { return this.pending.find((job) => job.availableAt <= now) ?? null; }
  async runOne(handler, now = 0) {
    const index = this.pending.findIndex((job) => job.availableAt <= now); if (index < 0) return null;
    const job = this.pending.splice(index, 1)[0]; job.attempts += 1;
    try { const value = await handler(job); this.completed.set(job.id, value); return { status: 'completed', job, value }; }
    catch (error) {
      const retryable = error?.retryable !== false;
      if (retryable && job.attempts < this.maxAttempts) {
        job.availableAt = now + this.baseDelayMs * 2 ** (job.attempts - 1); this.pending.push(job);
        return { status: 'retry', job, error };
      }
      this.deadLetters.push({ job, message: String(error?.message ?? error) });
      return { status: 'dead-letter', job, error };
    }
  }
  stats() { return { pending: this.pending.length, completed: this.completed.size, deadLetters: this.deadLetters.length }; }
}
