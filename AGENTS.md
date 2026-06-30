# AGENTS.md - agent-demo-video-site

## Repo Role

`agent-demo-video-site` is the Vite/React microsite for the
`agent-demo-video` project page. It owns presentation, metadata, static assets,
and redirect/cache config for the site surface.

## Boundaries

- Owns site copy, layout, Open Graph metadata, Vercel config, and static assets.
- Does not own the `agent-demo-video` CLI implementation or npm publishing.
- Keep product claims grounded in the source project README, package metadata,
  and released behavior.

## Authority Order

1. `/home/orion/src/orion-estate/platform/orion-estate-audit/AGENTS.md`
2. Source project: `../agent-demo-video-oss/README.md` and `../agent-demo-video-oss/package.json`
3. This repo's `README.md`, `constants.ts`, `index.html`, and `vercel.json`
4. Vite build output and package scripts

## Validation

```bash
npm install
npm run build
```

For docs-only changes, run `git diff --check` at minimum.
