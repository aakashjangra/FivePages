"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginComplete } from "@/lib/store/authSlice";

export default function AuthPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  // Redirect if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      router.push("/");
    }
  }, [router]);

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef?.current) nextRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim() || (!isLogin && !name.trim())) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isLogin && name.length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        isLogin
          ? "http://localhost:5000/api/v1/user/login"
          : "http://localhost:5000/api/v1/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            ...(isLogin ? {} : { name }),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong!");
      } else if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(loginComplete(data.user));

        // ✅ Show toast message
        toast.success(
          isLogin ? "Login successful! Redirecting..." : "Registration successful! Redirecting..."
        );

        // Clear form fields
        setEmail("");
        setPassword("");
        setName("");

        // Redirect
        router.push("/");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F4F4F4]">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 text-center text-xl py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="text-gray-700 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                ref={nameRef}
                onKeyDown={(e) => handleKeyDown(e, emailRef)}
              />
            </div>
          )}

          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              ref={emailRef}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              ref={passwordRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded font-semibold hover:bg-blue-700 transition ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/forgot-password" className="text-blue-900 text-sm hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="text-center mt-8 text-sm text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-800 font-semibold ml-1 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
