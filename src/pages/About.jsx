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
            This site and forecasting model were developed by me during my
            statistics courses at the University of Ottawa, building on what I
            have learned in regression analysis and introduction to mathematical
            models. You can see the code for a lot of this project as well as
            other things I've built on my personal page or my{" "}
            <a className="underline" href="https://github.com/QuinnJack">
              GitHub.
            </a>
          </p>

          <h2 className="text-4xl text-left font-editorial-light text-gray-800">
            Polling Sources
          </h2>
          <br />
          <p className="text-left font-regular font-degular text-lg text-gray-600 mb-8">
            I relied on 338Canada's excellent polling aggregation site to gather
            and evaluate the quality of polls. This is one of the most
            labor-intensive aspects of forecasting, and Canadians are incredibly
            fortunate to have access to such a valuable resource. You can view
            their polls{" "}
            <a className="underline" href="https://338canada.com/polls.htm">
              here
            </a>{" "}
            and consider subscribing to{" "}
            <a className="underline" href="https://www.338canada.ca">
              their Substack
            </a>
            .
          </p>

          <h3 className="text-4xl text-left font-editorial-light text-gray-800">
            Historical Accuracy
          </h3>
          <br />
          <p className="text-left font-degular text-lg text-gray-600">
            Robust polling data is only accurate and aggreated for the 2015,
            2019 and 2021 Canadian federal elections. Hindcasting these
            elections, the model correctly forecasts the winner of 943 ridings,
            out of a possible 1014 (93%). Of those 71 incorrect ridings, 57 are
            outside of the margin of error (MOE) of the polls.
          </p>
          <br />
          <h3 className="text-4xl text-left font-editorial-light text-gray-800">
            Dynamically Projecting
          </h3>
          <br />
          <p className="text-left font-degular text-lg text-gray-600">
            Over the course of four months, from March to June 2024, I developed
            this model, periodically collecting and incorporating new polling
            data to ensure it stayed up-to-date. I used a regex expression to
            ensure that all frontend values seamlessly reflected changes in
            forecast outputs whenever new polls were incorporated. It was
            fascinating to observe how the model changed over time, reacting to
            shifts in the political landscape. As September 2024 and my fall
            semester begins, I will have less time to gather polls and update
            projections. However, as the 2025 federal election approaches, I'll
            likely make a concerted effort to keep the model more current with
            the latest polling data and projections.
          </p>
          <br />

          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default About;
