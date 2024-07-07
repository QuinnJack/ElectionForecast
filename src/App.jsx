import { useState, useEffect } from "react";
import DWChart from "react-datawrapper-chart";
import ButtonShapeTabs from "./components/ui/ButtonShapeTabs";
import LineTabs from "./components/ui/LineTabs";
import Loading from "./components/ui/Loading";
import Counter from "./components/ui/Counter"; // Ensure the correct path

function App() {
  const [activeChart, setActiveChart] = useState("popularVote");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [hoveredPartyInfo, setHoveredPartyInfo] = useState(null);

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
    },
    {
      color: "#143278",
      partyName: "Bloc Québécois",
      popularVote: "4%",
      seats: 36,
      chance: "0%",
    },
    {
      color: "#8c4bcc",
      partyName: "People's",
      popularVote: "2%",
      seats: 0,
      chance: "0%",
    },
    {
      color: "#ff2930",
      partyName: "Liberal",
      popularVote: "24%",
      seats: 74,
      chance: "4%",
    },
    {
      color: "#ff9d26",
      partyName: "New Democratic",
      popularVote: "17%",
      seats: 20,
      chance: "0.1%",
    },
    {
      color: "#4fc957",
      partyName: "Green",
      popularVote: "8%",
      seats: 2,
      chance: "0%",
    },
  ];

  return (
    <div className="font-sans p-8 relative">
      <div className="mb-8">
        <h1 className="text-7xl text-center font-editorial text-gray-800">
          2025 Federal Forecast
        </h1>
        <br />
        <p className="text-center font-mono text-gray-600">
          A statistical overview of the upcoming Canadian 2025 federal election.
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
                  onMouseEnter={() => setHoveredPartyInfo(info)}
                  onMouseLeave={() => setHoveredPartyInfo(null)}
                >
                  <div
                    className="w-7 h-7 rounded-full"
                    style={{
                      backgroundColor: `${info.color}55`, // 34% opacity in hex
                      border: `1px solid ${info.color}`,
                    }}
                  ></div>
                  <div className="text-right">
                    <p className="text-4xl text-gray-800 font-editorial text-left">
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
                    <div className="absolute left-10 top-10 bg-white p-2 rounded shadow-lg z-10">
                      <p className="text-gray-800 font-mono">
                        {info.partyName}: {getValue(activeChart, info)}{" "}
                        {getDescription(activeChart)}
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
                  onMouseEnter={() => setHoveredPartyInfo(info)}
                  onMouseLeave={() => setHoveredPartyInfo(null)}
                >
                  <div className="text-left">
                    <p className="text-4xl text-gray-800 font-editorial text-right">
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
                    <div className="absolute left-10 top-10 bg-white p-2 rounded shadow-lg z-10">
                      <p className="text-gray-800 font-mono">
                        {info.partyName}: {getValue(activeChart, info)}{" "}
                        {getDescription(activeChart)}
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
        <h2 className="text-5xl font-semibold text-center font-editorial text-gray-800">
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
        <div className="relative h-[800px]">
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
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          State Correlation
        </h2>
        <div className="border-t border-gray-300 my-4"></div>
        <p className="text-center text-gray-600">
          Analysis of how different states correlate in voting patterns.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Getting to 270
        </h2>
        <div className="border-t border-gray-300 my-4"></div>

        <p className="text-center text-gray-600">
          The path candidates need to take to reach the 270 electoral votes
          required to win.
        </p>
      </div>
    </div>
  );
}

export default App;
