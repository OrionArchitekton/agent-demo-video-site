import { ProductData } from './types';

const GITHUB = 'https://github.com/OrionArchitekton/agent-demo-video';
const NPM = 'https://www.npmjs.com/package/agent-demo-video';
export const VERSION = '0.3.0';
// The self-demo: a video the tool rendered of itself (a sample app, then its own script, run and
// checks), on @danmercede. Primary proof on the page.
const SELF_DEMO_ID = '9Oi9SKoahvs';
const SELF_DEMO = `https://youtu.be/${SELF_DEMO_ID}`;
// A real, finished video produced by this pipeline for someone else's product (the Proctor UiPath
// AgentHack submission demo).
const SAMPLE_VIDEO = 'https://youtu.be/GaTzq_fDmqU';

/**
 * Single source of truth for the agent-demo-video microsite.
 *
 * All copy is GROUNDED in the real tool repo (README.md, docs/guide/, src/types.ts action
 * vocabulary, the pipeline stages in pipeline.ts, and the published CLI). The tool ships on npm as
 * `agent-demo-video` with a `demo-video` CLI (and a `demo-video login` subcommand for
 * authenticated SaaS capture), and the repo is also a Claude Code plugin marketplace. No
 * fabricated commands or numbers: the one render length in the demo is the narrated self-demo's,
 * as recorded in demos/self/assets/run.log at v0.3.0.
 */
export const PRODUCT_DATA: ProductData = {
  name: 'agent-demo-video',
  tagline:
    'Turn a script and a running web app into a finished, narrated, captioned demo video. Automated, headless, zero-drift.',
  credibility:
    'Open source (MIT) · On npm · Claude Code plugin · Headless · Keyless dry-run · Audio-first sync by construction.',
  canonical: 'https://www.danmercede.com/works/agent-demo-video/',
  metaDescription:
    'agent-demo-video is an MIT-licensed, headless pipeline that turns a DEMO_SCRIPT manifest and a running web app into a narrated, captioned MP4. It is audio-first, so audio, video, and captions stay in sync with zero drift. Narrate with ElevenLabs or your own text-to-speech, drive authenticated SaaS behind a real login, and check every render. Install it as a Claude Code plugin or run it with npx.',

  problem: {
    heading: 'The problem',
    body:
      'Demo videos are made by hand: screen-record, write a script, record a voiceover, edit, then re-sync captions, and redo the whole thing every time the UI changes. Narration, screen, and captions drift apart, and nothing about it is reproducible or CI-friendly.',
  },

  whatItDoes: {
    heading: 'What it does',
    body:
      "A headless pipeline that turns a Markdown DEMO_SCRIPT (shots, browser actions, and narration) plus a running web app into a finished MP4. It is audio-first: narration is generated first, and its timing becomes the clock that paces the browser recording and the captions, so audio, video, and captions are in sync by construction. Narrate with ElevenLabs or with any text-to-speech you run yourself. It can drive an authenticated SaaS app behind its real login, or splice in a prebaked clip for surfaces you would rather not automate, and it checks its own output before you ship it. Run it keyless with FAKE_TTS to iterate on the script for free.",
  },

  video: {
    youtubeId: SELF_DEMO_ID,
    title: 'agent-demo-video: the self-demo',
    caption:
      'This one-minute video was rendered by agent-demo-video from a script: a small sample app, then its own script, a replay of the run, and the checks it ran on itself.',
  },

  cta: {
    primaryLabel: 'View on GitHub',
    primaryUrl: GITHUB,
    secondaryLabel: 'Watch the video it made of itself',
    secondaryUrl: SELF_DEMO,
  },

  quickstart: {
    heading: 'Quickstart',
    intro:
      'Install it as a Claude Code plugin, or run it with npx. Prove your script keyless in one dry run, then add a voice. Everything runs on your machine: there is no hosted service. Needs Node 18+ (22.12+ for motion cards) and ffmpeg 5.1+ on PATH.',
    blocks: [
      {
        title: 'Claude Code plugin',
        note: 'adds a demo-video skill and a read-only render-reviewer agent',
        command: [
          '/plugin marketplace add OrionArchitekton/agent-demo-video',
          '/plugin install agent-demo-video@agent-demo-video',
        ].join('\n'),
      },
      {
        title: 'Capture browser (one time)',
        note: 'the Playwright build this CLI uses',
        command: `npx -y -p agent-demo-video@${VERSION} playwright install chromium`,
      },
      {
        title: 'Script and config',
        note: 'start from the sample config, then point it at your DEMO_SCRIPT.md and running app (in Windows PowerShell, type curl.exe)',
        command:
          `curl -fsSLo demo.config.json https://raw.githubusercontent.com/OrionArchitekton/agent-demo-video/v${VERSION}/demo.config.sample.json`,
      },
      {
        title: 'Keyless dry run (silent audio, no API key)',
        note: 'real capture + real captions',
        command: `FAKE_TTS=1 npx -y agent-demo-video@${VERSION} demo.config.json`,
      },
      {
        title: 'Your own voice (a block in demo.config.json)',
        note: 'any text-to-speech you can run from a shell; the aligner gives word-timed captions',
        command: [
          '"voice": {',
          '  "provider": "command",',
          '  "command": ["my-tts", "--text-file", "{text}", "--out", "{out}"],',
          '  "aligner": ["/path/to/venv/bin/python", "/path/to/agent-demo-video/tools/align_whisper.py", "{audio}", "{text}", "{out}"]',
          '}',
        ].join('\n'),
      },
      {
        title: 'Or ElevenLabs',
        note: 'replace your-api-key with your own key',
        command: `ELEVENLABS_API_KEY=your-api-key npx -y agent-demo-video@${VERSION} demo.config.json`,
      },
      {
        title: 'Authenticated SaaS (optional)',
        note: 'log in once in your own terminal, then render headlessly',
        command: [
          `npx -y agent-demo-video@${VERSION} login demo.config.json`,
          `npx -y agent-demo-video@${VERSION} demo.config.json`,
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
      name: 'scroll',
      description: 'Smoothly scroll an element into view, or to a pixel offset.',
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
      'Author a DEMO_SCRIPT.md, prove it keyless, then add a voice. Before any narration is generated, the pipeline checks the selectors it can against the app and reports the ones it cannot prove; then it synthesises narration, records the browser, builds word-timed captions, muxes, and verifies the delivered video file, failing if anything is out of spec.',
    lines: [
      { kind: 'comment', text: '# 1. Author a DEMO_SCRIPT.md: shots + browser actions + narration' },
      { kind: 'comment', text: '# 2. Keyless dry run, no API key (silent audio, real capture + captions)' },
      { kind: 'command', text: `FAKE_TTS=1 npx -y agent-demo-video@${VERSION} demo.config.json` },
      {
        kind: 'output',
        text: 'preflight → tts(fake) → capture → captions → mux → verify',
        tone: 'muted',
      },
      { kind: 'output', text: '' },
      { kind: 'comment', text: '# 3. Add a voice (ElevenLabs or your own text-to-speech), render for real' },
      { kind: 'command', text: `npx -y agent-demo-video@${VERSION} demo.config.json` },
      { kind: 'output', text: '✓ wrote out/final.mp4 (60.3s, 9 segments)', tone: 'ok' },
    ],
  },

  differentiators: {
    heading: 'Why it is different',
    points: [
      {
        title: 'Audio-first, zero-drift',
        body:
          'Narration is generated first; its timing becomes the clock that paces both the screen recording and the captions. Audio, video, and captions are in sync by construction, not nudged into alignment afterwards.',
      },
      {
        title: 'Checks its own work',
        body:
          'Every render verifies the delivered video file, tiles a contact sheet of every segment, and records the run in a render report. With an aligner configured, a transcript check listens back to the narration and names any phrase it did not hear.',
      },
      {
        title: 'Your voice, or none',
        body:
          'Narrate with ElevenLabs, or with any text-to-speech you run yourself, with word timings from your program or an aligner. FAKE_TTS renders silent drafts with real capture and real captions, so you can iterate on the script for free.',
      },
      {
        title: 'Built for Claude Code',
        body:
          'Install it as a plugin and ask Claude for a demo video. A skill walks Claude through the script, preflight, a silent pass, a pre-render review by a read-only agent, and the narrated render.',
      },
      {
        title: 'Authenticated SaaS, captured safely',
        body:
          'Drive a login-walled app behind its real session. Operator-confirmed login absorbs MFA and SSO, and a record-time guard fails closed rather than silently recording a logged-out screen. The saved browser profile holds secrets at rest, so it lives outside the repo and is never committed.',
      },
      {
        title: 'Headless and reproducible',
        body:
          'Playwright drives a headless Chromium with an injected cursor and overlays; ffmpeg does the rest. The whole render is one command, so it runs the same on your laptop and in CI: re-render on every UI change instead of re-recording by hand.',
      },
    ],
  },

  links: [
    { label: 'GitHub repository', url: GITHUB, primary: true },
    { label: 'npm package', url: NPM, primary: true },
    { label: 'Watch the self-demo', url: SELF_DEMO, primary: true },
    { label: 'A real demo it produced (Proctor)', url: SAMPLE_VIDEO },
    { label: 'Dan Mercede', url: 'https://www.danmercede.com' },
  ],

  footerNote: 'MIT licensed. Built by Dan Mercede.',
};
