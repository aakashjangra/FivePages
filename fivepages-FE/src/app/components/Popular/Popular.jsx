"use client";
import { useRouter } from "next/navigation";
import React,{ useCallback } from "react";

// Memoize PopularBooks component to avoid unnecessary re-renders
const PopularBooks = React.memo(({ books }) => {
  const router = useRouter();

  // Memoize the click handler to prevent unnecessary re-creations
  const handleClick = useCallback((id) => {
    router.push(`/novels/${id}`);
  }, [router]);

  return (
    <section className="p-6 bg-white mb-2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <span className="text-blue-600 text-3xl mr-2">▌</span> Popular Books
        </h2>
        <button
          onClick={() => router.push("/popularbooks")}
          className="text-blue-600 font-semibold text-sm hover:underline"
        >
          See More →
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {books.slice(0, 6).map((book) => (
          <div key={book._id} className="flex gap-4 rounded p-2 shadow-lg">
            {/* Clickable image */}
            <button onClick={() => handleClick(book._id)}>
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
  );
});

export default PopularBooks;
