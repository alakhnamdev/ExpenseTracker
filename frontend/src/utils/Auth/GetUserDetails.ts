const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function GetUserDetails() {
    console.log("GetUserDetails Request Initiated");
    const response = await fetch(`${API_URL}/auth/user-details`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
    });
    const data = await response.json();
    console.log("GetUserDetails Response:", data);
    return data;
}