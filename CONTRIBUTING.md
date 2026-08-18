# Contributing

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

Thanks for improving the public companion code.

## Local Git identity for maintainer commits

```bash
git config user.name "Sanskar"
git config user.email "sanskarin@outlook.in"
```

External contributors should use their own normal Git identity.

## Development setup

Use Node.js 22 or newer. Node.js 24 LTS is the pinned development/release line.

```bash
nvm use
npm run projects
npm run supplemental
npm run release:check
```

See [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md), [`docs/RUNTIME_SUPPORT.md`](docs/RUNTIME_SUPPORT.md), and [`docs/TESTING.md`](docs/TESTING.md).

## Change design

Prefer small commits with one reviewable purpose. A code fix should include regression coverage when practical. Avoid large formatting rewrites mixed with behavior changes.

For a numbered companion part, follow [`docs/COMPANION_PROJECT_STANDARD.md`](docs/COMPANION_PROJECT_STANDARD.md). For a new post-series lab, follow [`docs/SUPPLEMENTAL_PROJECT_STANDARD.md`](docs/SUPPLEMENTAL_PROJECT_STANDARD.md).

## Historical source provenance

- **Recovered** means traceable to an original series artifact.
- **Reconstructed** means newly rebuilt from historical evidence because the original archive was unavailable.
- Do not label reconstructed code as recovered.
- Do not invent missing projects only to fill numbering gaps.

See [`docs/RECOVERY_POLICY.md`](docs/RECOVERY_POLICY.md).

## Before opening a pull request

1. Run `npm run check:syntax`.
2. Run `npm run check:json`.
3. Run `npm run check:runtime`.
4. Run `npm test`.
5. Run `npm run verify`.
6. Run `npm run demo` for behavior-changing work.
7. Run `npm run check`.
8. Prefer `npm run release:check` before a substantial PR.
9. Do not commit the paid PDF, DOCX, EPUB, answer keys, source manuscripts, or commercial publishing package.
10. Keep examples educational, safe, deterministic, and reviewable.
11. Do not commit secrets, credentials, customer data, or proprietary third-party datasets.
12. Keep evergreen supplemental documentation free of changeable X/Twitter profile URLs and person/avatar promotional imagery.

By contributing source code, you agree that your contribution may be distributed under the repository's MIT License.

**Book/storefront:** https://ramsandesh.gumroad.com
