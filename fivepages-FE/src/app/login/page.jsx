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
    console.log(e.target.value)

    alert(isLogin ? 'Logging in...' : 'Signing up...');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F4F4F4]">
      <div className="bg-white shadow-xl w-full max-w-md form-container p-6 ">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 text-center text-xl py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="text-xl">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6 text-xl">
            <label className="text-md block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="text-xl w-full bg-blue-500 text-white p-6 rounded font-semibold hover:bg-blue-700 transition"
          >
            {isLogin ? 'Login' : 'Sign Up'}
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
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
