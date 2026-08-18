# Repository maintenance status

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

## Source-controlled work

The current source candidate is **v2.0.0**. It preserves the 10 numbered and 12 supplemental public laboratories while replacing the EOL Node.js 20 support line with a maintained **Node.js 22/24** contract.

The v2 source candidate also adds repository-wide syntax, JSON, and runtime-policy validation on top of the existing tests, verifiers, demos, security checks, documentation checks, SBOM evidence, provenance controls, Gumroad visibility, evergreen-link policy, and commercial-content boundary.

Source-controlled v2.0.0 work is complete only when the latest `main` Companion CI and CodeQL runs are green on the final release commit.

## Host-controlled work

The remaining GitHub-host operations require repository settings or release/tag controls rather than source-file changes.

See:

- `docs/HOST_RELEASE_CHECKLIST.md`
- `docs/GITHUB_SETTINGS.md`
- `docs/RELEASE_NOTES_v2.0.0.md`
- `docs/RUNTIME_SUPPORT.md`

## Reopening source work

Reopen source-controlled maintenance when one of these occurs:

- CI or CodeQL reports a concrete failure;
- Dependabot proposes a reviewed update;
- a maintained Node.js support line changes;
- an authentic historical companion project becomes available;
- a new supplemental project has a clear learning purpose and passes the supplemental standard;
- a security, provenance, documentation, correctness, or release-evidence regression is found.

Do not create empty/no-op commits merely to increase the counter. Granular commits should correspond to reviewable code, tests, documentation, runtime, or policy changes.

**Official storefront:** https://ramsandesh.gumroad.com
