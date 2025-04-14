"use client";

import { useSelector, useDispatch } from "react-redux";
import { logoutComplete } from "@/lib/store/authSlice";
import Link from "next/link";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isAuthenticated, isReady } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("📦 Navbar Redux state:", {
      user,
      isAuthenticated,
      isReady,
    });
  }, [user, isAuthenticated, isReady]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "profile") router.push("/profile");
    if (value === "logout") handleLogout();
    event.target.value = ""; // Reset select dropdown
  };

  const handleLogout = () => {
    console.log("🚪 Logging out...");
    localStorage.removeItem("user");
    sessionStorage.clear();
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(logoutComplete());
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  if (!isReady) {
    console.log("⏳ Navbar waiting for isReady...");
    return null; // or return a loader
  }

  return (
    <nav className="flex items-center justify-between px-10 bg-white shadow-md mb-2 sticky top-0 h-20 z-50">
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <img
          src="/fivepagelogo.png"
          alt="Logo"
          className="w-auto h-20"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/150x80?text=Logo";
          }}
        />
      </div>

      <ul className="flex gap-4 list-none">
        <li>
          <Link href="/" className="text-black font-medium hover:text-blue-700">
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/popularbooks"
            className="text-black font-medium hover:text-blue-700"
          >
            Popular
          </Link>
        </li>
        <li>
          <Link
            href="/new-releases-page"
            className="text-black font-medium hover:text-blue-700"
          >
            New Release
          </Link>
        </li>
        <li>
          <Link
            href="/allnovels"
            className="text-black font-medium hover:text-blue-700"
          >
            Novels
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-6">
        <div className="flex items-center border border-gray-400 rounded-md px-3 py-[0.32rem]">
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-sm text-gray-700 px-2 w-[8rem]"
          />
          <FaSearch className="text-blue-700" />
        </div>

        {/* Profile Section with Dropdown */}
        {isAuthenticated && user ? (
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-2xl text-black" />
            <select
              className="border border-gray-300 rounded-md px-2 py-1 bg-white cursor-pointer"
              onChange={handleSelectChange}
              defaultValue=""
            >
              <option value="" disabled hidden>
                {user?.name || "My Account"}
              </option>
              <option value="profile">Profile</option>
              <option value="logout">Logout</option>
            </select>
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-white text-black px-2 py-1 rounded-md hover:bg-gray-100 transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
