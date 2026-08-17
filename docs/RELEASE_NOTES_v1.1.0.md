# Node.js Mastery companion code v1.1.0

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

Version 1.1.0 is a repository-hardening release for the public companion code. It does not publish or alter the commercial eBook manuscript.

## Highlights

- Dynamic discovery of all `projects/part-NNN` laboratories.
- Complete root release gate with tests, demonstrations, verification, and repository-policy enforcement.
- Consistent Node.js 20+ / MIT / repository-directory / Gumroad metadata across all currently available labs.
- Explicit third-party npm dependency allowlists; the current public labs remain dependency-free.
- Runnable-project README validation, Gumroad-link checks, relative Markdown-link integrity, cross-part isolation checks, sensitive-file screening, committed secret-pattern scanning, and commercial-artifact boundary enforcement.
- Dependency-free CycloneDX 1.5 SBOM generation with structural validation on normal CI.
- Release-readiness uploads the validated SBOM and creates GitHub artifact provenance with `actions/attest@v4`.
- CodeQL v4, Dependency Review v5.0.0, Dependabot, CODEOWNERS, runtime pinning, and cross-platform file normalization.
- Reviewed GitHub workflow updates to `actions/checkout@v7`, `actions/setup-node@v7`, and `actions/upload-artifact@v7`.
- CI verification on Node.js 20 and Node.js 22.
- Concurrency controls that cancel obsolete workflow runs during rapid commit sequences.
- Generated GitHub Release-note categories through `.github/release.yml`.
- Explicit provenance policy distinguishing recovered, reconstructed, and unavailable historical companion projects.
- Privacy, accessibility, versioning, GitHub settings, architecture, testing, security, supply-chain, CI, development, release, troubleshooting, FAQ, roadmap, command-reference, and project-index documentation.
- Structured issue templates for bugs, features, documentation feedback, and historical project recovery.

## Available public labs

Parts 77, 84, and 118–125 are currently represented in the repository. Parts 77 and 84 are explicitly reconstructed; Parts 118–125 are recovered from the completed series artifacts available during publication work.

## Release evidence

Before publishing the GitHub Release, the release-readiness workflow should complete successfully. It runs `npm run release:check`, generates and validates `dist/nodejs-mastery-sbom.cdx.json`, attests the SBOM provenance, and preserves the SBOM as a workflow artifact.

Normal pushes continue to verify the complete policy chain on Node.js 20 and Node.js 22, while CodeQL separately analyzes JavaScript source and automation changes.

## Compatibility

- Node.js: 20+
- CI matrix: Node.js 20 and Node.js 22
- Public source-code license: MIT
- Third-party npm dependencies currently allowlisted: none
- SBOM: CycloneDX 1.5

## Commercial edition boundary

The complete paid PDF, DOCX, EPUB, source manuscript, model-solution package, and commercial publication bundle are not part of this GitHub release.

Get the complete 125-part learning edition from the official storefront:

**https://ramsandesh.gumroad.com**
