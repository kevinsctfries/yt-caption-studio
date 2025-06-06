import type React from "react";
import "./topbar.css";
import { useState } from "react";

interface TopBarProps {
  onUrlSubmit?: (url: string) => void;
}

const TopBar = ({ onUrlSubmit }: TopBarProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUrlSubmit?.(input);
  };
  return (
    <div className="topbar-container">
      <form onSubmit={handleSubmit} className="topbar-form">
        <input
          className="topbar-input"
          type="text"
          placeholder="Paste YouTube link..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="topbar-button">
          Load Video
        </button>
      </form>
    </div>
  );
};

export default TopBar;
