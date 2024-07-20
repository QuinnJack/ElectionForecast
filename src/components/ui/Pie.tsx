import React, { useState, useEffect } from "react";
import Pie, { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie";
import { Group } from "@visx/group";
import { animated, useTransition, interpolate } from "@react-spring/web";
import IconTabs from "./IconTabs";

interface PartyInfo {
  label: string;
  seats: number;
  votes: number;
  color: string;
}

interface ElectionData {
  [year: number]: PartyInfo[];
}

const electionData = {
  totalSeats: {
    2024: 343,
    2021: 338,
    2019: 338,
    2015: 338,
    2011: 308,
    2008: 308,
    2006: 308,
    2004: 308,
  },
  2025: [
    { label: "PP", seats: 0, votes: 4.9, color: "rgba(140,75,204,0.7)" },
    { label: "GPC", seats: 2, votes: 2.3, color: "rgba(79,201,87,0.7)" },
    { label: "BQ", seats: 32, votes: 7.6, color: "rgba(21,50,120,0.7)" },
    { label: "NDP", seats: 25, votes: 17.8, color: "rgba(255,157,38,0.7)" },
    { label: "LPC", seats: 160, votes: 32.6, color: "rgba(255,41,48,0.7)" },
    { label: "CPC", seats: 119, votes: 33.7, color: "rgba(23,165,255,0.7)" },
  ],
  2021: [
    { label: "PP", seats: 0, votes: 4.9, color: "rgba(140,75,204,0.7)" },
    { label: "GPC", seats: 2, votes: 2.3, color: "rgba(79,201,87,0.7)" },
    { label: "BQ", seats: 32, votes: 7.6, color: "rgba(21,50,120,0.7)" },
    { label: "NDP", seats: 25, votes: 17.8, color: "rgba(255,157,38,0.7)" },
    { label: "LPC", seats: 160, votes: 32.6, color: "rgba(255,41,48,0.7)" },
    { label: "CPC", seats: 119, votes: 33.7, color: "rgba(23,165,255,0.7)" },
  ],
  2019: [
    { label: "PP", seats: 0, votes: 1.6, color: "rgba(140,75,204,0.7)" },
    { label: "GPC", seats: 3, votes: 6.5, color: "rgba(79,201,87,0.7)" },
    { label: "BQ", seats: 32, votes: 7.6, color: "rgba(21,50,120,0.7)" },
    { label: "NDP", seats: 24, votes: 16.0, color: "rgba(255,157,38,0.7)" },
    { label: "LPC", seats: 157, votes: 33.1, color: "rgba(255,41,48,0.7)" },
    { label: "CPC", seats: 121, votes: 34.3, color: "rgba(23,165,255,0.7)" },
  ],
  2015: [
    { label: "GPC", seats: 1, votes: 3.4, color: "rgba(79,201,87,0.7)" },
    { label: "BQ", seats: 10, votes: 4.7, color: "rgba(21,50,120,0.7)" },
    { label: "NDP", seats: 44, votes: 19.7, color: "rgba(255,157,38,0.7)" },
    { label: "LPC", seats: 184, votes: 39.5, color: "rgba(255,41,48,0.7)" },
    { label: "CPC", seats: 99, votes: 31.9, color: "rgba(23,165,255,0.7)" },
  ],
  2011: [
    { label: "GPC", seats: 1, votes: 3.9, color: "rgba(79,201,87,0.7)" },
    { label: "BQ", seats: 4, votes: 6.0, color: "rgba(21,50,120,0.7)" },
    { label: "NDP", seats: 103, votes: 30.6, color: "rgba(255,157,38,0.7)" },
    { label: "LPC", seats: 34, votes: 18.9, color: "rgba(255,41,48,0.7)" },
    { label: "CPC", seats: 166, votes: 39.6, color: "rgba(23,165,255,0.7)" },
  ],
  2008: [
    { label: "GPC", seats: 0, votes: 6.8, color: "rgba(79,201,87,0.7)" },
    { label: "BQ", seats: 49, votes: 10.0, color: "rgba(21,50,120,0.7)" },
    { label: "NDP", seats: 37, votes: 18.2, color: "rgba(255,157,38,0.7)" },
    { label: "LPC", seats: 77, votes: 26.2, color: "rgba(255,41,48,0.7)" },
    { label: "CPC", seats: 143, votes: 37.6, color: "rgba(23,165,255,0.7)" },
  ],
  2006: [
    { label: "GPC", seats: 0, votes: 4.5, color: "rgba(79,201,87,0.7)" },
    { label: "BQ", seats: 51, votes: 10.5, color: "rgba(21,50,120,0.7)" },
    { label: "NDP", seats: 29, votes: 17.5, color: "rgba(255,157,38,0.7)" },
    { label: "LPC", seats: 103, votes: 30.2, color: "rgba(255,41,48,0.7)" },
    { label: "CPC", seats: 124, votes: 36.3, color: "rgba(23,165,255,0.7)" },
  ],
  2004: [
    { label: "GPC", seats: 0, votes: 4.3, color: "rgba(79,201,87,0.7)" },
    { label: "BQ", seats: 54, votes: 12.4, color: "rgba(21,50,120,0.7)" },
    { label: "NDP", seats: 19, votes: 15.7, color: "rgba(255,157,38,0.7)" },
    { label: "LPC", seats: 135, votes: 36.7, color: "rgba(255,41,48,0.7)" },
    { label: "CPC", seats: 99, votes: 29.6, color: "rgba(23,165,255,0.7)" },
  ],
};

// accessor functions
const seats = (d: PartyInfo) => d.seats;
const votes = (d: PartyInfo) => d.votes;

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export type PieProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
  animate?: boolean;
  borderOpacity?: number;
  year?: number;
};

export default function Example({
  width,
  height,
  margin = defaultMargin,
  animate = true,
  borderOpacity = 0.9,
  year = 2019,
}: PieProps) {
  const [selectedParty, setSelectedParty] = useState<string | null>(null);
  const [parties, setParties] = useState<PartyInfo[]>(electionData[year] || []);
  const totalSeats = electionData.totalSeats[year] || 0;

  useEffect(() => {
    setParties(electionData[year] || []);
  }, [year]);

  if (width < 10) return null;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;

  return (
    <>
      <svg width={width} height={height}>
        <rect rx={14} width={width} height={height} fill="#ffffff" />
        <Group top={centerY + margin.top} left={centerX + margin.left}>
          <Pie
            data={
              selectedParty
                ? parties.filter(({ label }) => label === selectedParty)
                : parties
            }
            pieValue={votes}
            outerRadius={radius}
            innerRadius={radius - donutThickness}
            cornerRadius={3}
            padAngle={0.005}
          >
            {(pie) => (
              <AnimatedPie<PartyInfo>
                {...pie}
                animate={animate}
                getKey={(arc) => arc.data.label}
                onClickDatum={({ data: { label } }) => {
                  if (animate) {
                    setSelectedParty(
                      selectedParty && selectedParty === label ? null : label
                    );
                  }
                }}
                getColor={(arc) => arc.data.color}
                getLabel={(arc) => `${arc.data.votes}%`}
                isOuter={true}
                borderOpacity={borderOpacity}
                radius={radius}
                donutThickness={donutThickness}
                selectedParty={selectedParty}
                totalSeats={totalSeats}
              />
            )}
          </Pie>
          <Pie
            data={
              selectedParty
                ? parties.filter(({ label }) => label === selectedParty)
                    .length > 0
                  ? parties.filter(({ label }) => label === selectedParty)
                  : [
                      {
                        label: "PP",
                        seats: 1,
                        votes: 4.94,
                        color: "rgba(140,75,204,0.7)",
                      },
                    ]
                : parties
            }
            pieValue={seats}
            pieSortValues={() => -1}
            outerRadius={radius - donutThickness * 1.3}
          >
            {(pie) => (
              <AnimatedPie<PartyInfo>
                {...pie}
                animate={animate}
                getKey={({ data: { label } }) => label}
                onClickDatum={({ data: { label } }) => {
                  if (animate) {
                    setSelectedParty(
                      selectedParty && selectedParty === label ? null : label
                    );
                  }
                }}
                getColor={(arc) => arc.data.color}
                getLabel={(arc) => `${arc.data.seats} seats`}
                isOuter={false}
                borderOpacity={borderOpacity}
                radius={radius - donutThickness * 1.3}
                donutThickness={donutThickness}
                selectedParty={selectedParty}
                totalSeats={totalSeats}
              />
            )}
          </Pie>
        </Group>
      </svg>
    </>
  );
}

// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number };

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
});
const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
  startAngle,
  endAngle,
  opacity: 1,
});

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
  animate?: boolean;
  getKey: (d: PieArcDatum<Datum>) => string;
  getColor: (d: PieArcDatum<Datum>) => string;
  getLabel: (d: PieArcDatum<Datum>) => string;
  onClickDatum: (d: PieArcDatum<Datum>) => void;
  isOuter: boolean;
  delay?: number;
  borderOpacity?: number;
  radius: number;
  donutThickness: number;
  selectedParty: string | null;
  totalSeats: number;
};

function AnimatedPie<Datum>({
  animate,
  arcs,
  path,
  getKey,
  getColor,
  getLabel,
  onClickDatum,
  isOuter,
  borderOpacity = 1,
  radius,
  donutThickness,
  selectedParty,
  totalSeats,
}: AnimatedPieProps<Datum>) {
  const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  });

  // Calculate expected seats based on votes
  const calculateExpectedSeats = (votes: number) =>
    Math.floor((votes / 100) * totalSeats);

  return transitions((props, arc, { key }) => {
    const [centroidX, centroidY] = path.centroid(arc);
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

    const data = arc.data as PartyInfo;

    const isSelected = selectedParty === data.label;
    const expandedRadius = isSelected ? radius : radius - donutThickness;
    const innerRadius = isSelected ? 0 : radius - donutThickness;

    const expectedSeats = calculateExpectedSeats(data.votes);

    // Determine text color for selected state
    const selectedTextColor = data.label === "PP" ? "#68438c" : "white";

    return (
      <>
        <g key={key}>
          <animated.path
            d={interpolate(
              [props.startAngle, props.endAngle],
              (startAngle, endAngle) =>
                path({
                  ...arc,
                  startAngle,
                  endAngle,
                })
            )}
            fill={getColor(arc)}
            onClick={() => onClickDatum(arc)}
            onTouchStart={() => onClickDatum(arc)}
            stroke={getColor(arc)}
            strokeWidth={1.5}
            strokeOpacity={borderOpacity}
          />
          {hasSpaceForLabel && (
            <animated.g style={{ opacity: props.opacity }}>
              {isOuter && (
                <text
                  fill="white"
                  x={centroidX}
                  y={centroidY}
                  fontSize={15}
                  fontWeight="bold"
                  font-family="EditorialNewLight"
                  textAnchor="middle"
                  pointerEvents="none"
                >
                  {getKey(arc)}
                </text>
              )}
              <text
                fill="white"
                x={centroidX}
                font-family="degular"
                y={centroidY}
                dy={isOuter ? "1.1em" : "0.0em"}
                fontSize={isOuter ? 13 : 16}
                textAnchor="middle"
                pointerEvents="none"
              >
                {getLabel(arc)}
              </text>
            </animated.g>
          )}
          {isSelected && (
            <animated.g style={{ opacity: props.opacity }}>
              <text
                fill={selectedTextColor}
                x={0}
                y={0}
                fontSize={18}
                fontWeight="bold"
                textAnchor="middle"
              ></text>
              <text
                fill={selectedTextColor}
                x={0}
                y={20}
                fontSize={18}
                textAnchor="middle"
                font-family="degular"
              >
                {`The ${data.label} ${
                  data.seats >= expectedSeats
                    ? "overperformed"
                    : "underperformed"
                } by winning ${data.seats} seats with ${data.votes}% of votes.`}
              </text>
              <text
                fill={selectedTextColor}
                x={0}
                y={40}
                fontSize={18}
                textAnchor="middle"
                font-family="degular"
              >
                {`Statistically, you would expect the ${data.label} to win ${expectedSeats} seats.`}
              </text>
            </animated.g>
          )}
        </g>
      </>
    );
  });
}
