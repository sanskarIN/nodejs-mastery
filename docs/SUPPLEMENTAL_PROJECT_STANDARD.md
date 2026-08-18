# Supplemental project standard

> Complete Node.js Full Mastery eBook: https://ramsandesh.gumroad.com

Supplemental projects are **new educational laboratories** added after the completed numbered Parts 1–125 series. They must never be described as recovered historical companion archives.

## Required project contract

Every direct child of `supplemental/` must include:

- `package.json` with `private: true`, MIT, Node.js 20+, repository directory, and the Gumroad homepage;
- `README.md` identifying the project as supplemental;
- `src/index.js` or an equivalent clear implementation entry point;
- automated tests runnable with `npm test`;
- a deterministic demonstration runnable with `npm run demo`;
- an executable verification gate runnable with `npm run verify`;
- `docs/architecture.md` describing boundaries and deliberate simplifications.

## Dependency rule

Supplemental projects are dependency-free by default. Introducing a third-party npm package requires an explicit repository policy change and review rather than an ad hoc package addition.

## Provenance rule

Use language such as **supplemental**, **new lab**, or **post-series practice project**. Do not assign a missing Part number unless an authentic historical project is recovered and reviewed under `RECOVERY_POLICY.md`.

## Evergreen-link rule

Long-lived project READMEs must not embed X/Twitter profile URLs because social handles can change. Prefer stable repository, storefront, and business-contact links.

## Image rule

Repository and publication assets created for these projects should use typography, diagrams, code, abstract technical motifs, or non-person logos. Do not include human portraits, faces, profile avatars, or person-like promotional imagery.

## Release evidence

A supplemental project is accepted only when its tests, demo, verification gate, metadata policy, link policy, and root CI all pass.

**Storefront:** https://ramsandesh.gumroad.com
