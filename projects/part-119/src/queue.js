import { clone, makeId, nowMs } from './util.js';
import { retryDelayMs, shouldRetry } from './retry.js';

export class DurableQueue {
  #jobs = new Map();
  #dedupe = new Map();
  #audit;
  #clock;

  constructor({ audit, clock = nowMs } = {}) {
    this.#audit = audit;
    this.#clock = clock;
  }

  enqueue({ type, payload, idempotencyKey, maxAttempts = 5, availableAt, metadata = {} }) {
    if (!type || typeof type !== 'string') throw new Error('type is required');
    if (!idempotencyKey || typeof idempotencyKey !== 'string') throw new Error('idempotencyKey is required');
    if (this.#dedupe.has(idempotencyKey)) return clone(this.#jobs.get(this.#dedupe.get(idempotencyKey)));
    const createdAt = this.#clock();
    const job = { id: makeId('job'), type, payload: clone(payload), metadata: clone(metadata), idempotencyKey,
      state: 'waiting', createdAt, updatedAt: createdAt, availableAt: availableAt ?? createdAt,
      attempts: 0, maxAttempts, leaseOwner: null, leaseUntil: null, leaseToken: 0,
      result: null, lastError: null };
    this.#jobs.set(job.id, job);
    this.#dedupe.set(idempotencyKey, job.id);
    this.#audit?.append('job.enqueued', { jobId: job.id, type, idempotencyKey });
    return clone(job);
  }

  claim({ workerId, leaseMs = 10_000, types } = {}) {
    if (!workerId) throw new Error('workerId is required');
    this.reapExpiredLeases();
    const now = this.#clock();
    const candidates = [...this.#jobs.values()]
      .filter((job) => job.state === 'waiting' && job.availableAt <= now && (!types || types.includes(job.type)))
      .sort((a, b) => a.availableAt - b.availableAt || a.createdAt - b.createdAt || a.id.localeCompare(b.id));
    const job = candidates[0];
    if (!job) return null;
    job.state = 'leased'; job.attempts += 1; job.leaseOwner = workerId; job.leaseUntil = now + leaseMs; job.leaseToken += 1; job.updatedAt = now;
    this.#audit?.append('job.claimed', { jobId: job.id, workerId, attempt: job.attempts, leaseToken: job.leaseToken });
    return clone(job);
  }

  renew({ jobId, workerId, leaseToken, leaseMs = 10_000 }) {
    const job = this.#requireLeased(jobId, workerId, leaseToken);
    job.leaseUntil = this.#clock() + leaseMs; job.updatedAt = this.#clock();
    this.#audit?.append('job.lease_renewed', { jobId, workerId, leaseToken });
    return clone(job);
  }

  complete({ jobId, workerId, leaseToken, result }) {
    const job = this.#requireLeased(jobId, workerId, leaseToken);
    job.state = 'succeeded'; job.result = clone(result); job.leaseOwner = null; job.leaseUntil = null; job.updatedAt = this.#clock();
    this.#audit?.append('job.succeeded', { jobId, attempt: job.attempts });
    return clone(job);
  }

  fail({ jobId, workerId, leaseToken, errorCode = 'FAILED', message = 'Job failed', retry = {} }) {
    const job = this.#requireLeased(jobId, workerId, leaseToken);
    job.lastError = { code: errorCode, message: String(message), at: this.#clock() };
    job.leaseOwner = null; job.leaseUntil = null;
    const retryable = shouldRetry({ attempts: job.attempts, maxAttempts: job.maxAttempts, errorCode, nonRetryableCodes: retry.nonRetryableCodes ?? [] });
    if (retryable) {
      job.state = 'waiting';
      job.availableAt = this.#clock() + retryDelayMs({ jobId, attempt: job.attempts, ...retry });
      this.#audit?.append('job.retry_scheduled', { jobId, attempt: job.attempts, availableAt: job.availableAt, errorCode });
    } else {
      job.state = 'dead';
      this.#audit?.append('job.dead_lettered', { jobId, attempt: job.attempts, errorCode });
    }
    job.updatedAt = this.#clock();
    return clone(job);
  }

  reapExpiredLeases() {
    const now = this.#clock();
    for (const job of this.#jobs.values()) {
      if (job.state === 'leased' && job.leaseUntil <= now) {
        job.state = 'waiting'; job.leaseOwner = null; job.leaseUntil = null; job.availableAt = now; job.updatedAt = now;
        this.#audit?.append('job.lease_expired', { jobId: job.id, leaseToken: job.leaseToken });
      }
    }
  }

  rescheduleDead(jobId, availableAt = this.#clock()) {
    const job = this.#jobs.get(jobId);
    if (!job || job.state !== 'dead') throw new Error('job is not dead');
    job.state = 'waiting'; job.availableAt = availableAt; job.updatedAt = this.#clock();
    this.#audit?.append('job.dead_replayed', { jobId, availableAt });
    return clone(job);
  }

  get(jobId) { return this.#jobs.has(jobId) ? clone(this.#jobs.get(jobId)) : null; }
  list({ state } = {}) { return [...this.#jobs.values()].filter((job) => !state || job.state === state).map(clone); }

  #requireLeased(jobId, workerId, leaseToken) {
    const job = this.#jobs.get(jobId);
    if (!job) throw new Error('job not found');
    if (job.state !== 'leased' || job.leaseOwner !== workerId || job.leaseToken !== leaseToken) throw new Error('stale or invalid lease');
    if (job.leaseUntil <= this.#clock()) throw new Error('lease expired');
    return job;
  }
}
