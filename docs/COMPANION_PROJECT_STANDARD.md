# Companion project standard

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

Every public companion lab should remain independently understandable, runnable, and verifiable.

## Required structure

At minimum, a project under `projects/part-NNN/` must contain:

- `package.json`;
- `README.md`;
- implementation source;
- automated tests;
- a runnable demonstration;
- an executable verification command.

## Required package metadata

- `private: true` — these labs are repository projects, not npm registry packages;
- `engines.node: >=22`;
- `license: MIT` for public source code;
- `homepage: https://ramsandesh.gumroad.com`;
- repository URL and correct `repository.directory`;
- `test`, `demo`, and `verify` scripts.

These requirements are enforced by `scripts/check-project-metadata.mjs` and the repository runtime policy.

## Runtime expectations

Numbered companion labs must pass the maintained Node.js 22/24 CI matrix. Node.js 24 is the pinned development/release runtime. See [`RUNTIME_SUPPORT.md`](RUNTIME_SUPPORT.md).

## Correctness expectations

Tests should prioritize invariants and failure behavior rather than only happy-path output. Verification should prove the chapter-specific acceptance evidence. Demos should stay concise and deterministic. All JavaScript/JSON files must also pass the repository-wide syntax and parse gates.

## Documentation expectations

A project README should state:

1. what the lab models;
2. how to run it;
3. important production limitations;
4. provenance when the project is recovered or reconstructed;
5. the official complete-book storefront.

## Isolation

A part should not depend on implementation code from another part unless a future repository architecture explicitly documents and tests that shared contract. Independent labs are easier to learn from, archive, and verify.

## Commercial boundary

Do not place the paid book manuscript or publication files inside a companion project.

**Official storefront:** https://ramsandesh.gumroad.com
