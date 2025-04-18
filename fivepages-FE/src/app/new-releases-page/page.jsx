"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchNewReleases } from "./../utlis/api";

export default function NewReleasesPage() {
  const [books, setBooks] = useState([]);
    const router = useRouter();

    useEffect(() => {
      const getBooks = async () => {
        const result = await fetchNewReleases();
        if (!result.error) {
          setBooks(result);
        } else {
          cosole.error("Error fetching books ", result.error);
        }
      };
      getBooks();
    }, []);

  return (
  <>

    <section className="p-6">
      <h2 className="text-4xl font-bold text-center mb-6">New Releases</h2>

      <div className="grid grid-cols-5 gap-3 shadow-lg p-4">
        {books.map((book, index) => (
          <div key={index} className="text-center shadow-lg rounded ">
            <button onClick={() => router.push(`/novels/${book._id}`)}  >
            <img
              src={book.thumbnail}
              alt={book.title}
              className="w-40 h-60 object-cover rounded-lg shadow-md mx-auto cursor-pointer"
            />
            </button>
            <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
            <p className="text-sm text-gray-500">By: {book.author}</p>
            <p className="text-green-600 font-bold">{book.views} Views</p>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
