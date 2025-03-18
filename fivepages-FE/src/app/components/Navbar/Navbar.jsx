'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-45  bg-white shadow-md mb-2">
      {/* Logo */}
      <div className="">
        <Image 
          src="/fivepagelogo.png" 
          alt="Fivepages Logo" 
          width={100} 
          height={100} 
          className=''
        />
      </div>
      
      {/* Navigation Links */}
      <ul className="flex gap-6 list-none ">
        <li><Link href="/" className="text-black font-medium hover:text-blue-700">Home</Link></li>
        <li><Link href="/Popular" className="text-black font-medium hover:text-blue-700">Popular</Link></li>
        <li><Link href="/New-Release" className="text-black font-medium hover:text-blue-700">New Release</Link></li>
        {/* <li><Link href="/Join-us" className="text-black font-medium hover:text-blue-700">Join Us</Link></li> */}
        <li><Link href="/login" className="text-black font-medium hover:text-blue-700">Register</Link></li>
      </ul>
      
      {/* Right Section */}
      <div className="flex items-center flex-row-revers gap-8 ">
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
        <div className='flex gap-2 rounded p-2 '>
        <FaUserCircle className="text-2xl text-black cursor-pointer hover:text-700 transition s" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
