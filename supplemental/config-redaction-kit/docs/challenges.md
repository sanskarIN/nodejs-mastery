# Challenges — Configuration + Redaction Laboratory

1. Add strict URL validation for `DATABASE_URL` without logging credentials.
2. Add enum parsing for a feature mode and prove invalid values fail at startup.
3. Add nested structured configuration while keeping secret fields out of diagnostics.
4. Add a configuration fingerprint that excludes secret values but changes when safe operational settings change.
5. Design a reloadable configuration boundary and state which settings may or may not change at runtime.

Treat configuration errors as startup contract failures rather than hidden defaults.

Storefront: https://ramsandesh.gumroad.com
