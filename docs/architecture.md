# App structure

The site uses the Next.js App Router. Route groups organize source files without adding URL segments.

```text
app/
  layout.tsx                 document metadata, local fonts, global CSS and theme setup
  globals.css                reset and shared base styles
  tokens.css                 semantic colors, typography and layout values
  components/site/            shared header, logo, copy button, links and theme setup
  (landing)/                  public landing page at /
    page.tsx
    components/home/          landing-only sections and styles
```

## Adding pages

- Put components in `app/components/` only when multiple routes use them. Keep page composition and one-off sections beside their route.
- Add a `(docs)` route group when docs pages are ready; place the URL folder inside it, for example `(docs)/docs/page.tsx` for `/docs`.
- Add `(auth)` and `(playground)` route groups only with the corresponding user flow. Keep authentication, session handling and execution on trusted server boundaries.
- Keep server components by default. Add client components only for browser interaction.
- Keep the existing Next.js stack. Read its bundled guides in `node_modules/next/dist/docs/` before using unfamiliar APIs.

The current app implements `/` only. Future routes should be added with their actual content and behavior, not placeholder pages or empty abstractions.
