export function visiblePlayers(state, viewerId, radius = 5) {
  const viewer=state.players[viewerId]; if (!viewer) return [];
  const r2=radius*radius;
  return Object.entries(state.players).filter(([id,p])=>id===viewerId || ((p.x-viewer.x)**2+(p.y-viewer.y)**2)<=r2).map(([id])=>id).sort();
}
export function diffInterest(previous=[], next=[]) { const a=new Set(previous), b=new Set(next); return { entered:next.filter(x=>!a.has(x)), left:previous.filter(x=>!b.has(x)), retained:next.filter(x=>a.has(x)) }; }
export function cellFor(p,cellSize=10){return `${Math.floor(p.x/cellSize)}:${Math.floor(p.y/cellSize)}`;}
