"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const buttonDisabled = React.useMemo(() => {
    return !(user.email.trim().length > 0 && user.password.trim().length > 0);
  }, [user.email, user.password]);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (buttonDisabled || loading) return;

    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);

      console.log("Login success", response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error) {
      let errorMessage = "An error occurred";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.log("Login failed", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={onLogin}
        className="flex w-80 flex-col rounded-lg border p-6 shadow-md"
      >
        <h1 className="mb-4 text-center text-2xl font-bold">Login</h1>

        <label htmlFor="email" className="mb-1">
          Email
        </label>
        <input
          className="mb-4 rounded-lg border border-gray-300 p-2 focus:border-gray-600 focus:outline-none"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />

        <label htmlFor="password" className="mb-1">
          Password
        </label>
        <input
          className="mb-4 rounded-lg border border-gray-300 p-2 focus:border-gray-600 focus:outline-none"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />

        <button
          type="submit"
          disabled={buttonDisabled || loading}
          className={`mb-4 rounded-lg p-2 transition ${
            buttonDisabled || loading
              ? "cursor-not-allowed bg-green-300"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {loading ? "Logging in..." : "Login here"}
        </button>

        <Link href="/signup" className="text-center text-blue-500 hover:underline">
          Visit signup page
        </Link>
      </form>
    </div>
  );
}
