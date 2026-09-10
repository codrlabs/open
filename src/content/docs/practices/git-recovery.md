---
title: Git recovery
description: The exact procedures for getting out of the branch messes we have actually hit, including the pitfalls.
sidebar:
  order: 5
---

Everything here has been hit for real on a codrlabs project. The pitfalls listed
are the ones that cost an afternoon, so they are written down rather than
rediscovered.

:::caution[Rewriting history is not free]
`rebase` and `--force-with-lease` rewrite commits. On a branch only you are
working on, that is routine. On a shared branch — anything others have pulled,
`main` included — it breaks every other clone. Check who else is on the branch
before you rewrite it.
:::

## Committed to `main` instead of a branch

```bash
git reset HEAD~1                    # undo the commit, keep the changes
git checkout -b feature/task-name
git add -A && git commit -m "feat: …"
git push -u origin feature/task-name
```

## Forgot to branch before starting work

Nothing is lost — the changes are still uncommitted in the working tree.

```bash
git checkout -b feature/task-name
git add -A && git commit -m "feat: …"
git push -u origin feature/task-name
```

## The pull request has commits from another branch

This happens when you branched from a feature branch instead of `main`. Your
pull request now shows somebody else's commits as yours. Fix it with an
interactive rebase, dropping the commits that do not belong.

```bash
# 1. Be on the right branch
git checkout your-branch-name

# 2. Reset to exactly what is on the remote — this undoes any earlier
#    half-finished attempt, which is usually why the next step misbehaves
git fetch origin
git reset --hard origin/your-branch-name

# 3. See what you actually have, duplicates included
git log --oneline origin/main..HEAD

# 4. Start the rebase
git rebase -i origin/main
```

In the editor that opens:

1. Press `Esc` first — this matters in Vim.
2. Delete every line that does not belong to this pull request (`dd` deletes a
   line), or change its `pick` to `drop`.
3. Leave only the commits that are genuinely yours.
4. Save and quit with `:wq`.

**What goes wrong here:**

- `Ctrl+C`, `:q!` or `:qa!` abort the whole rebase rather than saving your edits.
- Skipping the `git reset --hard` in step 2 leaves debris from a previous
  attempt, and the rebase then behaves inexplicably.
- Being on the wrong branch entirely.
- Running `git pull` afterwards, which merges the old history straight back in
  and creates a mess. After a rebase you push, you never pull.

**If you get conflicts,** that is the rebase working, not failing:

```bash
git checkout --theirs path/to/file   # keep your branch's version
git checkout --ours   path/to/file   # keep main's version
git add .
git rebase --continue
```

**When it finishes, verify before pushing:**

```bash
git log --oneline origin/main..HEAD   # should show only your commits
git push --force-with-lease origin your-branch-name
```

## Rebase went wrong and you want out

```bash
git rebase --abort
```

If that does not restore things, reset to the remote and start again:

```bash
git reset --hard origin/your-branch-name
```

## Bringing a branch up to date with `main`

```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

## Rules that prevent most of this

- Always branch from an up-to-date `main`, never from another feature branch.
- One issue, one branch, one pull request.
- Commit before you reorganise anything. A commit is recoverable; a dirty
  working tree is not.
- `git log --oneline origin/main..HEAD` before every push — it shows exactly what
  your pull request will contain.
- `--force-with-lease`, never bare `--force`.
