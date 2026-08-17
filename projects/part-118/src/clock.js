export class FixedClock {
  constructor({ tickMs = 50, maxCatchUpTicks = 5 } = {}) {
    if (!Number.isInteger(tickMs) || tickMs <= 0) throw new TypeError('tickMs must be a positive integer');
    if (!Number.isInteger(maxCatchUpTicks) || maxCatchUpTicks < 1) throw new TypeError('maxCatchUpTicks must be >= 1');
    this.tickMs = tickMs;
    this.maxCatchUpTicks = maxCatchUpTicks;
    this.accumulatorMs = 0;
    this.tick = 0;
  }
  advance(elapsedMs, onTick = () => {}) {
    if (!Number.isFinite(elapsedMs) || elapsedMs < 0) throw new TypeError('elapsedMs must be finite and >= 0');
    this.accumulatorMs += elapsedMs;
    const available = Math.floor(this.accumulatorMs / this.tickMs);
    const run = Math.min(available, this.maxCatchUpTicks);
    for (let i = 0; i < run; i++) {
      this.tick += 1;
      this.accumulatorMs -= this.tickMs;
      onTick(this.tick, this.tickMs);
    }
    const droppedTicks = Math.max(0, available - run);
    if (droppedTicks) this.accumulatorMs -= droppedTicks * this.tickMs;
    return { tick: this.tick, ranTicks: run, droppedTicks, alpha: this.accumulatorMs / this.tickMs };
  }
}

export function quantize(value, precision = 1000) {
  if (!Number.isFinite(value)) throw new TypeError('value must be finite');
  return Math.round(value * precision) / precision;
}
