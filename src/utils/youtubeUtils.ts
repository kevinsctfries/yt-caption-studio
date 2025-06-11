// Takes a YouTube URL and extracts the video ID from it.
// e.g., "https://www.youtube.com/watch?v=dQw4w9WgXcQ" -> "dQw4w9WgXcQ"
export function extractYouTubeVideoID(url: string): string | null {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Fetches the width/height from oEmbed and returns the aspect ratio
export async function fetchYouTubeAspectRatio(
  videoId: string
): Promise<number | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    if (!res.ok) return null;

    const data = await res.json();
    if (!data.width || !data.height) return null;

    return data.width / data.height;
  } catch (err) {
    console.error("Failed to fetch YouTube aspect ratio:", err);
    return null;
  }
}
