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
  BC: [
    "British Columbia",
    "Yukon",
    "Ontario",
    "Alberta",
    "Manitoba",
    "Saskatchewan",
    "Quebec",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
    "Nunavut",
    "Northwest Territories",
  ],
  YT: [
    "Yukon",
    "British Columbia",
    "Alberta",
    "Northwest Territories",
    "Ontario",
    "Saskatchewan",
    "Manitoba",
    "Quebec",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
    "Nunavut",
  ],
  NT: [
    "Northwest Territories",
    "Yukon",
    "Nunavut",
    "Alberta",
    "Saskatchewan",
    "British Columbia",
    "Ontario",
    "Manitoba",
    "Quebec",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
  ],
  AB: [
    "Alberta",
    "Saskatchewan",
    "British Columbia",
    "Manitoba",
    "Ontario",
    "Yukon",
    "Quebec",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
    "Nunavut",
    "Northwest Territories",
  ],
  SK: [
    "Saskatchewan",
    "Alberta",
    "Manitoba",
    "British Columbia",
    "Ontario",
    "Yukon",
    "Quebec",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
    "Nunavut",
    "Northwest Territories",
  ],
  MB: [
    "Manitoba",
    "Saskatchewan",
    "Alberta",
    "Ontario",
    "British Columbia",
    "Quebec",
    "Yukon",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
    "Nunavut",
    "Northwest Territories",
  ],
  NU: [
    "Nunavut",
    "Northwest Territories",
    "Yukon",
    "Alberta",
    "Saskatchewan",
    "Manitoba",
    "British Columbia",
    "Ontario",
    "Quebec",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
  ],
  ON: [
    "Ontario",
    "Quebec",
    "British Columbia",
    "Manitoba",
    "Alberta",
    "Saskatchewan",
    "Yukon",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
    "Nunavut",
    "Northwest Territories",
  ],
  QC: [
    "Quebec",
    "Ontario",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Nova Scotia",
    "British Columbia",
    "Alberta",
    "Saskatchewan",
    "Manitoba",
    "Yukon",
    "Nunavut",
    "Northwest Territories",
  ],
  NL: [
    "Newfoundland and Labrador",
    "Nova Scotia",
    "New Brunswick",
    "Prince Edward Island",
    "Quebec",
    "Ontario",
    "Alberta",
    "British Columbia",
    "Saskatchewan",
    "Manitoba",
    "Yukon",
    "Nunavut",
    "Northwest Territories",
  ],
  NB: [
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
    "Quebec",
    "Newfoundland and Labrador",
    "Ontario",
    "Alberta",
    "British Columbia",
    "Saskatchewan",
    "Manitoba",
    "Yukon",
    "Nunavut",
    "Northwest Territories",
  ],
  NS: [
    "Nova Scotia",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Quebec",
    "Ontario",
    "Alberta",
    "British Columbia",
    "Saskatchewan",
    "Manitoba",
    "Yukon",
    "Nunavut",
    "Northwest Territories",
  ],
  PE: [
    "Prince Edward Island",
    "Nova Scotia",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Quebec",
    "Ontario",
    "Alberta",
    "British Columbia",
    "Saskatchewan",
    "Manitoba",
    "Yukon",
    "Nunavut",
    "Northwest Territories",
  ],
};

const tabs = [
  { text: "Voter Turnout", value: "Voter Turnout" },
  { text: "GDP Growth", value: "GDP Growth" },
  { text: "Income Levels", value: "Income Levels" },
  { text: "Demographic Similarity", value: "Demographic Similarity" },
  { text: "Incumbent Approval", value: "Incumbent Approval" },
];

const provincesAndTerritories = [
  { text: "BC", value: "BC" },
  { text: "YT", value: "YT" },
  { text: "NT", value: "NT" },
  { text: "AB", value: "AB" },
  { text: "SK", value: "SK" },
  { text: "MB", value: "MB" },
  { text: "NU", value: "NU" },
  { text: "ON", value: "ON" },
  { text: "QC", value: "QC" },
  { text: "NL", value: "NL" },
  { text: "NB", value: "NB" },
  { text: "NS", value: "NS" },
  { text: "PE", value: "PE" },
];

function Methodology() {
  const [activeChart, setActiveChart] = useState("Voter Turnout");
  const [activeProvince, setActiveProvince] = useState("ON");

  const handleProvinceHover = (province) => {
    setActiveProvince(province);
    setActiveChart(province);
  };

  return (
    <div>
      <Header />
      <div className="font-sans p-8 relative mx-auto">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-7xl text-center font-editorial text-gray-800">
            Methodology
          </h1>
          <br />
          <p className="text-center text-2xl font-degular font-light text-gray-500">
            An examination of the methods and approaches used in forecasting
            upcoming elections.
          </p>
          <br />

          <br />
          <h2 className="text-4xl text-left font-editorial-light text-gray-800">
            Data Collection
          </h2>
          <br />
        </div>
        <div className="flex justify-center mb-0 mx-24">
          <LineSVG />
        </div>
        <div className="flex justify-center">
          <ButtonShapeHoverTabs
            tabs={tabs}
            activeTab={activeChart}
            onTabChange={(value) => setActiveChart(value)}
            type="tabs"
          />
        </div>
        <div className="flex justify-center">
          <ButtonShapeHoverTabs
            tabs={provincesAndTerritories}
            activeTab={activeChart}
            onTabChange={(value) => setActiveChart(value)}
            type="provinces"
          />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center">
            <CorrelationMap
              rankings={rankingsData[activeChart]}
              onProvinceHover={handleProvinceHover}
            />
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
