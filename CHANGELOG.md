# Changelog

> 📘 Node.js Full Mastery: https://ramsandesh.gumroad.com

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
