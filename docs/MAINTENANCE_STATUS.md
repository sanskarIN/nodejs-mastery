# Repository maintenance status

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

## Source-controlled work

The v1.1.0 hardening work represented in the repository is considered complete when the latest `main` CI and CodeQL runs are green. The source-controlled release path includes policy checks, secret-pattern scanning, SBOM generation/validation, release-note configuration, and SBOM provenance/upload steps.

## Host-controlled work

The remaining GitHub-host operations are tracked separately because they require repository settings or release/tag controls rather than source-file changes.

See:

- `docs/HOST_RELEASE_CHECKLIST.md`
- `docs/GITHUB_SETTINGS.md`
- `docs/RELEASE_NOTES_v1.1.0.md`

## Reopening source work

Reopen source-controlled maintenance only when one of these occurs:

- CI or CodeQL reports a concrete failure;
- Dependabot proposes a reviewed update;
- a recovered companion project becomes available;
- a security or provenance policy changes;
- a documentation or release-evidence regression is found.

This prevents endless no-op commits after the repository has reached a verified release candidate.

**Official storefront:** https://ramsandesh.gumroad.com
