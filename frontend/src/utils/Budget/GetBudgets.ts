export async function GetBudgets() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    console.log("GetBudgets Request Initiated");

    try {
        const response = await fetch(`${API_URL}/budgets`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch budgets");
        }

        const data = await response.json();
        console.log("GetBudgets Response:", data);
        return data;
    } catch (error) {
        console.error("Error fetching budgets:", error);
        throw error;
    }
}
