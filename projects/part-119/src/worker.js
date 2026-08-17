import { sleep } from './util.js';

export class Worker {
  constructor({ id, queue, handlers, leaseMs = 5_000, pollMs = 50, retry = {} }) {
    this.id = id; this.queue = queue; this.handlers = handlers; this.leaseMs = leaseMs; this.pollMs = pollMs; this.retry = retry; this.running = false;
  }

  async runOne() {
    const job = this.queue.claim({ workerId: this.id, leaseMs: this.leaseMs, types: Object.keys(this.handlers) });
    if (!job) return false;
    const handler = this.handlers[job.type];
    try {
      const result = await handler(job.payload, { job });
      this.queue.complete({ jobId: job.id, workerId: this.id, leaseToken: job.leaseToken, result });
    } catch (error) {
      this.queue.fail({ jobId: job.id, workerId: this.id, leaseToken: job.leaseToken, errorCode: error.code ?? 'FAILED', message: error.message, retry: this.retry });
    }
    return true;
  }

  async start({ maxIterations = Infinity } = {}) {
    this.running = true; let iterations = 0;
    while (this.running && iterations < maxIterations) { iterations += 1; if (!(await this.runOne())) await sleep(this.pollMs); }
  }

  stop() { this.running = false; }
}
