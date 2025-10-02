"use client";

import { useEffect, useState } from "react";
import { ChartLineDotsColors } from "../LineChart";
import ChartPieDonutText from "../PieChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TopPaymentMethodsProps = {
  count: number;
  paymentMethod: string;
};

type CategorySpendingProps = {
  totalSpent: number;
  category: string;
};

type SpendingTrendProps = {
  totalSpent: number;
  date: string;
};

import {
  CategorySpending,
  MonthlyTotal,
  SpendingTrend,
  TopCategory,
  TopPaymentMethods,
} from "@/utils/Dashboard";

export default function Dashboard() {
  const [TotalSpent, setTotalSpent] = useState<number>(0);
  const [topCategory, setTopCategory] = useState<string>("");
  const [topCategorySpent, setTopCategorySpent] = useState<number>(0);
  const [topPaymentMethods, setTopPaymentMethods] = useState<
    TopPaymentMethodsProps[]
  >([]);
  const [categorySpending, setCategorySpending] = useState<
    CategorySpendingProps[]
  >([]);
  const [spendingTrend, setSpendingTrend] = useState<SpendingTrendProps[]>([]);

  useEffect(() => {
    const fetchTotalSpent = async () => {
      try {
        const data = await MonthlyTotal();
        setTotalSpent(data.totalAmount);
        console.log("Total Spent:", data.totalAmount);
      } catch (error) {
        console.error("Error fetching total spent:", error);
      }
    };

    const fetchTopCategory = async () => {
      try {
        const data = await TopCategory();
        setTopCategory(data.category);
        setTopCategorySpent(data.totalSpent);
        console.log("Top Category Data:", data);
      } catch (error) {
        console.error("Error fetching top category:", error);
      }
    };

    const fetchTopPaymentMethods = async () => {
      try {
        const data = await TopPaymentMethods();
        setTopPaymentMethods(data);
        console.log("Top Payment Methods:", data);
      } catch (error) {
        console.error("Error fetching top payment methods:", error);
      }
    };

    const fetchCategorySpending = async () => {
      try {
        const data = await CategorySpending();
        setCategorySpending(data);
        console.log("Category Spending:", data);
      } catch (error) {
        console.error("Error fetching category spending:", error);
      }
    };

    const fetchSpendingTrend = async () => {
      try {
        const data = await SpendingTrend();
        setSpendingTrend(data);
        console.log("Spending Trend:", data);
      } catch (error) {
        console.error("Error fetching spending trend:", error);
      }
    };

    fetchSpendingTrend();
    fetchCategorySpending();
    fetchTopPaymentMethods();
    fetchTopCategory();
    fetchTotalSpent();
  }, []);

  return (
    <section className="p-6 border rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Spent (This Month)</CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl">₹{TotalSpent}</CardTitle>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Top Category (This Month)</CardDescription>
            <CardTitle className="text-3xl"></CardTitle>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl">
              {topCategory} (₹{topCategorySpent})
            </CardTitle>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Top 3 Payments</CardDescription>
          </CardHeader>
          <CardContent className="">
            {topPaymentMethods.length > 0 ? (
              topPaymentMethods.map((paymentMethod, index) => (
                <p key={index} className="font-semibold text-2xl">
                  {paymentMethod.paymentMethod}({paymentMethod.count})
                </p>
              ))
            ) : (
              <p>No payment methods data available</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-3">
          <ChartPieDonutText categorySpending={categorySpending} />
        </div>
        <div className="lg:col-span-4">
          <ChartLineDotsColors spendingTrend={spendingTrend} />
        </div>
      </div>
    </section>
  );
}
