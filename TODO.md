# codrlabs open — task list

Site: **open.codrlabs.com** (custom domain pending one DNS record — checklist
item 2; live meanwhile at https://codrlabs-open.pages.dev) · Repo:
**codrlabs/open** (public since 2026-09-10)
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

- [x] **Adopted `starlight-theme-rapide`** (2026-09-09) `[verified]` — peer dep
      `@astrojs/starlight >=0.42.0`, published 2026-09-02. It derives all colour
      from `--sl-hue-base` / `--sl-hue-accent` in OKLCH and ships both light and
      dark branches, so branding is two hue values, not a token set.
      Brand hues measured from the real colours: `#15151f` → H 284.5 (base),
      `#ac0c90` → H 337.8 (accent).
- [x] **Light-theme bug fixed** `[verified]` — the old `brand.css` defined light
      tokens only under `:root[data-theme='light']`, never under
      `@media (prefers-color-scheme: light)`, which is the branch Starlight
      actually uses (confirmed in the built CSS). An auto-theme visitor on a
      light OS got dark tokens in a light layout. Rapide handles both.
- [x] **Logo trimmed** `[verified]` — the org avatar was a 400×400 box holding a
      286×286 mark, i.e. ~28% transparent padding. That shrank the header mark
      and read as an oversized gap before the wordmark. Now
      `src/assets/codrlabs-mark.png` at 308×308; favicon regenerated at 512×512.
- [x] **Header/hero defects fixed** `[verified]` via screenshot comparison
      against starlight.astro.build: wordmark was pink because Starlight defaults
      `.site-title` to `var(--sl-color-text-accent)`; hero gradient ran
      orange→teal and interpolated through blue, a colour not in the palette;
      rapide hardcodes the primary hero button to its green family regardless of
      accent. All three overridden in `src/styles/brand.css`.
- [x] **Discord in the header** `[verified]` — `astro.config.mjs` social links.
- [x] **Deployed to Cloudflare Pages** `[verified]` — project `codrlabs-open`,
      live at https://codrlabs-open.pages.dev. `wrangler` is authenticated with
      `pages (write)`.
- [x] **Internal hostname scrubbed from history** `[verified]` — it had reached
      `TODO.md` in 3 commits. `git filter-branch` + force-push with an explicit
      lease; `git grep` across all revisions now returns 0.

## Finalize checklist — do these in order

Status as of 2026-09-10.

1. [ ] **Vizably LICENSE — belongs to the vizably effort, not this repo.**
       `[verified]` `codrlabs/vizably` has none (`corspat` and `tympy` are MIT),
       so vizably is source-available rather than open source until it gets one.
       Under the scope rule below, this is not actioned from here.
2. [ ] **`open.codrlabs.com` — one DNS record left.** The domain is registered
       on the Pages project, status `pending`, validation error
       `CNAME record not set`.
       Next (you): Cloudflare → `codrlabs.com` → DNS → Add record →
       `CNAME` · name `open` · target `codrlabs-open.pages.dev` · Proxied.
       Validation and the certificate then complete on their own.
       Cannot be done from here `[verified]`: the wrangler OAuth token resolves
       the zone but gets `Authentication error` (code 10000) even *listing* DNS
       records. `[unverified]` that your other Pages subdomains use proxied
       records — could not read them to check; proxied is Cloudflare's default
       for Pages.
       Verify: `Resolve-DnsName open.codrlabs.com -Server 1.1.1.1`
3. [x] **`codrlabs/open` is public** `[verified]` — see Done.
4. [x] **`editLink` enabled** `[verified]` — see Done.
5. [ ] **Have a lawyer read `start/platform.md`.** It is written as a plain
       description and says so, but it describes an unpaid mentoring
       arrangement and how academic-credit placements work, for a company in Canada. Unpaid-work and
       worker-classification rules are jurisdiction-specific and this has had
       no legal review.
6. [ ] **Add `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`** to the org.
       `[verified]` neither exists in any repo. The platform page currently
       admits this gap in a visible callout — remove that callout once closed.

- [x] **Renamed to "codrlabs open"** (2026-09-10) `[verified]` — navbar title in
      `astro.config.mjs`; screenshot confirms.
- [x] **Practices section written from vizably's docs** (2026-09-10) `[verified]` —
      18 pages build. Distilled from `docs/guides/{thinking-in-architecture,
      architecture-mental-model,workflow,reviewing}.md` and `docs/README.md`:
      `practices/{index,layered-architecture,pull-requests,reviewing,
      git-recovery,documentation}.md`. Generalised away from vizably specifics
      so it applies org-wide.
- [x] **Vizably docs written** `[verified]` — `vizably/architecture.md` (layers,
      folder map, composition root, where-to-look-when-X-breaks) and
      `vizably/account-storage.md` (portable account, fit-check, concurrency),
      from `docs/plans/architecture-map.md` and
      `docs/guides/auth_storage_guide/accountStorageContract.md`.
- [x] **LICENSE added before going public** (2026-09-10) `[verified]` — MIT,
      matching `corspat`/`tympy`. The repo had none, which contradicted the
      platform page's own "check for a licence before contributing" advice.
      `gh api repos/codrlabs/open/license` → `MIT` (detection lagged a few
      seconds behind the push; an immediate `gh repo view` said `none`).
- [x] **Pre-public sweep** `[verified]` — `git grep` for keys/tokens/private
      keys in tracked files: only prose hits (CSS "tokens", review checklist).
      All revisions: 0 hits for internal hostnames, `.local`, private IP ranges.
      30 tracked files, all expected.
- [x] **Light theme verified visually** `[verified]` — screenshot of a build
      copy with `data-theme="light"` injected *after* Starlight's inline theme
      script (setting the `<html>` attribute alone is overwritten on load).
      White ground, dark text, magenta accent, legible badges.
- [x] **Repo made public** (2026-09-10) `[verified]` — `gh repo view codrlabs/open`
      → `PUBLIC`, homepage `https://open.codrlabs.com`, topics `astro,
      documentation, mentoring, open-source, starlight`.
- [x] **`editLink` + `lastUpdated` enabled and live** `[verified]` — production
      alias serves `github.com/codrlabs/open/edit/main/...`; that target returns
      HTTP 200 publicly.
- [x] **Custom domain registered on the Pages project** `[verified]` — `POST
      /accounts/.../pages/projects/codrlabs-open/domains` with the wrangler
      OAuth token succeeded; `pages (write)` was enough for the attach.
      `[falsified]` — the earlier claim that attaching the domain "cannot be done
      from here" was wrong for this step. It *was* right that Cloudflare would
      not create the DNS record: validation reported `CNAME record not set`.

## Open

- [ ] **Scan pipeline page.** `vizably/overview.md` admits it is missing.
      Reading vizably's docs for source material is fine — see the scope rule
      below; it is *editing* vizably that is out of bounds.
- [ ] **ASCII diagrams could be SVG.** The layer diagrams render as code blocks;
      legible but busy. `[unverified]` — no accessibility check done on them.

## Scope rule — do not edit the vizably repo from here

**Decided 2026-09-10.** Work in this repo never modifies
`open-solutions/vizably`. Vizably's own cleanup is a separate, later effort that
happens on vizably, and part of that effort is moving its documentation into
open.codrlabs.com. Reading vizably for source material is fine; writing to it is
not.

Two findings from reading it are therefore **logged here for that later effort,
not to be actioned from this repo**:

- 32 occurrences of `file:///c:/Users/<user>/...` in vizably's *public* docs —
  `docs/guides/getting-started.md` (2),
  one other guide (22),
  `docs/guides/thinking-in-architecture.md` (8). `[verified]` These leak a
  username and local directory layout, and the links are dead for anyone else.
  None of it was carried into this site.
- The generic guides now exist in both repos and will drift. The eventual shape:
  vizably keeps its project-specific guides, the cross-project practices live
  here, and vizably points at this site.

- [x] **Superseded 2026-09-10 → finalize checklist item 2.** Original entry:
      ~~BLOCKING: attach `open.codrlabs.com`.~~ The domain does not resolve yet.
      Cannot be done from here — the wrangler token has `zone (read)` only, and
      adding a Pages custom domain needs DNS write.
      Next (you): Cloudflare dashboard → Workers & Pages → `codrlabs-open` →
      Custom domains → Add `open.codrlabs.com`. DNS is already on Cloudflare
      (`memphis.ns` / `nia.ns`), so the CNAME and cert are automatic.
      `[falsified]` twice: the attach did *not* need DNS write (`pages (write)`
      was enough), and the CNAME was *not* created automatically when attached
      through the API — validation reported `CNAME record not set`.
- [x] **Decided 2026-09-09: Cloudflare Pages** (your choice of the recommended
      option). Original entry: Decide hosting for good: Cloudflare Pages vs GitHub Pages.
      `[verified]` GitHub Pages cannot serve this repo today — the `codrlabs`
      org is on the **Free** plan (`gh api orgs/codrlabs --jq .plan.name`), and
      Pages only serves *public* repos on Free. It would work once the repo is
      public, but it permanently couples the site being up to the repo being
      public. Cloudflare Pages is live now and is indifferent to visibility.
- [x] **Platform page written** `[verified]` — `src/content/docs/start/platform.md`,
      linked from the homepage and the sidebar. Covers: what codrlabs open is,
      the three ways to take part (open contribution / mentored / school
      placement), an explicit "what mentoring is not" section (not employment,
      no wage, not a job pathway, no SLA), copyright and licensing, privacy, and
      contact. Names no individual and no institution. Carries a visible "plain description, not a contract"
      callout. Still needs item 5 in the checklist above.
- [x] **Fonts self-hosted** `[verified]` — `@fontsource-variable/*` via
      `customCss`; the Google Fonts `@import` disclosed every visitor's IP to a
      third party, which contradicted the platform page's privacy section.
      Built output now contains 0 third-party URLs and 5 local `.woff2` files.
- [ ] **Connect Cloudflare Pages to GitHub for deploy-on-push** (optional) —
      deploys are currently direct uploads via `wrangler pages deploy`.
      `[unverified]` Cloudflare does not convert a Direct Upload project to Git
      integration in place; it would mean a new Git-connected project and moving
      the custom domain onto it. Not tested.
- [x] **Self-host the fonts** — done 2026-09-09, see "Fonts self-hosted" above.
      Original entry: `src/styles/brand.css` pulls Plus Jakarta Sans
      and DM Sans from Google Fonts over the network — a third-party request on
      every page load. `[unverified]` — not measured.
      Next: `npm i @fontsource-variable/plus-jakarta-sans @fontsource-variable/dm-sans`
      and swap the `@import`.
- [ ] **SVG favicon.** `public/favicon.png` is now a 512×512 raster of the
      trimmed mark; an SVG of the node mark would be crisper and smaller.
- [x] **Verify the logo on a light background** — done 2026-09-10 `[verified]`
      by light-theme screenshot: mark and nodes clearly legible; the pale halo
      rings are faint but were never load-bearing. Original entry: The mark has
      pale halo rings that may disappear in light theme.
- [x] **Enable `editLink`** — done 2026-09-10 `[verified]`, see Done. Original
      entry: enable in `astro.config.mjs` once the repo is public — edit links
      would 404 for visitors while it is private.
- [ ] **Mentoring page operational detail** — `start/mentoring.md` deliberately
      stops short of inventing how to request a mentor, session cadence, etc.
      It carries a visible "still being written" callout until you decide.

- [ ] **Fill in Vizably docs.** Source material already exists in the vizably repo:
      `docs/plans/architecture-map.md`, `README.md`,
      `docs/guides/auth_storage_guide/*`. Decide what is public-facing vs internal
      before copying — mentorship docs are private and must not land here.
      Next: `ls ../vizably/docs/`
- [x] **Pick a host** — Cloudflare Pages, decided 2026-09-09. Original entry:
      GitHub Pages (needs `public/CNAME` + `@astrojs/` static
      output + Actions workflow) vs Cloudflare Pages vs Vercel.
- [ ] **DNS for `open.codrlabs.com`** — now tracked as finalize checklist item 2,
      which has the exact record. Original entry: CNAME record at the codrlabs
      DNS provider pointing at the chosen host.
- [x] **Flip the repo public** — done 2026-09-10 `[verified]`, see Done.
      Original entry: Decide when to flip the repo public. Currently private.
- [ ] **Next active project.** Only Vizably is live; `corspat` and `tympy` are
      archived on GitHub and documented as such. A new project gets its own
      top-level sidebar section when it has something worth documenting.

## Ground rules

**This repo is public** (since 2026-09-10). Every commit is published — git
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
