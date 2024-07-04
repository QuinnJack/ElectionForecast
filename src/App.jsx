import "./App.css";
import { useState, useEffect } from "react";
import DWChart from "react-datawrapper-chart";
import ButtonShapeTabs from "./components/ui/ButtonShapeTabs";
import LineTabs from "./components/ui/LineTabs";
import Loading from "./components/ui/Loading";

function App() {
  const [activeChart, setActiveChart] = useState("popularVote");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://datawrapper.dwcdn.net/async.js";
    script.async = true;
    script.onload = () => setIsLoading(false);
    script.onerror = () => setIsLoading(false); // Handle script load error

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

  return (
    <div className="font-sans p-8">
      <div className="mb-8">
        <h1 className="text-7xl text-center font-editorial text-gray-800">
          2025 Federal Forecast
        </h1>
        <br />
        <p className="text-center font-mono text-gray-600">
          A statistical overview of the upcoming Canadian 2025 federal election.
        </p>
        <br />
        <div className="flex justify-center mb-4">
          <ButtonShapeTabs
            tabs={tabs}
            activeTab={activeChart}
            onTabChange={(value) => setActiveChart(value)}
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {activeChart === "popularVote" && (
              <DWChart title="Chart" src="//datawrapper.dwcdn.net/JMBHw/7/" />
            )}
            {activeChart === "seats" && (
              <DWChart title="Chart" src="//datawrapper.dwcdn.net/BWOZc/1/" />
            )}
          </>
        )}
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
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className={activeChart === "popularVote" ? "block" : "hidden"}>
              <DWChart
                loading="eager"
                title="Chart"
                src="//datawrapper.dwcdn.net/tWoHu/5"
              />
            </div>
            <div className={activeChart === "seats" ? "block" : "hidden"}>
              <DWChart
                loading="eager"
                title="Chart"
                src="//datawrapper.dwcdn.net/27FKq/5/"
              />
            </div>
          </>
        )}
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
