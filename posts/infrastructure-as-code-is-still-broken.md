---
title: Infrastructure as code is still broken, and spec won’t fix it
date: April 3, 2026
excerpt: We have more YAML, but still drift, opaque templates, and engineers afraid to touch production.
---

Infrastructure as code has become a standard, but it is often still an illusion of control.

The files are there, the pipelines are there, but the final result is not necessarily what you expected.

What breaks IaC today:

* modules that hide more logic than they expose;
* YAML that is hard to understand without full context;
* drift between declared state and real state.

Spec is not enough. You can have a good Terraform or CloudFormation schema and still be blind while resources change in production.

What matters most is:

* fast feedback on what is actually applied;
* clear conventions, not unused generic libraries;
* a culture where engineers can fix production without fearing the whole pipeline will break.

IaC is not dead. It is just still too close to glass house decor and not close enough to the field.
