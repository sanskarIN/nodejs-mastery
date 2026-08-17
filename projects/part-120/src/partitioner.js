export function partitionForKey(key, partitionCount) {
  if (!Number.isInteger(partitionCount) || partitionCount <= 0) throw new Error('invalid partitionCount');
  const s = String(key ?? '');
  let hash = 2166136261;
  for (let i = 0; i < s.length; i++) {
    hash ^= s.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash % partitionCount;
}
