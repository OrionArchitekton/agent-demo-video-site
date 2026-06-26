import { ProductData } from './types';

const GITHUB = 'https://github.com/OrionArchitekton/agent-demo-video';
// A real, finished video produced by this pipeline (the Proctor UiPath AgentHack
// submission demo). Serves as the secondary CTA — proof over claims.
const SAMPLE_VIDEO = 'https://youtu.be/GaTzq_fDmqU';

/**
 * Single source of truth for the agent-demo-video microsite.
 *
 * All copy is GROUNDED in the real tool repo (README.md, src/types.ts action
 * vocabulary, the pipeline stages in pipeline.ts, and the actual CLI output).
 * The tool is a Node/TypeScript pipeline run via `pnpm demo` — there is no
 * multi-subcommand CLI and no published npm package, so the page never invents
 * commands or an `npm install agent-demo-video` line.
 */
export const PRODUCT_DATA: ProductData = {
  name: 'agent-demo-video',
  tagline:
    'Turn a script and a running web app into a finished, narrated, captioned demo video — automated, headless, zero-drift.',
  credibility:
    'Open source (MIT) · Headless · Keyless dry-run · Audio-first sync by construction.',
  canonical: 'https://www.danmercede.com/works/agent-demo-video/',
  metaDescription:
    'agent-demo-video is an MIT-licensed, headless pipeline that turns a DEMO_SCRIPT manifest and a running web app into a narrated, captioned MP4. It is audio-first, so audio, video, and captions stay in sync with zero drift. Keyless dry-run via FAKE_TTS.',

  problem: {
    heading: 'The problem',
    body:
      'Demo videos are made by hand: screen-record, write a script, record a voiceover, edit, then re-sync captions — and redo the whole thing every time the UI changes. Narration, screen, and captions drift apart, and nothing about it is reproducible or CI-friendly.',
  },

  whatItDoes: {
    heading: 'What it does',
    body:
      "A headless pipeline that turns a Markdown DEMO_SCRIPT — shots, browser actions, and narration — plus a running web app into a finished MP4. It's audio-first: narration is synthesised first, and its exact per-character timing becomes the clock that paces the browser recording and the captions, so audio, video, and captions are in sync by construction with zero drift. Run it keyless with FAKE_TTS to iterate on the script before spending any API quota.",
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
      'Node + pnpm. One keyless dry run proves your script and action sequence before you spend a single TTS credit. The core has no hosted service — everything runs on your machine.',
    blocks: [
      {
        title: 'Install',
        note: 'Requires Node 18+ and pnpm',
        command: [
          'git clone https://github.com/OrionArchitekton/agent-demo-video',
          'cd agent-demo-video',
          'pnpm install',
          'pnpm exec playwright install chromium',
        ].join('\n'),
      },
      {
        title: 'Keyless dry run (silent audio, no API key)',
        note: 'real capture + real captions',
        command: 'FAKE_TTS=1 pnpm demo demo.config.sample.json',
      },
      {
        title: 'Render with a real voice',
        note: 'ElevenLabs with-timestamps',
        command: 'ELEVENLABS_API_KEY=sk_… pnpm demo demo.config.json',
      },
    ],
  },

  // Manifest action vocabulary — verified against the ActionSchema enum in
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
      description: 'Dwell for N milliseconds — e.g. while an async backend action finishes on screen.',
    },
  ],

  demo: {
    heading: 'Demo',
    intro:
      'Author a DEMO_SCRIPT.md, prove it keyless, then add a voice. The pipeline parses the script, synthesises narration, records the browser, builds word-timed captions, muxes, and verifies audio/video parity — failing if anything is out of sync.',
    lines: [
      { kind: 'comment', text: '# 1. Author a DEMO_SCRIPT.md — shots + browser actions + narration' },
      { kind: 'comment', text: '# 2. Keyless dry run — no API key (silent audio, real capture + captions)' },
      { kind: 'command', text: 'FAKE_TTS=1 pnpm demo demo.config.sample.json' },
      {
        kind: 'output',
        text: 'parse → tts(fake) → capture → normalize → timeline → captions → mux → verify',
        tone: 'muted',
      },
      { kind: 'output', text: '✓ wrote out/final.mp4  (54.9s, 5 segments)  parity PASS', tone: 'ok' },
      { kind: 'output', text: '' },
      { kind: 'comment', text: '# 3. Add a real voice — audio-first, so audio, video, and captions never drift' },
      { kind: 'command', text: 'ELEVENLABS_API_KEY=sk_…  pnpm demo demo.config.json' },
      { kind: 'output', text: '✓ wrote out/final.mp4  (56.9s, 5 segments)  parity PASS', tone: 'ok' },
    ],
  },

  differentiators: {
    heading: 'Why it is different',
    points: [
      {
        title: 'Audio-first, zero-drift',
        body:
          'Narration is synthesised first; its exact per-character timing becomes the clock that paces both the screen recording and the caption file. Audio, video, and captions are in sync by construction — not nudged into alignment afterwards.',
      },
      {
        title: 'Keyless dry run',
        body:
          'FAKE_TTS swaps the TTS step for a silent track of estimated duration, so you can iterate on the script and action sequence — with real browser capture and real captions — without spending a cent of API quota.',
      },
      {
        title: 'Headless & reproducible',
        body:
          'Playwright drives a headless Chromium with an injected fake cursor and overlays; ffmpeg does the rest. The whole render is one command, so it runs the same on your laptop and in CI — re-render on every UI change instead of re-recording by hand.',
      },
      {
        title: 'Honest by construction',
        body:
          'A parity check fails the render if shot count, segment count, or audio/video duration disagree. A SaaS surface you should not live-drive uses a prebaked clip, spliced in at the right point — never faked as live.',
      },
    ],
  },

  links: [
    { label: 'GitHub repository', url: GITHUB, primary: true },
    { label: 'Watch a video it produced', url: SAMPLE_VIDEO, primary: true },
    { label: 'Dan Mercede', url: 'https://www.danmercede.com' },
  ],

  footerNote: 'MIT licensed. Built by Dan Mercede.',
};
