import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Forecast from "./pages/Forecast";
import Methodology from "./pages/Methodology";
import Simulator from "./pages/Simulator";
import About from "./pages/About";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
