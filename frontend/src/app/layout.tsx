import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Expnense Tracker App",
  description: "By Alakh Namdev",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>
        <Navbar />
        <Sidebar />
        <div className="pl-52 h-[92vh] overflow-y-auto">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
