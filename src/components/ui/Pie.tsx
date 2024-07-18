/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from "react";
import Pie, { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie";
import { Group } from "@visx/group";
import { GradientPinkBlue } from "@visx/gradient";
import { animated, useTransition, interpolate } from "@react-spring/web";

interface PartyInfo {
  label: string;
  seats: number;
  votes: number;
  color: string;
}
const parties: PartyInfo[] = [
  { label: "CPC", seats: 121, votes: 34.34, color: "rgba(23,165,255,0.7)" },
  { label: "LPC", seats: 157, votes: 33.12, color: "rgba(255,41,48,0.7)" },
  { label: "NDP", seats: 24, votes: 15.98, color: "rgba(255,157,38,0.7)" },
  { label: "BQ", seats: 32, votes: 7.63, color: "rgba(21,50,120,0.7)" },
  { label: "Green", seats: 3, votes: 6.55, color: "rgba(79,201,87,0.7)" },
  { label: "PP", seats: 0, votes: 1.62, color: "rgba(140,75,204,0.7)" },
];

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
};

export default function Example({
  width,
  height,
  margin = defaultMargin,
  animate = true,
  borderOpacity = 0.9,
}: PieProps) {
  const [selectedParty, setSelectedParty] = useState<string | null>(null);

  if (width < 10) return null;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;

  return (
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
            />
          )}
        </Pie>
        <Pie
          data={
            selectedParty
              ? parties.filter(({ label }) => label === selectedParty)
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
            />
          )}
        </Pie>
      </Group>
      {animate && (
        <text
          textAnchor="end"
          x={width - 16}
          y={height - 16}
          fill="white"
          fontSize={11}
          fontWeight={300}
          pointerEvents="none"
        >
          Click segments to update
        </text>
      )}
    </svg>
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
}: AnimatedPieProps<Datum>) {
  const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  });
  return transitions((props, arc, { key }) => {
    const [centroidX, centroidY] = path.centroid(arc);
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

    return (
      <g key={key}>
        <animated.path
          // compute interpolated path d attribute from intermediate angle values
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
                dy="-0.5em"
                fontSize={9}
                fontWeight="bold"
                textAnchor="middle"
                pointerEvents="none"
              >
                {getKey(arc)}
              </text>
            )}
            <text
              fill="white"
              x={centroidX}
              y={centroidY}
              dy={isOuter ? "0.5em" : "0.0em"}
              fontSize={9}
              textAnchor="middle"
              pointerEvents="none"
            >
              {getLabel(arc)}
            </text>
          </animated.g>
        )}
      </g>
    );
  });
}
