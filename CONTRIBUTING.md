# Contributing

This repository is the source of **https://open.codrlabs.com** — an Astro +
Starlight site. Corrections are as welcome as new pages: a wrong command or a
stale claim on a documentation site is a bug.

## Running it

```bash
npm ci
npm run dev      # http://localhost:4321
npm run build    # static build into dist/
```

Node 24 (see `.nvmrc`). `npm run build` must pass before you push — the deploy
workflow runs the same build, and a broken link to a page that does not exist
fails it.

> **Restart the dev server after adding a content file or editing
> `astro.config.mjs`.** Starlight validates sidebar slugs against a cached
> content store, and the file watcher does not always re-scan. A running server
> can insist a file you just wrote does not exist. `rm -rf .astro` and start it
> again.

## Where things live

| Path | What it is |
| --- | --- |
| `src/content/docs/**` | The pages. Directory structure is the URL structure. |
| `astro.config.mjs` | Sidebar, site metadata, social links, `<head>` tags. |
| `src/styles/brand.css` | Colour and typography overrides. |
| `public/` | `CNAME`, favicon, OG image, `robots.txt`. |
| `TODO.md` | The running record — what was done, what is next, what was wrong. |

## Making a change

1. One issue, one branch, one pull request —
   [the flow](https://open.codrlabs.com/practices/pull-requests/).
2. Build locally before pushing.
3. In the pull request, say what changed and — for anything factual — where it
   came from.
4. If AI helped, say how:
   [AI assistance in contributions](https://open.codrlabs.com/ai/contributing/).

## House rules for content

- **Sources beat confidence.** A factual claim carries a citation, and a claim
  that turns out to be folklore gets corrected in place and marked as corrected,
  not quietly deleted. A source that cannot be opened does not get cited.
- **Capitalisation.** "Codrlabs" and "Codrlabs Open" in prose. Lowercase only
  where it is literally lowercase: domains, email addresses, URLs, handles,
  slugs, file names, code.
- **Nothing internal, ever.** No hostnames, IP addresses, infrastructure detail,
  client names, or private operational content — in files *or* in commit
  messages. This repository is public and its history is permanent.
- **Nothing about individuals.** No names of contributors, mentees or their
  schools without written consent, and no present-tense facts or counts about
  who is involved right now. In a small project, a count is enough to identify
  someone.
- **Plain language, wrapped at 80 columns**, matching the files around it.

## Reporting something sensitive

- **A vulnerability or a leaked credential** —
  [SECURITY.md](https://github.com/codrlabs/.github/blob/main/SECURITY.md).
  Never in a public issue.
- **Conduct** — [Contributor Covenant
  2.1](https://github.com/codrlabs/.github/blob/main/CODE_OF_CONDUCT.md),
  reports to open@codrlabs.com.
