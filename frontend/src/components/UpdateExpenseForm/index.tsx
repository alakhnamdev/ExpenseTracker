import UpdateExpense from "@/utils/Expense/UpdateExpense";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";

interface UpdateExpenseFormProps {
  expenseId: string;
  E_amount: string;
  E_category: string;
  E_date: string;
  E_paymentMethod: string;
  E_notes: string;
}

export default function UpdateExpenseForm({
  expenseId,
  E_amount,
  E_category,
  E_date,
  E_paymentMethod,
  E_notes,
}: UpdateExpenseFormProps) {
  const router = useRouter();
  const [expense, setExpense] = useState({
    _id: expenseId,
    amount: E_amount.toString(),
    category: E_category,
    date: E_date,
    paymentMethod: E_paymentMethod,
    notes: E_notes,
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
      const response = await UpdateExpense({
        _id: expense._id,
        amount: Number(expense.amount),
        category: expense.category,
        date: expense.date,
        paymentMethod: expense.paymentMethod,
        notes: expense.notes,
      });

      if (!response) {
        throw new Error("Failed to update expense", response);
      }
      console.log("Expense Updated:", response);

      router.push("/expenses");
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <section className="p-6 border rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4 px-4">Update Expense Form</h2>
      <div className="p-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="category"
              value={expense.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="date"
              value={expense.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Payment Method</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="paymentMethod"
              value={expense.paymentMethod}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Notes</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="notes"
              value={expense.notes}
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
              onClick={() => router.push("/expenses")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
