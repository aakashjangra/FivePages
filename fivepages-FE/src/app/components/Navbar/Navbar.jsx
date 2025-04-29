"use client";

import { useSelector, useDispatch } from "react-redux";
import { logoutComplete } from "@/lib/store/authSlice";
import Link from "next/link";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, isAuthenticated, isReady } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("📦 Navbar Redux state:", { user, isAuthenticated, isReady });
  }, [user, isAuthenticated, isReady]);


  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "profile") router.push("/profile");
    if (value === "logout") handleLogout();
    event.target.value = "";
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.clear();
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(logoutComplete());
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  if (!isReady) return null;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-4 md:px-6 h-20 flex items-center justify-between">
      
      {/* Left: Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => router.push("/")}>
        <img
          src="/fivepagelogo.png"
          alt="Logo"
          className="h-16 w-auto"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/150x80?text=Logo";
          }}
        />
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex gap-8 text-black font-medium items-center">
          <li><Link href="/" className="hover:text-blue-700">Home</Link></li>
          <li><Link href="/popularbooks" className="hover:text-blue-700">Popular</Link></li>
          <li><Link href="/new-releases-page" className="hover:text-blue-700">New Release</Link></li>
          <li><Link href="/allnovels" className="hover:text-blue-700">Novels</Link></li>
        </ul>
      </div>

      {/* Right: Search + Profile/Login */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center border border-gray-400 rounded-md px-3 py-[0.35rem]">
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-sm text-gray-700 px-2 w-[8rem]"
          />
          <FaSearch className="text-blue-700" />
        </div>

        {isAuthenticated && user ? (
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-2xl text-black" />
            <select
              className="border border-gray-300 rounded-md px-2 py-1 bg-white cursor-pointer"
              onChange={handleSelectChange}
              defaultValue=""
            >
              <option value="" disabled hidden>{user?.name || "My Account"}</option>
              <option value="profile">Profile</option>
              <option value="logout">Logout</option>
            </select>
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-white text-black px-3 py-1 rounded-md hover:bg-gray-100 transition">
              Login
            </button>
          </Link>
        )}

      </div>

      {/* Mobile Hamburger */}
      <div className="flex md:hidden items-center">
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-start gap-4 px-6 py-4 md:hidden z-40">
          <Link href="/" className="text-black" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/popularbooks" className="text-black" onClick={() => setMobileMenuOpen(false)}>Popular</Link>
          <Link href="/new-releases-page" className="text-black" onClick={() => setMobileMenuOpen(false)}>New Release</Link>
          <Link href="/allnovels" className="text-black" onClick={() => setMobileMenuOpen(false)}>Novels</Link>

          <div className="flex w-full items-center gap-2 mt-2 border border-gray-400 rounded-md px-3 py-1">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow outline-none text-sm text-gray-700"
            />
            <FaSearch className="text-blue-700" />
          </div>

          {isAuthenticated && user ? (
            <div className="flex flex-col w-full gap-1">
              <span className="text-sm text-gray-700">{user?.name}</span>
              <button onClick={() => { router.push("/profile"); setMobileMenuOpen(false); }} className="text-left text-blue-600">Profile</button>
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-left text-red-600">Logout</button>
            </div>
          ) : (
            <Link href="/login" className="text-black" onClick={() => setMobileMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
