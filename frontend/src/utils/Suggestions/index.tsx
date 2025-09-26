export type Expense = {
  userId: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
};

const FAST_API = process.env.NEXT_PUBLIC_FASTAPI;

export async function GetSuggestions(expenseData: { expenseData: Expense[] }) {
  console.log("Suggestion request for FastAPI initiated.");

  try {
    const response = await fetch(`${FAST_API}/suggestions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    });

    if (!response.ok) {
      throw new Error("Failed to create Suggestion");
    }

    const data = await response.json();
    console.log("Suggestions Response:", data);
    return data;
  } catch (error) {
    console.error("Error creating Suggestions:", error);
    throw error;
  }
}

export async function GetMonthlyExpenseData() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("Current Month Expense Request Initiated");

  try {
    const response = await fetch(`${API_URL}/expenses/current-month`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Current Month Expense");
    }

    const data = await response.json();
    console.log("Category Current Month Expense");
    return data;
  } catch (error) {
    console.error("Error Current Month Expense:", error);
    throw error;
  }
}
