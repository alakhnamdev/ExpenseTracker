export async function TopCategory() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    console.log("Top Category Request Initiated");

    try {
        const response = await fetch(`${API_URL}/dashboard/top-category`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch top category");
        }

        const data = await response.json();
        console.log("Top Category Response:", data);
        return data;
    } catch (error) {
        console.error("Error fetching top category:", error);
        throw error;
    }
}
