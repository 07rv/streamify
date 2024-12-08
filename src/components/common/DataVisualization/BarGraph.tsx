"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDateTimeRangeStore } from "@/store/store";
import { format } from "date-fns";

const chartData = [
  { name: "song1", desktop: 222, artist: "1" },
  { name: "song2", desktop: 97, artist: "2" },
  { name: "song3", desktop: 167, artist: "3" },
  { name: "song4", desktop: 242, artist: "4" },
  { name: "song5", desktop: 373, artist: "5" },
];

const chartConfig = {
  views: {
    label: "Streams",
  },
  desktop: {
    label: "Desktop",
  },
} satisfies ChartConfig;

const BarGraph = () => {
  const { state } = useDateTimeRangeStore();

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Top 5 Streamed Songs</CardTitle>
          <CardDescription>
            Showing top Streamed form {format(state?.startDate, "dd MMM yyyy")}{" "}
            - {format(state?.endDate, "dd MMM yyyy")}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return value;
                  }}
                />
              }
            />
            <Bar radius={6} dataKey="desktop" fill={"gray"}>
              <LabelList
                dataKey="desktop"
                position="center"
                offset={8}
                className="fill-slate-200"
                fontSize={12}
              />
              <LabelList
                dataKey="artist"
                position="insideTop"
                offset={8}
                className="fill-slate-200"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarGraph;
