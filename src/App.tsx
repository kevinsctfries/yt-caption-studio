import { useState } from "react";
import "./App.css";
import Captions from "./features/captions/Captions";
import Timeline from "./features/timeline/Timeline";
import VideoPlayer from "./features/videoPlayer/VideoPlayer";
import TopBar from "./features/topBar/TopBar";
import { extractYouTubeVideoID } from "./utils/extractYouTubeVideoID";

function App() {
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [videoId, setVideoId] = useState("lYSJo36KYZk");

  return (
    <div className="app-root">
      <TopBar
        onUrlSubmit={(url: string) => {
          const id = extractYouTubeVideoID(url);
          if (id) {
            setVideoId(id);
          } else {
            alert("Invalid YouTube URL");
          }
        }}
      />
      <div className="app-container">
        <div className="main-content">
          <Captions />
          <VideoPlayer videoId={videoId} onPlayerReady={setPlayer} />
        </div>
        {player && <Timeline player={player} />}
      </div>
    </div>
  );
}

export default App;
