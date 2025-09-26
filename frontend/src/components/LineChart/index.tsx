"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

type SpendingTrendProps = {
  totalSpent: number;
  date: string;
};

export function ChartLineDotsColors({
  spendingTrend,
}: {
  spendingTrend: SpendingTrendProps[];
}) {
  const chartData = spendingTrend.map((item) => ({
    date: item.date,
    totalSpent: item.totalSpent,
  }));

  const chartConfig = {
    totalSpent: {
      label: "Total Spent",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Trend</CardTitle>
        <CardDescription>
          Total spending over the last few dates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(8)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value) => `₹${value}`}
                />
              }
            />
            <Line
              dataKey="totalSpent"
              type="natural"
              stroke="var(--color-totalSpent)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-totalSpent)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Spending Analysis <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total spending for recent dates.
        </div>
      </CardFooter>
    </Card>
  );
}
