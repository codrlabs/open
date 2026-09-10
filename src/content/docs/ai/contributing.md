---
title: In contributions
description: What Codrlabs Open expects when AI helped with a contribution, and what reviewers look for.
sidebar:
  order: 4
---

AI-assisted contributions are welcome. What matters is that the contribution is
genuinely yours: understood, checked, and defensible in review.

:::note[As of 2026-09]
These expectations will change as the tools and the evidence do. The reasoning
behind them is in [As a working developer](/ai/working/) and
[While you're learning](/ai/learning/).
:::

## If you are contributing

1. **You own what you submit.** Whatever wrote the first draft, you are the
   author. Be ready to explain any line in review — how it works, why it is
   correct, what happens on bad input.
2. **Say how AI was used.** A line or two in the pull request description is
   enough: "Used an assistant to draft the test fixtures; the parser changes are
   mine." Reviews teach better when the reviewer knows which reasoning was yours.
3. **Don't submit what you haven't read.** A pull request generated wholesale by
   an agent, which its author cannot walk through, will be sent back.
4. **Check dependencies and security-relevant code yourself.** Confirm every new
   package exists and is the one you meant. Give extra scrutiny to input
   handling, authentication, file access and queries.
5. **Keep private material out of AI tools.** No credentials, tokens, private
   repository content, or anything that must stay out of a public repository.

## If the contribution is how you are learning

When the point of the work is to build a skill — a first issue, a mentored task —
follow [While you're learning](/ai/learning/): write the core logic yourself,
and use AI to understand rather than to produce. Getting stuck, and then asking a
person, is part of the process, not a failure of it.

## If you are reviewing

- **Review AI-assisted code at least as hard as any other.** The research shows
  AI raises confidence faster than it raises correctness.
- **Ask the author to walk you through it.** Not as a penalty — it is the review
  doing its job, and the quickest way to find an "almost right" section.
- **Check that new dependencies exist** and are the packages intended.
- **Look for duplication** where existing code should have been reused.
- **Keep it a lesson.** See [Reviewing](/practices/reviewing/).
