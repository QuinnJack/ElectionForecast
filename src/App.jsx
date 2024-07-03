import "./App.css";
import { useState } from "react";
import { Button } from "./components/ui/Button.tsx";
import DWChart from "react-datawrapper-chart";

function App() {
  const [activeChart, setActiveChart] = useState("popularVote");

  return (
    <div className="font-sans p-8">
      <h1 className="text-8xl font-bold mb-8 text-center text-gray-800">
        Canadian Federal Election Forecast
      </h1>
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 ${
            activeChart === "popularVote"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setActiveChart("popularVote")}
        >
          Popular Vote
        </button>
        <button
          className={`px-4 py-2 ${
            activeChart === "seats"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setActiveChart("seats")}
        >
          Seats
        </button>
      </div>
      <div className={activeChart === "popularVote" ? "block" : "hidden"}>
        <DWChart title="Chart" src="//datawrapper.dwcdn.net/tWoHu/1" />
      </div>
      <div className={activeChart === "seats" ? "block" : "hidden"}>
        <DWChart title="Chart" src="//datawrapper.dwcdn.net/27FKq/1/" />
      </div>
    </div>
  );
}

export default App;
