# Versioning policy

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

The public companion-code repository and the commercial eBook are related products but have independent version identifiers.

## Companion repository versions

Use semantic versioning for public code releases:

- **PATCH** — bug fixes, documentation corrections, test improvements, or maintenance changes that do not change a public lab's intended contract.
- **MINOR** — new authentic recovered/reconstructed companion labs, new clearly labeled supplemental projects, backwards-compatible tooling, or substantial new verification/documentation capabilities.
- **MAJOR** — incompatible changes to repository commands, supported runtime expectations, or established public-code contracts.

Current repository line: **2.0.x**.

v2.0.0 raises the supported runtime floor from Node.js 20 to Node.js 22 because Node.js 20 is end-of-life. Node.js 22 and 24 are the required CI lines, while Node.js 24 is the pinned local/release runtime. The 22-project public inventory remains unchanged from v1.2.0.

## Book editions

The commercial book may use edition/date metadata independently of the GitHub repository version. A code release number must not be presented as a new book edition unless the publication itself has actually been updated.

## Tags

Public repository tags should use semantic release tags such as:

```text
v2.0.0
v2.0.1
v2.1.0
```

Before a tag is published, run the `Release Readiness` workflow or `npm run release:check`.

## Runtime-support changes

Dropping an officially supported runtime line or materially changing the minimum Node.js requirement is a MAJOR change. Adding a newly maintained runtime to the CI matrix without dropping existing support may be a MINOR or PATCH change depending on whether repository behavior changes.

See [`RUNTIME_SUPPORT.md`](RUNTIME_SUPPORT.md).

## Provenance changes

Recovering an authentic historical companion project is normally a MINOR release because it adds public learning material. Correcting the label of a project from recovered to reconstructed (or the reverse after strong provenance evidence) must be called out explicitly in release notes.

A new supplemental project also normally requires a MINOR release when it materially expands the learning surface. Supplemental projects must retain their explicit new/post-series classification and must not borrow missing historical Part numbers.

## Evergreen publication metadata

Repository versions may update stable code/store links without requiring a commercial book edition. Changeable social-profile links such as X/Twitter should not be embedded as permanent publication metadata.

## Commercial boundary

A GitHub version tag never grants redistribution rights to the proprietary PDF/DOCX/EPUB, source archive, or other commercial book assets.

**Official storefront:** https://ramsandesh.gumroad.com
