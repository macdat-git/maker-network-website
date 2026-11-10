# Maker Network website

The public website for Maker Network: https://macdat-git.github.io/maker-network-website/

Plain HTML, CSS and a little JavaScript, with no build step. Published with GitHub Pages
from the `main` branch: any change pushed to `main` goes live within a minute or two.

## Files

- `index.html`: the page
- `styles.css`: styles
- `main.js`: the waiting-list form (sends to Formspree) and the footer year
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
