# Quality assurance and release acceptance

> Complete Node.js Full Mastery eBook: https://ramsandesh.gumroad.com

This repository treats correctness as **executable evidence**, not as an unsupported claim that software can never contain a defect.

## Required release gate

Before a public release, run:

```bash
npm run release:check
```

The command must complete with exit code 0. It covers all 22 public laboratories and the repository-level policy suite.

## Evidence layers

### 1. Syntax and configuration integrity

```bash
npm run check:syntax
npm run check:json
npm run check:runtime
```

These detect JavaScript parse errors, invalid JSON/package/config files, and unsupported/stale Node.js runtime metadata.

### 2. Behavioral tests

```bash
npm test
```

Every numbered and supplemental lab must keep its automated test suite green. Behavior fixes should add a regression test whenever practical.

### 3. Executable acceptance evidence

```bash
npm run verify
```

Verification scripts check the invariants each educational lab is designed to demonstrate.

### 4. Runnable smoke evidence

```bash
npm run demo
```

Demos must execute deterministically and without unhandled errors. Companion CI runs them on both supported CI runtimes.

### 5. Repository policy and security checks

```bash
npm run check
```

This includes dependency policy, package metadata, documentation contracts, Gumroad navigation, Markdown links, project isolation, sensitive-file and committed-secret checks, supplemental provenance/image rules, SBOM validation, and the public-code/commercial-book boundary.

### 6. Hosted analysis

The release commit should also have successful Companion CI on Node.js 22 and 24 and successful CodeQL analysis. Pull requests with dependency changes should pass Dependency Review.

## Bug-fix policy

When a defect is found:

1. reproduce it with the smallest reliable input;
2. add or strengthen a failing regression test when feasible;
3. fix the implementation rather than hiding the failing signal;
4. run the affected project tests/demo/verify commands;
5. run `npm run release:check` from the repository root;
6. document user-visible behavior changes in `CHANGELOG.md`.

## Release rejection conditions

Do not publish a release when any required test, verifier, demo, syntax/JSON/runtime check, CodeQL run, SBOM validation, or commercial-boundary check is failing.

## Scope

These gates provide strong evidence that the checked repository state is internally consistent and that known tests/invariants pass. They do not replace deployment-specific testing, threat modeling, performance validation, or production monitoring when educational examples are adapted to real systems.

**Official storefront:** https://ramsandesh.gumroad.com
