"use client";

import { Button } from "@/components/ui/button";
import GetUserDetails from "@/utils/Auth/GetUserDetails";
import Logout from "@/utils/Auth/Logout";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Navbar() {
  const [email, setEmail] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const getUserDetails = async () => {
    const response = await GetUserDetails();
    if (response && response.user) {
      return response.user.email;
    }
    return null;
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      setEmail(userDetails);
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await Logout();
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <nav className="bg-primary h-[8vh] text-primary-foreground p-3 px-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-semibold">
        Expense Tracker
      </Link>
      <div className="flex items-center gap-4">
        <p>{email}</p>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}
