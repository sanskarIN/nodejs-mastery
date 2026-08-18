# Versioning policy

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

The public companion-code repository and the commercial eBook are related products but have independent version identifiers.

## Companion repository versions

Use semantic versioning for public code releases:

- **PATCH** — bug fixes, documentation corrections, test improvements, or maintenance changes that do not change a public lab's intended contract.
- **MINOR** — new authentic recovered/reconstructed companion labs, new clearly labeled supplemental projects, backwards-compatible tooling, or substantial new verification/documentation capabilities.
- **MAJOR** — incompatible changes to repository commands, supported runtime expectations, or established public-code contracts.

Current repository line: **1.2.x**.

The v1.2 line adds supplemental post-series projects while leaving the completed Parts 1–125 book sequence unchanged.

## Book editions

The commercial book may use edition/date metadata independently of the GitHub repository version. A code release number must not be presented as a new book edition unless the publication itself has actually been updated.

## Tags

Public repository tags should use semantic release tags such as:

```text
v1.2.0
v1.2.1
v1.3.0
```

Before a tag is published, run the `Release Readiness` workflow or `npm run release:check`.

## Provenance changes

Recovering an authentic historical companion project is normally a MINOR release because it adds public learning material. Correcting the label of a project from recovered to reconstructed (or the reverse after strong provenance evidence) must be called out explicitly in release notes.

A new supplemental project also normally requires a MINOR release when it materially expands the learning surface. Supplemental projects must retain their explicit new/post-series classification and must not borrow missing historical Part numbers.

## Evergreen publication metadata

Repository versions may update stable code/store links without requiring a commercial book edition. Changeable social-profile links such as X/Twitter should not be embedded as permanent publication metadata.

## Commercial boundary

A GitHub version tag never grants redistribution rights to the proprietary PDF/DOCX/EPUB, source archive, or other commercial book assets.

**Official storefront:** https://ramsandesh.gumroad.com
