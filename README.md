# agent-demo-video-site

Vite/React microsite for the `agent-demo-video` project page at
`https://www.danmercede.com/works/agent-demo-video/`.

## Role

This repo owns the marketing/presentation surface for `agent-demo-video`:
layout, copy, metadata, static assets, and Vercel routing/cache config. The
source project owns the CLI implementation and package behavior.

## Source Of Truth

- Product repo: `../agent-demo-video-oss`
- Site copy: `constants.ts`
- Metadata: `index.html`
- Routing/cache: `vercel.json`

## Local Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Boundaries

Keep claims grounded in the source project README, package metadata, and
released behavior. Do not change CLI behavior from this repo.
