import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="main-content">
        <div className="caption-section">
          <table className="caption-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Text</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <input type="text" defaultValue="00:00:01.000" />
                </td>
                <td>
                  <input type="text" defaultValue="00:00:04.000" />
                </td>
                <td>
                  <textarea defaultValue="Hello, welcome to the video!" />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <input type="text" defaultValue="00:00:05.000" />
                </td>
                <td>
                  <input type="text" defaultValue="00:00:08.000" />
                </td>
                <td>
                  <textarea defaultValue="Let's learn how to use captions." />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="video-section">
          <div className="video-placeholder">YouTube Video Will Be Here</div>
        </div>
      </div>
      <div className="timeline-section">
        <div className="timeline-track">
          <div className="timeline-placeholder">
            Timeline Controls Will Be Here
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
