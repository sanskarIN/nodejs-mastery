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

The workflow also prints the official Gumroad learning-edition link so the public-code/commercial-book relationship remains visible in automation output.

## CodeQL

Runs JavaScript/TypeScript static security analysis on pushes, pull requests, and a weekly schedule.

CodeQL findings are security signals, not proof that the code is production-safe. Human review and deployment-specific threat modeling remain necessary.

## Dependency Review

Runs on pull requests and checks newly introduced dependency changes against GitHub's dependency-review data.

## Dependabot

Checks GitHub Actions and root npm dependency metadata weekly. The current companion labs intentionally keep dependency usage minimal.

## Release Readiness

Runs manually and for `v*` tag pushes. It executes:

```bash
npm run release:check
```

This is stricter than the normal CI path because it includes all demos in addition to tests, verifiers, and repository-policy checks.

## Failure policy

Do not hide or ignore a red workflow solely to make a release appear green. Fix the failure, document a deliberate compatibility change, or revert the change that broke the gate.

**Official storefront:** https://ramsandesh.gumroad.com
