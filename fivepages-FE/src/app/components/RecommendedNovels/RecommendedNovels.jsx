"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RecommendedNovels({ novelId, count = 5 }) {
  const [recommendations, setRecommendations] = useState([]);
    const router = useRouter(); 

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/novels/`);;
        const data = await res.json();
        console.log(data)
        setRecommendations(data);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      }
    };

    if (novelId) fetchRecommendations();
  }, [novelId, count]);



  return (
    <div className="mt-10 p-4 bg-gray-100 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4">You Might Also Like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recommendations.map((novel) => (
          <div key={novel._id} className="bg-white p-3 rounded shadow hover:shadow-md transition">
             <button onClick={() => router.push(`/novels/${novel._id}`)}  ></button>
            <img
              src={novel.thumbnail}
              alt={novel.title
              }
              className="h-40 w-full object-cover rounded cursor-pointer"
            />
            <h4 className="mt-2 font-semibold">{novel.title}</h4>
            
          </div>
        ))}
      </div>
    </div>
  );
}
