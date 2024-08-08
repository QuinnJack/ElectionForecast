import { useState } from "react";
import Header from "../components/ui/Header";
import Example from "../components/ui/Pie";
import CorrelationMap from "../components/charts/CorrelationMap";
import ButtonShapeHoverTabs from "../components/ui/ButtonShapeHoverTabs";
import LineSVG from "../components/charts/NumberLine";

function About() {
  return (
    <div>
      <Header />
      <div className="font-sans p-8 relative mx-auto">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-6xl text-left font-editorial-light text-gray-800">
            About
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
          <p className="text-left font-regular font-degular text-lg text-gray-600 mb-8">
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

export default About;
