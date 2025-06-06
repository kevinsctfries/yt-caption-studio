import { useEffect, useRef } from "react";
import { createYouTubePlayer } from "../../services/youtubePlayerService";
import "./video-player.css";

interface VideoPlayerProps {
  onPlayerReady?: (event: YT.Player) => void;
}

const VideoPlayer = ({ onPlayerReady }: VideoPlayerProps) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    createYouTubePlayer(playerRef.current, "dQw4w9WgXcQ", {
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
      }
    };
  }, [onPlayerReady]);

  return (
    <div className="video-section">
      <div ref={playerRef} className="youtube-video" />
    </div>
  );
};

export default VideoPlayer;
