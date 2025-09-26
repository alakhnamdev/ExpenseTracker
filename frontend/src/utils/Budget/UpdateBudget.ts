interface Budget {
  _id: string;
  category: string;
  monthlyLimit: number;
}

export default async function UpdateBudget(budget: Budget) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("UpdateBudget Request Initiated with:", budget);
  try {
    const response = await fetch(`${API_URL}/budgets/${budget._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(budget),
      credentials: "include"
    });
    if (!response.ok) {
      throw new Error("Failed to update budget");
    }
    const updatedBudget = await response.json();
    console.log("UpdateBudget Request Successful:", updatedBudget);
    return updatedBudget;
  } catch (error) {
    console.error("Error in UpdateBudget:", error);
    throw error;
  }
}
