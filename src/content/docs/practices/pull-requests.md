---
title: Pull requests
description: One issue, one branch, one pull request — the flow from picking up work to a merged change.
sidebar:
  order: 3
---

## The rule

> **One issue = one branch = one pull request.**

Each issue gets its own branch. Each branch contains changes for that issue and
nothing else. Always branch from `main` — never from another feature branch.

Mixing two issues into one branch makes the pull request unreviewable and the
history unbisectable, and it is the single most common cause of the mess on the
[Git recovery](/practices/git-recovery/) page.

## The flow

```
issue → pull main → branch → implement (+ tests) → commit → push → PR
                                                                    │
                                                        ┌───────────┴───────────┐
                                                        │      review OK?       │
                                                        └───┬───────────────┬───┘
                                                        no  │               │ yes
                                                            ▼               ▼
                                                  update, push        merge to main
                                                  (same branch)
                                                            │
                                                            └──▶ back to review
```

```bash
# 1. Start from an up-to-date main
git checkout main
git pull origin main

# 2. Branch. Name it for the work: feature/… fix/… docs/…
git checkout -b feature/task-name

# 3. Implement, with tests where the change deserves them

# 4. Commit and push
git add -A
git commit -m "feat: short description of what changed

- what was done, and why
- reference the issue if there is one"
git push -u origin feature/task-name

# 5. Open the pull request, go through review

# 6. After merge, clean up
git checkout main
git branch -d feature/task-name
git push origin --delete feature/task-name
```

## Before you open it

Answer the [two questions](/practices/layered-architecture/#the-two-questions-before-every-pull-request):
which layers does this touch, and what does it deliberately leave alone. Put
both in the pull request description. A reviewer who knows what you did *not*
change reviews far faster.

## Commit messages

Use a conventional prefix — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`,
`test:` — then a short summary line, then a body explaining *why* when the why
is not obvious from the diff.

The diff already says what changed. The message is for the reasoning.

## Keeping branches clean

```bash
# Correct — starts fresh
git checkout main
git pull origin main
git checkout -b feature/issue-description

# Wrong — inherits the other branch's commits into your PR
git checkout feature/old-branch
git checkout -b new-branch
```

Sync and prune regularly so stale branches do not accumulate:

```bash
git fetch --all --prune
git remote prune origin
```

## Work in progress on the wrong branch

If you have started work in the wrong place, commit it first — then move it.
Committing is what makes it recoverable.

```bash
git add .
git commit -m "WIP: description"

git checkout main
git pull origin main
git checkout -b feature/issue-description
git cherry-pick <commit-hash>
git push -u origin feature/issue-description
```

## Updating a pull request

Push to the same branch. Do not open a second pull request.

```bash
git add -A
git commit -m "fix: address review feedback"
git push
```

If `main` has moved and you need to catch up:

```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

Always `--force-with-lease`, never bare `--force`. The lease is what stops you
overwriting a commit somebody else pushed while you were working.
