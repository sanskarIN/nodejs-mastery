import { cloneState, applyCommand } from './authority.js';
export function predict(authoritativeState, pendingCommands) {
  const predicted=cloneState(authoritativeState);
  for (const c of pendingCommands) applyCommand(predicted,c);
  return predicted;
}
export function reconcile({ authoritativeState, pendingCommands, ackSeq, playerId }) {
  const remaining=pendingCommands.filter(c => c.playerId !== playerId || c.seq > ackSeq);
  return { pending:remaining, predicted:predict(authoritativeState, remaining) };
}
export function correctionDistance(a,b,playerId) {
  const x=a.players[playerId], y=b.players[playerId]; if (!x||!y) return Infinity;
  return Math.hypot(x.x-y.x,x.y-y.y);
}
