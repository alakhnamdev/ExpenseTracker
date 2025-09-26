import { getColumns, Budget } from "./columns";
import { DataTable } from "./data-table"; 
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { GetBudgets } from "@/utils/Budget/GetBudgets";

export default function ViewBudgetData() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const getData = async () => {
    try {
      const budget = await GetBudgets();
      console.log("Fetched Expenses:", budget);
      setBudgets(budget);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = getColumns(getData);

  return (
    <section className="p-6 border rounded-lg bg-white">
      <div>
        <h2 className="text-2xl font-semibold mb-4">View Category & Budgets Data</h2>
        <Button
          variant="outline"
          className="ml-auto cursor-pointer"
          onClick={getData}
        >
          Refresh Data
        </Button>
      </div>

      <div>
        {budgets.length > 0 ? (
          <div className="">
            <DataTable columns={columns} data={budgets} />
          </div>
        ) : (
          <div className="p-4">
            <p className="text-gray-600">No expense data to display.</p>
          </div>
        )}
      </div>
    </section>
  );
}
