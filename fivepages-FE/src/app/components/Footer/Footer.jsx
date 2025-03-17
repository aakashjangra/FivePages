"use client";
import { FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-auto w-full px-[8rem]">
      <div className="container mx-auto px-4 flex flex-wrap justify-between text-center md:text-left">
        
        {/* About Section */}
        <div className="w-full md:w-auto">
          <h3 className="font-bold text-lg">About</h3>
          <a href="/about" className="block text-gray-400 hover:text-white">Terms of Use</a>
          <a href="/about" className="block text-gray-400 hover:text-white">Privacy Policy</a>
        </div>

        {/* Community Section (Discord) */}
        <div className="w-full md:w-auto">
          <h3 className="font-bold text-lg">Community</h3>
          <a href="https://discord.com" target="_blank" className="flex justify-center md:justify-start items-center gap-2 text-gray-400 hover:text-white">
            <FaDiscord className="text-xl" /> Discord
          </a>
        </div>

        {/* Partner Section */}
        <div className="w-full md:w-auto">
          <h3 className="font-bold text-lg">Partner</h3>
          <a href="/partners" className="block text-gray-400 hover:text-white">Spyops</a>
          <a href="/partners" className="block text-gray-400 hover:text-white">sky</a>
        </div>

        {/* Contact Section */}
        <div className="w-full md:w-auto">
          <h3 className="font-bold text-lg">Contact Us</h3>
          <a href="/contact" className="block text-gray-400 hover:text-white">Business Collaborations</a>
          <a href="mailto:hr@dramabox.com" className="block text-gray-400 hover:text-white">
            Join Us: hr@fivepages.com
          </a>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-400 mt-4">
        © NovelRead 2025, All rights reserved <br />
        FivePages Private Limited.
      </div>
    </footer>
  );
}
