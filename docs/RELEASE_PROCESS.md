# Release process

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

This process is for public companion-code releases. The commercial eBook is distributed separately.

## 1. Confirm scope

- Public source code and repository documentation only.
- No paid PDF, DOCX, EPUB, master manuscript, answer-key package, or commercial publication archive.
- Any newly recovered historical project has provenance recorded in `PROJECT_STATUS.md`.

## 2. Run the full local gate

```bash
npm run release:check
```

This runs all tests, project verification scripts, demonstrations, metadata checks, Gumroad checks, and the commercial-boundary check.

## 3. Review CI

The `Companion CI` workflow must pass on Node.js 20 and Node.js 22. CodeQL should also complete successfully for the release commit.

## 4. Update documentation

- `CHANGELOG.md`
- `docs/PROJECT_STATUS.md` when project availability changes
- `docs/ROADMAP.md` when planned work changes
- README project table when a new companion lab is added

## 5. Versioning

Use semantic versions for repository releases:

- PATCH — bug fix or documentation correction;
- MINOR — new companion project, tooling, or backwards-compatible capability;
- MAJOR — incompatible repository workflow or public-code contract change.

## 6. Tag preparation

Before creating a `vX.Y.Z` tag, trigger the `Release Readiness` workflow manually. Tags matching `v*` trigger the same release gate automatically.

## 7. Commercial boundary

A public GitHub release should never attach the paid complete eBook. Direct readers to the official storefront instead:

**https://ramsandesh.gumroad.com**
