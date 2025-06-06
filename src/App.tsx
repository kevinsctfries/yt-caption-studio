import { useState } from "react";
import "./App.css";
import Captions from "./features/captions/Captions";
import Timeline from "./features/timeline/Timeline";
import VideoPlayer from "./features/videoPlayer/VideoPlayer";

function App() {
  const [player, setPlayer] = useState<YT.Player | null>(null);

  return (
    <div className="app-container">
      <div className="main-content">
        <Captions />
        <VideoPlayer onPlayerReady={setPlayer} />
      </div>
      {/* <Timeline /> */}
      {player && <Timeline player={player} />}
    </div>
  );
}

export default App;
