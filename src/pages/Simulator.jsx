import { useState, useEffect } from "react";
import Header from "../components/ui/Header";
import Simulation from "../components/ui/Simulation";
import "../App.css";
import IconTabs from "../components/ui/IconTabs";
import Example from "../components/ui/Pie";

function Simulator() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [selectedTab, setSelectedTab] = useState("2021");

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
        <div className="font-sans px-12 py-2 relative max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl  text-left font-editorial-light text-gray-800">
              Data Collection
            </h2>
            <br />
            <p className="text-left  font-degular text-lg text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              vel urna nec nulla ultricies posuere. Sed sit amet erat libero.
              Donec efficitur, lorem nec laoreet sagittis, dolor justo
              ullamcorper arcu, a volutpat nisi erat non libero.
            </p>
          </div>
        </div>

        <IconTabs
          center={true}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <div className="flex justify-center">
          <Example width={700} height={700} year={selectedTab} />
        </div>
      </div>
    </div>
  );
}

export default Simulator;
