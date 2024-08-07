import { useState, useEffect } from "react";
import DWChart from "react-datawrapper-chart";
import ButtonShapeTabs from "../components/ui/ButtonShapeTabs";
import LineTabs from "../components/ui/LineTabs";
import Loading from "../components/ui/Loading";
import Counter from "../components/ui/Counter"; // Ensure the correct path
import CanadaMap from "react-canada-map";
import Header from "../components/ui/Header";
import Example from "../components/ui/Pie";
import VoterTurnoutChart from "../components/ui/charts/voter-turnout";
import SVGComponent from "../components/ui/charts/SVGComponent";
import WinnerChart from "../components/ui/charts/WinnerChart";
import PathTo343 from "../components/ui/charts/PathTo343";
import Histogram from "../components/ui/charts/Histogram";

function Forecast() {
  const [activeChart, setActiveChart] = useState("chance");
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
      <Header />
      <div className="font-sans p-8 relative" onMouseMove={handleMouseMove}>
        <div className="mb-8">
          <h1 className="text-7xl text-center font-editorial text-gray-800">
            Federal Forecast!
          </h1>
          <br />
          <p className="text-center text-2xl font-degular font-light text-gray-500">
            A statistical overview of the upcoming Canadian 2025 federal
            election.
          </p>
          <br />
          <div className="flex justify-center mb-3">
            <ButtonShapeTabs
              tabs={tabs}
              activeTab={activeChart}
              onTabChange={(value) => setActiveChart(value)}
            />
          </div>
          <div className="relative h-[800px]">
            {!isScriptLoaded ? (
              <Loading />
            ) : (
              <>
                <DWChart
                  title="Chart"
                  src="//datawrapper.dwcdn.net/dShUp/4/"
                  className={`absolute inset-0 ${
                    activeChart === "popularVote" ? "block" : "hidden"
                  }`}
                />
                <DWChart
                  title="Chart"
                  src="//datawrapper.dwcdn.net/JMBHw/9/"
                  className={`absolute inset-0 ${
                    activeChart === "seats" ? "block" : "hidden"
                  }`}
                />
                <DWChart
                  title="Chart"
                  src="//datawrapper.dwcdn.net/BWOZc/2/"
                  className={`absolute inset-0 ${
                    activeChart === "chance" ? "block" : "hidden"
                  }`}
                />
              </>
            )}

            <div className="absolute top-4 bottom-0 left-0 right-0 flex justify-between pointer-events-none p-4">
              <div className="flex flex-col justify-start items-start space-y-4">
                {partyInfoData.slice(0, 3).map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 bg-white bg-opacity-0 p-2 rounded pointer-events-auto relative"
                    onMouseEnter={() => {
                      setHoveredPartyInfo(info);
                      console.log(info);
                      console.log("Entered");
                    }}
                    onMouseLeave={() => {
                      setHoveredPartyInfo(null);
                      console.log("Left");
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-full"
                      style={{
                        backgroundColor: `${info.color}55`, // 34% opacity in hex
                        border: `1px solid ${info.color}`,
                      }}
                    ></div>
                    <div className="text-right">
                      <p className="text-4xl text-gray-800 font-editorial-light text-left">
                        {info.partyName}
                      </p>
                      <div className="flex items-center justify-start space-x-2">
                        <p className="text-sm font-mono text-gray-600">
                          {getDescription(activeChart)}
                        </p>
                        <div className="text-6xl font-editorial text-gray-800">
                          <Counter
                            value={getValue(activeChart, info)}
                            formatAsPercentage={
                              activeChart === "popularVote" ||
                              activeChart === "chance"
                            }
                          />{" "}
                        </div>
                      </div>
                    </div>
                    {hoveredPartyInfo === info && (
                      <div
                        className="absolute bg-white p-4 rounded shadow-lg z-10"
                        style={{
                          top: cursorPosition.y,
                          left: cursorPosition.x,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <p className="text-gray-800 font-mono">
                          Leader: {info.leader}
                        </p>
                        <p className="text-gray-800 font-mono">
                          Last Seats: {info.lastSeats}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-start items-end space-y-4">
                {partyInfoData.slice(3).map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 bg-white bg-opacity-0 p-2 rounded pointer-events-auto relative"
                    onMouseEnter={() => {
                      setHoveredPartyInfo(info);
                      console.log(info);
                      console.log("Entered");
                    }}
                    onMouseLeave={() => {
                      setHoveredPartyInfo(null);
                      console.log("Left");
                    }}
                  >
                    <div className="text-left">
                      <p className="text-4xl text-gray-800 font-editorial-light text-right">
                        {info.partyName}
                      </p>
                      <div className="flex items-center justify-end space-x-2">
                        <div className="text-6xl font-editorial text-gray-800">
                          <Counter
                            value={getValue(activeChart, info)}
                            formatAsPercentage={
                              activeChart === "popularVote" ||
                              activeChart === "chance"
                            }
                          />{" "}
                        </div>
                        <p className="text-sm font-mono text-gray-600">
                          {getDescription(activeChart)}
                        </p>
                      </div>
                    </div>
                    <div
                      className="w-7 h-7 rounded-full"
                      style={{
                        backgroundColor: `${info.color}55`, // 34% opacity in hex
                        border: `1px solid ${info.color}`,
                      }}
                    ></div>
                    {hoveredPartyInfo === info && (
                      <div
                        className="absolute bg-white p-4 rounded shadow-lg z-10"
                        style={{
                          top: cursorPosition.y,
                          left: cursorPosition.x,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <p className="text-gray-800 font-mono">
                          Leader: {info.leader}
                        </p>
                        <p className="text-gray-800 font-mono">
                          Last Seats: {info.lastSeats}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="border-t border-gray-300 my-4 mx-32"></div>
          <br />
          <h2 className="text-5xl  text-center font-editorial-light text-gray-800">
            Race Over Time
          </h2>
          <br />
          <div className="flex justify-center mb-4">
            <LineTabs
              tabs={tabs}
              activeTab={activeChart}
              onTabChange={(value) => setActiveChart(value)}
            />
          </div>
          <div className="relative h-[31.25rem]">
            {!isScriptLoaded ? (
              <Loading />
            ) : (
              <>
                <DWChart
                  loading="eager"
                  title="Chart"
                  src="//datawrapper.dwcdn.net/tWoHu/5"
                  className={`absolute inset-0 ${
                    activeChart === "popularVote" ? "block" : "hidden"
                  }`}
                />
                <DWChart
                  loading="eager"
                  title="Chart"
                  src="//datawrapper.dwcdn.net/27FKq/5/"
                  className={`absolute inset-0 ${
                    activeChart === "seats" ? "block" : "hidden"
                  }`}
                />
                <DWChart
                  loading="eager"
                  title="Chart"
                  src="//datawrapper.dwcdn.net/wqVcS/3/"
                  className={`absolute inset-0 ${
                    activeChart === "chance" ? "block" : "hidden"
                  }`}
                />
              </>
            )}
          </div>
        </div>
        <div className="mb-8">
          <div className="border-t border-gray-300 my-4 mx-32"></div>
          <br />
          <h2 className="text-5xl  text-center font-editorial-light text-gray-800">
            Path to 343
          </h2>
          <br />
          <div className="flex justify-center mb-4">
            <LineTabs
              tabs={tabs}
              activeTab={activeChart}
              onTabChange={(value) => setActiveChart(value)}
            />
          </div>
          <div className="flex justify-center items-center w-full h-full">
            {/* Preload SVG components by rendering them hidden */}
            <div className="hidden">
              <PathTo343 />
              <Histogram />
            </div>

            {activeChart === "popularVote" ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-2xl font-light text-gray-500">
                  Placeholder for Popular Vote Chart
                </p>
              </div>
            ) : activeChart === "seats" ? (
              <PathTo343 className="w-full h-full" />
            ) : (
              <Histogram className="w-full h-full" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
