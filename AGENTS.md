<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Tessar website

Read `docs/architecture.md` and `public/brand/tessar/README.md` before website work.

- Preserve the approved dragon head A, primary `#99B9FE`, IBM Plex Sans and IBM Plex Mono. Do not reopen branding decisions unless asked.
- Use assets from `public/brand/tessar/` and fonts from `public/fonts/`. Semantic app tokens live in `app/tokens.css`.
- Keep the current Next.js stack. Read the bundled guides in `node_modules/next/dist/docs/` before using unfamiliar APIs.
- Keep shared UI in `app/components/` only when it has multiple real consumers; keep route-specific UI beside its route.
- Future docs, authentication and playground pages need their real content and behavior. Do not add placeholder routes or empty abstractions.
- Framework content source is `C:/workspace/tessar/README.md`, `examples/guide/` and package READMEs. Inspect actual APIs; do not invent behavior or modify the framework repo for a web task.
- Preserve user edits. Do not commit, deploy, publish packages, bump versions or rename the framework unless asked.
- Before calling implementation complete, run relevant lint, typecheck and build checks. Perform browser verification when the task calls for visual or interaction changes.
