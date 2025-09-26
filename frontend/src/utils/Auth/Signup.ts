const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export default async function Signup(name: string, email: string, password: string) {
    console.log("Signup Request Initiated");
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}