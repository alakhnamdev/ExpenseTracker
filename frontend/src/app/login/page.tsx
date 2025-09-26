"use client";

import { useState } from "react";
import Login from "@/utils/Auth/Login";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", { email, password });
    try {
      const data = await Login(email, password);
      console.log("Login successful:", data);
      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen absolute w-screen top-0 left-0">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-4xl font-semibold text-slate-900 dark:text-gray-500"
        >
          Expense Tracker App
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-700 md:text-2xl dark:text-gray-500">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                  placeholder="••••••••"
                  className="bg-gray-100 w-full focus:ring-2 focus:ring-blue-800 transition duration-200 ease-in-out rounded-lg py-2 px-4 outline-none focus text-gray-500 placeholder-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-800 w-full cursor-pointer text-white font-bold py-3 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account yet?{" "}
                <a
                  href="signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
