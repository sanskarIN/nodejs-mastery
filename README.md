<p align="center">
  <a href="https://ramsandesh.gumroad.com"><img src="assets/gumroad-storefront-badge.svg" alt="Get Node.js Full Mastery on Gumroad" width="760"></a>
</p>

# Node.js Full Mastery — Companion Code

[![Companion CI](https://github.com/sanskarIN/nodejs-mastery/actions/workflows/ci.yml/badge.svg)](https://github.com/sanskarIN/nodejs-mastery/actions/workflows/ci.yml)
[![CodeQL](https://github.com/sanskarIN/nodejs-mastery/actions/workflows/codeql.yml/badge.svg)](https://github.com/sanskarIN/nodejs-mastery/actions/workflows/codeql.yml)
[![Gumroad](https://img.shields.io/badge/Gumroad-Complete_eBook-ff4fa3?style=for-the-badge)](https://ramsandesh.gumroad.com)
[![License: MIT](https://img.shields.io/badge/Code%20License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

Public companion code, practical laboratories, examples, tests, and production-oriented Node.js learning resources for the **Node.js Full Mastery** eBook by **Ram Sandesh**.

## 📘 Get the complete 125-part eBook

**Official Gumroad storefront:** **https://ramsandesh.gumroad.com**

The commercial book contains the full Parts 1–125 learning sequence, explanations, exercises, model solutions, advanced interview material, production architecture discussions, and the final mastery capstone.

> The paid PDF/DOCX/EPUB manuscript and commercial publication package are intentionally **not** stored in this public repository.

## Repository health

The repository is designed so claims are executable rather than decorative:

```bash
npm run projects       # list every discovered public companion lab
npm test               # run all automated tests
npm run verify         # run all project verification gates
npm run demo           # run all project demonstrations
npm run check          # validate metadata, Gumroad links and repository policy
npm run release:check  # run the complete pre-release gate
```

GitHub Actions verifies the normal CI path on **Node.js 20 and Node.js 22**. CodeQL performs static security analysis, Dependabot proposes dependency/workflow updates, and pull requests receive dependency review.

## Available companion projects

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

## Quick start

```bash
git clone https://github.com/sanskarIN/nodejs-mastery.git
cd nodejs-mastery
npm run projects
npm test
npm run verify
npm run check
```

Run one project directly:

```bash
cd projects/part-125
npm test
npm run demo
npm run verify
```

## Documentation

| Guide | Purpose |
|---|---|
| [Documentation index](docs/README.md) | Central index for all repository guides |
| [Learning path](docs/LEARNING_PATH.md) | Suggested order for the currently available labs |
| [Project index](docs/PROJECT_INDEX.md) | Quick index of public companion projects |
| [Architecture](docs/ARCHITECTURE.md) | Repository layers, isolation, and dependency direction |
| [Development](docs/DEVELOPMENT.md) | Local setup and maintainer workflow |
| [Command reference](docs/COMMAND_REFERENCE.md) | Root and per-project command contract |
| [Testing](docs/TESTING.md) | Tests vs demos vs verification evidence |
| [CI and automation](docs/CI.md) | Node matrix, CodeQL, dependency review, and release gates |
| [GitHub settings](docs/GITHUB_SETTINGS.md) | Recommended branch protection, topics, security, and release settings |
| [Companion project standard](docs/COMPANION_PROJECT_STANDARD.md) | Requirements for adding a lab |
| [Recovery policy](docs/RECOVERY_POLICY.md) | Recovered vs reconstructed vs unavailable |
| [Security model](docs/SECURITY_MODEL.md) | Trust boundaries and automated protections |
| [Troubleshooting](docs/TROUBLESHOOTING.md) | Common local/CI problems |
| [FAQ](docs/FAQ.md) | Licensing, versions, availability, and reuse |
| [Release process](docs/RELEASE_PROCESS.md) | Public companion release gate and versioning |
| [v1.1.0 release notes](docs/RELEASE_NOTES_v1.1.0.md) | Prepared public release notes for the hardening release |
| [Roadmap](docs/ROADMAP.md) | Public repository maintenance direction |
| [Store](docs/STORE.md) | Official complete-book storefront |

## Repository structure

```text
.
├── .github/                 # CI, security workflows, ownership, issue templates
├── assets/                  # Gumroad/storefront public promotional asset
├── docs/                    # Architecture, testing, recovery, release and learning guides
├── projects/                # Independently runnable companion laboratories
├── scripts/                 # Discovery and executable repository-policy checks
├── CITATION.cff             # Software citation metadata
├── GOVERNANCE.md            # Repository decision model
├── MAINTAINERS.md           # Maintainer/contact information
├── LICENSE                  # MIT — public companion source code
├── BOOK_LICENSE.md          # Commercial eBook rights notice
└── package.json             # Root verification and release commands
```

## Licensing boundary

- **Public companion source code:** MIT License.
- **Complete eBook and commercial publishing content:** Copyright © 2026 Ram Sandesh. All rights reserved.
- See [BOOK_LICENSE.md](BOOK_LICENSE.md) and [docs/LICENSE_SCOPE.md](docs/LICENSE_SCOPE.md).
- CI runs `scripts/check-commercial-boundary.mjs` to prevent accidental public commits of paid PDF/DOCX/EPUB artifacts.

## Contributing and security

Read [CONTRIBUTING.md](CONTRIBUTING.md), [GOVERNANCE.md](GOVERNANCE.md), and [SECURITY.md](SECURITY.md) before proposing changes. Historical archive recovery has a dedicated issue template so provenance can be reviewed without posting commercial manuscript files.

## Author & project links

- GitHub: https://github.com/sanskarIN
- **Gumroad:** **https://ramsandesh.gumroad.com**
- Business: sanskarin@outlook.in
- Business: sanskarin.business@gmail.com
- Support: supportramsandesh@gmail.com

<p align="center"><strong>📚 Learn from the code here — get the full 125-part book at <a href="https://ramsandesh.gumroad.com">ramsandesh.gumroad.com</a>.</strong></p>
