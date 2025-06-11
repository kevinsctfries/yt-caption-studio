// Takes a YouTube URL and extracts the video ID from it.
// e.g., "https://www.youtube.com/watch?v=dQw4w9WgXcQ" -> "dQw4w9WgXcQ"
export function extractYouTubeVideoID(url: string): string | null {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Fetches data from oEmbed
export interface YouTubeVideoData {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_width: number;
  thumbnail_url: string;
  html: string;
}

export async function fetchYouTubeVideoData(
  videoId: string
): Promise<YouTubeVideoData | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    if (!res.ok) return null;

    const data = await res.json();
    return data as YouTubeVideoData;
  } catch (err) {
    console.error("Failed to fetch YouTube video data:", err);
    return null;
  }
}
