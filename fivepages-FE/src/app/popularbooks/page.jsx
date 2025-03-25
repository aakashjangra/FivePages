"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";

export default function PopularBooks() {
  const [books, setBooks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/novels/latest")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <>
      
      <section className="p-6 bg-white">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="text-blue-600 text-3xl mr-2">▌</span> Popular Books
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-6 mt-6 shadow-lg p-6">
          {books.slice(0, 5).map((book, index) => (
            <div key={index} className="flex gap-4 shadow-lg rounded">
              {/* Clickable image */}
              <button onClick={() => router.push(`/novels/${book._id}`)}>
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-28 h-40 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
                />
              </button>

              <div>
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-500">By: {book.author}</p>
                <p className="text-green-600 font-bold text-sm">
                  {book.views} Views
                </p>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {book.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
