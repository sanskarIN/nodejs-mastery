# Node.js Mastery Companion v2.0.0

## Breaking runtime-support update

v2.0.0 removes the end-of-life Node.js 20 line from the repository support contract. Public code now requires **Node.js 22+**, CI validates Node.js **22 and 24**, and Node.js **24** is the default local and Release Readiness runtime.

This is a major release because changing the supported runtime floor is an incompatible repository-level contract change.

## Quality and correctness gates

Added repository-wide executable validation for:

- JavaScript/CommonJS/ESM syntax through `npm run check:syntax`;
- JSON/package/config parsing through `npm run check:json`;
- runtime metadata, CI matrix, local pins, and release runtime through `npm run check:runtime`;
- all existing dependency, metadata, documentation, Gumroad, link, isolation, sensitive-file, secret-pattern, SBOM, and commercial-boundary rules.

Required Companion CI now runs the complete deterministic path on Node.js 22 and Node.js 24:

```text
npm test
npm run verify
npm run demo
npm run check
```

## Public project inventory

The release preserves the existing public inventory:

- 10 numbered recovered/reconstructed companion laboratories;
- 12 clearly labeled supplemental post-series laboratories;
- 22 public Node.js laboratories in total.

The supplemental labs remain new educational projects rather than fabricated replacements for unavailable historical Parts 1–125 archives.

## Supply-chain evidence

CycloneDX 1.5 SBOM validation now requires v2.0.0 root metadata and verifies the Node.js `>=22` engine recorded for every public-code component. Release Readiness continues to attest and upload the validated SBOM.

## Documentation

Added `docs/RUNTIME_SUPPORT.md` and updated repository documentation for the Node.js 22/24 support matrix, Node.js 24 development pin, v2 release process, compatibility expectations, and full quality gate.

## Commercial-content boundary

The MIT license continues to apply only to public companion/supplemental source code. The complete paid PDF, DOCX, EPUB, manuscript sources, answer keys, publication archives, and other commercial book assets remain outside the public repository.

**Complete eBook:** https://ramsandesh.gumroad.com
