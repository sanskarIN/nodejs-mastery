# Continuous integration and automation

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

## Companion CI

Runs on pushes and pull requests targeting `main`.

Matrix:

- Node.js 20
- Node.js 22

For each runtime it executes:

```bash
npm test
npm run verify
npm run check
```

The repository check includes structural files, dependency allowlists, package metadata, runnable project READMEs, Gumroad visibility, Markdown links, companion-project isolation, sensitive-file screening, committed secret-pattern scanning, generated CycloneDX SBOM validation, and the commercial-book boundary.

The workflow also prints the official Gumroad learning-edition link so the public-code/commercial-book relationship remains visible in automation output.

## CodeQL

`github/codeql-action@v4` runs JavaScript/TypeScript static security analysis on pushes, pull requests, and a weekly schedule.

CodeQL findings are security signals, not proof that the code is production-safe. Human review and deployment-specific threat modeling remain necessary.

## Dependency Review

`actions/dependency-review-action@v5.0.0` runs on pull requests and checks newly introduced dependency changes against GitHub's dependency-review data. Repository policy independently requires third-party npm packages to be listed in `config/dependency-policy.json`.

## Dependabot

Checks GitHub Actions and root npm dependency metadata weekly. The current companion labs intentionally keep the npm dependency allowlist empty.

## Action versions

The repository currently uses reviewed release lines for `actions/checkout@v7`, `actions/setup-node@v7`, `github/codeql-action@v4`, `actions/dependency-review-action@v5.0.0`, `actions/attest@v4`, and `actions/upload-artifact@v7`. Dependabot remains responsible for proposing future GitHub Actions updates.

## Concurrency

CI and CodeQL cancel obsolete in-progress runs for the same ref so a rapid sequence of small, reviewable commits does not consume unnecessary runner capacity. The newest commit remains the authoritative verification target.

## Release Readiness

Runs manually and for `v*` tag pushes. It executes:

```bash
npm run release:check
```

This is stricter than the normal CI path because it includes all demos, repository-policy checks, committed-secret scanning, CycloneDX SBOM generation, and structural SBOM validation.

After the gate passes, the release workflow:

1. attests the generated SBOM with `actions/attest@v4`;
2. uploads the validated SBOM with `actions/upload-artifact@v7`;
3. retains the artifact for 30 days as workflow evidence.

The attestation path uses `contents: read`, `id-token: write`, `attestations: write`, and `artifact-metadata: write` permissions.

## Generated release notes

`.github/release.yml` categorizes generated GitHub Release notes into breaking changes, security, companion-project work, documentation, automation/dependencies, fixes, and other changes.

## Failure policy

Do not hide or ignore a red workflow solely to make a release appear green. Fix the failure, document a deliberate compatibility change, or revert the change that broke the gate.

**Official storefront:** https://ramsandesh.gumroad.com
