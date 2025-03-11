'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    alert(isLogin ? 'Logging in...' : 'Signing up...');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F4F4F4] p-6">
      <div className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-md border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {/* Added more padding inside this block */}
        <div className="bg-[#FAFAFA] p-8 rounded-lg shadow-inner border border-gray-300">
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-100 p-3 rounded-lg mb-5">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#B0C4DE] transition"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#B0C4DE] transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#B0C4DE] text-white p-4 rounded-xl font-semibold hover:bg-[#9AB1C9] transition"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link href="/forgot-password" className="text-[#7D8DA9] text-sm font-medium hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#7D8DA9] font-semibold ml-1 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
