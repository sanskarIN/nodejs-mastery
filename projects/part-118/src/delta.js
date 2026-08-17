export function createPlayerDelta(base, next) {
  const changes={}; const ids=new Set([...Object.keys(base.players),...Object.keys(next.players)]);
  for (const id of [...ids].sort()) {
    const a=base.players[id], b=next.players[id];
    if (!b) changes[id]=null;
    else if (!a || a.x!==b.x || a.y!==b.y || a.lastSeq!==b.lastSeq) changes[id]={...b};
  }
  return { fromTick:base.tick,toTick:next.tick,epoch:next.epoch,changes };
}
export function applyPlayerDelta(base, delta) {
  if (base.tick!==delta.fromTick) throw new Error('baseline tick mismatch');
  const out=structuredClone(base); out.tick=delta.toTick; out.epoch=delta.epoch;
  for (const [id,v] of Object.entries(delta.changes)) { if (v===null) delete out.players[id]; else out.players[id]={...v}; }
  return out;
}
export function estimateDeltaValue(delta) { return Object.keys(delta.changes).length; }
