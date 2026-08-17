# Host-level v1.1.0 release checklist

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

This checklist contains the final GitHub-host operations that are intentionally not performed by repository source files.

## Before creating the release

- Confirm the latest `main` Companion CI run is green on Node.js 20 and Node.js 22.
- Confirm the latest `main` CodeQL run is green.
- Confirm there are no unexpected open Dependabot or maintenance pull requests.
- Review `docs/RELEASE_NOTES_v1.1.0.md`.
- Confirm the repository version is `1.1.0`.

## Run release readiness

Trigger `.github/workflows/release-readiness.yml` from GitHub Actions, or create the `v1.1.0` tag so the tag trigger runs it.

The run must:

- pass `npm run release:check`;
- generate and validate the CycloneDX 1.5 SBOM;
- create GitHub artifact provenance for the SBOM;
- upload the SBOM artifact successfully.

Do not publish the GitHub Release if this workflow is red.

## Publish v1.1.0

- Create tag `v1.1.0` at the verified release commit.
- Create the GitHub Release from `v1.1.0`.
- Use `docs/RELEASE_NOTES_v1.1.0.md` as the release body, or generate categorized notes from `.github/release.yml` and preserve the release-evidence section.
- Do not attach the proprietary PDF, DOCX, EPUB, master manuscript, paid answer-key package, or commercial publishing bundle.

## Main-branch protection

Apply the canonical rules described in `docs/GITHUB_SETTINGS.md`, including required successful checks before merge, stale-review handling where appropriate, and restrictions against force pushes/deletion.

## Hosted security features

Confirm the GitHub repository settings enable the supported security features for this public repository, including secret scanning, push protection where available, dependency alerts, and private vulnerability reporting where available.

## Repository presentation

Confirm the repository description, homepage, topics, and social preview are current. The commercial-learning homepage should continue to point to:

**https://ramsandesh.gumroad.com**

## Completion record

Close the corresponding host-release tracking issue only after the tag, GitHub Release, release-readiness evidence, branch rules, hosted security settings, and repository presentation have all been verified.
