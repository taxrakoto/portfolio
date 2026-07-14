---
title: Backstage on Kubernetes
eyebrow: Developer platform lab
summary: An opinionated Helm chart for deploying Backstage through Argo CD with external secrets, managed PostgreSQL, and Gateway API.
role: Platform Engineer
year: "2026"
status: Active lab
featured: false
order: 4
stack:
  - Backstage
  - Kubernetes
  - Helm
  - Argo CD
  - AWS Secrets Manager
  - Crunchy PGO
impact:
  - Open-sourced a reusable GitOps deployment pattern
  - Integrated existing platform services instead of duplicating them
  - Documented real-world GitLab discovery constraints
repository: https://github.com/taxrakoto/backstage-chart
accent: blue
---

## Context

Backstage is often introduced as a simple application, but a production-oriented deployment has to fit an organization’s identity, secrets, database, networking, storage, and delivery standards.

## Approach

I built an opinionated Helm chart designed for Argo CD. It consumes externally managed secrets, uses PostgreSQL provided by Crunchy PGO, supports the Kubernetes Gateway API, and leaves image creation to a dedicated CI workflow.

## Platform fit

- AWS Secrets Manager remains the source for sensitive configuration.
- External Secrets synchronizes only the values Backstage needs.
- The chart consumes PostgreSQL rather than owning its lifecycle.
- Gateway API expresses routing without relying on legacy Ingress resources.
- Environment-specific values remain declarative and reviewable.

## Learning

The lab exposed a difference between GitLab.com and self-hosted GitLab user discovery. Capturing that limitation alongside the implementation makes the repository useful as an engineering record, not just a collection of templates.

