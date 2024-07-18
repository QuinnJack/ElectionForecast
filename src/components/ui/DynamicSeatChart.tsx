import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";
import { RadialBarChart, PolarRadiusAxis, RadialBar } from "recharts";
import { Label } from "./label";

const DynamicSeatChart = ({ seats }) => {
  const chartConfig = {
    CON: {
      label: "CPC",
      color: "hsl(var(--chart-2))",
    },
    LIB: {
      label: "LPC",
      color: "hsl(var(--chart-1))",
    },

    NPD: {
      label: "NDP",
      color: "hsl(var(--chart-3))",
    },
    BQ: {
      label: "BQ",
      color: "hsl(var(--chart-4))",
    },
    GRN: {
      label: "GPC",
      color: "hsl(var(--chart-5))",
    },
    PPC: {
      label: "PPC",
      color: "hsl(var(--chart-6))",
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
      <div className="flex  items-center ">
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
                className="stroke-transparent stroke-2"
              />
            ))}
          </RadialBarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default DynamicSeatChart;
