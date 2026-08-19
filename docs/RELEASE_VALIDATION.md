# v2.0.0 Release Validation Record

> Official Node.js Full Mastery storefront: https://ramsandesh.gumroad.com

This document records the final hosted validation procedure for the public `nodejs-mastery` repository.

## Candidate contract

The v2.0.0 release candidate must preserve:

- 10 numbered companion laboratories;
- 12 supplemental laboratories;
- Node.js `>=22` package metadata;
- Node.js 22 and 24 Companion CI coverage;
- Node.js 24 as the development and Release Readiness runtime;
- JavaScript syntax, JSON/configuration, runtime-policy, metadata, dependency, documentation, Gumroad, Markdown-link, isolation, sensitive-file, committed-secret, SBOM, and commercial-boundary checks;
- deterministic tests, demos, and project verification gates;
- CodeQL analysis;
- the MIT public-code/proprietary-book boundary;
- no permanent X/Twitter profile URL in evergreen supplemental/publication metadata;
- no human portrait, face, person image, or profile avatar in publication/social-preview artwork.

## Hosted pull-request validation

A dedicated release-validation pull request is used to exercise the repository's pull-request workflows without weakening any checks.

The pull request is acceptable only when:

1. Companion CI passes on Node.js 22.
2. Companion CI passes on Node.js 24.
3. CodeQL completes successfully.
4. No project or repository policy gate is skipped or disabled to make the run pass.

## Final release validation

After the validated release commit is on `main`, the remaining host-level steps are tracked in `NEXT_WORK.md` and GitHub Issue #5:

1. run Release Readiness;
2. verify the CycloneDX SBOM, artifact upload, and provenance attestation;
3. apply `main` branch protection/rules;
4. verify hosted security controls;
5. verify the no-person/no-avatar social preview rule;
6. create and publish `v2.0.0` only after release evidence is green.

## Failure handling

A failing hosted check is a release blocker. Fix the concrete defect, add regression coverage when practical, and repeat the complete release gate. Do not suppress, bypass, or remove a failing check merely to publish a release.

## Commercial boundary

Do not attach the proprietary PDF, DOCX, EPUB, source manuscript, source archive, answer-key package, or commercial publication bundle to a public GitHub release.

**Storefront:** https://ramsandesh.gumroad.com
