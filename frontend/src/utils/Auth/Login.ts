const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export default async function Login(email: string, password: string) {
    console.log("Login Request Initiated");
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include', 
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed. Please check your credentials.');
        }

        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}