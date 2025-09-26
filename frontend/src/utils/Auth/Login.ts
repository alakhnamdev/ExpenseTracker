const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export default async function Login(email: string, password: string) {
    console.log("Login Request Initiated");
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}