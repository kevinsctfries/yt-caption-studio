import "./topbar.css";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <input
        type="text"
        placeholder="Paste YouTube link here..."
        className="topbar-input"
      />
      <button className="topbar-button">Upload Video</button>
    </div>
  );
};

export default TopBar;
