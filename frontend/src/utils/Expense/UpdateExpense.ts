interface Expense {
  _id: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
  notes: string;
}

export default async function UpdateExpense(expense: Expense) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("UpdateExpense Request Initiated with:", expense);
  try {
    const response = await fetch(`${API_URL}/expenses/${expense._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      throw new Error("Failed to update expense");
    }
    const updatedExpense = await response.json();
    console.log("UpdateExpense Request Successful:", updatedExpense);
    return updatedExpense;
  } catch (error) {
    console.error("Error in UpdateExpense:", error);
    throw error;
  }
}
