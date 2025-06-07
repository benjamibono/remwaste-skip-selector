import React from "react";
import { Routes, Route } from "react-router-dom";
import { SkipSelectionPage } from "@/pages/SkipSelectionPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SkipSelectionPage />} />
        <Route path="/skip-selection" element={<SkipSelectionPage />} />
      </Routes>
    </div>
  );
}

export default App;
