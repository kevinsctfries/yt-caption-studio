import "./App.css";
import Captions from "./features/captions/Captions";
import Timeline from "./features/timeline/Timeline";
import VideoPlayer from "./features/videoPlayer/VideoPlayer";

function App() {
  return (
    <div className="app-container">
      <div className="main-content">
        <Captions />
        <VideoPlayer />
      </div>
      <Timeline />
    </div>
  );
}

export default App;
