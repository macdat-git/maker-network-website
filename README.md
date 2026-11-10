# Maker Network website

The public website for Maker Network: https://macdat-git.github.io/maker-network-website/

Plain HTML, CSS and a little JavaScript, with no build step. Published with GitHub Pages
from the `main` branch: any change pushed to `main` goes live within a minute or two.

## Languages

The site is in English (`index.html`), Spanish (`es/`), French (`fr/`), German (`de/`) and
Portuguese (`pt/`). **Don't edit those pages directly**: they're generated. Edit
`src/template.html` (layout) and `src/strings.json` (all text, per language), then run:

```bash
node build.mjs
```

First-time visitors to the English page are sent to their browser's language if there's a
version for it; picking a language with the switcher in the footer is remembered. The
non-English text was drafted without a native-speaker review: have each language checked.

To add a language, add a block to `src/strings.json` with every key from `en`, then build.

## Files

- `src/template.html`, `src/strings.json`, `build.mjs`: the source for every language version
- `index.html`, `es/`, `fr/`, `de/`, `pt/`: generated pages
- `styles.css`: styles
- `main.js`: the waiting-list form (sends to Formspree) and the footer year
- `social-preview.png`: image shown when the link is shared (Facebook, iMessage, Slack…)
- `.nojekyll`: tells GitHub Pages to serve the files as they are

## Preview locally

```bash
npx serve .
```

## Waiting-list form

Entries go to the Formspree form set in `data-endpoint` on `<form id="signup">` in
`index.html`. They arrive by email and in the Formspree dashboard.

## Publishing settings

Repository **Settings → Pages → Build and deployment**: Source "Deploy from a branch",
branch `main`, folder `/ (root)`.
