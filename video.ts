// One definition of a valid YouTube video id and the URLs built from it, shared by the live page
// (App.tsx) and the crawler body (vite-plugin-bodybake.ts) so the two can never disagree.
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export function isYouTubeId(id: string): boolean {
  return YOUTUBE_ID.test(id);
}

export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
}

export function youtubeWatchUrl(id: string): string {
  return `https://youtu.be/${encodeURIComponent(id)}`;
}
