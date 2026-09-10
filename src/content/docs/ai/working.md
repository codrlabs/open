---
title: As a working developer
description: Using AI day to day without losing the speed, security or judgment you think you have.
sidebar:
  order: 3
---

Most of the risk in AI-assisted development is not that the tools are bad. It
is that they are *almost* right, confidently — and that the feeling of speed
arrives whether or not the speed does.

## You are probably not as fast as you feel

In a 2025 randomised controlled trial, METR had 16 experienced open-source
developers work through 246 real issues on repositories they had contributed to
for years, with AI randomly allowed or disallowed per task. With AI allowed,
they took **19% longer**. Before starting, they expected AI to make them 24%
faster; after finishing, they still believed it had made them 20% faster.

The authors are careful: this is one setting — experienced developers, large
familiar codebases, early-2025 tools — and it does not show that AI slows most
developers down. What it does show is that **the sense of speed is not evidence
of speed**.

- Judge AI on outcomes you can measure — time to a merged, correct change — not
  on how the session felt.
- Notice when prompting, waiting and repairing "almost right" output costs more
  than writing it yourself.

## Treat generated code as untrusted input

Perry et al. (CCS 2023) found that participants with an AI assistant **wrote
significantly less secure code than those without**, and were **more likely to
believe it was secure**. The participants who trusted the assistant less and
worked harder on their prompts produced fewer vulnerabilities.

- Review AI output with the suspicion you would give a stranger's pull request —
  more where it touches authentication, input handling, file paths, queries or
  anything else security-relevant.
- Confidence is not a signal. The finding is that AI raises confidence and lowers
  security at the same time.

## Check that every dependency is real

Code-generating models regularly suggest packages that do not exist. Across
576,000 generated samples from 16 models, Spracklen et al. (USENIX Security
2025) found that **at least 5.2% of suggested packages were hallucinated for
commercial models, and 21.7% for open-source models** — 205,474 unique fake
package names. An attacker who registers one of those names gets their code
installed by anyone who trusts the suggestion; the authors call it a new form of
package confusion attack.

- Before installing anything an assistant suggests, confirm the package exists,
  is the one you meant, and is maintained.
- Never let an agent add dependencies without review.

## Keep the codebase maintainable

GitClear analysed 211 million changed lines from 2020 to 2024. The share of lines
classified as copy/pasted rose from **8.3% to 12.3%**, while "moved" lines — a
marker of refactoring — fell from 25% of changed lines in 2021 to **under 10% in
2024**, and copy/pasted code exceeded moved code for the first time in the data.
GitClear presents this as coinciding with the rise of AI assistants, not as proof
that they caused it.

- Prefer reusing and refactoring existing code over a fresh generated block that
  duplicates it.
- In review, look specifically for duplication.

## Keep your own judgment switched on

In a study of 319 knowledge workers, Lee et al. (CHI 2025) found that **higher
confidence in AI was associated with less critical thinking**, while higher
confidence in one's own ability went with more. The thinking does not disappear;
it shifts toward verifying information, integrating responses and stewarding the
task.

That shift is now part of the job. In Stack Overflow's 2025 survey, **66%** of
developers named AI answers that are "almost right, but not quite" as their top
frustration, **45.2%** said debugging AI-generated code takes longer, and
**45.7%** distrusted the accuracy of AI output, against 32.7% who trusted it.

## AI amplifies what is already there

Google's DORA research puts it plainly: "AI's primary role is as an amplifier,
magnifying an organization's existing strengths and weaknesses." Good tests,
clear architecture and real review make AI more useful; without them, AI makes
things worse faster. The [practices](/practices/) matter more with AI, not less.

## Rules of thumb

- **Own every line.** If it is in your diff, you can explain how it works, why it
  is correct, and what it does on bad input.
- **Offload the mechanical, not the decisions.** Boilerplate and repetitive
  transformations are fair game. Design, debugging and correctness calls stay
  with you.
- **Keep diffs small.** Large generated changes are where "almost right" hides.
- **Tests before trust.** Run it, try the edge cases, then believe it.
- **Never paste secrets or private material into an AI tool** — credentials,
  tokens, private repository content, or anything that must stay out of a public
  repository.

## Sources

- METR (2025). [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).
- Perry, Srivastava, Kumar & Boneh (2023). [Do Users Write More Insecure Code with AI Assistants?](https://arxiv.org/abs/2211.03622) ACM CCS '23.
- Spracklen et al. (2025). [We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs](https://arxiv.org/abs/2406.10279). USENIX Security 2025.
- GitClear (2025). [AI Copilot Code Quality: 2025 Research](https://www.gitclear.com/ai_assistant_code_quality_2025_research).
- Lee et al. (2025). [The Impact of Generative AI on Critical Thinking](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/). CHI 2025.
- Stack Overflow (2025). [2025 Developer Survey: AI](https://survey.stackoverflow.co/2025/ai).
- DORA (2025). [State of AI-assisted Software Development](https://dora.dev/research/2025/dora-report/).
