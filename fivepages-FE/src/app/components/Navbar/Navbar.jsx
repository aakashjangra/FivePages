"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const isAuthenticated = useMemo(() => !!user, [user]);
  const [menuOpen, setMenuOpen] = useState(false);

  // track search input
  const [searchQuery, setSearchQuery] = useState("");

  // reload user on path change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    } catch {
      setUser(null);
    }
  }, [pathname]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    sessionStorage.clear();
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.success("You have logged out successfully!");
    setUser(null);
    router.push("/login");
  }, [router]);

  const handleSelectChange = useCallback(
    (e) => {
      const val = e.target.value;
      if (val === "profile") router.push("/profile");
      else if (val === "logout") handleLogout();
      e.target.value = "";
    },
    [router, handleLogout]
  );

  const userLabel = useMemo(() => (user ? user.name : ""), [user]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/popularbooks", label: "Popular" },
    { path: "/new-releases-page", label: "New Release" },
    { path: "/allnovels", label: "Novels" },
  ];

  // on Enter or search icon click, navigate to /search/[param]
  const triggerSearch = useCallback(() => {
    const q = searchQuery.trim();
    if (q) {
      router.push(`/search/${encodeURIComponent(q)}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  }, [router, searchQuery]);
  
  const onSearchKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") triggerSearch();
    },
    [triggerSearch]
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-white text-blue-700 p-2"
      >
        Skip to content
      </a>

      <nav
        role="navigation"
        aria-label="Main navigation"
        className="flex items-center justify-between px-10 bg-white shadow-md mb-2 sticky top-0 z-50"
      >
        {/* Logo */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Go to homepage"
          onClick={() => router.push("/")}
          onKeyDown={(e) => e.key === "Enter" && router.push("/")}
          className="cursor-pointer"
        >
          <img src="/fivepagelogo.png" alt="Logo" className="w-auto h-20" />
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`flex gap-4 list-none ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          {navItems.map(({ path, label }) => {
            const isActive = pathname === path;
            return (
              <li key={path}>
                <Link
                  href={path}
                  className={`font-medium hover:text-blue-700 ${
                    isActive ? "text-blue-700" : "text-black"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Search Box */}
          <div className="flex items-center border border-gray-400 rounded-md px-3 py-[0.32rem]">
            <input
              type="text"
              placeholder="Search"
              aria-label="Search novels"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={onSearchKeyDown}
              className="outline-none text-sm text-gray-700 px-2 w-[8rem]"
            />
            <FaSearch
              className="text-blue-700 cursor-pointer"
              onClick={triggerSearch}
            />
          </div>

          {/* Profile Section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-2xl text-black" aria-hidden="true" />
              <select
                aria-label="User menu"
                className="border border-gray-300 rounded-md px-2 py-1 bg-white cursor-pointer"
                onChange={handleSelectChange}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  {userLabel}
                </option>
                <option value="profile">Profile</option>
                <option value="logout">Logout</option>
              </select>
            </div>
          ) : (
            <Link href="/login">
              <button
                className="bg-white text-black px-2 py-1 rounded-md hover:bg-gray-100 transition"
                aria-label="Login"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>

      <main id="main-content" />

      <div aria-live="polite" aria-atomic="true" className="fixed top-4 right-4">
        <Toaster />
      </div>
    </>
  );
}