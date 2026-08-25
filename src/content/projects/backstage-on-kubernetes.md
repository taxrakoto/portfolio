---
title: Building a Kubernetes GitOps Internal Developer Platform with Backstage
eyebrow: Platform engineering case study
summary: I designed a Kubernetes-native developer platform that lets users create, customize, and deploy an application following GitOps principles, without supplying personal GitHub or registry credentials.
role: Platform and DevOps Engineer
year: "2026"
status: Completed
featured: true
order: 1
stack:
  - Backstage
  - Kubernetes
  - Argo CD
  - Helm
  - Gitea
  - GitHub Actions
  - Crunchy PGO
impact:
  - Delivered a working golden path from a form to a Kubernetes application
  - Automated source promotion and deployment through Gitea Actions and Argo CD
  - Kept generated code and operational credentials inside the user's cluster
repository: https://github.com/taxrakoto-idp/platform
accent: green
---

## What if evaluating an IDP did not require another platform first?

Internal Developer Platform demos often start with a demanding checklist: a
public Kubernetes cluster, a domain, an identity provider, a container registry,
and several personal access tokens. That creates friction before a developer
can even test the promised self-service experience.

I designed and implemented a different approach: a Bring-your-own Kubernetes-native platform
that anyone can install on Minikube, enter through Backstage as a guest,
and use to turn a short form into a running, customizable application. The
workflow does not require any personal GitHub or container
registry credentials.

## The challenge

My goal was not simply to install Backstage beside Argo CD. I wanted to
demonstrate a complete golden path while respecting four constraints:

- The user supplies the Kubernetes cluster (easily provisioned with minikube for eg), but no public endpoint is required.
- Generated application code must remain local to that cluster.
- Platform credentials must be generated and scoped automatically.
- A source-code commit must reach Kubernetes without a manual Argo CD sync.

The platform also needed to start reliably from an empty cluster,
where controllers, databases, repositories, and credentials become available
at different times.

## What I owned

As the Platform and DevOps Engineer, I designed the repository boundaries,
deployment ordering, credential model, Software Template, reusable application
chart, and continuous-delivery workflow.

I implemented the Argo CD bootstrap and ApplicationSets, packaged the platform
components with Helm and Kustomize, connected Backstage to Gitea, wrote the
custom action that updates the private GitOps repository, and created the PHP
golden path. I also built the GitHub Actions workflow that validates Backstage
and publishes multi-platform images to GHCR.

## Architecture highlights

The public project is split into repositories with focused responsibilities:

- `argo` bootstraps Argo CD and defines projects, rollout order, health gates,
  and workload discovery.
- `deploy` stores platform packages and the reusable PHP Helm chart.
- `backstage` contains the custom portal, integrations, and backend action.
- `templates` contains the Software Template, starter PHP code, workflow, and
  Helm values skeleton.

Inside the cluster, Gitea provides disposable source control and Gitea Actions.
An idempotent initializer creates three technical identities:
`backstage-bot` creates application repositories, `gitops-bot` updates desired
state, and `argocd-reader` has read-only access to it. Their credentials remain
in Kubernetes Secrets rather than template inputs or public repositories.

When a user launches the PHP template, Backstage creates a runnable source
repository and writes an environment-specific values file to the private
`application-gitops` repository. Argo CD combines that file with the generic
PHP chart from `deploy`. An init container clones the selected immutable commit,
allowing custom code to run without building or publishing another image.

After the user changes `index.php` and pushes to `main`, Gitea Actions records
the new commit SHA in GitOps. Argo CD detects the change, synchronizes the
Application, and rolls out the updated code automatically.

## Challenges encountered during implementation

First, PostgreSQL PVCs remained Pending when the target cluster did not provide
a compatible dynamic volume provisioner. I made storage configuration portable
by allowing the bootstrap to use the cluster's default StorageClass or an
explicitly selected class, so persistent volumes can be provisioned across
different Kubernetes environments.

Second, sync-wave annotations alone did not reliably prevent the workload
ApplicationSet from contacting Gitea too early. I added a readiness Job that
authenticates to the private repository and verifies its `main` branch before
Argo CD advances to workload discovery.

The resulting path has been validated end to end on Minikube: the platform
installs from public repositories, the databases and services become Healthy,
Backstage creates an application, and a later source commit is promoted and
deployed automatically.

## Trade-offs and production boundaries

This is a complete evaluation environment, not a claim that demo defaults are
production-ready. Guest authentication, port-forwarded access, single database
instances, local administrator credentials, and disabled backups keep the
experience approachable.

For production, I would add trusted ingress and TLS, individual identity and
authorization, highly available databases, external backups, monitoring,
recovery testing, and formal secret rotation. Documenting those boundaries is
part of the design: a useful platform makes both its capabilities and its risks
clear.

## Try it

The source, architecture decisions, installation guide, and golden-path
tutorial are available in the
[TaxRakoto IDP platform repository](https://github.com/taxrakoto-idp/platform).
Start with the public `argo` repository to reproduce the platform on a local
Kubernetes cluster and follow the same path from Backstage form to deployed
custom code.

The key lesson from this project is that a platform is more than a collection
of tools. It becomes a developer experience when installation order,
credentials, source control, deployment automation, failure handling, and
documentation work as one coherent system.
