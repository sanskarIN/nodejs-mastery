# Versioning policy

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

The public companion-code repository and the commercial eBook are related products but have independent version identifiers.

## Companion repository versions

Use semantic versioning for public code releases:

- **PATCH** — bug fixes, documentation corrections, test improvements, or maintenance changes that do not change a public lab's intended contract.
- **MINOR** — new recovered/reconstructed companion labs, new backwards-compatible tooling, or substantial new verification/documentation capabilities.
- **MAJOR** — incompatible changes to repository commands, supported runtime expectations, or established public companion-code contracts.

Current repository line: **1.1.x**.

## Book editions

The commercial book may use edition/date metadata independently of the GitHub repository version. A code release number must not be presented as a new book edition unless the publication itself has actually been updated.

## Tags

Public repository tags should use the form:

```text
v1.1.0
v1.1.1
v1.2.0
```

Before a tag is published, run the `Release Readiness` workflow or `npm run release:check`.

## Provenance changes

Recovering an authentic historical companion project is normally a MINOR release because it adds public learning material. Correcting the label of a project from recovered to reconstructed (or the reverse after strong provenance evidence) should be called out explicitly in release notes.

## Commercial boundary

A GitHub version tag never grants redistribution rights to the proprietary PDF/DOCX/EPUB or other commercial book assets.

**Official storefront:** https://ramsandesh.gumroad.com
