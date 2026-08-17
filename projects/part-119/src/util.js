import { createHash, randomUUID } from 'node:crypto';

export const nowMs = () => Date.now();
export const makeId = (prefix = 'id') => `${prefix}_${randomUUID()}`;
export const clone = (value) => structuredClone(value);
export const sha256 = (value) => createHash('sha256').update(String(value)).digest('hex');
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function stableJson(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
}

export function deterministicJitter(jobId, attempt, maxJitterMs) {
  if (maxJitterMs <= 0) return 0;
  const hash = sha256(`${jobId}:${attempt}`);
  const value = Number.parseInt(hash.slice(0, 8), 16);
  return value % (maxJitterMs + 1);
}
