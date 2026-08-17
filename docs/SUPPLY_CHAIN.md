# Software supply-chain controls

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

This repository keeps its public companion-code supply chain intentionally small and reviewable.

## Dependency admission

Third-party npm packages are denied by default. Any future package must be deliberately listed in `config/dependency-policy.json` and then pass `npm run check:dependencies`.

GitHub Actions are maintained separately through Dependabot and pull-request review. Action upgrades must remain compatible with the Node.js 20/22 verification matrix.

## Secret prevention

Two repository checks cover different failure classes:

- `npm run check:sensitive` rejects sensitive credential-style filenames such as committed environment or key files.
- `npm run check:secrets` scans tracked text content for high-confidence private-key and common provider-token patterns.

These checks complement GitHub-host secret scanning; they do not replace provider-side token revocation or incident response.

## Static analysis

CodeQL runs on pushes, pull requests, and a weekly schedule. Dependency Review runs for pull requests. Both are treated as evidence inputs, not as proof that an educational lab is production-safe.

## CycloneDX SBOM

Run:

```bash
npm run sbom
```

The dependency-free generator writes:

```text
dist/nodejs-mastery-sbom.cdx.json
```

The document uses CycloneDX 1.5 and records the root companion repository plus every discovered `projects/part-NNN` package. The release-readiness workflow uploads the generated SBOM as a GitHub Actions artifact.

## Release evidence

`npm run release:check` executes tests, project verifiers, demos, repository policy checks, secret checks, and SBOM generation. A release should not be published while this gate or CodeQL is failing.

## Commercial publication boundary

The SBOM and repository automation describe only the MIT-licensed public companion source. They do not include the proprietary PDF, DOCX, EPUB, master manuscript, publishing bundle, or paid learning edition.

**Official storefront:** https://ramsandesh.gumroad.com
