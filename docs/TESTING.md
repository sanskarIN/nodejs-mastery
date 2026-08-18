# Testing and verification

> 📘 **Full explanations and the complete 125-part curriculum:** https://ramsandesh.gumroad.com

The repository separates multiple layers of executable evidence.

## Syntax and configuration checks

```bash
npm run check:syntax
npm run check:json
npm run check:runtime
```

These catch repository-wide JavaScript parse errors, invalid JSON/package/config files, and drift away from the maintained Node.js 22/24 support contract.

## Tests

```bash
npm test
```

This runs every discovered numbered and supplemental project's automated test suite. Tests are expected to cover invariants, invalid inputs, recovery behavior, stale ownership, duplicate handling, or other correctness boundaries appropriate to the lab.

## Verification gates

```bash
npm run verify
```

Verification scripts answer a narrower release question: does the project contain and execute the evidence that the chapter or supplemental lab claims it does?

## Demonstrations

```bash
npm run demo
```

Demos are explanatory and deterministic. Companion CI executes them on Node.js 22 and 24. A successful demo is not a substitute for tests or verification.

## Repository policy checks

```bash
npm run check
```

This validates:

- JavaScript syntax and JSON parsing;
- maintained Node.js runtime policy and package engines;
- required repository files and release documentation;
- explicit third-party npm dependency rules;
- public-project package metadata;
- MIT licensing of public code;
- runnable project READMEs and supplemental architecture/challenge docs;
- Gumroad storefront references on public navigation surfaces;
- evergreen X/Twitter-link restrictions for supplemental project docs;
- relative Markdown-link integrity;
- isolation between public project implementation trees;
- absence of credential-like files and high-confidence committed secret patterns;
- CycloneDX SBOM generation/validation;
- supplemental no-image-asset policy;
- exclusion of paid commercial-book PDF/DOCX/EPUB and publication artifacts.

Each check is also available independently; see [`COMMAND_REFERENCE.md`](COMMAND_REFERENCE.md).

## Complete release gate

```bash
npm run release:check
```

This executes tests, verifiers, demos, and all repository checks. GitHub Actions runs the same required behavioral/policy path on Node.js 22 and Node.js 24.

## Regression policy

When a behavior bug is fixed, add a regression test when practical so the same failure cannot silently return. Never weaken a failing check only to make CI green without addressing the underlying contract.

## What a passing build does not prove

A passing educational laboratory does not automatically prove internet-facing production readiness. Real deployments still need appropriate durable storage, identity, secrets management, observability, capacity planning, incident response, backups, privacy controls, dependency governance, and threat modeling.

See [`QUALITY_ASSURANCE.md`](QUALITY_ASSURANCE.md) for release acceptance and bug-fix workflow.

**Official Node.js Full Mastery storefront:** https://ramsandesh.gumroad.com
