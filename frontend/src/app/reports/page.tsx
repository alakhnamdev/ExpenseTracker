"use client";

import { useEffect, useState } from "react";
import { GetReports } from "@/utils/Reports";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReportsProps {
  reportMonth: string;
  totalSpent: number;
  topCategory: string;
  overbudgetCategories: string[];
}

export default function Reports() {
  const [reports, setReports] = useState<ReportsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await GetReports();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Monthly Reports</h1>
      {loading ? (
        <p className="text-muted-foreground">Loading reports...</p>
      ) : reports.length > 0 ? (
        <div className="grid gap-6">
          {reports.map((report, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>
                  Report for{" "}
                  {new Date(report.reportMonth).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </CardTitle>
                <CardDescription>A summary of your spending for this month.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold">{formatCurrency(report.totalSpent)}</p>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm text-muted-foreground">Top Category</p>
                    <p className="text-2xl font-bold">{report.topCategory}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Over-budget Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {report.overbudgetCategories.map((category) => (
                      <Badge key={category} variant="destructive">{category}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No reports available.</p>
      )}
    </section>
  );
}
