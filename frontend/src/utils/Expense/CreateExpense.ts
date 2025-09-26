export async function CreateExpense(amount: number, category: string, date: string, paymentMethod: string, notes: string) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    console.log("CreateExpense Request Initiated with:", amount, category, date, paymentMethod, notes);

    try {
        const response = await fetch(`${API_URL}/expenses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
                category,
                date,
                paymentMethod,
                notes,
            }),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to create expense");
        }

        const data = await response.json();
        console.log("CreateExpense Response:", data);
        return data;
    } catch (error) {
        console.error("Error creating expense:", error);
        throw error;
    }
}