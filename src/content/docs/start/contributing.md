---
title: Contributing
description: How to contribute to a Codrlabs Open project — the flow, the house rules, and where to report something sensitive.
sidebar:
  order: 2
---

Every repository under [github.com/codrlabs](https://github.com/codrlabs) is
open source and takes outside contributions. You do not need to be part of the
mentoring to send one.

## The flow

1. **Open an issue first for anything substantial**, so the approach can be
   agreed before you spend an evening on it. Small fixes — a typo, a dead link,
   a command that no longer works — can go straight to a pull request.
2. **One issue, one branch, one pull request.** The reasoning and the exact
   commands are on [Pull requests](/practices/pull-requests/), and
   [Git recovery](/practices/git-recovery/) covers the branch messes that follow.
3. **Every pull request gets a real review.** Reviews here are meant to teach,
   not to gatekeep — see [Reviewing](/practices/reviewing/) for what one looks
   like from the other side.
4. **If AI helped, say how** in the description —
   [AI assistance in contributions](/ai/contributing/).

## Where to start

Issues labelled `good first issue` in the project repositories are the usual
entry point. Documentation fixes count: a stale command on a docs site is a bug,
and finding one means you were the person who actually followed the steps.

## Each repository has its own guide

`CONTRIBUTING.md` in the repository is the specific version — how to run it,
where things live, what the house rules are for that codebase. This site's is
[CONTRIBUTING.md in `codrlabs/open`](https://github.com/codrlabs/open/blob/main/CONTRIBUTING.md).

Two rules are common to all of them, because a public repository keeps whatever
you push forever:

- **Nothing internal** — no hostnames, infrastructure detail, client names or
  private operational content, in files or in commit messages.
- **Nothing about individuals** — no names of contributors, mentees or their
  schools without written consent, and no present-tense facts or counts about
  who is involved right now.

## Code of conduct

[Contributor Covenant 2.1](https://github.com/codrlabs/.github/blob/main/CODE_OF_CONDUCT.md),
across every repository in the organisation. Reports go to open@codrlabs.com and
are handled by the people who maintain the projects.

## Reporting a vulnerability

Not in a public issue — that publishes the problem before anyone can fix it.
Email open@codrlabs.com, or use **Security → Report a vulnerability** on the
repository. The full policy is
[SECURITY.md](https://github.com/codrlabs/.github/blob/main/SECURITY.md).

If you find a live credential anywhere in a repository, report it rather than
testing it, and see
[Secrets and accounts](/practices/working-setup/#secrets-and-accounts) for why
the credential gets rotated before the history gets cleaned.
