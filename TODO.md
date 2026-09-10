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
