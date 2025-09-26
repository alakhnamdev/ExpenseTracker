"use client";

import { CreateExpense } from "@/utils/Expense/CreateExpense";
import { GetBudgets } from "@/utils/Budget/GetBudgets";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type Category = {
  _id: number;
  category: string;
};

export default function CreateExpenseForm() {
  const day = new Date();
  const currentDate = `${day.getFullYear()}-${
    day.getMonth() + 1 > 9 ? day.getMonth() + 1 : "0" + (day.getMonth() + 1)
  }-${day.getDate() > 9 ? day.getDate() : "0" + day.getDate()}`;

  const [categories, setCategories] = useState<Category[]>([]);
  const paymentMethods = [
    "Cash",
    "Credit Card",
    "Debit Card",
    "UPI",
    "Net Banking",
  ];

  const getCategories = async () => {
    try {
      const budget = await GetBudgets();
      console.log("Fetched categories:", budget);
      setCategories(budget);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(currentDate);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories[0]?.category ?? "");
    }
  }, [categories]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await CreateExpense(
        Number(amount),
        category,
        date,
        paymentMethod,
        notes
      );
      console.log("Expense Created:", response);
      // reset the form fields after successful submission
      toast.success("Expense created successfully.");
    } catch (error) {
      console.error("Error creating expense:", error);
      toast.error("Failed to create expense.");
    }
  };

  return (
    <section className="p-6 px-3 border rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 px-4">Create Expense</h2>
      <div className="p-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Amount
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="amount"
              placeholder="Enter Amount"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Category
            </label>
            <select
              name="category"
              className="w-full border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category: Category) => (
                <option key={category._id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="date"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Payment Method
            </label>
            <select
              name="category"
              className="w-full border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              {paymentMethods.map((value: string, index: number) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Notes
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="notes"
              placeholder="Enter Notes"
              value={notes}
              required
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground font-medium px-4 py-2 rounded cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-300 ease-in-out"
          >
            Add Expense
          </button>
        </form>
      </div>
    </section>
  );
}
