export default async function DeleteBudget(budgetId: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("DeleteBudget Request Initiated with:", budgetId);
  try {
    const response = await fetch(`${API_URL}/budgets/${budgetId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to delete Budget");
    }
    const deletedExpense = await response.json();
    console.log("DeleteBudget Request Successful:", deletedExpense);
    return deletedExpense;
  } catch (error) {
    console.error("Error in DeleteBudget:", error);
    throw error;
  }
}
