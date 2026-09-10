# codrlabs open

Documentation site for the open-source projects codrlabs builds and mentors in
the open. Ships to **[open.codrlabs.com](https://open.codrlabs.com)**.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

## Run it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static build into dist/ (astro build)
npm run preview  # serve the built site locally
```

## Deploy

Push to `main`. GitHub Actions builds the site and publishes it to GitHub Pages
at [open.codrlabs.com](https://open.codrlabs.com) — there is no manual deploy
step. Commits that only touch `TODO.md`, `README.md` or `LICENSE` skip the
deploy.

## Layout

```
src/content/docs/
  index.mdx            landing page
  start/               what this initiative is, how to contribute
  vizably/             Vizably docs
astro.config.mjs       site URL, title, sidebar
```

Add a project by creating `src/content/docs/<project>/` and giving it a section
in the `sidebar` array in [`astro.config.mjs`](astro.config.mjs). Pages are
Markdown or MDX; frontmatter needs at least a `title`.

## Status

See [`TODO.md`](TODO.md) for what is done, what is open, and the exact next
command for each open item.
