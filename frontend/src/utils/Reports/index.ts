export async function GetReports() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("Get Reports Request Initiated");

  try {
    const response = await fetch(`${API_URL}/reports`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Get Reports");
    }

    const data = await response.json();
    console.log("Reports : Data");
    return data;
  } catch (error) {
    console.error("Error Get Reports:", error);
    throw error;
  }
}
