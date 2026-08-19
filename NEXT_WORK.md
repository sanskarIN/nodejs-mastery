# Next Work — Node.js Mastery

This file contains only work that remains after the source-controlled **v2.0.0** hardening pass.

## 1. Verify the final GitHub-hosted checks

On the final `main` commit:

- Confirm **Companion CI** passes on **Node.js 22** and **Node.js 24**.
- Confirm **CodeQL** completes successfully.
- If either workflow fails, fix the concrete failure before doing any release work.

## 2. Run Release Readiness

Run `.github/workflows/release-readiness.yml` from GitHub Actions on the final release commit.

The run must confirm:

- `npm run release:check` exits successfully;
- all 10 numbered companion labs pass tests, demos, and verification;
- all 12 supplemental labs pass tests, demos, and verification;
- JavaScript syntax validation passes;
- JSON/configuration validation passes;
- runtime-policy validation passes;
- dependency, metadata, README, Gumroad, Markdown-link, isolation, sensitive-file, committed-secret, and commercial-boundary checks pass;
- the CycloneDX 1.5 SBOM is generated and validates for all 22 public project components;
- the SBOM provenance attestation is created;
- the SBOM workflow artifact uploads successfully.

Do not publish a release while this workflow is red.

## 3. Protect `main`

Apply the repository rules described in `docs/GITHUB_SETTINGS.md`.

At minimum:

- require successful Companion CI and CodeQL checks before merge;
- block force pushes;
- block branch deletion;
- require pull requests/review when collaboration makes that appropriate;
- require conversation resolution for reviewed pull requests;
- keep bypass privileges limited to trusted maintainers and documented emergencies.

## 4. Confirm GitHub-hosted security controls

In repository settings, verify the controls available for the account/repository:

- dependency graph and dependency alerts;
- Dependabot security updates;
- CodeQL/code-scanning alerts;
- secret scanning;
- secret-scanning push protection where available;
- private vulnerability reporting where available.

## 5. Check repository presentation

Confirm:

- repository description remains current;
- homepage remains `https://ramsandesh.gumroad.com`;
- repository topics remain relevant;
- social-preview artwork contains **no human portrait, face, person image, or profile avatar**;
- evergreen repository/publication metadata contains **no permanent X/Twitter profile URL**.

## 6. Publish v2.0.0

Only after all release evidence is green:

1. Create tag `v2.0.0` at the verified final release commit.
2. Confirm the tag-triggered Release Readiness workflow is green.
3. Publish the GitHub Release.
4. Use `docs/RELEASE_NOTES_v2.0.0.md` or GitHub-generated notes while preserving the important v2 runtime/QA information.
5. Do **not** attach the proprietary PDF, DOCX, EPUB, source manuscript, source archive, answer-key package, or commercial publication bundle.
6. Keep the complete commercial edition linked through `https://ramsandesh.gumroad.com`.

## 7. Finish the release tracker

Update and close GitHub Issue #5 only after:

- final Companion CI is green on Node.js 22/24;
- final CodeQL is green;
- Release Readiness is green;
- SBOM artifact and provenance are verified;
- `main` protection/rules are applied;
- hosted security controls are checked;
- social preview complies with the no-person/no-avatar rule;
- `v2.0.0` is tagged and published.

## 8. After v2.0.0

Do not add more commits merely to increase the commit count.

Reopen source work only for a concrete reason such as:

- a reproducible bug;
- a failing CI/CodeQL/release gate;
- a reviewed security issue;
- a useful Dependabot update;
- an authentic recovered historical companion project;
- a clearly distinct supplemental learning project;
- a maintained Node.js support change;
- a documentation, provenance, accessibility, privacy, licensing, or release-evidence regression.

For every bug fix, add regression coverage when practical and run `npm run release:check` before release.

**Official storefront:** https://ramsandesh.gumroad.com
