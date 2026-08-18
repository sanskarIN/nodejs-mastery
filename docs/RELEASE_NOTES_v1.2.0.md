# Node.js Mastery Companion v1.2.0

## New supplemental project collection

v1.2.0 adds eight new dependency-free Node.js practice laboratories without changing the completed Parts 1–125 eBook sequence or misrepresenting the new code as recovered historical companions.

### Added projects

- `bounded-job-queue` — bounded admission, retry classification, exponential backoff, dead-letter handling, duplicate IDs.
- `ttl-lru-cache` — TTL expiration, LRU eviction, deterministic clocks, cache metrics.
- `token-bucket-gateway` — per-key token buckets, continuous refill, retry-after calculations.
- `idempotent-api-kernel` — idempotency keys, request fingerprints, replay-safe effects, conflicts and retention.
- `stream-backpressure-lab` — bounded line framing, byte accounting, Node.js pipeline error propagation.
- `service-health-kernel` — liveness, readiness, dependency gates and graceful draining.
- `event-consumer-kernel` — partition offsets, duplicate suppression and poison-event quarantine.
- `config-redaction-kit` — bounded configuration parsing and safe diagnostic redaction.

Every supplemental project includes package metadata, README, implementation, automated tests, demo, verification gate, and architecture documentation.

## Root automation

- Added dynamic supplemental discovery and execution.
- `npm test`, `npm run verify`, and `npm run demo` now cover both numbered and supplemental inventories.
- Added `npm run supplemental`, `test:supplemental`, `verify:supplemental`, and `demo:supplemental`.
- Added executable supplemental metadata, zero-dependency, Gumroad, documentation, and evergreen-link policy checks.
- Extended cross-project import isolation to supplemental labs.

## Supply-chain evidence

The CycloneDX 1.5 SBOM now inventories both numbered companion projects and supplemental labs. SBOM validation checks the v1.2.0 root version, public-code component count, MIT licensing, empty dependency edges, Gumroad metadata, and supplemental-lab count.

## Documentation and provenance

- Added `SUPPLEMENTAL_PROJECTS.md` and `SUPPLEMENTAL_PROJECT_STANDARD.md`.
- Updated repository README, documentation index, project index, learning path, command reference, and running guide.
- Supplemental projects are explicitly classified as new post-series educational code.
- Evergreen supplemental READMEs intentionally avoid X/Twitter profile URLs.
- New image guidance excludes human portraits, faces, and profile avatars from repository/publication promotional assets.

## Commercial-content boundary

The complete PDF, DOCX, EPUB, manuscript sources, answer keys, and other paid publishing assets remain outside the public repository. The MIT license applies to public source code only.

**Complete eBook storefront:** https://ramsandesh.gumroad.com
