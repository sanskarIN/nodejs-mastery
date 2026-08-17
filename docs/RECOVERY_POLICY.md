# Historical project recovery policy

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

The repository distinguishes **recovered**, **reconstructed**, and **unavailable** historical companion code.

## Recovered

Use **recovered** only when the source can be traced to an original project artifact from the completed Node.js Full Mastery series. Preserve the recovered source as faithfully as practical, then document any fixes required to make verification pass.

## Reconstructed

Use **reconstructed** when an original archive cannot be retrieved but enough historical evidence exists to rebuild an educational lab. A reconstruction must never be described as the original recovered project.

A reconstruction should record:

- the historical part/topic used as its basis;
- the reason reconstruction was necessary;
- the verification target when known;
- any major design decisions that could differ from the unavailable original.

## Unavailable

If neither an authentic archive nor sufficient reconstruction evidence is available, keep the part marked unavailable. Do not fill gaps with invented code merely to make the directory numbering look complete.

## Acceptance checklist

Before adding a recovered or reconstructed project:

1. review provenance;
2. scan for secrets, proprietary data, and commercial manuscript content;
3. normalize package metadata;
4. run tests, demo, and verification;
5. update `PROJECT_STATUS.md`;
6. run the root `npm run release:check` gate.

## Reporting recovered material

Use the repository's **Historical project recovery** issue template rather than posting paid book files in an issue.

**Official storefront:** https://ramsandesh.gumroad.com
