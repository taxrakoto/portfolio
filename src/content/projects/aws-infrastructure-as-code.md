---
title: AWS Infrastructure as Code
eyebrow: Cloud foundations
summary: Repeatable AWS environments provisioned with Terraform and configured with Ansible, replacing fragile manual setup.
role: DevOps Engineer
year: "2023"
status: Completed
featured: false
order: 3
stack:
  - AWS
  - Terraform
  - Ansible
  - GitLab CI
  - Linux
impact:
  - Reduced provisioning errors
  - Made infrastructure changes reviewable in Git
  - Standardized configuration across environments
accent: amber
---

## Context

Cloud environments were time-consuming to reproduce and depended on manual configuration. That increased the chance of drift and made reviews difficult.

## Approach

I separated infrastructure provisioning from operating-system configuration. Terraform defines AWS resources and relationships, while Ansible applies repeatable host and service configuration after provisioning.

The workflow runs through CI so changes can be formatted, validated, planned, reviewed, and applied through a controlled process.

## Controls

- Remote state and locking protect concurrent infrastructure changes.
- Modules establish reusable network and compute patterns.
- Plans are reviewed before application.
- Ansible roles keep configuration idempotent.
- Sensitive values stay outside source control.

## Result

The project reduced provisioning errors, improved consistency between environments, and replaced undocumented manual steps with reviewable automation.

