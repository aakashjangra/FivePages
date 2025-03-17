"use client";

import { useState } from "react";
import Link from "next/link";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
    console.log("Entered OTP:", otp);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Verify OTP</h2>
        <p className="text-gray-600 text-center mb-4">
          Enter the OTP sent to your email
        </p>

        <form onSubmit={handleVerify}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-center tracking-widest"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Verify OTP
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Didn't receive an OTP?{" "}
            <button className="text-blue-600 hover:underline">Resend OTP</button>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link href="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
