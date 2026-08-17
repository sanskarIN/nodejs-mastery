import { quantize } from './clock.js';

export function cloneState(state) { return structuredClone(state); }
export function initialState(players = []) {
  return { tick:0, epoch:1, players:Object.fromEntries(players.map(id => [id,{x:0,y:0,lastSeq:-1}])) };
}
export function applyCommand(state, cmd, speed = 0.25) {
  const p=state.players[cmd.playerId];
  if (!p) return { applied:false, reason:'unknown-player' };
  if (cmd.seq <= p.lastSeq) return { applied:false, reason:'already-applied' };
  p.x=quantize(p.x + cmd.dx * speed); p.y=quantize(p.y + cmd.dy * speed); p.lastSeq=cmd.seq;
  return { applied:true };
}
export function simulateTick(state, commands = []) {
  const next=cloneState(state); next.tick += 1;
  const ordered=[...commands].sort((a,b)=>a.playerId.localeCompare(b.playerId)||a.seq-b.seq);
  const results=ordered.map(c=>({command:c,result:applyCommand(next,c)}));
  return { state:next, results };
}
export function stateDigest(state) {
  const players=Object.entries(state.players).sort(([a],[b])=>a.localeCompare(b)).map(([id,p])=>[id,p.x,p.y,p.lastSeq]);
  return JSON.stringify([state.tick,state.epoch,players]);
}
