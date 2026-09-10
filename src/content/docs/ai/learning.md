---
title: While you're learning
description: Using AI to build skill instead of skipping it — what the research found, and how to work.
sidebar:
  order: 2
---

If you are here to get better — a first contribution, a mentored task, a new
language or library — how you use AI decides whether you come out more capable,
or just finished.

## Friction is the point

Expertise comes from doing the work: tracing an error with no useful log,
rewriting an approach that will not scale, getting it wrong and finding out why.
Lars Faye's word for what that builds is *Fingerspitzengefühl* — fingertip
feeling — the instinct that says "this is going to cause problems" before you can
say why. Skip the struggle and the instinct never forms.

Anthropic's researchers reached the same place from a randomised trial:
"Cognitive effort—and even getting painfully stuck—is likely important for
fostering mastery."

## What the studies saw

**Asking beats delegating.** In Anthropic's 2026 trial, 52 mostly junior
developers learned an unfamiliar Python library, Trio. Those with AI scored 50%
on the follow-up quiz against 67% for those coding by hand, with the largest gap
on debugging. How people used AI mattered: those who asked conceptual questions
and resolved errors themselves, or asked for explanations alongside code, scored
well. Those who delegated the code, leaned on AI more as they went, or had it
debug for them averaged under 40%.

**Hints beat answers.** Bastani et al. gave about 1,000 high-school students
GPT-4 during maths practice. With a plain chat interface, practice scores rose
48% — but on the exam, with AI taken away, those students scored 17% below
students who had only the textbook. A tutor version instructed to give
teacher-designed hints rather than solutions lifted practice by 127%, with no
significant harm on the exam. Students using the plain version did not perceive
that they had learned less.

**AI can widen the gap it should close.** Prather et al. observed novices
solving a programming problem with AI across 21 lab sessions. Students who were
already progressing used it to write code they had already planned, and ignored
bad suggestions. Struggling students had their existing difficulties compounded,
thought they had performed better than they had, and "finished with an illusion
of competence".

## How to use AI while you learn

**Do:**

- **Ask conceptual questions.** "Why does this need to be awaited?" teaches.
  "Write the function" does not.
- **Ask for a hint, not the answer.** Tell the assistant explicitly not to give
  you the solution.
- **Write it first, then ask for critique.** Your attempt, then its review —
  never the reverse.
- **Use it as interactive documentation**, then confirm what it said against the
  real documentation.
- **Explain your understanding back** and ask what is wrong with it.
- **Read the error before you paste it.** Form your own guess first, then check.

**Avoid:**

- Generating the solution to the problem you are meant to be learning from.
- Accepting code you could not rewrite without the assistant.
- Letting the assistant fix errors it introduced, in a loop you no longer follow.

## Before you prompt

Adapted from the checklist Lars Faye uses in his own daily work:

1. Without an AI tool, could I still do this task?
2. Am I using the model to deepen my understanding, or to get to the answer
   faster?
3. If I had to audit the output, could I explain what is happening?
4. If this concept is new to me, have I read enough to know the right questions
   to ask?
5. Have I checked the approach against documentation or another source?
6. Is this a rote task done a hundred times before, or does it need a decision
   somewhere?

If the honest answers point toward getting the answer rather than understanding
it, do it the slow way.

## AI tutors are wrong too

Using AI as a tutor carries the same risk as using it to write code: it can be
confidently wrong, and a learner is the person least equipped to notice. As Faye
puts it, if you cannot audit generated code, you cannot audit a generated concept
either. Check what it teaches against official documentation, other people, and
running the code yourself.

## When you are stuck

Being stuck is expected, and it is not wasted time. Give it a real attempt, then
ask a person. In a mentored task, tell your mentor what you tried and where AI
helped — that is the most useful thing they can know when they review your work.

In Stack Overflow's 2025 survey, 75.3% of developers said they would still ask
another person when they do not trust an AI's answer. That instinct is right.

## Sources

- Faye, L. (2026). [AI Coding will Prevent Expertise](https://larsfaye.com/articles/ai-coding-will-prevent-expertise).
- Shen, J. H. & Tamkin, A. (2026). [How AI assistance impacts the formation of coding skills](https://www.anthropic.com/research/AI-assistance-coding-skills). Anthropic.
- Bastani, H. et al. (2025). [Generative AI without guardrails can harm learning: Evidence from high school mathematics](https://pmc.ncbi.nlm.nih.gov/articles/PMC12232635/). PNAS 122(26).
- Prather, J. et al. (2024). [The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers](https://arxiv.org/abs/2405.17739). ICER 2024.
- Stack Overflow (2025). [2025 Developer Survey: AI](https://survey.stackoverflow.co/2025/ai).
