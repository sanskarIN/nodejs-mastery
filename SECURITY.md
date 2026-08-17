# Security Policy

> 📘 **Complete Node.js Full Mastery eBook:** https://ramsandesh.gumroad.com

This repository contains educational companion laboratories. They are not drop-in production systems.

## Supported public code

Security fixes target the current `main` branch and the latest public companion-code release line. Historical code examples may intentionally demonstrate simplified infrastructure and should not be interpreted as production security guidance without the surrounding chapter context and deployment-specific review.

## Reporting a repository vulnerability

Please **do not** publish exploit details, working credentials, or sensitive reproduction data in a public issue.

Contact: **sanskarin@outlook.in**

Include, when possible:

- affected part/path;
- Node.js version;
- vulnerability class and impact;
- minimal reproduction that does not expose unrelated sensitive data;
- whether the problem is reachable through the demo/test path or only through a hypothetical production adaptation;
- a suggested mitigation if you have one.

Repository bugs that are not security-sensitive should use the normal GitHub bug-report template.

## Repository protections

The project uses CI, CodeQL, dependency review, Dependabot, CODEOWNERS, project metadata validation, and commercial-artifact boundary checks. These controls reduce risk but do not replace human review.

## Production-use warning

Before production use, review authentication, authorization, secrets, input validation, dependency posture, data durability, privacy, rate limits, logging, deployment isolation, incident response, backups, threat models, and applicable legal/compliance requirements.

For the repository trust model, see [`docs/SECURITY_MODEL.md`](docs/SECURITY_MODEL.md).

**Official storefront:** https://ramsandesh.gumroad.com
