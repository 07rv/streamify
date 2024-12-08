"use client";

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
import { useDateTimeRangeStore, useSongStreamStore } from "@/store/store";
import { format } from "date-fns";
import { useMemo } from "react";

const chartConfig: ChartConfig = {
  views: { label: "Streams" },
  desktop: { label: "Desktop" },
};

const BarGraph = () => {
  const { state: dateTimeRange } = useDateTimeRangeStore();
  const { state: streamsList } = useSongStreamStore();

  const formattedDateRange = useMemo(
    () =>
      `${format(dateTimeRange?.startDate, "dd MMM yyyy")} - ${format(
        dateTimeRange?.endDate,
        "dd MMM yyyy"
      )}`,
    [dateTimeRange]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-stretch border-b p-0">
        <div className="flex-1 flex flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Top 5 Streamed Songs</CardTitle>
          <CardDescription>
            Showing top streamed from {formattedDateRange}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            data={streamsList.songs}
            margin={{ left: 12, right: 12 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="songName"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => value}
                />
              }
            />
            <Bar dataKey="streams" fill="gray" radius={6}>
              <LabelList
                dataKey="streams"
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
