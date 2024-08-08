import { useState } from "react";
import Header from "../components/ui/Header";
import Example from "../components/ui/Pie";
import CorrelationMap from "../components/charts/CorrelationMap";
import ButtonShapeHoverTabs from "../components/ui/ButtonShapeHoverTabs";
import LineSVG from "../components/charts/NumberLine";

const rankingsData = {
  "Voter Turnout": [
    "Ontario",
    "British Columbia",
    "Alberta",
    "Quebec",
    "Nova Scotia",
    "Saskatchewan",
    "Manitoba",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Northwest Territories",
    "Yukon",
    "Nunavut",
  ],
  "GDP Growth": [
    "Alberta",
    "Ontario",
    "British Columbia",
    "Quebec",
    "Saskatchewan",
    "Manitoba",
    "Nova Scotia",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Northwest Territories",
    "Yukon",
    "Nunavut",
  ],
  "Educational Services": [
    "Quebec",
    "Ontario",
    "British Columbia",
    "Nova Scotia",
    "Alberta",
    "Manitoba",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Saskatchewan",
    "Prince Edward Island",
    "Northwest Territories",
    "Yukon",
    "Nunavut",
  ],
  "Income Levels": [
    "British Columbia",
    "Alberta",
    "Ontario",
    "Quebec",
    "Manitoba",
    "Saskatchewan",
    "Nova Scotia",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Northwest Territories",
    "Yukon",
    "Nunavut",
  ],
  "Demographic Similarity": [
    "Ontario",
    "Quebec",
    "British Columbia",
    "Alberta",
    "Nova Scotia",
    "New Brunswick",
    "Saskatchewan",
    "Manitoba",
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Northwest Territories",
    "Yukon",
    "Nunavut",
  ],
  "Incumbent Approval": [
    "Nunavut",
    "British Columbia",
    "Ontario",
    "Alberta",
    "Nova Scotia",
    "Manitoba",
    "Saskatchewan",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Northwest Territories",
    "Yukon",
    "Quebec",
  ],
};

const tabs = [
  { text: "Voter Turnout", value: "Voter Turnout" },
  { text: "GDP Growth", value: "GDP Growth" },
  { text: "Income Levels", value: "Income Levels" },
  { text: "Demographic Similarity", value: "Demographic Similarity" },
  { text: "Incumbent Approval", value: "Incumbent Approval" },
];

function Methodology() {
  const [activeChart, setActiveChart] = useState("Voter Turnout");

  return (
    <div>
      <Header />
      <div className="font-sans p-8 relative mx-auto">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-6xl text-left font-editorial-light text-gray-800">
            Methodology
          </h1>
          <br />
          <p className="text-left font-regular font-degular text-lg text-gray-600 mb-8">
            This section provides a detailed explanation of the methods and
            approaches used in forecasting the upcoming Canadian 2025 federal
            election. We're always striving to improve our forecasts, so please
            let us know if you have any suggestions.
          </p>
          <br />
          <h2 className="text-4xl text-left font-editorial-light text-gray-800">
            Data Collection
          </h2>
          <br />
        </div>
        <div className="flex justify-center mb-0">
          <LineSVG />
        </div>
        <div className="flex justify-center">
          <ButtonShapeHoverTabs
            tabs={tabs}
            activeTab={activeChart}
            onTabChange={(value) => setActiveChart(value)}
          />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center">
            <CorrelationMap rankings={rankingsData[activeChart]} />
          </div>
          <p className="text-left font-degular text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vel urna nec nulla ultricies posuere. Sed sit amet erat libero.
            Donec efficitur, lorem nec laoreet sagittis, dolor justo ullamcorper
            arcu, a volutpat nisi erat non libero.
          </p>
          <br />
          <h3 className="text-4xl text-left font-editorial-light text-gray-800">
            Polling Sources
          </h3>
          <br />
          <p className="text-left font-degular text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vel urna nec nulla ultricies posuere. Sed sit amet erat libero.
            Donec efficitur, lorem nec laoreet sagittis, dolor justo ullamcorper
            arcu, a volutpat nisi erat non libero.
          </p>
          <br />
          <h3 className="text-4xl text-left font-editorial-light text-gray-800">
            Simulation Techniques
          </h3>
          <br />
          <p className="text-left font-degular text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vel urna nec nulla ultricies posuere. Sed sit amet erat libero.
            Donec efficitur, lorem nec laoreet sagittis, dolor justo ullamcorper
            arcu, a volutpat nisi erat non libero.
          </p>
          <br />
          <h3 className="text-4xl text-left font-editorial-light text-gray-800">
            Historical Accuracy
          </h3>
          <br />
          <p className="text-left font-degular text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vel urna nec nulla ultricies posuere. Sed sit amet erat libero.
            Donec efficitur, lorem nec laoreet sagittis, dolor justo ullamcorper
            arcu, a volutpat nisi erat non libero.
          </p>
          <br />
          <h3 className="text-4xl text-left font-editorial-light text-gray-800">
            Robustness Checks
          </h3>
          <br />
          <p className="text-left font-degular text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vel urna nec nulla ultricies posuere. Sed sit amet erat libero.
            Donec efficitur, lorem nec laoreet sagittis, dolor justo ullamcorper
            arcu, a volutpat nisi erat non libero.
          </p>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Methodology;
