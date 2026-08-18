export async function mapLimit(items, limit, worker) {
  if (!Number.isInteger(limit) || limit < 1) throw new TypeError('limit must be a positive integer');
  if (typeof worker !== 'function') throw new TypeError('worker must be a function');
  const input = Array.from(items);
  const results = new Array(input.length);
  let next = 0; let active = 0; let peak = 0;

  async function runner() {
    while (true) {
      const index = next++;
      if (index >= input.length) return;
      active += 1; peak = Math.max(peak, active);
      try { results[index] = await worker(input[index], index); }
      finally { active -= 1; }
    }
  }

  const runners = Array.from({ length: Math.min(limit, input.length) }, () => runner());
  await Promise.all(runners);
  return { results, peakConcurrency: peak };
}
