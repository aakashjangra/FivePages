"use client";

import { useEffect, useState } from "react";
import PopularBooks from "../Popular/Popular";
import NewReleases from "../NewRealease/NewRelease";
import CorouselComponent from "../Corousel/CarouselComponent";


const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/novels/latest"
        );
        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const data = await response.json();
        console.log("Fetched Novels:", data);
        setBooks(data);
      } catch (err) {
        console.error("Fetch Error:", err.message);
        setError("Failed to fetch latest novels.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="lg:mx-32 mx-25px flex flex-col min-h-screen">
      {loading ? (
        <p className="text-center text-lg my-4">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          {/* <NewCorousel books={books}/> */}
          <CorouselComponent books={books} />
          <PopularBooks books={books} />
          <NewReleases books={books} />
          
        </>
      )}
    </div>
  );
};

export default Dashboard;
