import { ProductData } from './types';

const GITHUB = 'https://github.com/OrionArchitekton/agent-demo-video';
const NPM = 'https://www.npmjs.com/package/agent-demo-video';
// A real, finished video produced by this pipeline (the Proctor UiPath AgentHack
// submission demo). Serves as the secondary CTA: proof over claims.
const SAMPLE_VIDEO = 'https://youtu.be/GaTzq_fDmqU';

/**
 * Single source of truth for the agent-demo-video microsite.
 *
 * All copy is GROUNDED in the real tool repo (README.md, src/types.ts action
 * vocabulary, the pipeline stages in pipeline.ts, and the published CLI). The tool
 * ships on npm as `agent-demo-video` with a `demo-video` CLI (and a `demo-video
 * login` subcommand for authenticated SaaS capture). No fabricated commands or
 * numbers: claims stay qualitative where the repo uses placeholders.
 */
export const PRODUCT_DATA: ProductData = {
  name: 'agent-demo-video',
  tagline:
    'Turn a script and a running web app into a finished, narrated, captioned demo video. Automated, headless, zero-drift.',
  credibility:
    'Open source (MIT) · On npm · Headless · Keyless dry-run · Audio-first sync by construction.',
  canonical: 'https://www.danmercede.com/works/agent-demo-video/',
  metaDescription:
    'agent-demo-video is an MIT-licensed, headless pipeline that turns a DEMO_SCRIPT manifest and a running web app into a narrated, captioned MP4. It is audio-first, so audio, video, and captions stay in sync with zero drift. It can drive authenticated SaaS behind a real login, and runs keyless via FAKE_TTS. Install from npm.',

  problem: {
    heading: 'The problem',
    body:
      'Demo videos are made by hand: screen-record, write a script, record a voiceover, edit, then re-sync captions, and redo the whole thing every time the UI changes. Narration, screen, and captions drift apart, and nothing about it is reproducible or CI-friendly.',
  },

  whatItDoes: {
    heading: 'What it does',
    body:
      "A headless pipeline that turns a Markdown DEMO_SCRIPT (shots, browser actions, and narration) plus a running web app into a finished MP4. It is audio-first: narration is synthesised first, and its exact per-character timing becomes the clock that paces the browser recording and the captions, so audio, video, and captions are in sync by construction with zero drift. It can drive an authenticated SaaS app behind its real login (Slack, Notion, Linear, Stripe, any Google-SSO app), or splice in a prebaked clip for surfaces you would rather not automate. Run it keyless with FAKE_TTS to iterate on the script before spending any API quota.",
  },

  cta: {
    primaryLabel: 'View on GitHub',
    primaryUrl: GITHUB,
    secondaryLabel: 'Watch a video it produced',
    secondaryUrl: SAMPLE_VIDEO,
  },

  quickstart: {
    heading: 'Quickstart',
    intro:
      'Install from npm, prove your script keyless in one dry run, then add a voice. Everything runs on your machine: there is no hosted service. Needs Node 18+ and ffmpeg on PATH.',
    blocks: [
      {
        title: 'Install',
        note: 'Node 18+, plus ffmpeg on PATH',
        command: [
          'npm install -g agent-demo-video',
          'npx playwright install chromium',
        ].join('\n'),
      },
      {
        title: 'Keyless dry run (silent audio, no API key)',
        note: 'real capture + real captions',
        command: 'FAKE_TTS=1 demo-video demo.config.sample.json',
      },
      {
        title: 'Render with a real voice',
        note: 'ElevenLabs with-timestamps',
        command: 'ELEVENLABS_API_KEY=sk_… demo-video demo.config.json',
      },
      {
        title: 'Authenticated SaaS (optional)',
        note: 'log in once, then render headlessly',
        command: [
          'demo-video login demo.config.json',
          'demo-video demo.config.json',
        ].join('\n'),
      },
    ],
  },

  // Manifest action vocabulary, verified against the ActionSchema enum in
  // src/types.ts. These are what you write per shot in DEMO_SCRIPT.md.
  commands: [
    {
      name: 'goto',
      description: 'Navigate the recording browser to a URL (relative to the dashboard base, or absolute).',
    },
    {
      name: 'click',
      description: 'Move the on-screen cursor to a selector and click it, with a visible click ripple.',
    },
    {
      name: 'type',
      description: 'Type text into a field character-by-character, like a real user.',
    },
    {
      name: 'hover',
      description: 'Hover a selector to reveal hover-only states before capturing them.',
    },
    {
      name: 'highlight',
      description: 'Draw an attention box around an element to direct the viewer’s eye.',
    },
    {
      name: 'chapter',
      description: 'Show a lower-third chapter banner to title a section of the walkthrough.',
    },
    {
      name: 'wait',
      description: 'Dwell for N milliseconds, e.g. while an async backend action finishes on screen.',
    },
  ],

  demo: {
    heading: 'Demo',
    intro:
      'Author a DEMO_SCRIPT.md, prove it keyless, then add a voice. The pipeline parses the script, synthesises narration, records the browser, builds word-timed captions, muxes, and verifies audio/video parity, failing if anything is out of sync.',
    lines: [
      { kind: 'comment', text: '# 1. Author a DEMO_SCRIPT.md: shots + browser actions + narration' },
      { kind: 'comment', text: '# 2. Keyless dry run, no API key (silent audio, real capture + captions)' },
      { kind: 'command', text: 'FAKE_TTS=1 demo-video demo.config.sample.json' },
      {
        kind: 'output',
        text: 'parse → tts(fake) → capture → normalize → timeline → captions → mux → verify',
        tone: 'muted',
      },
      { kind: 'output', text: '✓ wrote out/final.mp4  (54.9s, 5 segments)  parity PASS', tone: 'ok' },
      { kind: 'output', text: '' },
      { kind: 'comment', text: '# 3. Add a real voice; audio-first, so audio, video, and captions never drift' },
      { kind: 'command', text: 'ELEVENLABS_API_KEY=sk_…  demo-video demo.config.json' },
      { kind: 'output', text: '✓ wrote out/final.mp4  (56.9s, 5 segments)  parity PASS', tone: 'ok' },
    ],
  },

  differentiators: {
    heading: 'Why it is different',
    points: [
      {
        title: 'Audio-first, zero-drift',
        body:
          'Narration is synthesised first; its exact per-character timing becomes the clock that paces both the screen recording and the caption file. Audio, video, and captions are in sync by construction, not nudged into alignment afterwards.',
      },
      {
        title: 'Authenticated SaaS, captured safely',
        body:
          'Drive a login-walled app (Slack, Notion, Linear, Stripe, any Google-SSO app) behind its real session. Operator-confirm login absorbs MFA and SSO, and a record-time guard fails closed rather than silently recording a logged-out screen. The saved browser profile holds secrets at rest, so it lives outside the repo and is never committed.',
      },
      {
        title: 'Keyless dry run',
        body:
          'FAKE_TTS swaps the TTS step for a silent track of estimated duration, so you can iterate on the script and action sequence, with real browser capture and real captions, without spending a cent of API quota.',
      },
      {
        title: 'Headless and reproducible',
        body:
          'Playwright drives a headless Chromium with an injected fake cursor and overlays; ffmpeg does the rest. The whole render is one command, so it runs the same on your laptop and in CI: re-render on every UI change instead of re-recording by hand. A parity check fails the render if shot count, segment count, or audio/video duration disagree.',
      },
    ],
  },

  links: [
    { label: 'GitHub repository', url: GITHUB, primary: true },
    { label: 'npm package', url: NPM, primary: true },
    { label: 'Watch a video it produced', url: SAMPLE_VIDEO, primary: true },
    { label: 'Dan Mercede', url: 'https://www.danmercede.com' },
  ],

  footerNote: 'MIT licensed. Built by Dan Mercede.',
};
