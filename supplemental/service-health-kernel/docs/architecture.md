# Architecture — Service Health Kernel Laboratory

Liveness answers whether the process is alive enough to be restarted only when truly broken. Readiness answers whether new traffic should be sent to the process. Draining intentionally fails readiness while preserving liveness, allowing load balancers to stop new traffic without triggering a restart loop.

Storefront: https://ramsandesh.gumroad.com
