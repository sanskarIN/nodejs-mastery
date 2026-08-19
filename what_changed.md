# What Changed

## Final v2.0.0 source-controlled hardening

The repository was advanced from the v1.2 candidate to a **v2.0.0** source candidate because the supported Node.js runtime contract changed incompatibly.

### Runtime and compatibility

- Removed Node.js 20 from the required support contract because it is end-of-life.
- Root and all 22 public lab packages now require `engines.node: >=22`.
- `.nvmrc` and `.node-version` now pin Node.js 24.
- Companion CI now tests Node.js 22 and Node.js 24.
- Release Readiness now uses Node.js 24.
- All numbered and supplemental project READMEs now state Node.js 22+ with Node.js 24 LTS recommended.
- Added `docs/RUNTIME_SUPPORT.md`.
- Added an executable runtime-policy checker that also rejects stale positive Node.js 20 support claims in active/public project documentation.

### Code and configuration quality gates

Added repository-wide executable checks for:

- JavaScript syntax validity;
- JSON/package/config parsing;
- runtime-policy consistency.

The root `npm run check` now includes these gates.

### CI and release evidence

Normal Companion CI now executes, on both supported CI runtimes:

1. tests;
2. project verification gates;
3. deterministic demos;
4. the complete repository policy suite.

`npm run release:check` remains the authoritative complete local/release gate.

Release Readiness retains:

- CycloneDX 1.5 SBOM generation and validation;
- SBOM artifact provenance attestation;
- SBOM workflow artifact upload;
- Gumroad storefront visibility;
- Node.js 24 release execution.

### Quality assurance documentation

Added `docs/QUALITY_ASSURANCE.md` defining:

- syntax/configuration acceptance;
- behavioral test expectations;
- executable verification evidence;
- deterministic demo/smoke evidence;
- repository/security checks;
- hosted CI and CodeQL expectations;
- regression-test policy;
- bug-fix procedure;
- release rejection conditions.

The repository intentionally does not claim that testing can prove software will never contain a future defect. Release acceptance is based on executable evidence and known invariants.

### Documentation synchronized for v2.0.0

Updated the active documentation set, including:

- README;
- CI guide;
- command reference;
- running guide;
- development guide;
- testing guide;
- troubleshooting guide;
- FAQ;
- companion-project standard;
- supplemental-project standard;
- supply-chain guide;
- versioning policy;
- release process;
- GitHub settings guidance;
- maintenance status;
- roadmap;
- contribution guidance;
- pull-request checklist;
- security policy;
- changelog;
- citation metadata;
- documentation index.

Added `docs/RELEASE_NOTES_v2.0.0.md` and updated the host-release checklist to target v2.0.0.

### Project inventory

The public learning inventory remains intentionally unchanged:

- 10 numbered companion laboratories;
- 12 clearly labeled supplemental laboratories;
- 22 public project laboratories total.

Supplemental projects are still not presented as missing/recovered historical Parts 1–125.

### Publication and repository boundaries preserved

The public repository continues to enforce:

- MIT applies only to public source code;
- proprietary PDF/DOCX/EPUB/book/source/publication packages remain outside the public repository;
- stable Gumroad storefront navigation uses `https://ramsandesh.gumroad.com`;
- no permanent X/Twitter profile URL is added to evergreen supplemental/publication metadata;
- supplemental project trees contain no native promotional image assets that could introduce person portraits or profile avatars;
- secrets, credential-like files, cross-project implementation leakage, broken relative Markdown links, dependency-policy violations, and paid-book artifacts are rejected by repository checks.

### Repository cleanup and tracking

- Audited unresolved `TODO`, `FIXME`, `TBD`, and placeholder markers; no unresolved repository markers were found in the indexed source sweep.
- Confirmed there are no open pull requests at the final audit point.
- Updated GitHub Issue #5 from the obsolete v1.2 release plan to the v2.0.0 host-release/settings plan.
- Added `NEXT_WORK.md` containing only the remaining GitHub-host/release tasks and the rule for when source maintenance should resume.

## Remaining work

No additional source feature/documentation work is intentionally queued merely for commit count.

The remaining work is GitHub-host/release work documented in [`NEXT_WORK.md`](NEXT_WORK.md), primarily final hosted CI/CodeQL verification, Release Readiness, branch protection/rules, hosted security settings, social-preview verification, and publishing the `v2.0.0` tag/release.

**Official storefront:** https://ramsandesh.gumroad.com
