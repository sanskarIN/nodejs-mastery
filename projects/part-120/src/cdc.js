export function cdcEnvelope({ source, table, primaryKey, op, before = null, after = null, commitId, commitTs }) {
  if (!['c','u','d'].includes(op)) throw new Error('invalid CDC op');
  return {
    type: 'cdc.change',
    source,
    table,
    primaryKey: structuredClone(primaryKey),
    op,
    before: structuredClone(before),
    after: structuredClone(after),
    commitId,
    commitTs
  };
}
