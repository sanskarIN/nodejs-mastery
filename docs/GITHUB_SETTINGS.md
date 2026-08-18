# Recommended GitHub repository settings

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

Some important controls live in GitHub repository settings rather than in version-controlled source files. This document is the canonical configuration checklist for those controls.

## Repository identity

- **Visibility:** Public for companion code only.
- **Default branch:** `main`.
- **Description:** Companion code, practical projects, examples, exercises, and production-ready Node.js learning resources for the Node.js Full Mastery eBook by Ram Sandesh.
- **Homepage:** `https://ramsandesh.gumroad.com`
- **Suggested topics:** `nodejs`, `javascript`, `backend`, `distributed-systems`, `education`, `software-engineering`, `testing`, `security`, `observability`, `companion-code`.

## Main branch protection / ruleset

Recommended rules for `main`:

1. Require changes through pull requests for non-emergency collaborative work.
2. Require at least one approving review when collaborators are active.
3. Dismiss stale approvals when new commits change the reviewed diff.
4. Require conversation resolution before merge.
5. Require successful Companion CI and CodeQL checks before merge.
6. Require the branch to be up to date before merge when practical.
7. Block force pushes.
8. Block branch deletion.
9. Restrict bypass privileges to trusted maintainers and use them only for documented emergencies.

The required Companion CI matrix for v2.0.0 is Node.js **22 and 24**.

## Security features

Enable where the GitHub plan/repository supports them:

- Dependabot alerts.
- Dependabot security updates.
- Secret scanning.
- Secret scanning push protection.
- Private vulnerability reporting.
- Code scanning / CodeQL alerts.
- Dependency graph.

The repository already contains `SECURITY.md`, CodeQL, dependency review, Dependabot configuration, committed-secret checks, runtime checks, and executable policy checks; GitHub-hosted security toggles complement those controls.

## Actions

- Allow only actions required by repository workflows, or use GitHub's recommended action policy for the account.
- Keep workflow permissions read-only by default and grant write scopes only to jobs that require them.
- Do not expose production secrets to pull requests from forks.
- Retain concurrency cancellation so obsolete runs from rapid commit series do not consume unnecessary CI capacity.

## Merge strategy

For a readable educational history, prefer **squash merge** for external feature PRs when a PR contains noisy fix-up commits. Maintainer work may use small direct commits when each commit is intentionally reviewable and CI remains enforced.

## Releases

- Public GitHub releases contain companion-code source and public release notes only.
- Never attach the complete paid PDF, DOCX, EPUB, source manuscript, answer-key package, source archive, or commercial publication bundle.
- Use semantic version tags such as `v2.0.0`.
- Run the `Release Readiness` workflow before publishing a tag/release.
- Direct readers to the official commercial edition at `https://ramsandesh.gumroad.com`.

## Social preview

Use a typography/code/diagram-based public companion-repository graphic. Do not use human portraits, faces, profile avatars, or paid manuscript pages. Do not include a permanent X/Twitter profile URL in the social-preview artwork.

## Periodic review

Re-check this settings list when GitHub introduces new security controls, the supported Node.js matrix changes, a new maintainer joins, or a public release changes repository scope.

**Official storefront:** https://ramsandesh.gumroad.com
