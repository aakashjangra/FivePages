"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CarouselComponent from "../Corousel/Corousel";
import NovelPage from "../NovelDescription/NovelDescription";

const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [releaseBooks, setReleaseBooks] = useState([]);
    const router = useRouter();
  
    useEffect(() => {
      fetch("http://localhost:5000/api/popular-books")
        .then((res) => res.json())
        .then((data) => setBooks(data))
        .catch((error) => console.error("Error fetching books:", error));

        fetch("http://localhost:5000/api/new-releases")
      .then((res) => res.json())
      .then((data) => setReleaseBooks(data))
      .catch((error) => console.error("Error fetching new releases:", error));
    }, []);
  
  return (
    <div className="mx-32">
      <section>
        <CarouselComponent />
      </section>

      {/* Popular Books  */}
      <section className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <span className="text-green-600 text-3xl mr-2">▌</span> Popular
        </h2>
        {/* Redirect to /popular page */}
        <button
          onClick={() => router.push("/popular")}
          className="text-green-600 font-semibold text-sm hover:underline"
        >
          See More →
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {books.slice(0, 6).map((book, index) => (
          <div key={index} className="flex gap-4">
            <img
              src={book.image}
              alt={book.title}
              className="w-28 h-40 object-cover rounded-lg shadow-md"
            />
            <div>
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-500">By: {book.author}</p>
              <p className="text-green-600 font-bold text-sm">
                {book.views.toLocaleString()} Views
              </p>
              <p className="text-sm text-gray-600 line-clamp-3">{book.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

 {/* New Releases Books  */}
    <section className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <span className="text-green-600 text-3xl mr-2">▌</span> New Releases
        </h2>
        {/* Redirect to /new-releases page */}
        <button
          onClick={() => router.push("/new-releases")}
          className="text-green-600 font-semibold text-sm hover:underline"
        >
          See More →
        </button>
      </div>

      <div className="grid grid-cols-5 gap-6 mt-6">
        {releaseBooks.slice(0, 5).map((book, index) => (
          <div key={index} className="text-center">
            <img
              src={book.image}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-lg shadow-md mx-auto"
            />
            <h3 className="text-md font-semibold mt-2">{book.title}</h3>
            <p className="text-sm text-gray-500">By: {book.author}</p>
            <p className="text-green-600 font-bold text-sm">
              {book.views.toLocaleString()} Views
            </p>
          </div>
        ))}
      </div>
    </section>
    </div>

    
  );
};

export default Dashboard;
