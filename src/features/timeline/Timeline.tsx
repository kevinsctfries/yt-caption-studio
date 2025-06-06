import React, { useEffect, useState, useRef } from "react";
import "./timeline.css";

interface TimelineProps {
  player: YT.Player | null;
}

const Timeline = ({ player }: TimelineProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentTime(player.getCurrentTime());
        setDuration(player.getDuration());
      }
    }, 250);

    return () => clearInterval(interval);
  }, [player, isDragging]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--timeline-progress",
      `${(currentTime / duration) * 100}%`
    );
  }, [currentTime, duration]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    seekToEventPosition(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      seekToEventPosition(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const seekToEventPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!player || !duration || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    player.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  return (
    <div className="timeline-section">
      <div
        className="timeline-track"
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        data-progress>
        <div className="timeline-progress" />
        <div className="timeline-cursor" />
      </div>
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
