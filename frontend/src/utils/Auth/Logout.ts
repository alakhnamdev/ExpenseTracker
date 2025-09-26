const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export default async function Logout() {
    console.log("Logout Request Initiated");
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error("Error logging out");
    }
    return response.json();
}