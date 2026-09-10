---
title: Documentation
description: What belongs on this site, what stays in a repo, and how to tell the two apart.
sidebar:
  order: 6
---

Docs are a layer like any other. They have a home, and sneaking architecture
notes into source comments is the same mistake as putting validation in a screen
component.

## This site is the source of truth

Anything that outlives a single repository lives here — practices, architecture
explanations, project overviews, how Codrlabs Open works. A reader should not
have to clone a repo to understand what a project is or how work is done.

What stays in the repository:

| Stays in the repo | Why |
| --- | --- |
| `README.md` | What this code is and how to run it, for someone standing in the directory |
| `LICENSE` | Legally has to be there |
| `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` | GitHub surfaces these in its own UI |
| `TODO.md` / task lists | Tracks the state of *that* codebase, and changes with it |
| Code comments | Explain the line they sit next to, nothing wider |

Everything else is a candidate for this site.

## Three kinds of document

Sorting by **intent** keeps documents from rotting into each other.

| Kind | What it is | Test |
| --- | --- | --- |
| **Guide** | Stable, evergreen, "how do I do X" | Would this still be true in a year? |
| **Plan** | Time-bounded work with phases, deliverables, status | Does it have checkboxes and an end? |
| **Scratch** | Thinking out loud, sketches, canvases | Would you be embarrassed if someone cited it? |

Guides have no checkboxes. Plans do, and when a plan is finished it gets
archived rather than deleted — the reasoning is worth more than the checklist.
Scratch material is never authoritative and should say so.

For lightweight task tracking prefer issues. Reach for a plan only when a body
of work spans many issues and needs a shared narrative.

## When to add what

| Need | Where it goes |
| --- | --- |
| "How do I do X in this project?" | A guide, on this site |
| "How do we work, across projects?" | [Practices](/practices/) |
| "What work happens, in what order?" | A plan, or issues |
| "What does this code currently do?" | The repository `README.md` |
| "I'm sketching" | Scratch notes, clearly marked |

## Write down what you had to work out

The rule that produces the most value here: **if something took you more than
about twenty minutes to figure out, it is a document.** Not a comment in a
review, not a message — a page.

The [Git recovery](/practices/git-recovery/) page exists entirely because of
this rule, and it is the page people use most.

## Keep documents honest

- **Say what is unverified.** A document that states a guess as a fact is worse
  than no document.
- **Date the things that will age.** "As of 2026-09" costs nothing and saves a
  reader from trusting a stale claim.
- **Mark superseded sections rather than silently editing them.** A note saying
  "this described the layout before X landed" is useful history.
- **Never put internal detail in a public repository** — hostnames, IPs, client
  names, private infrastructure. Git history is not a private scratchpad, and
  removing it later means a force-push that breaks every clone.
