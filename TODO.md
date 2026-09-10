# codrlabs open — task list

Site: **open.codrlabs.com** · Repo: **codrlabs/open** (private for now)
Local: `open-solutions/open in the codrlabs workspace`

Docs hub for the codrlabs open-solutions work — unpaid, mentoring-driven
projects. Built with Astro + Starlight. First project documented: **Vizably**.

---

## Done

- [x] Scaffold Astro + Starlight `[verified]` — `npm create astro@latest open -- --template starlight`;
      `astro@^7.2.10`, `@astrojs/starlight@^0.42.0` in `package.json`.
- [x] Decide repo name `open` `[verified]` — org prefix already says `codrlabs`;
      maps 1:1 to `open.codrlabs.com`; scales to `docs.`/`labs.` later.
- [x] Site config — title, `site:` URL, social link, Vizably sidebar `[verified]` — `astro.config.mjs`.
- [x] Landing page introducing the initiative `[verified]` — `src/content/docs/index.mdx`.
- [x] Starlight example pages deleted `[verified]` — `src/content/docs/{guides,reference}/` removed.
- [x] Vizably overview stub `[verified]` — `src/content/docs/vizably/overview.md`.
- [x] Org creation is not scriptable `[verified]` — `gh org --help` lists only
      `list`; github.com REST has no create-org endpoint (GHES only). Must be
      done at https://github.com/organizations/plan.
- [x] **Decided: one org, `codrlabs`** (2026-09-09) `[verified]`. A separate
      `codrlabs-open` org was considered and rejected: the org is already named
      "Codrlabs Open" with `open@codrlabs.com`, and every repo in it is open
      source, so a second org bought only duplicate settings and a transfer.
      `[falsified]` — the earlier claim that a second org was needed for access
      boundaries rested on a false premise.
- [x] Build passes `[verified]` — `npm run build` → 5 pages in 22.02s. Two
      benign warnings: empty `i18n` collection, no custom 404 entry.
- [x] Repo created private + pushed `[verified]` — `gh repo view codrlabs/open`
      → `codrlabs/open | PRIVATE | https://github.com/codrlabs/open`, commit
      `da0cffb` on `main`.
- [x] README rewritten for this project `[verified]` — replaced the Starlight
      starter-kit README.
- [x] Re-added repo links in the Vizably docs `[verified]` —
      `src/content/docs/vizably/overview.md`.
- [x] **Branded as codrlabs** (2026-09-09) `[verified]`. Site title is
      `codrlabs`, not "codrlabs open". Logo is the org avatar
      (`gh api orgs/codrlabs --jq .avatar_url` → user `153514236`), saved to
      `src/assets/codrlabs-open.png` and `public/favicon.png`; Astro's default
      `favicon.svg` and Starlight's `houston.webp` deleted.
- [x] **Brand palette + fonts taken from codrlabs.com** `[verified]` — pulled
      from its own stylesheet (`/_next/static/chunks/24e42c30e2cd64d4.css`):
      magenta `#ac0c90`, teal `#00bfaf`, orange `#e37343`, amber `#f6bd51`,
      darks `#15151f`/`#0e0e16`/`#2a2a3a`. Fonts Plus Jakarta Sans (display) +
      DM Sans (body). Wired in `src/styles/brand.css`.
- [x] **All org repos in the nav, not just Vizably** `[verified]` —
      `gh repo list codrlabs` returns 4: `open` (private, this site),
      `vizably` (active), `corspat` (**archived**), `tympy` (**archived**).
      Pages: `projects/all`, `projects/corspat`, `projects/tympy`.
- [x] Homepage rebuilt around mentoring `[verified]` — `src/content/docs/index.mdx`
      leads with mentoring/open-development, then projects. New
      `start/mentoring.md`.
- [x] Duplicate `<title>codrlabs | codrlabs</title>` fixed `[verified]` — `head`
      override in `index.mdx`; now `codrlabs — building and mentoring in the open`.
- [x] Build after rebrand `[verified]` — `npm run build` → 9 pages in 2.31s,
      only the two benign warnings.

## Open

- [ ] **Self-host the fonts.** `src/styles/brand.css` pulls Plus Jakarta Sans
      and DM Sans from Google Fonts over the network — a third-party request on
      every page load. `[unverified]` — not measured.
      Next: `npm i @fontsource-variable/plus-jakarta-sans @fontsource-variable/dm-sans`
      and swap the `@import`.
- [ ] **SVG favicon.** `public/favicon.png` is a 400×400 raster of the org
      avatar; an SVG of the node mark would be crisper and smaller.
- [ ] **Verify the logo on a light background.** The mark has pale halo rings
      that may disappear in light theme. `[unverified]` — only checked that it
      builds, not how it looks.
      Next: `npm run dev`, toggle the theme switcher.
- [ ] **Enable `editLink`** in `astro.config.mjs` once the repo is public —
      edit links would 404 for visitors while it is private.
- [ ] **Mentoring page operational detail** — `start/mentoring.md` deliberately
      stops short of inventing how to request a mentor, session cadence, etc.
      It carries a visible "still being written" callout until you decide.

- [ ] **Fill in Vizably docs.** Source material already exists in the vizably repo:
      `docs/plans/architecture-map.md`, `README.md`,
      `docs/guides/auth_storage_guide/*`. Decide what is public-facing vs internal
      before copying — mentorship docs are private and must not land here.
      Next: `ls ../vizably/docs/`
- [ ] **Pick a host.** GitHub Pages (needs `public/CNAME` + `@astrojs/` static
      output + Actions workflow) vs Cloudflare Pages vs Vercel. `[unverified]` —
      no host chosen or configured yet.
      Next: decide, then add the deploy config.
- [ ] **DNS for `open.codrlabs.com`.** CNAME record at the codrlabs DNS provider
      pointing at the chosen host. `[unverified]` — not touched.
- [ ] **Decide when to flip the repo public.** Currently private.
      Next: `gh repo edit codrlabs/open --visibility public --accept-visibility-change-consequences`
- [ ] **Next active project.** Only Vizably is live; `corspat` and `tympy` are
      archived on GitHub and documented as such. A new project gets its own
      top-level sidebar section when it has something worth documenting.

## Ground rules

**This repo is going public.** Treat every commit as already published — git
history is not a private scratchpad, and scrubbing it after the fact means a
force-push that breaks every clone and fork.

Nothing proprietary crosses into this repo, ever:

- No internal hostnames, IPs, server names, or infrastructure detail.
- No client names, client work, or anything under NDA.
- No private ops/runbook content, in files *or* commit messages.
- No names of contributors, mentees, or their schools without written consent —
  see the platform page work below.

Already caught once: an internal Git hostname reached `TODO.md` and had to be
removed from three commits with `git filter-branch` before the repo went
public. `[verified]` — `git grep` across all revisions now returns 0 matches.

## Notes

- Dev server: `npm run dev` → http://localhost:4321
- Build check: `npm run build` (runs `astro check` + `astro build`)
- **Restart the dev server after adding a content file or editing
  `astro.config.mjs`.** Seen 2026-09-09: a dev server started at 18:12 kept
  reporting `The slug "start/mentoring" specified in the Starlight sidebar
  config does not exist` for a file written at 18:19. Starlight validates
  sidebar slugs against `.astro/data-store.json`, and the Windows file watcher
  had not re-scanned. The file was fine — a clean `rm -rf .astro dist &&
  npm run build` emitted all 9 pages.
  Fix: `q` + Enter in the dev terminal, `rm -rf .astro`, `npm run dev`.
