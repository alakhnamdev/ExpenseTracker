import { GetExpenses } from "@/utils/Expense/GetExpense";
import { getColumns, Expense } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function ViewExpenseData() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const getData = async () => {
    try {
      const expenses = await GetExpenses();
      console.log("Fetched Expenses:", expenses);
      setExpenses(expenses);
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
        <h2 className="text-2xl font-semibold mb-4">View Expense Data</h2>
        <Button
          variant="outline"
          className="ml-auto cursor-pointer"
          onClick={getData}
        >
          Refresh Data
        </Button>
      </div>

      <div>
        {expenses.length > 0 ? (
          <div className="">
            <DataTable columns={columns} data={expenses} refreshData={getData} />
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
