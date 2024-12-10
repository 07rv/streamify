"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useMemo } from "react";
import { format } from "date-fns";
import { useDateTimeRangeStore, useUsersStore } from "@/store/store";

import { generateDummyUserChartData } from "@/store/action";

const chartConfig = {
  totalUser: {
    label: "Total User",
    color: "hsl(var(--chart-1))",
  },
  activeUser: {
    label: "Active User",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const LineGraph = () => {
  const { state: chartData } = useUsersStore();
  const { state: dateTimeRange } = useDateTimeRangeStore();

  useEffect(() => {
    generateDummyUserChartData();
  }, [dateTimeRange.endDate, dateTimeRange.startDate]);

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
      <CardHeader>
        <CardTitle>User</CardTitle>
        <CardDescription>{formattedDateRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData.chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="labels"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="totalUser"
              type="monotone"
              stroke="var(--color-totalUser)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-totalUser)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="bottom"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
            <Line
              dataKey="activeUser"
              type="monotone"
              stroke="var(--color-activeUser)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-activeUser)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="bottom"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing comparsion of total users and active users
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LineGraph;
