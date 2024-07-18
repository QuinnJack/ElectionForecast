import React, { useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { Slider } from "@nextui-org/react";
import DynamicSeatChart from "./DynamicSeatChart";

const parties = [
  {
    id: "CON",
    name: "Conservative",
    initialValue: 420,
    color: "#12A7FF",
    min: 300,
    max: 600,
  },

  {
    id: "LIB",
    name: "Liberal",
    initialValue: 240,
    color: "#ff2930",
    min: 100,
    max: 400,
  },

  {
    id: "NPD",
    name: "NDP",
    initialValue: 173,
    color: "#ff9d26",
    min: 100,
    max: 300,
  },
  {
    id: "GRN",
    name: "Green",
    initialValue: 37,
    color: "#4fc957",
    min: 10,
    max: 100,
  },
  {
    id: "BQ",
    name: "Bloc Québécois",
    initialValue: 79,
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

const Simulator = () => {
  const [voteShares, setVoteShares] = useState(
    Object.fromEntries(parties.map((party) => [party.id, party.initialValue]))
  );
  const [seats, setSeats] = useState({});
  const [isDisabled, setIsDisabled] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

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
    setSeats(calculateSeats(voteShares));
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
    // Calculate and set initial seats
    const initialSeats = calculateSeats(voteShares);
    setSeats(initialSeats);
    console.log(isInitialized);
    setIsInitialized(true);
    console.log("Initial Seats: ", initialSeats); // Debugging log
  }, []); // Empty dependency array ensures this runs only once on mount

  const getResult = () => {
    if ((seats.LIB == 0) & (seats.CONS == 0)) return "No seats";
    if (seats.LIB >= 186)
      return `Liberal Majority${seats.LIB < 180 ? " " : ""}`;
    if (seats.CON >= 186)
      return `Conservative Majority${seats.CON < 180 ? "" : ""}`;
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
    return "bg-[#808080] border-[#808080]"; // Default color
  };

  return (
    <div className="p-4 max-w-7xl mx-64">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/5 pl-8">
          <h2 className="text-xl font-semibold font-degular mb-3 text-gray-800">
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
                      backgroundColor: `${party.color}59`, // 35% opacity
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
                        )} bg-opacity-35 border shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing`}
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
                    onChangeEnd={handleSliderChangeEnd} // Added this line
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
          <h2 className="text-xl font-semibold mb-3 text-center font-degular text-gray-800">
            SEAT DISTRIBUTION
          </h2>
          <div className="justify-center items-center mt-12">
            {isInitialized && <DynamicSeatChart seats={seats} />}
            <div
              className="mt-2 text-xl font-degular font-semibold text-center"
              style={{ marginTop: "-12rem" }}
            >
              {getResult().toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Simulator;
