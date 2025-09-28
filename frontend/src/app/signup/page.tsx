"use client";

import { useState } from "react";
import Signup from "@/utils/Auth/Signup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    console.log("Submitting:", { username, email, password });
    try {
      const data = await Signup(username, email, password);
      console.log("Signup successful:", email);
      toast.success("Signup successful! Please login.");
      router.push("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-100 h-screen absolute w-screen top-0 left-0">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-4xl font-semibold text-slate-900 dark:text-gray-500"
        >
          Expense Tracker App
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-700 md:text-2xl dark:text-gray-500">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-md font-bold text-gray-500 dark:text-gray-500"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="bg-gray-100 w-full focus:ring-2 focus:ring-blue-800 transition duration-200 ease-in-out rounded-lg py-2 px-4 outline-none focus text-gray-500 placeholder-gray-400"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-md font-bold text-gray-500 dark:text-gray-500"
                >
                  Your email
                </label>
                <input
                  type="email"
                  className="bg-gray-100 w-full focus:ring-2 focus:ring-blue-800 transition duration-200 ease-in-out rounded-lg py-2 px-4 outline-none focus text-gray-500 placeholder-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-md font-bold text-gray-500 dark:text-gray-500"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-gray-100 w-full focus:ring-2 focus:ring-blue-800 transition duration-200 ease-in-out rounded-lg py-2 px-4 outline-none focus text-gray-500 placeholder-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-md font-bold text-gray-500 dark:text-gray-500"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="bg-gray-100 w-full focus:ring-2 focus:ring-blue-800 transition duration-200 ease-in-out rounded-lg py-2 px-4 outline-none focus text-gray-500 placeholder-gray-400"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-800 w-full cursor-pointer text-white font-bold py-3 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
