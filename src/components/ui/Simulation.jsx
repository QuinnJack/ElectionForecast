import React, { useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { Slider } from "@nextui-org/react";
import DynamicSeatChart from "./DynamicSeatChart";
import Example from "./Pie";
import IconTabs from "./IconTabs";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
const parties = [
  {
    id: "CON",
    name: "Conservative",
    initialValue: 430,
    color: "#12A7FF",
    min: 300,
    max: 600,
  },
  {
    id: "LIB",
    name: "Liberal",
    initialValue: 250,
    color: "#ff2930",
    min: 100,
    max: 400,
  },
  {
    id: "NPD",
    name: "NDP",
    initialValue: 176,
    color: "#ff9d26",
    min: 100,
    max: 300,
  },
  {
    id: "GRN",
    name: "Green",
    initialValue: 40,
    color: "#4fc957",
    min: 10,
    max: 100,
  },
  {
    id: "BQ",
    name: "Bloc Québécois",
    initialValue: 78.6,
    color: "#143278",
    min: 50,
    max: 150,
  },
  {
    id: "PPC",
    name: "People's Party",
    initialValue: 25,
    color: "#8c4bcc",
    min: 0,
    max: 100,
  },
];

const Simulation = () => {
  const [selectedTab, setSelectedTab] = useState("2025");

  const [voteShares, setVoteShares] = useState(
    Object.fromEntries(parties.map((party) => [party.id, party.initialValue]))
  );
  const [seats, setSeats] = useState({});
  const [isDisabled, setIsDisabled] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [electionResult, setElectionResult] = useState([]);

  const calculateSeats = (newVoteShares) => {
    const seatCalculations = {
      LIB: Math.round(
        -141.76150553675862 +
          (newVoteShares.LIB / 1000) * 845.9970737189271 +
          -494.94840282935206 * (newVoteShares.CON / 1000 - 0.42025) +
          -94.97138834531596 * (newVoteShares.NPD / 1000 - 0.1734) +
          -151.21697862090494 * (newVoteShares.GRN / 1000 - 0.0379) +
          -569.07860919994 * (newVoteShares.BQ / 1000 - 0.07969) +
          31.409896309801315 * (newVoteShares.PPC / 1000 - 0.02599)
      ),
      CON: Math.round(
        -60.97970352091527 +
          (newVoteShares.CON / 1000) * 634.62225617865 +
          -639.8080390326106 * (newVoteShares.LIB / 1000 - 0.24094) +
          -243.4626598552652 * (newVoteShares.NPD / 1000 - 0.1734) +
          -175.13008588045585 * (newVoteShares.GRN / 1000 - 0.0379) +
          -172.21551695920533 * (newVoteShares.BQ / 1000 - 0.07969) +
          -32.41017667684897 * (newVoteShares.PPC / 1000 - 0.02599)
      ),
      NPD: Math.round(
        -35.398635538445724 +
          (newVoteShares.NPD / 1000) * 320.127525747861 +
          -125.54042033930601 * (newVoteShares.LIB / 1000 - 0.24094) +
          -114.85610301652285 * (newVoteShares.CON / 1000 - 0.42025) +
          4.597847850073185 * (newVoteShares.GRN / 1000 - 0.0379) +
          61.80717861168914 * (newVoteShares.BQ / 1000 - 0.07969) +
          0.24961068802477962 * (newVoteShares.PPC / 1000 - 0.02599)
      ),
      GRN: Math.round(
        (0.9282685925906278 +
          (newVoteShares.GRN / 1000) * 16.72062194045644 +
          0.9763677028284351 * (newVoteShares.LIB / 1000 - 0.24094) +
          -4.655531054342929 * (newVoteShares.CON / 1000 - 0.42025) +
          1.4499444208008379 * (newVoteShares.NPD / 1000 - 0.1734) +
          21.301996470141564 * (newVoteShares.BQ / 1000 - 0.07969) +
          0.007046103002861473 * (newVoteShares.PPC / 1000 - 0.02599)) *
          1.5
      ),
      BQ: Math.round(
        -13.460874084879158 +
          (newVoteShares.BQ / 1000) * 658.1849510773179 +
          -81.62498204983976 * (newVoteShares.LIB / 1000 - 0.24094) +
          -20.162219278431873 * (newVoteShares.CON / 1000 - 0.42025) +
          16.856578031917557 * (newVoteShares.NPD / 1000 - 0.1734) +
          305.0285947108327 * (newVoteShares.GRN / 1000 - 0.0379) +
          0.7436235760256702 * (newVoteShares.PPC / 1000 - 0.02599)
      ),
      PPC: Math.round(
        0.0 +
          (newVoteShares.PPC / 1000) * 0.0 +
          0.0 * (newVoteShares.LIB / 1000 - 0.24094) +
          0.0 * (newVoteShares.CON / 1000 - 0.42025) +
          0.0 * (newVoteShares.NPD / 1000 - 0.1734) +
          0.0 * (newVoteShares.GRN / 1000 - 0.0379) +
          0.0 * (newVoteShares.BQ / 1000 - 0.07969)
      ),
    };

    const minSeats = { LIB: 25, CON: 139, NPD: 7, GRN: 0, BQ: 27, PPC: 0 };
    const adjustedSeats = Object.fromEntries(
      Object.entries(seatCalculations).map(([party, seats]) => [
        party,
        Math.max(seats, minSeats[party]),
      ])
    );

    const totalSeats = 338;
    const totalCalculatedSeats = Object.values(adjustedSeats).reduce(
      (sum, seats) => sum + seats,
      0
    );

    return Object.fromEntries(
      Object.entries(adjustedSeats).map(([party, seats]) => [
        party,
        Math.round((seats / totalCalculatedSeats) * totalSeats),
      ])
    );
  };

  const handleSliderChange = (partyId, newValue) => {
    const party = parties.find((p) => p.id === partyId);
    const clampedValue = Math.max(party.min, Math.min(party.max, newValue));

    setVoteShares((prevShares) => {
      const change = clampedValue - prevShares[partyId];
      const newTotalVoteShare =
        Object.values(prevShares).reduce((sum, value) => sum + value / 10, 0) +
        change / 10;

      if (newTotalVoteShare > 100) {
        const maxAllowedChange = (100 - (newTotalVoteShare - change / 10)) * 10;
        return {
          ...prevShares,
          [partyId]: prevShares[partyId] + maxAllowedChange,
        };
      } else {
        return { ...prevShares, [partyId]: clampedValue };
      }
    });
  };

  const handleSliderChangeEnd = () => {
    const newSeats = calculateSeats(voteShares);
    setSeats(newSeats);

    const result = parties.map((party) => ({
      label: party.id,
      seats: newSeats[party.id],
      votes: (voteShares[party.id] / 10).toFixed(1),
      color: party.color,
    }));

    setElectionResult(result);
  };

  const totalVoteShare = Object.values(voteShares).reduce(
    (sum, value) => sum + value / 10,
    0
  );

  useEffect(() => {
    setIsDisabled(
      Object.fromEntries(
        parties.map((party) => [
          party.id,
          totalVoteShare >= 100 && voteShares[party.id] >= party.max,
        ])
      )
    );
  }, [voteShares, totalVoteShare]);

  useEffect(() => {
    const initialSeats = calculateSeats(voteShares);
    setSeats(initialSeats);
    setIsInitialized(true);

    const result = parties.map((party) => ({
      label: party.id,
      seats: initialSeats[party.id],
      votes: (voteShares[party.id] / 10).toFixed(1),
      color: party.color,
    }));

    setElectionResult(result);
  }, []);

  const getResult = () => {
    if ((seats.LIB == 0) & (seats.CONS == 0)) return "No seats";
    if (seats.LIB >= 186) return `Liberal Majority`;
    if (seats.CON >= 186) return `Conservative Majority`;
    if (seats.LIB === seats.CON) return "LPC-CPC tie";
    if (seats.LIB > seats.CON) return "Liberal Minority";
    return "Conservative Minority";
  };

  const getThumbColor = (partyName) => {
    if (partyName === "Liberal") return "bg-[#ff2930] border-[#ff2930]";
    if (partyName === "Conservative") return "bg-[#15A6FF] border-[#15A6FF]";
    if (partyName === "NDP") return "bg-[#ff9d26] border-[#ff9d26]";
    if (partyName === "Green") return "bg-[#4fc957] border-[#4fc957]";
    if (partyName === "Bloc Québécois") return "bg-[#143278] border-[#143278]";
    if (partyName === "People's Party") return "bg-[#8c4bcc] border-[#8c4bcc]";
    return "bg-[#808080] border-[#808080]";
  };

  return (
    <>
      <div className="p-4 max-w-7xl mx-64">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/5 pl-8">
            <h2 className="text-xl font-semibold font-degular mb-3 text-gray-700">
              VOTE SHARE
            </h2>
            {parties.map((party) => (
              <div key={party.id} className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-editorial-light text-2xl text-gray-800">
                    {party.name}
                  </p>
                  <div className="flex items-center">
                    <span className="font-mono text-sm mr-2 w-12 text-right">
                      {(voteShares[party.id] / 10).toFixed(1)}%
                    </span>
                    <div
                      className="w-4 h-4 rounded-full mr-2 border"
                      style={{
                        borderColor: party.color,
                        backgroundColor: `${party.color}59`,
                        cursor: "grab",
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.cursor = "grab"; // Prevent finger clenching
                        e.currentTarget.style.transform = "none"; // Prevent shrinking effect
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.cursor = "grab"; // Ensure cursor stays as grab
                        e.currentTarget.style.transform = "none"; // Ensure no transformation after mouse up
                      }}
                    ></div>
                    <span className="font-mono text-sm font-semibold w-4 text-center">
                      {seats[party.id] || 0}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full pr-12">
                    <Slider
                      step={1}
                      renderThumb={(props) => (
                        <div
                          {...props}
                          className={`group p-2 top-1/2 ${getThumbColor(
                            party.name
                          )} bg-opacity-35 border shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing select-none`}
                        />
                      )}
                      aria-label={party.name}
                      hideValue={true}
                      maxValue={party.max}
                      minValue={party.min}
                      hideThumb={false}
                      defaultValue={party.initialValue}
                      value={voteShares[party.id]}
                      onChange={(value) => handleSliderChange(party.id, value)}
                      onChangeEnd={handleSliderChangeEnd}
                      disabled={isDisabled[party.id]}
                      className="max-w-full"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6">
              <div className="flex items-center justify-between mb-1">
                <p className="font-editorial-light text-xl font-light">
                  Total Vote Share
                </p>
                <span className="font-mono text-sm w-12 text-right">
                  {totalVoteShare.toFixed(1)}%
                </span>
              </div>
              <Slider
                step={0.1}
                maxValue={100}
                minValue={56.3}
                value={totalVoteShare}
                readOnly
                aria-label="Total Vote Share"
                hideThumb={false}
                className="max-w-full"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-semibold mb-3 text-center font-degular text-gray-700">
              SEAT DISTRIBUTION
            </h2>
            <div className="justify-center items-center mt-12">
              {isInitialized && <DynamicSeatChart seats={seats} />}
              <div
                className="mt-2 text-2xl font-degular  text-center text-gray-700"
                style={{ marginTop: "-12rem" }}
              >
                {getResult()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="font-sans px-12 py-2 relative max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-left font-degular text-lg text-gray-600">
            You might notice that the popular vote is not completly proportional
            to the seat count. This is because Canada, like many countries with
            roots in the British parliamentary system, employs a
            first-past-the-post (FPTP) voting system for its federal and most
            provincial elections. This "winner-takes-all" system, while
            straightforward in its implementation, has far-reaching implications
            for political representation, party strategies, and voter behavior.
          </p>
          <br />
          <p className="text-left font-degular text-lg text-gray-600">
            In an FPTP system, the candidate who receives the most votes in a
            given constituency wins that seat, regardless of whether they
            achieve a majority. Mathematically, we can express this as:
          </p>
          <BlockMath
            className=" text-gray-600"
            style={{ color: "#2d3748" }}
            math="\color{#5b6573} C = \{c_1, c_2, ..., c_n\}"
          />
          <BlockMath math="\color{#5b6573}V = \{v_1, v_2, ..., v_m\}" />
          <p className="text-left font-degular text-lg text-gray-600">
            Let <InlineMath math="\color{#5b6573} \small  f: V \rightarrow C" />{" "}
            be the function mapping voters to their chosen candidates.
          </p>
          <p className="text-left font-degular text-lg text-gray-600">
            The winner <InlineMath math="\color{#5b6573} \small  w" /> is
            determined by:
          </p>
          <BlockMath math="\color{#5b6573}w = \argmax_{c \in C} |\{v \in V : f(v) = c\}| " />

          <p className="text-left font-degular text-lg text-gray-600">
            The probabilistic nature of FPTP becomes apparent when we consider
            the distribution of votes across multiple constituencies. Let's
            consider a simplified model with three parties: A, B, and C.
          </p>
          <p className="text-left font-degular text-lg text-gray-600">
            Assumeing the national support for these parties is Party A: 40%,
            Party B: 35% and Party C: 25%
          </p>
          <br />
          <p className="text-left font-degular text-lg text-gray-600">
            In a perfectly proportional system, these percentages would
            translate directly to seat allocations. However, FPTP introduces
            significant variance. To model this, we can use a multinomial
            distribution for each constituency:
          </p>
          <BlockMath math="\color{#5b6573}P(X_A = k_A, X_B = k_B, X_C = k_C) = \frac{n!}{k_A!k_B!k_C!} p_A^{k_A} p_B^{k_B} p_C^{k_C}" />
          <p className="text-left font-degular text-lg text-gray-600">
            Where <InlineMath math="\color{#5b6573} \small  X_i" /> is the
            number of votes for party{" "}
            <InlineMath math="\color{#5b6573} \small  i" />,{" "}
            <InlineMath math="\color{#5b6573} \small  k_i" /> is a specific
            outcome, <InlineMath math="\color{#5b6573} \small  n" /> is the
            total number of voters, and{" "}
            <InlineMath math="\color{#5b6573} \small  p_i" /> is the probability
            of voting for party <InlineMath math="\color{#5b6573} \small  i" />.
          </p>
          <br />
          <p className="text-left font-degular text-lg text-gray-600">
            This model reveals that even with consistent national support, local
            results can vary significantly, leading to disproportionate seat
            allocations.
          </p>
          <br />
          <p className="text-left font-degular text-lg text-gray-600">
            The FPTP system often encourages strategic voting, where voters cast
            ballots not for their preferred candidate, but for the candidate
            most likely to defeat their least preferred option. This phenomenon
            can be modeled using game theory, specifically as a form of
            Duverger's law.
          </p>
          <p className="text-left font-degular text-lg text-gray-600">
            Let <InlineMath math="\color{#5b6573} \small  U_i(j)" /> represent
            voter <InlineMath math="\color{#5b6573} \small  i" />
            's utility for candidate{" "}
            <InlineMath math="\color{#5b6573} \small  j" /> winning. A strategic
            voter might choose to vote for candidate{" "}
            <InlineMath math="\color{#5b6573} \small  k" /> instead of their
            preferred candidate <InlineMath math="\color{#5b6573} \small  j" />{" "}
            if:
          </p>
          <BlockMath math="\color{#5b6573}P(k \text{ wins} | i \text{ votes for } k) \cdot U_i(k) > P(j \text{ wins} | i \text{ votes for } j) \cdot U_i(j)" />
          <p className="text-left font-degular text-lg text-gray-600">
            Where{" "}
            <InlineMath math="\color{#5b6573} \small   \small P(x \text{ wins} | i \text{ votes for } y)" />{" "}
            represents the probability of{" "}
            <InlineMath math="\color{#5b6573} \small  x" /> winning given{" "}
            <InlineMath math="\color{#5b6573} \small  i" />
            's vote for <InlineMath math="\color{#5b6573} \small  y" />.
          </p>
          <br />
          <p className="text-left font-degular text-lg text-gray-600">
            In the 2021 federal election, this system resulted in the Liberal
            Party of Canada winning 160 seats to form a minority government,
            despite receiving fewer votes than the Conservative Party of Canada,
            which won 119 seats.
          </p>
          <br />
          <p className="text-left font-degular text-lg text-gray-600">
            Below you can explore election results over the years and see how
            FPTP has impacted the outcomes. Clicking on a party will display
            their results in that election, including whether they over or
            underperformed compared to their expected proportional of seats.
            You'll notice that the Bloc Québécois constantly overform, while the
            the Green Party are perennial underperformers. Why do you think that
            is?
          </p>
        </div>
      </div>

      <IconTabs
        center={true}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="flex justify-center">
        <Example
          width={700}
          height={700}
          year={selectedTab}
          electionResult={electionResult}
        />
      </div>
    </>
  );
};

export default Simulation;
