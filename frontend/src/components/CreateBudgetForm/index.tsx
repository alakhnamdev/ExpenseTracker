"use client";

import { toast } from "sonner";
import { useState } from "react";
import createBudget from "@/utils/Budget/CreateBudget";

export default function CreateBudgetForm() {
  const [category, setCategory] = useState<string>("");
  const [monthlyLimit, setMonthlyLimit] = useState<string>("0");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await createBudget(category, Number(monthlyLimit));
      console.log("Budget Created:", response);
      // reset the form fields after successful submission
      setCategory("");
      setMonthlyLimit("0");
      toast.success("Budget created successfully.");
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Failed to create budget.");
    }
  };

  return (
    <section className="p-6 px-3 border rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 px-4">Create Budget</h2>
      <div className="p-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Category</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="category"
              value={category}
              placeholder="Enter Category Name"
              required
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Monthly Limit</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="amount"
              value={monthlyLimit}
              required
              onChange={(e) => setMonthlyLimit(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground font-medium px-4 py-2 mt-2 rounded cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-300 ease-in-out"
          >
            Add Budget
          </button>
        </form>
      </div>
    </section>
  );
}
