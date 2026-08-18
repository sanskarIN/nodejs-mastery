# Node.js runtime support

> Complete Node.js Full Mastery eBook: https://ramsandesh.gumroad.com

## Supported baseline

The public companion repository requires **Node.js 22 or newer**.

The required CI compatibility matrix is:

- **Node.js 22** — maintained LTS compatibility floor.
- **Node.js 24** — active LTS and the default local/release runtime.

`.nvmrc` and `.node-version` intentionally pin Node.js 24 for normal development and release-readiness work.

## Why Node.js 20 was removed

Node.js 20 reached end-of-life in 2026. Keeping an EOL runtime in the required support matrix would create avoidable security, ecosystem, and maintenance risk. Repository v2.0.0 therefore raises `engines.node` from `>=20` to `>=22` across the root package and every public laboratory.

## Compatibility contract

A change is accepted only when:

1. the root package and all numbered/supplemental packages declare `engines.node` as `>=22`;
2. Companion CI passes on Node.js 22 and Node.js 24;
3. Release Readiness uses Node.js 24;
4. `npm run check:runtime` passes;
5. tests, verification gates, demos, syntax validation, JSON validation, SBOM validation, and repository policy checks remain green.

## Future Node.js releases

New Node.js major lines are not automatically added to the required matrix on release day. The maintainer should review the official Node.js release schedule, test the repository on the new maintained/LTS line, and then update this policy, CI, local pins, package metadata, and release notes together.

## Unsupported runtimes

Running these labs on an EOL Node.js release is outside the repository support contract even if a particular file appears to work. Compatibility claims should follow the executable matrix rather than incidental success on an unsupported runtime.

**Official storefront:** https://ramsandesh.gumroad.com
