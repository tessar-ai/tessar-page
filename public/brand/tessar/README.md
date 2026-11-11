# Tessar brand assets

Approved: dragon head A, primary #99B9FE, IBM Plex Sans 600 wordmark with -0.04em tracking. Code font is IBM Plex Mono 400. The primary was explicitly changed by the user on 2026-11-11; it is owned by manifest.json.

## Use in the website

- The current website uses `/brand/tessar/logo.svg`, `/brand/tessar/logo-dark.svg` and `/brand/tessar/favicon.svg`.
- The manifest lists the four SVG assets used by the website.
- `/brand/tessar/logo.svg` — horizontal header/logo on light backgrounds.
- `/brand/tessar/logo-dark.svg` — light blue symbol and light text for dark UI.
- `/brand/tessar/mark.svg` — standalone symbol in the rune shield.
- `/brand/tessar/favicon.svg` — fixed primary #99B9FE in both browser colour schemes. The browser ICO fallback lives in `app/favicon.ico`.

The logo contains true glyph paths: no text elements, font embeds or external dependencies. The asset inventory is `manifest.json`.

## Reproduction

Preserve aspect ratio; do not stretch, add gradients or shadows, redraw letters, or mix historical optical/pangolin assets. Keep external clear space of at least 15% of the mark height; the horizontal SVG includes minimal intrinsic padding, so add surrounding space in the layout. Do not shrink the full lockup below 120px wide; use the standalone icon if the wordmark is not readable.

The dragon is an original drawn mark inspired by the developer's chosen Tessarion naming story, not official franchise art. Reference clearance is outside this asset-export task.

## Font provenance

IBM Plex Sans from the local Google Fonts source file, variable weight instantiated at wght=600; native kerning plus -0.04em tracking. Each glyph was converted to paths using fontkit 2.0.4 installed temporarily outside the project. Website fonts, licenses and source information are in `public/fonts/`.
