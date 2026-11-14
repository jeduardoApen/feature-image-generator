# AGENTS.md

Browser-only Vite tool (no framework, no backend) that generates downloadable Open Graph / feature images (PNG) for Infinity Management Company's bilingual (EN/ES) site. The UI is Spanish; the content data is bilingual.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — build to `dist/`
- `npm run preview` — serve the production build locally

There are no test, lint, or typecheck scripts — do not assume or invent them. Verification is manual: run `npm run dev` and check the UI in a browser.

## Structure & sources of truth

- Entry: `index.html` → `src/main.js` (all app logic is in this single file).
- `src/data/page-titles.js` is the source of truth for page routes and their EN/ES titles. Add or edit a page here, not anywhere else.
- `og-image-reference.md` documents brand palette and typography only. Its title table is placeholder (routes, not real titles) — do not treat it as the title source.
- `src/styles/app.css` holds all styling; there is no separate Vite config (`vite.config.js`), so Vite uses defaults with the repo root as root.

## Logo handling (non-obvious)

- The default logo `logo-primary.webp` is imported in `main.js` via the `?url` suffix.
- Every logo (including the default) is rasterized to a PNG data URL before export, so `dom-to-image-more` never resolves an external URL.
- Logo replacement accepts only PNG or **self-contained** SVG (all elements inline, no external references), up to 5 MB. SVGs are rasterized with a max of 4096 px on their longest side.

## Outputs & filenames

- `dist/` and `feature-images/` are gitignored build/generated artifacts — regenerate rather than hand-edit.
- Exported filename is derived from the visible title: NFKD-normalized, diacritics stripped, non-alphanumerics collapsed to `-`, truncated to 60 chars, then suffixed `-{en|es}.png` (e.g. `gestion-de-activos-es.png`).

## Bulk generation (second section on the page)

- The "Generación masiva" section renders all `pageTitles` routes × EN+ES (80 images) from its own `bulk-*` controls (independent of the single editor).
- It writes via the File System Access API (`showDirectoryPicker`) into `en/` and `es/` subfolders — **Chrome/Edge only**, requires a user gesture and a secure context (localhost/https). No ZIP dependency.
- The off-screen render node is `#bulkCanvas` (`.bulk__stage` is positioned off-screen); reuse `titleToSlug` and `setTextShadow` rather than duplicating slug/shadow logic.
