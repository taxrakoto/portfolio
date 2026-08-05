---
title: GitOps Kubernetes Delivery Platform
eyebrow: Platform engineering
summary: A self-hosted Kubernetes platform where Jenkins builds artifacts and Argo CD continuously reconciles declarative releases.
role: DevOps Lead
year: "2025"
status: Production
featured: false
order: 3
stack:
  - Kubernetes
  - Argo CD
  - Helm
  - Jenkins
  - Longhorn
  - Prometheus
impact:
  - Achieved 99.9% platform uptime
  - Reduced rollback time by 60%
  - Made application delivery auditable and repeatable
accent: blue
---

## Context

Teams needed a repeatable way to deliver stateful and stateless applications to a self-hosted Kubernetes environment without giving CI systems direct, long-lived control of the cluster.

## Architecture

Jenkins handles continuous integration: testing, image creation, and artifact publication. Argo CD handles continuous delivery by reconciling Helm-based configuration from Git. This separation keeps cluster state declarative and provides a visible audit trail for every release.

The platform combines Longhorn for distributed storage, Prometheus and Grafana for operational signals, and a PostgreSQL operator for database lifecycle management.

## Design decisions

- Git is the source of truth for desired environment state.
- CI publishes artifacts but does not mutate production workloads directly.
- Helm values capture environment-specific configuration.
- Health checks and sync status provide a clear release signal.
- Rollback means reverting a Git change, keeping recovery predictable.

## Result

The platform reached 99.9% uptime, reduced rollback time by 60%, and gave application teams a more transparent path from approved change to production.

