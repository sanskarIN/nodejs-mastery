# Changelog

> 📘 Node.js Full Mastery: https://ramsandesh.gumroad.com

## 2.0.0 — 2026-08-18

### Breaking changes

- Removed Node.js 20 from the supported runtime contract because it is end-of-life.
- Raised root, numbered-project, and supplemental-project `engines.node` requirements to `>=22`.
- Required CI now targets Node.js 22 and Node.js 24; Node.js 24 is the pinned development and Release Readiness runtime.

### Added

- Repository-wide JavaScript/CommonJS/ESM syntax validation through `npm run check:syntax`.
- Repository-wide JSON/package/config parsing validation through `npm run check:json`.
- Executable runtime-policy validation through `npm run check:runtime`.
- `docs/RUNTIME_SUPPORT.md` with the maintained-runtime compatibility contract.
- `docs/RELEASE_NOTES_v2.0.0.md` for the major runtime-hardening release.

### Changed

- Companion CI now runs tests, verifiers, deterministic demos, and the complete repository policy suite on both supported CI runtimes.
- Release Readiness now uses Node.js 24 LTS and reports runtime/npm versions before the release gate.
- SBOM validation requires v2.0.0 root metadata and Node.js `>=22` engine metadata for every public-code component.
- README, development, CI, runtime, project-standard, running, supply-chain, versioning, maintenance, and release documentation were aligned with v2.0.0.
- The existing public inventory remains 10 numbered companion labs plus 12 supplemental labs.

## 1.2.0 — 2026-08-18

### Added

- Twelve new dependency-free supplemental Node.js laboratories under `supplemental/`.
- Bounded job queue with retry/backoff/dead-letter semantics.
- TTL + LRU cache with deterministic time injection and cache metrics.
- Token-bucket rate limiter with refill and retry-after math.
- Idempotent API kernel with request fingerprints and replay-safe effects.
- Stream backpressure lab with bounded line framing and pipeline propagation.
- Service health kernel separating liveness, readiness, dependency state, and graceful draining.
- Idempotent event-consumer kernel with partition offsets, duplicate suppression, and poison-event quarantine.
- Configuration/redaction kit with bounded parsing and safe diagnostic snapshots.
- AsyncLocalStorage request-context lab with concurrent request isolation.
- Graceful-shutdown coordinator with ordered cleanup and idempotent lifecycle handling.
- Circuit-breaker kernel with closed/open/half-open transitions and recovery probes.
- Bounded-concurrency pool with stable result ordering and peak-concurrency evidence.
- Architecture notes and mastery challenge sets for every supplemental project.
- Dynamic supplemental registry, listing command, test/demo/verify runner, and policy checker.
- `docs/SUPPLEMENTAL_PROJECTS.md`, `docs/SUPPLEMENTAL_PROJECT_STANDARD.md`, and `docs/RELEASE_NOTES_v1.2.0.md`.

### Changed

- Root version advanced to `1.2.0`.
- Root `npm test`, `npm run verify`, and `npm run demo` execute both numbered and supplemental inventories.
- Added `npm run supplemental`, `test:supplemental`, `verify:supplemental`, and `demo:supplemental` commands.
- Repository checks validate supplemental metadata, exact v1.2 inventory, zero-dependency policy, Gumroad visibility, README/architecture/challenge contracts, and evergreen X/Twitter-link avoidance.
- Supplemental project trees reject native promotional image assets.
- Cross-project import isolation covers supplemental labs.
- CycloneDX 1.5 SBOM generation and validation inventory both numbered companion projects and supplemental labs.
- README, documentation index, project index, learning path, running guide, command reference, CI guide, supply-chain guide, versioning policy, release process, citation metadata, maintenance status, and release checklist were updated for the new collection.
- Supplemental provenance remains separate from historical Parts 1–125 and the paid book remains outside the public repository.

## 1.1.0 — 2026-08-17

### Added

- Cross-platform `.editorconfig` and `.gitattributes` rules.
- `.nvmrc`, `.node-version`, and deterministic npm defaults.
- CODEOWNERS and weekly Dependabot configuration.
- CodeQL security scanning and pull-request dependency review.
- Manual/tag-triggered release-readiness workflow.
- Generated GitHub Release-note categorization through `.github/release.yml`.
- Dynamic `projects/part-NNN` discovery instead of a hardcoded runner list.
- Root project inventory command: `npm run projects`.
- Executable checks for project metadata, runnable project READMEs, Gumroad visibility, Markdown links, project isolation, sensitive-file names, committed secret patterns, and commercial-book boundaries.
- Explicit root/project npm dependency allowlist policy and executable enforcement.
- Dependency-free CycloneDX 1.5 SBOM generation and structural validation.
- Release-workflow SBOM upload plus GitHub/Sigstore-backed artifact provenance attestation.
- `npm run release:check` as the complete pre-release gate.
- Architecture, development, testing, troubleshooting, FAQ, roadmap, project-index, release, security-model, supply-chain, command-reference, CI, dependency, companion-standard, recovery, privacy, accessibility, and versioning documentation.
- Governance, maintainer, citation, feature-request, docs-feedback, and historical-recovery metadata/templates.
- Canonical GitHub host-settings checklist covering branch protection, topics, hosted security features, releases, and social preview.
- Prepared `v1.1.0` public release notes while keeping commercial eBook artifacts outside GitHub.

### Changed

- Normalized all available project package metadata with Node.js 20+, MIT, repository-directory, and Gumroad homepage fields.
- Expanded Part 77 and Part 84 README provenance so reconstructed material cannot be confused with recovered originals.
- Strengthened the pull-request verification checklist.
- Upgraded the root README with CI/CodeQL badges, repository health commands, complete documentation navigation, dependency governance, and stronger Gumroad/storefront visibility.
- Added workflow concurrency cancellation so rapid commit series do not keep obsolete CI/CodeQL runs active.
- Upgraded GitHub workflow actions to `actions/checkout@v7`, `actions/setup-node@v7`, `github/codeql-action@v4`, and `actions/dependency-review-action@v5.0.0` after reviewing the corresponding official releases/Dependabot updates.
- Added `actions/attest@v4` and `actions/upload-artifact@v7` to the release-evidence path.
- Closed superseded Dependabot PRs after applying their reviewed action upgrades directly to current `main`.
- Expanded security, support, contributor, project-status, run-guide, learning-path, store, privacy, accessibility, supply-chain, and maintenance documentation.

## 1.0.0 — 2026-08-17

- Initialized the public companion-code repository.
- Added MIT licensing for public code and an explicit commercial-book license boundary.
- Added available Parts 77, 84 and 118–125 companion laboratories.
- Added repository-wide test/demo/verification runners.
- Added GitHub Actions CI.
- Added contributor, security, support and community documentation.
- Added Gumroad storefront badges and promotional assets.
- Added project-status documentation for Parts 1–125.
