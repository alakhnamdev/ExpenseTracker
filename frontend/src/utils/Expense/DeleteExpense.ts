export default async function DeleteExpense(expenseId: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("DeleteExpense Request Initiated with:", expenseId);
  try {
    const response = await fetch(`${API_URL}/expenses/${expenseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to delete expense");
    }
    const deletedExpense = await response.json();
    console.log("DeleteExpense Request Successful:", deletedExpense);
    return deletedExpense;
  } catch (error) {
    console.error("Error in DeleteExpense:", error);
    throw error;
  }
}
