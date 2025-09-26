const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function createBudget(category: string, monthlyLimit: number) {
    const response = await fetch(`${API_URL}/budgets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, monthlyLimit}),
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Failed to create budget");
    }

    return response.json();
}