"use client";

import { useEffect, useState } from "react";

export default function NewReleasesPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/new-releases")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching new releases:", error));
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">New Releases</h2>

      <div className="grid grid-cols-5 gap-6">
        {books.map((book, index) => (
          <div key={index} className="text-center">
            <img
              src={book.image}
              alt={book.title}
              className="w-40 h-60 object-cover rounded-lg shadow-md mx-auto"
            />
            <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
            <p className="text-sm text-gray-500">By: {book.author}</p>
            <p className="text-green-600 font-bold">{book.views.toLocaleString()} Views</p>
          </div>
        ))}
      </div>
    </section>
  );
}
