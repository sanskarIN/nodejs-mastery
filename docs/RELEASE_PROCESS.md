# Release process

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

This process is for public companion-code and supplemental-lab releases. The commercial eBook is distributed separately.

## 1. Confirm scope

- Public source code and repository documentation only.
- No paid PDF, DOCX, EPUB, master manuscript, answer-key package, source archive, or commercial publication archive.
- Any newly recovered historical project has provenance recorded in `PROJECT_STATUS.md`.
- Any new post-series project is clearly labeled supplemental and follows `SUPPLEMENTAL_PROJECT_STANDARD.md` rather than borrowing a missing historical Part number.

## 2. Confirm runtime

Use Node.js 24 LTS for release preparation and confirm the repository still supports its required Node.js 22/24 matrix:

```bash
nvm use
npm run check:runtime
```

## 3. Run the full local gate

```bash
npm run release:check
```

This runs numbered and supplemental tests, verification scripts, demonstrations, syntax/JSON/runtime checks, metadata/policy checks, secret scanning, Gumroad checks, SBOM generation/validation, and the commercial-boundary check.

## 4. Review hosted checks

The `Companion CI` workflow must pass on Node.js 22 and Node.js 24. CodeQL should also complete successfully for the exact release commit.

## 5. Update documentation

- `CHANGELOG.md`
- current `docs/RELEASE_NOTES_vX.Y.Z.md`
- `docs/RUNTIME_SUPPORT.md` when maintained Node.js support changes
- `docs/PROJECT_STATUS.md` when numbered project availability changes
- `docs/SUPPLEMENTAL_PROJECTS.md` when supplemental inventory changes
- `docs/ROADMAP.md` when planned work changes
- README project tables when public learning material is added

## 6. Versioning

Use semantic versions for repository releases:

- PATCH — bug fix or documentation correction;
- MINOR — new numbered companion project, new supplemental project, tooling, or backwards-compatible capability;
- MAJOR — incompatible repository workflow, supported-runtime expectation, or public-code contract change.

## 7. Tag preparation

Before creating a `vX.Y.Z` tag, trigger the `Release Readiness` workflow manually. Tags matching `v*` trigger the same release gate automatically.

Release Readiness uses Node.js 24 and must include the generated/validated CycloneDX SBOM and its GitHub artifact attestation.

## 8. Evergreen public metadata

Prefer stable repository, Gumroad storefront, and business-contact links. Do not add permanent X/Twitter profile URLs to evergreen release/publication metadata. Supplemental project trees remain free of native promotional image assets, avoiding human portraits and profile avatars there.

## 9. Commercial boundary

A public GitHub release should never attach the paid complete eBook or private publication/source packages. Direct readers to the official storefront instead:

**https://ramsandesh.gumroad.com**

See [`QUALITY_ASSURANCE.md`](QUALITY_ASSURANCE.md) and [`HOST_RELEASE_CHECKLIST.md`](HOST_RELEASE_CHECKLIST.md) before publishing.
