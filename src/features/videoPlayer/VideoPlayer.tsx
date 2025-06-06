import { useEffect, useRef } from "react";
import { createYouTubePlayer } from "../../services/youtubePlayerService";
import "./video-player.css";

interface VideoPlayerProps {
  videoId: string;
  onPlayerReady?: (event: YT.Player) => void;
}

const VideoPlayer = ({ videoId, onPlayerReady }: VideoPlayerProps) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    if (playerInstanceRef.current) {
      playerInstanceRef.current.destroy();
    }

    createYouTubePlayer(playerRef.current, videoId, {
      onReady: event => {
        playerInstanceRef.current = event.target;
        onPlayerReady?.(event.target);
        console.log("Player ready", event);
      },
      onStateChange: event => {
        console.log("State changed", event.data);
      },
    });

    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
        playerInstanceRef.current = null;
      }
    };
  }, [videoId, onPlayerReady]);

  return (
    <div className="video-section">
      <div ref={playerRef} className="youtube-video" />
    </div>
  );
};

export default VideoPlayer;
