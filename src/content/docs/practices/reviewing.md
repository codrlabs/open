---
title: Reviewing
description: How to review a pull request locally, and what a review is for.
sidebar:
  order: 4
---

A review here is meant to teach, not to gatekeep. Say *why*, and point at the
specific line. "This is wrong" helps nobody; "this puts network access in a hook,
so the screen can no longer be tested without a server" is the actual lesson.

Changes get requested on almost every pull request, including maintainers'. It
is not a grade.

## Review it locally

Reading a diff in the browser catches style. Running the branch catches
behaviour.

```bash
# 1. Get the branch
git fetch origin
git checkout -b pr-branch-name origin/pr-branch-name

# 2. Read it in your editor, and run it

# 3. Clean up when you are done
git checkout main
git branch -D pr-branch-name
```

## What to look at

**Architecture first.** Which layers does this touch? Does that match what the
description claims? Run down the
[anti-patterns table](/practices/layered-architecture/#anti-patterns-to-call-out-in-review) —
most real review findings are on it.

**Then behaviour.** Start the app, go to the part that changed, and try the edge
cases the author probably did not: empty input, very long input, the slow path,
the failure path.

**Then the diff itself.** Does it do only what it says? A pull request that also
reformats an unrelated file is two pull requests.

## Checklist

- [ ] The change lives in the layers it should, and leaves the rest alone
- [ ] It follows the conventions already in that codebase
- [ ] No secrets, tokens, internal hostnames or private paths in the diff
- [ ] It behaves correctly, including at least one edge case
- [ ] No obvious regression in the surrounding area
- [ ] Tests exist where the change deserves them
- [ ] Someone unfamiliar with it could read it in six months

## Scope discipline

If you spot something real but unrelated, do not fix it in the review and do not
leave it as a comment that dies with the thread. Open an issue, or write it into
the project's task list. Out-of-scope findings that live only in a review
conversation are lost findings.
