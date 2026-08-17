# Security model

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

This repository contains educational companion code. Security is handled at two levels: repository integrity and the security concepts demonstrated inside individual labs.

## Repository trust boundaries

### Trusted maintainer actions

- Changes to GitHub Actions workflows.
- Changes to licensing and commercial-boundary policy.
- Changes to release gates and project discovery.
- Publication of new recovered or reconstructed projects.

`CODEOWNERS` routes these areas to `@sanskarIN` for review ownership.

### Untrusted contribution input

Pull requests, issue content, example data, and proposed source changes should be treated as untrusted until reviewed and tested. Repository workflows should not depend on contributor-supplied secrets.

## Automated protections

- CI tests on supported Node.js versions.
- CodeQL static security analysis.
- Pull-request dependency review.
- Dependabot update proposals.
- Commercial-book artifact exclusion checks.
- Project metadata and license-scope checks.

## Secrets

No credentials, private keys, API tokens, production certificates, or customer secrets belong in this repository. Examples should use deterministic placeholder data.

## Educational-code limitation

Some labs model authentication, authorization, leases, signing, encryption-related integrity, rate limiting, or audit evidence. Those models illustrate invariants; they do not replace audited identity providers, KMS/HSM systems, WAFs, production secret managers, durable databases, or operational security programs.

## Vulnerability reporting

Do not publish a detailed exploit in a public issue. Follow [`../SECURITY.md`](../SECURITY.md) and contact **sanskarin@outlook.in** for a repository vulnerability.

**Official storefront:** https://ramsandesh.gumroad.com
