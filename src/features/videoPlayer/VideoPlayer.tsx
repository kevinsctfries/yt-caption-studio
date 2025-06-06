import { useEffect, useRef } from "react";
import { createYouTubePlayer } from "../../services/youtubePlayerService";
import "./video-player.css";

const VideoPlayer = () => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    let playerInstance: YT.Player;

    createYouTubePlayer(playerRef.current, "dQw4w9WgXcQ", {
      onReady: event => {
        console.log("Player ready", event);
      },
      onStateChange: event => {
        console.log("State changed", event.data);
      },
    }).then(player => {
      playerInstance = player;
    });

    return () => {
      if (playerInstance) {
        playerInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="video-section">
      <div ref={playerRef} className="youtube-video" />
    </div>
  );
};

export default VideoPlayer;
