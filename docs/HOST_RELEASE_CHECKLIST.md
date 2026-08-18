# Host-level v2.0.0 release checklist

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

This checklist contains the final GitHub-host operations that are intentionally not performed by repository source files.

## Before creating the release

- Confirm the latest `main` Companion CI run is green on Node.js 22 and Node.js 24.
- Confirm the latest `main` CodeQL run is green.
- Confirm there are no unexpected open Dependabot or maintenance pull requests.
- Review `docs/RELEASE_NOTES_v2.0.0.md`.
- Confirm the repository version is `2.0.0`.
- Confirm all 10 numbered and 12 supplemental projects pass tests, demos, verification, and repository policy checks.
- Confirm `npm run check:syntax`, `npm run check:json`, and `npm run check:runtime` pass.

## Run release readiness

Trigger `.github/workflows/release-readiness.yml` from GitHub Actions, or create the `v2.0.0` tag so the tag trigger runs it.

The run must:

- use Node.js 24 LTS;
- pass `npm run release:check` for numbered and supplemental project inventories;
- generate and validate the CycloneDX 1.5 SBOM;
- include all 22 public project components in the SBOM;
- record `engines.node: >=22` for every public-code component;
- create GitHub artifact provenance for the SBOM;
- upload the SBOM artifact successfully.

Do not publish the GitHub Release if this workflow is red.

## Publish v2.0.0

- Create tag `v2.0.0` at the verified release commit.
- Create the GitHub Release from `v2.0.0`.
- Use `docs/RELEASE_NOTES_v2.0.0.md` as the release body, or generated categorized notes while preserving release-evidence details.
- Do not attach the proprietary PDF, DOCX, EPUB, master manuscript, paid answer-key package, source archive, or commercial publishing bundle.

## Main-branch protection

Apply the canonical rules described in `docs/GITHUB_SETTINGS.md`, including required successful checks before merge and restrictions against force pushes/deletion.

## Hosted security features

Confirm supported security features are enabled, including secret scanning, push protection where available, dependency alerts, and private vulnerability reporting where available.

## Repository presentation

Confirm repository description, Gumroad homepage, topics, and social preview are current. New repository/publication promotional imagery should not contain human portraits, faces, or profile avatars.

**Storefront:** https://ramsandesh.gumroad.com

## Completion record

Close the corresponding host-release tracking issue only after the tag, GitHub Release, release-readiness evidence, branch rules, hosted security settings, and repository presentation have all been verified.
