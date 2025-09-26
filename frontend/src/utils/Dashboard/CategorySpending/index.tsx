export async function CategorySpending() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    console.log("Category Spending Request Initiated");

    try {
        const response = await fetch(`${API_URL}/dashboard/category-spending`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch category spending");
        }

        const data = await response.json();
        console.log("Category Spending Response:", data);
        return data;
    } catch (error) {
        console.error("Error fetching category spending:", error);
        throw error;
    }
}
