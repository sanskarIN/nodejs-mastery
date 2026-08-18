# Continuous integration and automation

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

## Companion CI

Runs on pushes and pull requests targeting `main`.

Required runtime matrix:

- Node.js 22 — maintained LTS compatibility floor.
- Node.js 24 — active LTS and default release runtime.

For each runtime it executes:

```bash
npm test
npm run verify
npm run demo
npm run check
```

`npm test`, `npm run verify`, and `npm run demo` cover two independently discovered inventories:

- numbered companion laboratories under `projects/part-NNN/`;
- new post-series educational laboratories under `supplemental/`.

`npm run check` now begins with repository-wide JavaScript syntax validation, JSON parsing validation, and runtime-policy validation. It then enforces structural files, dependency rules, package metadata, runnable READMEs, supplemental zero-dependency and documentation rules, Gumroad visibility, evergreen X/Twitter-link avoidance for supplemental docs, Markdown links, cross-project isolation, sensitive-file screening, committed secret-pattern scanning, CycloneDX SBOM validation, and the commercial-book boundary.

The supplemental policy additionally requires supplemental project directories to remain free of native promotional image files. This keeps the new labs from introducing person portraits, faces, or profile-avatar imagery into their public project trees.

The workflow prints Node/npm versions before validation and also surfaces the official Gumroad learning-edition link.

## Runtime policy

`npm run check:runtime` verifies that:

- the root package and every public lab require `engines.node: >=22`;
- `.nvmrc` and `.node-version` pin Node.js 24;
- Companion CI tests Node.js 22 and 24 and does not reintroduce Node.js 20;
- Release Readiness runs on Node.js 24.

See [`RUNTIME_SUPPORT.md`](RUNTIME_SUPPORT.md).

## CodeQL

`github/codeql-action@v4` runs JavaScript/TypeScript static security analysis on pushes, pull requests, and a weekly schedule. Its source analysis includes both numbered and supplemental JavaScript files.

CodeQL findings are security signals, not proof that the code is production-safe. Human review and deployment-specific threat modeling remain necessary.

## Dependency Review

`actions/dependency-review-action@v5.0.0` runs on pull requests and checks newly introduced dependency changes against GitHub's dependency-review data. Repository policy independently requires numbered-project third-party npm packages to be listed in `config/dependency-policy.json`, while supplemental labs currently enforce a zero-third-party-dependency rule.

## Dependabot

Checks GitHub Actions and root npm dependency metadata weekly. The public educational laboratories intentionally keep third-party runtime dependency surface minimal; supplemental labs are dependency-free by policy.

## Action versions

The repository currently uses reviewed release lines for `actions/checkout@v7`, `actions/setup-node@v7`, `github/codeql-action@v4`, `actions/dependency-review-action@v5.0.0`, `actions/attest@v4`, and `actions/upload-artifact@v7`. Dependabot remains responsible for proposing future GitHub Actions updates.

## Concurrency

CI and CodeQL cancel obsolete in-progress runs for the same ref so a rapid sequence of small, reviewable commits does not consume unnecessary runner capacity. The newest commit remains the authoritative verification target.

## Release Readiness

Runs manually and for `v*` tag pushes using Node.js 24. It executes:

```bash
npm run release:check
```

The release gate runs tests, verifiers, demos, syntax/JSON/runtime checks, repository policies, secret scanning, and SBOM generation/validation for both public project inventories.

After the gate passes, the release workflow:

1. generates a CycloneDX 1.5 SBOM containing numbered and supplemental project components;
2. validates component count, MIT licensing, Node.js `>=22` engine metadata, zero dependency edges, Gumroad metadata, and the supplemental-lab count;
3. attests the generated SBOM with `actions/attest@v4`;
4. uploads the validated SBOM with `actions/upload-artifact@v7`;
5. retains the artifact for 30 days as workflow evidence.

The attestation path uses `contents: read`, `id-token: write`, `attestations: write`, and `artifact-metadata: write` permissions.

## Generated release notes

`.github/release.yml` categorizes generated GitHub Release notes into breaking changes, security, companion-project work, documentation, automation/dependencies, fixes, and other changes. The current prepared release notes are in `docs/RELEASE_NOTES_v2.0.0.md`.

## Failure policy

Do not hide or ignore a red workflow solely to make a release appear green. Fix the failure, document a deliberate compatibility change, or revert the change that broke the gate.

**Official storefront:** https://ramsandesh.gumroad.com
