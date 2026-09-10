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
      `codrlabs-open` org was considered and rejected: `gh api orgs/codrlabs`
      shows the org is already named "Codrlabs Open" with `open@codrlabs.com`,
      and its 3 public repos (`vizably`, `corspat`, `tympy`) are all open —
      client work is not on GitHub at all.
      Nothing to wall mentees off from, so the split bought only duplicate
      settings and a repo transfer. `[falsified]` — the earlier claim that a
      second org was needed for access boundaries rested on a false premise.
- [x] Build passes `[verified]` — `npm run build` → 5 pages in 22.02s. Two
      benign warnings: empty `i18n` collection, no custom 404 entry.
- [x] Repo created private + pushed `[verified]` — `gh repo view codrlabs/open`
      → `codrlabs/open | PRIVATE | https://github.com/codrlabs/open`, commit
      `da0cffb` on `main`.
- [x] README rewritten for this project `[verified]` — replaced the Starlight
      starter-kit README.

## Open

- [ ] **Re-add repo links in the Vizably docs** — `src/content/docs/vizably/overview.md`
      deliberately has no repo URL yet; `https://github.com/codrlabs/vizably`
      is now settled and can go back in.

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
- [ ] **Second project after Vizably.** `corspat`? `tympy`? Sidebar is already
      shaped to take a second top-level section.
- [ ] **Favicon / branding.** Still Astro's default `public/favicon.svg` and
      Starlight's Houston hero image (`src/assets/houston.webp`).

## Notes

- Dev server: `npm run dev` → http://localhost:4321
- Build check: `npm run build` (runs `astro check` + `astro build`)
