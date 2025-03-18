"use client";
import { useEffect, useState } from "react";
import { fetchPopularBooks, fetchNewReleases } from "../../utlis/api";
import CarouselComponent from "../Corousel/CarouselComponent";
import PopularBooks from "../Popular/Popular";
import NewReleases from "../NewRealease/NewRelease";


const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [releaseBooks, setReleaseBooks] = useState([]);

  useEffect(() => {
    const fetchBooksData = async () => {
      setBooks(await fetchPopularBooks());
      setReleaseBooks(await fetchNewReleases());
    };

    fetchBooksData();
  }, []);
  return (
    <div className="mx-32 flex flex-col min-h-screen">
      <CarouselComponent />
      <PopularBooks books={books} />
      <NewReleases books={releaseBooks} />
    </div>
  );
};

export default Dashboard;
