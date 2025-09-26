export async function TopPaymentMethods() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    console.log("Top Payment Methods Request Initiated");

    try {
        const response = await fetch(`${API_URL}/dashboard/top-payment-methods`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch top payment methods");
        }

        const data = await response.json();
        console.log("Top Payment Methods Response:", data);
        return data;
    } catch (error) {
        console.error("Error fetching top payment methods:", error);
        throw error;
    }
}
