export function createCommand({ sessionId, playerId, seq, tick, dx = 0, dy = 0, action = 'move' }) {
  const command = { sessionId, playerId, seq, tick, dx, dy, action };
  validateCommand(command);
  return Object.freeze(command);
}

export function validateCommand(c) {
  if (!c || typeof c !== 'object') throw new TypeError('command required');
  for (const k of ['sessionId', 'playerId', 'action']) if (typeof c[k] !== 'string' || !c[k]) throw new TypeError(`${k} required`);
  for (const k of ['seq', 'tick']) if (!Number.isSafeInteger(c[k]) || c[k] < 0) throw new TypeError(`${k} invalid`);
  for (const k of ['dx', 'dy']) if (!Number.isFinite(c[k]) || Math.abs(c[k]) > 1) throw new RangeError(`${k} outside [-1,1]`);
  return true;
}

export class CommandWindow {
  constructor({ maxAhead = 3, maxBehind = 20 } = {}) { this.maxAhead=maxAhead; this.maxBehind=maxBehind; this.lastSeq = new Map(); }
  accept(command, authoritativeTick) {
    validateCommand(command);
    const last=this.lastSeq.get(command.playerId) ?? -1;
    if (command.seq <= last) return { ok:false, reason:'duplicate-or-old-sequence' };
    if (command.tick > authoritativeTick + this.maxAhead) return { ok:false, reason:'too-far-ahead' };
    if (command.tick < authoritativeTick - this.maxBehind) return { ok:false, reason:'too-old' };
    this.lastSeq.set(command.playerId, command.seq);
    return { ok:true };
  }
}
