"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAllNovels } from "./../utlis/api";

export default function AllNovels() {
  const [books, setBooks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const allNovels = async () => {
      const result = await fetchAllNovels();
      // console.log(result);
      if (!result.error) {
        setBooks(result);
      } else {
        cosole.error("Error fetching books ", result.error);
      }
    };
    allNovels();
  }, []);

  return (
    <>
      <section className="p-6 bg-white">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="text-blue-600 text-3xl mr-2">▌</span>Novels
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-6 mt-6  p-6">
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
