# Testing and verification

> 📘 **Full explanations and the complete 125-part curriculum:** https://ramsandesh.gumroad.com

The repository separates three kinds of executable evidence.

## Tests

```bash
npm test
```

This runs every discovered companion project's automated test suite. Tests are expected to cover invariants, invalid inputs, recovery behavior, stale ownership, duplicate handling, or other correctness boundaries appropriate to the part.

## Verification gates

```bash
npm run verify
```

Verification scripts answer a narrower release question: does the project contain and execute the evidence that the chapter claims it does?

## Demonstrations

```bash
npm run demo
```

Demos are explanatory. A successful demo is not a substitute for tests or verification.

## Repository policy checks

```bash
npm run check
```

This validates:

- required repository files and release documentation;
- explicit third-party npm dependency allowlists;
- project package metadata and Node.js 20+ declarations;
- MIT licensing of public code;
- runnable project READMEs with test/demo/verify instructions;
- Gumroad storefront references on public navigation surfaces;
- relative Markdown-link integrity;
- isolation between companion project implementation trees;
- absence of credential-like key/container files;
- exclusion of paid commercial-book PDF/DOCX/EPUB and publication artifacts.

Each check is also available independently; see [`COMMAND_REFERENCE.md`](COMMAND_REFERENCE.md).

## Complete release gate

```bash
npm run release:check
```

This executes tests, verifiers, demos, and all repository checks. GitHub Actions also runs the normal CI matrix on Node.js 20 and Node.js 22.

## What a passing build does not prove

A passing educational laboratory does not automatically prove internet-facing production readiness. Real deployments still need appropriate durable storage, identity, secrets management, observability, capacity planning, incident response, backups, privacy controls, dependency governance, and threat modeling.

**Official Node.js Full Mastery storefront:** https://ramsandesh.gumroad.com
