export async function SpendingTrend() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    console.log("Spending Trend Request Initiated");

    try {
        const response = await fetch(`${API_URL}/dashboard/spending-trend`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch spending trend");
        }

        const data = await response.json();
        console.log("Spending Trend Response:", data);
        return data;
    } catch (error) {
        console.error("Error fetching spending trend:", error);
        throw error;
    }
}
