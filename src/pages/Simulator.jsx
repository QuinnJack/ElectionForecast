import { useState, useEffect } from "react";
import Header from "../components/ui/Header";
import Simulator from "../components/ui/Simulator";
import "../App.css";

function Forecast() {
  const [activeChart, setActiveChart] = useState("popularVote");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [hoveredPartyInfo, setHoveredPartyInfo] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://datawrapper.dwcdn.net/async.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => setIsScriptLoaded(true); // Handle script load error

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const tabs = [
    { text: "POPULAR VOTE", value: "popularVote" },
    { text: "SEATS", value: "seats" },
    { text: "WINNER", value: "chance" },
  ];

  const getDescription = (chart) => {
    if (chart === "popularVote") return "VOTE SHARE";
    if (chart === "seats") return "SEATS";
    if (chart === "chance") return "CHANCE";
  };

  const getValue = (chart, data) => {
    if (chart === "popularVote") return parseInt(data.popularVote, 10);
    if (chart === "seats") return data.seats;
    if (chart === "chance") return parseFloat(data.chance);
  };

  const partyInfoData = [
    {
      color: "#12a8ff",
      partyName: "Conservative",
      popularVote: "41%",
      seats: 211,
      chance: "96%",
      leader: "Leader A",
      lastSeats: 200,
    },
    {
      color: "#143278",
      partyName: "Bloc Québécois",
      popularVote: "7%",
      seats: 36,
      chance: "0%",
      leader: "Leader B",
      lastSeats: 40,
    },
    {
      color: "#8c4bcc",
      partyName: "People's",
      popularVote: "3%",
      seats: 0,
      chance: "0%",
      leader: "Leader C",
      lastSeats: 1,
    },
    {
      color: "#ff2930",
      partyName: "Liberal",
      popularVote: "25%",
      seats: 74,
      chance: "4%",
      leader: "Leader D",
      lastSeats: 80,
    },
    {
      color: "#ff9d26",
      partyName: "New Democratic",
      popularVote: "19%",
      seats: 20,
      chance: "0.1%",
      leader: "Leader E",
      lastSeats: 25,
    },
    {
      color: "#4fc957",
      partyName: "Green",
      popularVote: "5%",
      seats: 2,
      chance: "0%",
      leader: "Leader F",
      lastSeats: 3,
    },
  ];

  const handleMouseMove = (event) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div>
      {" "}
      <Header />
      <div className="font-sans p-8 relative" onMouseMove={handleMouseMove}>
        <div className="mb-8">
          <h1 className="text-7xl text-center font-editorial text-gray-800">
            Election Simulator
          </h1>
          <br />
          <p className="text-center text-2xl font-degular font-light text-gray-500">
            A statistical overview of the upcoming Canadian 2025 federal
            election.
          </p>
          <Simulator />
        </div>
      </div>
    </div>
  );
}

export default Forecast;
