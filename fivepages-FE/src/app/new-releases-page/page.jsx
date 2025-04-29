"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";

export default function NewReleasesPage() {
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
      <section className="px-4 sm:px-6 py-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">New Releases</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {books.map((book, index) => (
            <div
              key={index}
              className="text-center shadow-lg rounded-lg p-3 bg-white hover:shadow-xl transition-all duration-300"
            >
              <button onClick={() => router.push(`/novels/${book._id}`)}>
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-full h-52 sm:h-60 object-cover rounded-md shadow-md mx-auto cursor-pointer"
                />
              </button>
              <h3 className="text-base sm:text-lg font-semibold mt-2">{book.title}</h3>
              <p className="text-sm text-gray-500">By: {book.author}</p>
              <p className="text-green-600 font-bold text-sm">{book.views} Views</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
