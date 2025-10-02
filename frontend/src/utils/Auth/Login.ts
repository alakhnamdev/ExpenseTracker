import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface LoginResponse {
  message: string;
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export default async function Login(email: string, password: string) {
  console.log("Login Request Initiated");
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data: LoginResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Network response was not ok");
  }

  Cookies.set("token", data.token, { expires: 1, path: "/" }); 
  return data;
}