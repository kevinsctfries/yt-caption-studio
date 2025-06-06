import React, { useEffect, useState } from "react";
import "./timeline.css";

interface TimelineProps {
  player: YT.Player | null;
}

const Timeline = ({ player }: TimelineProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      const time = player.getCurrentTime();
      const dur = player.getDuration();
      setCurrentTime(time);
      setDuration(dur);
    }, 250);

    return () => clearInterval(interval);
  }, [player]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (player) {
      player.seekTo(newTime, true);
    }
  };

  return (
    <div className="timeline-section">
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className="timeline-slider"
      />
      <div className="timeline-time">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
};

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

export default Timeline;
