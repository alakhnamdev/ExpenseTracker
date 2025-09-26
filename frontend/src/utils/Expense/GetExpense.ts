export async function GetExpenses() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    console.log("GetExpenses Request Initiated");

    try {
        const response = await fetch(`${API_URL}/expenses`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch expenses");
        }

        const data = await response.json();
        console.log("GetExpenses Response:", data);
        return data;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw error;
    }
}
