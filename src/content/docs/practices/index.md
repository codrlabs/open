---
title: Engineering practices
description: How Codrlabs Open projects are built, reviewed and documented — distilled from real work, not from a style guide.
sidebar:
  order: 1
---

These pages are the **single source of truth** for how work is done across
Codrlabs Open projects. If a project's own docs disagree with this section,
this section is what we meant.

None of it was written in the abstract. Every page here is distilled from
practice — mostly on a real codebase, [Vizably](/vizably/overview/) — including
the parts that went wrong first. Where a rule exists, it exists because
something broke without it.

## What is here

| Page | Answers |
| --- | --- |
| [Layered architecture](/practices/layered-architecture/) | "Which layer does this change belong in, and what must I not touch?" |
| [Pull requests](/practices/pull-requests/) | "How do I get a change from an issue to `main`?" |
| [Reviewing](/practices/reviewing/) | "How do I review someone else's pull request?" |
| [Git recovery](/practices/git-recovery/) | "I've made a mess of this branch. How do I fix it?" |
| [Documentation](/practices/documentation/) | "Where does this document go, and does it belong in a repo at all?" |
| [Working setup](/practices/working-setup/) | "Where do we talk, how do I get through a long session, and what are the rules for someone else's machine or credentials?" |

## The through-line

Three ideas connect all of it.

**Name the layer before you edit the file.** The path tells you the layer, the
layer tells you the rules, and the rules tell you what you may not touch. That
is the difference between building and hacking.

**The best change is a small change in one place.** A pull request touching
three layers at once usually means two responsibilities got collapsed into one.
Split it.

**Write down what you had to work out.** The recovery steps on these pages exist
because somebody spent an afternoon on them. Nobody should spend it twice.
