import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface LogoutResponse {
  message: string;
}

export default async function Logout() {
  console.log("Logout Request Initiated");
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  });

  const data: LogoutResponse = await response.json();

  Cookies.remove("token", { path: "/" });

  if (!response.ok) {
    throw new Error(data.message || "Error logging out");
  }
  return data;
}