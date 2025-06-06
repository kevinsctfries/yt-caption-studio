import { useEffect, useRef } from "react";
import "./video-player.css";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
  }
}

const VideoPlayer = () => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      if (!playerRef.current) return;

      new window.YT.Player(playerRef.current, {
        videoId: "dQw4w9WgXcQ", // placeholder video ID
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          iv_load_policy: 3,
          fs: 1,
          disablekb: 0,
        },
        events: {
          onReady: (event: YT.PlayerEvent) => {
            console.log("Player ready", event);
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            console.log("State changed", event.data);
          },
        },
      });
    };

    return () => {
      if ("onYouTubeIframeAPIReady" in window) {
        delete window.onYouTubeIframeAPIReady;
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
