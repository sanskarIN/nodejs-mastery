import { deterministicJitter } from './util.js';

export function retryDelayMs({ jobId, attempt, baseMs = 250, capMs = 30_000, jitterMs = 100 }) {
  if (!Number.isInteger(attempt) || attempt < 1) throw new Error('attempt must be >= 1');
  const exponential = Math.min(capMs, baseMs * (2 ** (attempt - 1)));
  return exponential + deterministicJitter(jobId, attempt, jitterMs);
}

export function shouldRetry({ attempts, maxAttempts, errorCode, nonRetryableCodes = [] }) {
  if (nonRetryableCodes.includes(errorCode)) return false;
  return attempts < maxAttempts;
}
