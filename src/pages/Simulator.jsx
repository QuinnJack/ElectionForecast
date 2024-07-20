import React, { useState, useEffect } from "react";
import Header from "../components/ui/Header";
import Simulation from "../components/ui/Simulation";
import "../App.css";
import IconTabs from "../components/ui/IconTabs";
import Example from "../components/ui/Pie";

function Simulator() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [selectedTab, setSelectedTab] = useState("2025");

  const handleMouseMove = (event) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div>
      <Header />
      <div className="font-sans p-8 relative" onMouseMove={handleMouseMove}>
        <div className="mb-8">
          <h1 className="text-7xl text-center font-editorial text-gray-800">
            Election Simulator
          </h1>
          <br />
          <p className="text-center text-2xl font-degular font-light text-gray-500 ">
            A probabilistic analysis of elections under a first-past-the-post
            voting system.
          </p>
          <Simulation />
        </div>
      </div>
    </div>
  );
}

export default Simulator;
