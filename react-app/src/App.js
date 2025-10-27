import React, { useState } from "react";
import "./App.css";
import SegmentModal from "./components/SegmentModal";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <header className="header">
        <h3>View Audience</h3>
      </header>

      <div className="toolbar">
        <button className="save-segment-btn" onClick={() => setShowModal(true)}>
          Save segment
        </button>
      </div>

      {showModal && <SegmentModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default App;
