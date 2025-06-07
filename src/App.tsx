import { Routes, Route } from "react-router-dom";
import { SkipSelectionPage } from "@/pages/SkipSelectionPage";
import { ThemeProvider } from "@/contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<SkipSelectionPage />} />
          <Route path="/skip-selection" element={<SkipSelectionPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
