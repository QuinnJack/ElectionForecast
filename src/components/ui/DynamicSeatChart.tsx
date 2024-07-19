import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";
import { RadialBarChart, PolarRadiusAxis, RadialBar } from "recharts";
import { Label } from "./label";

// Function to darken an HSL color
const darkenHSL = (hsl, amount) => {
  console.log(hsl);
  const [h, s, l] = hsl.match(/\d+/g).map(Number);

  return `hsl(${h}, ${s}%, ${Math.max(0, l - amount)}%)`;
};
const DynamicSeatChart = ({ seats }) => {
  const chartConfig = {
    CON: {
      label: "CPC",
      color: "hsl(var(--chart-2))",
      darkendColor: "hsl(206.3, 100%, 57.431%)",
    },
    LIB: {
      label: "LPC",
      color: "hsl(var(--chart-1))",
      darkendColor: "hsl(359.92, 100%, 58.346%)",
    },
    NPD: {
      label: "NDP",
      color: "hsl(var(--chart-3))",
      darkendColor: "hsl(30.922, 100%, 57.710%)",
    },
    BQ: {
      label: "BQ",
      color: "hsl(var(--chart-4))",
      darkendColor: "hsl(223.06, 27.116%, 39.690%)",
    },
    GRN: {
      label: "GPC",
      color: "hsl(var(--chart-5))",
      darkendColor: "hsl(121.15, 50.986%, 55.701%)",
    },
    PPC: {
      label: "PPC",
      color: "hsl(var(--chart-6))",
      darkendColor: "hsl(270.4, 56.126%, 54.710%)",
    },
  };

  const chartData = [
    {
      CON: seats.CON || 0,
      LIB: seats.LIB || 0,
      NPD: seats.NPD || 0,
      BQ: seats.BQ || 0,
      GRN: seats.GRN || 0,
      PPC: seats.PPC || 0,
    },
  ];

  const totalSeats = Object.values(seats).reduce(
    (sum, value) => sum + value,
    0
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <ChartContainer
          config={chartConfig}
          className="aspect-square w-full max-w-[4000px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={160}
            outerRadius={260}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 32}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalSeats.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-muted-foreground"
                        >
                          Seats
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>

            {Object.entries(chartConfig).map(([key, config]) => (
              <RadialBar
                key={key}
                dataKey={key}
                stackId="a"
                cornerRadius={5}
                fill={config.color}
                stroke={config.darkendColor}
                strokeWidth={1}
                className="stroke-transparent stroke-1"
              />
            ))}
          </RadialBarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default DynamicSeatChart;
