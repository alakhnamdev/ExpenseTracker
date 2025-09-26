"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts";

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

type CategorySpendingProps = {
  totalSpent: number;
  category: string;
};

export default function ChartPieDonutText({
  categorySpending,
}: {
  categorySpending: CategorySpendingProps[];
}) {
  const chartData = categorySpending.map((item) => ({
    category: item.category,
    totalSpent: item.totalSpent,
  }));

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      totalSpent: {
        label: "Total Spent",
      },
    };
    chartData.forEach((item, index) => {
      config[item.category] = {
        label: item.category,
        color: `var(--chart-${index + 1})`,
      };
    });
    return config;
  }, [chartData]);

  const totalSpent = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.totalSpent, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category Spending</CardTitle>
        <CardDescription>Spending distribution by category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value) => `₹${value}`}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="totalSpent"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.category]?.color}
                />
              ))}
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
                          className="fill-foreground text-2xl font-bold"
                        >
                          {`₹${totalSpent.toLocaleString()}`}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Spent
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pt-4">
        <div className="w-full flex flex-wrap justify-center text-muted-foreground border-b pb-3">
          {chartData.map((item) => (
            <div
              key={item.category}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-sm ml-2"
                  style={{ backgroundColor: chartConfig[item.category]?.color }}
                />
                {item.category}
              </div>
              {/* <span className="font-medium">₹{item.totalSpent.toLocaleString()}</span> */}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2  mt-2 leading-none font-medium">
          Current Month&apos;s Spending Analysis
        </div>
        <div className="text-muted-foreground text-center line leading-none">
          Showing spending distribution across categories.
        </div>
      </CardFooter>
    </Card>
  );
}
