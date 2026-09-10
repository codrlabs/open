---
title: AI assistance
description: How AI fits into work at Codrlabs Open, grounded in the research on productivity, security and how expertise forms.
sidebar:
  order: 1
---

AI coding tools are part of how software is written now, and Codrlabs Open works
with them rather than around them. This section sets out how to use them so they
make you a better developer instead of standing in for one.

## The principle

> **Offload the mechanical. Never offload the judgment.**

Lars Faye draws the line well in
[AI Coding will Prevent Expertise](https://larsfaye.com/articles/ai-coding-will-prevent-expertise):
*cognitive offloading* delegates the mechanical or tedious, while *cognitive
debt* abdicates your judgment and decisions. Offloading makes you faster. Debt
makes you dependent, and it compounds.

For experienced developers the risk is mostly about quality and security. For
people still building their skills it is sharper: the friction AI removes is the
same friction that builds expertise. Faye's "expert novice" is the result — a
developer expected to steer tools that assume a judgment they have not yet had
the chance to develop.

## What the research shows

| Finding | Study |
| --- | --- |
| Developers learning a new library with AI scored **50%** on a comprehension quiz, against **67%** for those coding by hand. The biggest gap was on debugging, and the AI group was not significantly faster. | Anthropic, 2026 — randomised trial, 52 developers |
| Students practising maths with unrestricted GPT-4 did **48% better** in practice but **17% worse** on the exam without it. A tutor version that gave hints instead of answers caused no significant exam harm. | Bastani et al., PNAS 2025 — about 1,000 students |
| Novices already progressing used AI to write code they had planned and ignored bad suggestions. Struggling novices had their difficulties compounded and "finished with an illusion of competence". | Prather et al., ICER 2024 — 21 lab sessions |
| Experienced open-source developers took **19% longer** with AI on their own repositories, while believing it had made them 20% faster. | METR, 2025 — randomised trial, 16 developers, 246 tasks |
| Participants with an AI assistant wrote **less secure code** and were **more confident** it was secure. | Perry et al., CCS 2023 |
| At least **5.2%** (commercial) and **21.7%** (open-source) of packages suggested by code models did not exist. | Spracklen et al., USENIX Security 2025 |
| Higher confidence in AI was associated with **less critical thinking**; higher self-confidence with more. | Lee et al., CHI 2025 — 319 knowledge workers |

## Reading this honestly

These studies are small or specific: 16 developers in METR's setting, 52 in
Anthropic's, one school in Bastani's. Anthropic measured comprehension straight
after the task, not months later. The tools change quickly. No single result
settles anything.

What holds across very different designs is the pattern:

- **The benefit tracks existing expertise.** People who already know what good
  looks like use AI to go faster. People who don't are the most likely to be
  misled, and the least likely to notice.
- **Learning suffers when AI does the thinking**, and holds up when AI is made to
  teach instead — hints rather than answers, questions rather than code.
- **Confidence rises faster than quality.** In security, in speed and in
  learning, people using AI rated their work higher than it measured.

## In this section

- [While you're learning](/ai/learning/) — using AI to build skill instead of
  skipping it.
- [As a working developer](/ai/working/) — speed, security, dependencies and
  maintainability.
- [In contributions](/ai/contributing/) — what Codrlabs Open expects from authors
  and reviewers.

## Sources

- Faye, L. (2026). [AI Coding will Prevent Expertise](https://larsfaye.com/articles/ai-coding-will-prevent-expertise).
- Shen, J. H. & Tamkin, A. (2026). [How AI assistance impacts the formation of coding skills](https://www.anthropic.com/research/AI-assistance-coding-skills). Anthropic.
- Bastani, H. et al. (2025). [Generative AI without guardrails can harm learning: Evidence from high school mathematics](https://pmc.ncbi.nlm.nih.gov/articles/PMC12232635/). PNAS 122(26).
- Prather, J. et al. (2024). [The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers](https://arxiv.org/abs/2405.17739). ICER 2024.
- METR (2025). [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).
- Perry, N. et al. (2023). [Do Users Write More Insecure Code with AI Assistants?](https://arxiv.org/abs/2211.03622) ACM CCS '23.
- Spracklen, J. et al. (2025). [We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs](https://arxiv.org/abs/2406.10279). USENIX Security 2025.
- Lee, H.-P. et al. (2025). [The Impact of Generative AI on Critical Thinking](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/). CHI 2025.
