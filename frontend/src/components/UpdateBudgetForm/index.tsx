import UpdateBudget from "@/utils/Budget/UpdateBudget";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";

interface UpdateBudgetFormProps {
  budgetId: string;
  E_category: string;
  E_monthlyLimit: string;
}

export default function UpdateBudgetForm({
  budgetId,
  E_category,
  E_monthlyLimit,
}: UpdateBudgetFormProps) {
  const router = useRouter();
  const [budget, setExpense] = useState({
    _id: budgetId,
    category: E_category,
    monthlyLimit: E_monthlyLimit,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await UpdateBudget({
        _id: budget._id,
        category: budget.category,
        monthlyLimit: Number(budget.monthlyLimit),
      });

      if (!response) {
        throw new Error("Failed to update budget", response);
      }
      console.log("Expense Updated:", response);

      router.push("/budgets");
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  return (
    <section className="p-6 border rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4 px-4">Update Budget Form</h2>
      <div className="p-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="category"
              value={budget.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="monthlyLimit"
              value={budget.monthlyLimit}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-green-700 text-white font-medium mt-2 px-4 py-2 rounded cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-300 ease-in-out"
            >
              Update Expense
            </button>
            <button
              type="button"
              className="bg-red-700 text-white font-medium mt-2 px-4 py-2 rounded cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-300 ease-in-out"
              onClick={() => router.push("/budgets")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
