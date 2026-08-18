<p align="center">
  <a href="https://ramsandesh.gumroad.com"><img src="assets/gumroad-storefront-badge.svg" alt="Get Node.js Full Mastery on Gumroad" width="760"></a>
</p>

# Node.js Full Mastery — Companion Code

[![Companion CI](https://github.com/sanskarIN/nodejs-mastery/actions/workflows/ci.yml/badge.svg)](https://github.com/sanskarIN/nodejs-mastery/actions/workflows/ci.yml)
[![CodeQL](https://github.com/sanskarIN/nodejs-mastery/actions/workflows/codeql.yml/badge.svg)](https://github.com/sanskarIN/nodejs-mastery/actions/workflows/codeql.yml)
[![Gumroad](https://img.shields.io/badge/Gumroad-Complete_eBook-ff4fa3?style=for-the-badge)](https://ramsandesh.gumroad.com)
[![License: MIT](https://img.shields.io/badge/Code%20License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

Public companion code, practical laboratories, examples, tests, and production-oriented Node.js learning resources for the **Node.js Full Mastery** eBook by **Ram Sandesh**. The repository also includes clearly labeled **supplemental laboratories** that extend practice beyond the completed numbered series without pretending to be recovered historical parts.

## 📘 Get the complete 125-part eBook

**Official Gumroad storefront:** **https://ramsandesh.gumroad.com**

The commercial book contains the full Parts 1–125 learning sequence, explanations, exercises, model solutions, advanced interview material, production architecture discussions, and the final mastery capstone.

> The paid PDF/DOCX/EPUB manuscript and commercial publication package are intentionally **not** stored in this public repository.

## Runtime support

- **Minimum supported runtime:** Node.js 22.
- **Required CI matrix:** Node.js 22 and Node.js 24.
- **Default development/release runtime:** Node.js 24 LTS.
- Node.js 20 is intentionally unsupported because it is end-of-life.

See [docs/RUNTIME_SUPPORT.md](docs/RUNTIME_SUPPORT.md) for the compatibility contract and upgrade policy.

## Repository health

```bash
npm run projects             # list recovered/reconstructed numbered companion labs
npm run supplemental         # list new supplemental Node.js labs
npm test                     # test numbered + supplemental projects
npm run verify               # run all verification gates
npm run demo                 # run all deterministic demonstrations
npm run check:syntax         # parse every JS/MJS/CJS file with Node.js
npm run check:json           # parse every tracked JSON config/package file
npm run check:runtime        # validate package engines, local pins and CI/release runtimes
npm run check                # run the complete repository policy suite
npm run release:check        # tests + verifiers + demos + complete policy suite
```

GitHub Actions executes **tests, verification gates, demos, and repository checks on Node.js 22 and Node.js 24**. CodeQL performs static security analysis, Dependabot proposes dependency/workflow updates, and pull requests receive dependency review. Repository checks enforce syntax/JSON validity, runtime policy, dependency rules, metadata, documentation, Markdown-link integrity, project isolation, sensitive-file screening, committed-secret patterns, evergreen X/Twitter-link avoidance for supplemental documentation, Gumroad visibility, image-free supplemental project trees, SBOM integrity, and the commercial-book boundary.

## Available numbered companion projects

| Part | Focus | Provenance |
|---:|---|---|
| 77 | Marketplace commerce, seller settlement, commissions, payouts and reconciliation | Reconstructed & tested |
| 84 | Direct Preference Optimization and modern preference objectives | Reconstructed & tested |
| 118 | Authoritative multiplayer and real-time simulation | Recovered & tested |
| 119 | Durable background execution and workflow orchestration | Recovered & tested |
| 120 | Event streaming and partitioned event platforms | Recovered & tested |
| 121 | Distributed data consistency and scalable storage | Recovered & tested |
| 122 | Resilient service-to-service and API platform architecture | Recovered & tested |
| 123 | Zero-trust security, identity and software supply chain | Recovered & tested |
| 124 | Observability, performance, capacity and diagnostics | Recovered & tested |
| 125 | Final production architecture capstone | Recovered & tested |

See [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md) and [docs/RECOVERY_POLICY.md](docs/RECOVERY_POLICY.md) for provenance and the intentionally unavailable historical companion archives.

## New supplemental projects

These **12 projects are new educational labs**, not recovered numbered parts.

| Project | Focus |
|---|---|
| `bounded-job-queue` | bounded capacity, retries, backoff, dead letters, idempotent IDs |
| `ttl-lru-cache` | TTL expiration, LRU eviction, cache metrics |
| `token-bucket-gateway` | per-key rate limiting and retry-after math |
| `idempotent-api-kernel` | request fingerprints, replay-safe effects, conflicts |
| `stream-backpressure-lab` | bounded stream transforms and pipeline error propagation |
| `service-health-kernel` | liveness, readiness, dependency gates and graceful draining |
| `event-consumer-kernel` | partition offsets, duplicate suppression and poison quarantine |
| `config-redaction-kit` | configuration validation and safe diagnostic redaction |
| `request-context-lab` | AsyncLocalStorage propagation and concurrent request isolation |
| `graceful-shutdown-coordinator` | ordered cleanup and idempotent lifecycle shutdown |
| `circuit-breaker-kernel` | failure thresholds, cooldowns and half-open recovery probes |
| `bounded-concurrency-pool` | bounded asynchronous work and stable result ordering |

See [docs/SUPPLEMENTAL_PROJECTS.md](docs/SUPPLEMENTAL_PROJECTS.md) and [docs/SUPPLEMENTAL_PROJECT_STANDARD.md](docs/SUPPLEMENTAL_PROJECT_STANDARD.md).

## Quick start

```bash
git clone https://github.com/sanskarIN/nodejs-mastery.git
cd nodejs-mastery
nvm use
npm run projects
npm run supplemental
npm run release:check
```

Run a numbered project:

```bash
cd projects/part-125
npm test
npm run demo
npm run verify
```

Run a supplemental project:

```bash
cd supplemental/bounded-job-queue
npm test
npm run demo
npm run verify
```

## Documentation

| Guide | Purpose |
|---|---|
| [Documentation index](docs/README.md) | Central index for all repository guides |
| [Runtime support](docs/RUNTIME_SUPPORT.md) | Supported Node.js lines, local pin and upgrade policy |
| [Learning path](docs/LEARNING_PATH.md) | Suggested order for the currently available labs |
| [Project index](docs/PROJECT_INDEX.md) | Quick index of numbered public companion projects |
| [Supplemental projects](docs/SUPPLEMENTAL_PROJECTS.md) | Index of the new post-series practice labs |
| [Supplemental standard](docs/SUPPLEMENTAL_PROJECT_STANDARD.md) | Quality, provenance, link, dependency, and image rules for new labs |
| [Architecture](docs/ARCHITECTURE.md) | Repository layers, isolation, and dependency direction |
| [Development](docs/DEVELOPMENT.md) | Local setup and maintainer workflow |
| [Command reference](docs/COMMAND_REFERENCE.md) | Root and per-project command contract |
| [Testing](docs/TESTING.md) | Tests vs demos vs verification evidence |
| [CI and automation](docs/CI.md) | Node matrix, CodeQL, dependency review, and release gates |
| [Dependency policy](docs/DEPENDENCY_POLICY.md) | Explicit third-party npm dependency governance |
| [Security model](docs/SECURITY_MODEL.md) | Trust boundaries and automated protections |
| [Privacy](docs/PRIVACY.md) | Public repository data-handling expectations |
| [Accessibility](docs/ACCESSIBILITY.md) | Accessible documentation and terminal conventions |
| [GitHub settings](docs/GITHUB_SETTINGS.md) | Recommended branch protection, topics, security, and release settings |
| [Companion project standard](docs/COMPANION_PROJECT_STANDARD.md) | Requirements for adding a numbered lab |
| [Recovery policy](docs/RECOVERY_POLICY.md) | Recovered vs reconstructed vs unavailable |
| [Troubleshooting](docs/TROUBLESHOOTING.md) | Common local/CI problems |
| [FAQ](docs/FAQ.md) | Licensing, versions, availability, and reuse |
| [Versioning](docs/VERSIONING.md) | Semantic versioning and book-edition boundaries |
| [Release process](docs/RELEASE_PROCESS.md) | Public code release gate and versioning |
| [v2.0.0 release notes](docs/RELEASE_NOTES_v2.0.0.md) | Current runtime-hardening release notes |
| [Roadmap](docs/ROADMAP.md) | Public repository maintenance direction |
| [Store](docs/STORE.md) | Official complete-book storefront |

## Repository structure

```text
.
├── .github/                 # CI, security workflows, ownership, issue templates
├── assets/                  # Gumroad/storefront public promotional asset
├── config/                  # Explicit repository policies
├── docs/                    # Architecture, testing, recovery, release and learning guides
├── projects/                # Recovered/reconstructed numbered companion laboratories
├── supplemental/            # New post-series Node.js practice laboratories
├── scripts/                 # Discovery and executable repository-policy checks
├── CITATION.cff             # Software citation metadata
├── GOVERNANCE.md            # Repository decision model
├── MAINTAINERS.md           # Maintainer/contact information
├── LICENSE                  # MIT — public companion source code
├── BOOK_LICENSE.md          # Commercial eBook rights notice
└── package.json             # Root verification and release commands
```

## Licensing boundary

- **Public companion and supplemental source code:** MIT License.
- **Complete eBook and commercial publishing content:** Copyright © 2026 Ram Sandesh. All rights reserved.
- See [BOOK_LICENSE.md](BOOK_LICENSE.md) and [docs/LICENSE_SCOPE.md](docs/LICENSE_SCOPE.md).
- CI prevents accidental public commits of paid PDF/DOCX/EPUB artifacts.

## Contributing and security

Read [CONTRIBUTING.md](CONTRIBUTING.md), [GOVERNANCE.md](GOVERNANCE.md), and [SECURITY.md](SECURITY.md) before proposing changes. Historical archive recovery has a dedicated issue template so provenance can be reviewed without posting commercial manuscript files.

## Author & project links

- GitHub: https://github.com/sanskarIN
- **Gumroad:** **https://ramsandesh.gumroad.com**
- Business: sanskarin@outlook.in
- Business: sanskarin.business@gmail.com
- Support: supportramsandesh@gmail.com

<p align="center"><strong>📚 Learn from the code here — get the full 125-part book at <a href="https://ramsandesh.gumroad.com">ramsandesh.gumroad.com</a>.</strong></p>
