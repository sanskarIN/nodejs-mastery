# Repository maintenance status

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

## Source-controlled work

The current source candidate is **v2.0.0**. It preserves the 10 numbered and 12 supplemental public laboratories while replacing the EOL Node.js 20 support line with a maintained **Node.js 22/24** contract.

The v2 source candidate also adds repository-wide syntax, JSON, and runtime-policy validation on top of the existing tests, verifiers, demos, security checks, documentation checks, SBOM evidence, provenance controls, Gumroad visibility, evergreen-link policy, and commercial-content boundary.

The planned source-controlled hardening work is complete. Do not add new source commits solely for commit count.

The release candidate is accepted for publication only after the final GitHub-hosted Companion CI, CodeQL, and Release Readiness evidence is green.

## Next work

Use the root [`NEXT_WORK.md`](../NEXT_WORK.md) file as the authoritative remaining-work checklist.

The completed source changes are recorded in [`what_changed.md`](../what_changed.md).

## Host-controlled work

The remaining GitHub-host operations require repository settings or release/tag controls rather than source-file changes.

See:

- `NEXT_WORK.md`
- `docs/HOST_RELEASE_CHECKLIST.md`
- `docs/GITHUB_SETTINGS.md`
- `docs/RELEASE_NOTES_v2.0.0.md`
- `docs/RUNTIME_SUPPORT.md`
- `docs/QUALITY_ASSURANCE.md`

## Reopening source work

Reopen source-controlled maintenance only when one of these occurs:

- CI, CodeQL, or Release Readiness reports a concrete failure;
- Dependabot proposes a reviewed update;
- a maintained Node.js support line changes;
- an authentic historical companion project becomes available;
- a new supplemental project has a clear learning purpose and passes the supplemental standard;
- a reproducible bug is found;
- a security, provenance, documentation, correctness, accessibility, privacy, licensing, or release-evidence regression is found.

For a bug fix, add regression coverage when practical and run `npm run release:check` before release.

Do not create empty/no-op commits merely to increase the counter. Granular commits should correspond to reviewable code, tests, documentation, runtime, or policy changes.

**Official storefront:** https://ramsandesh.gumroad.com
