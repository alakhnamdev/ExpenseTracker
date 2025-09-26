export async function MonthlyTotal() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    console.log("Monthly Total Request Initiated");

    try {
        const response = await fetch(`${API_URL}/dashboard/monthly-total`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch monthly total");
        }

        const data = await response.json();
        console.log("Monthly Total Response:", data);
        return data;
    } catch (error) {
        console.error("Error fetching monthly total:", error);
        throw error;
    }
}
