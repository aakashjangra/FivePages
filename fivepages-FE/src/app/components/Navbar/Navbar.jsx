"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    if(selectedValue === "register"){
      router.push('/login');
    }
    
    if(selectedValue === "profile"){
      router.push('/profile');
    }

  };

  return (
    <nav className="flex items-center justify-between px-45 bg-white shadow-md mb-2">
      {/* Logo */}
      <div className="">
        <Image
          src="/fivepagelogo.png"
          alt="Fivepages Logo"
          width={100}
          height={100}
          className=""
        />
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6 list-none ">
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

      {/* Right Section */}
      <div className="flex items-center gap-8 ">
        {/* Search Box */}
        <div className="flex items-center  border border-gray-400 rounded-md px-3 py-1">
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-sm text-gray-700 px-2"
          />
          <FaSearch className="text-blue-700" />
        </div>

        {/* Profile Icon */}
        <div className="flex ">
          <FaUserCircle className="text-2xl text-black cursor-pointer hover:text-700 transition s" />
          <select
            name="Profile"
            id="profile-dropdown"
            className="focus:outline-none "
            onChange={handleSelectChange}
          >
            <option value="profile" className="bg-white">
              Profile
            </option>
            <option value="register" className="bg-white">
              Register
            </option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
