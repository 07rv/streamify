"use client";

import * as React from "react";
import { Label, LabelList, Pie, PieChart } from "recharts";
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
import { useDataMatrixStore, useDateTimeRangeStore } from "@/store/store";
import { format } from "date-fns";

const chartConfig = {
  advertisements: {
    label: "Advertisements",
    color: "hsl(var(--chart-3))",
  },
  subscriptions: {
    label: "Subscriptions",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const PieGraph = () => {
  const { state: dateTimeRange } = useDateTimeRangeStore();
  const { state: dataMatrix } = useDataMatrixStore();

  const chartData = React.useMemo(() => {
    if (!dataMatrix?.revenue) return [];
    return [
      {
        revenueCategory: "advertisements",
        revenue: dataMatrix.revenue.advertisements,
        fill: "var(--color-advertisements)",
      },
      {
        revenueCategory: "subscriptions",
        revenue: dataMatrix.revenue.subscriptions,
        fill: "var(--color-subscriptions)",
      },
    ];
  }, [dataMatrix]);

  // Calculate total revenue
  const totalRevenue = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + (curr.revenue || 0), 0),
    [chartData]
  );

  const formattedDateRange = React.useMemo(
    () =>
      `${format(dateTimeRange?.startDate, "dd MMM yyyy")} - ${format(
        dateTimeRange?.endDate,
        "dd MMM yyyy"
      )}`,
    [dateTimeRange]
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Revenue</CardTitle>
        <CardDescription>{formattedDateRange}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="revenue"
              nameKey="revenueCategory"
              innerRadius={60}
              strokeWidth={5}
              labelLine={false}
              label={({ payload, ...props }) => (
                <text
                  cx={props.cx}
                  cy={props.cy}
                  x={props.x}
                  y={props.y}
                  textAnchor={props.textAnchor}
                  dominantBaseline={props.dominantBaseline}
                  fill="hsla(var(--foreground))"
                >
                  {payload.revenue}
                </text>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalRevenue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Revenue
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
              <LabelList
                dataKey="revenueCategory"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total revenue from subscriptions and advertisements
        </div>
      </CardFooter>
    </Card>
  );
};

export default PieGraph;
