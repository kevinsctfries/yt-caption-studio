// Takes a YouTube URL and extracts the video ID from it.
// e.g., "https://www.youtube.com/watch?v=dQw4w9WgXcQ" -> "dQw4w9WgXcQ"

export function extractYouTubeVideoID(url: string): string | null {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
