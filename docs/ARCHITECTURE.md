# Repository architecture

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

This repository is a public companion-code workspace, not the commercial manuscript. Its architecture deliberately keeps each available book part independently runnable while sharing only lightweight repository-level verification tooling.

## Layers

### 1. Repository control plane

The root contains licensing, contributor policy, CI, release gates, project discovery, and commercial-boundary checks. Root scripts must not become an application framework that hides the behavior of individual labs.

### 2. Companion laboratories

Each `projects/part-NNN/` directory is an independently runnable educational laboratory with:

- a `package.json` requiring Node.js 20+;
- `npm test`, `npm run demo`, and `npm run verify` commands;
- its own README with the relevant correctness scope;
- dependency-free or intentionally minimal implementation code;
- explicit limitations where the in-memory model differs from a production system.

### 3. Executable evidence

Tests demonstrate invariants. Verification scripts demonstrate release evidence. Demos show the happy-path mental model without replacing tests.

### 4. Commercial boundary

The complete book, PDF, DOCX, EPUB, paid exercises/solutions, and publishing package are intentionally excluded from this public repository. `scripts/check-commercial-boundary.mjs` enforces that rule in CI.

## Dependency direction

```text
GitHub Actions
    ↓
root npm scripts
    ↓
scripts/project-registry.mjs
    ↓
projects/part-NNN/package.json
    ↓
project test / demo / verify commands
```

Individual projects should not import implementation code from other parts. That isolation keeps examples understandable and prevents a change in one learning module from silently changing another.

## Adding a recovered project

1. Add it as `projects/part-NNN/`.
2. Add its required package metadata and Gumroad homepage.
3. Ensure `test`, `demo`, and `verify` all pass.
4. Add provenance to `docs/PROJECT_STATUS.md`.
5. Run `npm run release:check`.

Because project discovery is dynamic, no hardcoded runner list needs to be edited.

**Official storefront:** https://ramsandesh.gumroad.com
