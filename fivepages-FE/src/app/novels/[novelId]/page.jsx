"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import "../../globals.css";
import { BookmarkCheck, BookOpen, Heart } from "lucide-react";
import { fetchNovelById, fetchCurrentUser } from "./../../utlis/api";
import CommentSection from "@/app/components/CommentSection/CommentSection";

export default function NovelPage() {
  const router = useRouter();
  const { novelId } = useParams();

  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [isInReadList, setIsInReadList] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchNovelById(novelId);
      const user = await fetchCurrentUser();

      if (result.error) {
        setError(result.error);
      } else {
        setNovel(result);
      }

      if (!user.error) {
        setUserId(user._id);
      }

      setLoading(false);
    };

    if (novelId) fetchData();
  }, [novelId]);

  const toggleReadList = () => {
    setIsInReadList(!isInReadList);
    alert(`${novel?.title} ${isInReadList ? "removed from" : "added to"} Read List!`);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    alert(`${novel?.title} ${isLiked ? "removed from" : "added to"} Liked Novels!`);
  };

  const readNow = () => {
    if (novel?.chapters?.length > 0) {
      router.push(`/chapters/${novel.chapters[0]._id}`);
    } else {
      console.error("No chapters available for this novel");
    }
  };

  if (loading) return <p className="text-center text-xl">Loading novel...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F4F4F4] p-8">
      <div className="w-full max-w-3xl p-10 bg-white shadow-md border border-gray-300 rounded-xl space-y-10">
        {/* Header */}
        <div className="flex gap-8">
          <img src={novel.thumbnail} alt={novel.title} className="w-44 h-64 object-cover rounded-lg border border-gray-300" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800">{novel.title}</h1>
            <p className="text-gray-600 mt-3"><span className="font-semibold">Author:</span> {novel.author}</p>
            <p className="text-gray-600 mt-3"><span className="font-semibold">Language:</span> {novel.language}</p>
            <p className="text-gray-600 mt-3"><span className="font-semibold">Published Year:</span> {novel.publishedYear}</p>
            <p className="text-gray-600 mt-3"><span className="font-semibold">Type:</span> {novel.type}</p>
            <p className="text-gray-600 mt-3"><span className="font-semibold">Rating:</span> {novel.rating}</p>
            <p className="text-gray-600 mt-3"><span className="font-semibold">Total Chapters:</span> {novel.chapters?.length}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-4">
          <button onClick={readNow} className="cursor-pointer px-4 py-2 flex gap-2 items-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <BookOpen /> Start Reading
          </button>
          <button onClick={toggleReadList} className={`cursor-pointer px-4 py-2 border flex gap-2 items-center rounded-lg transition ${isInReadList ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"}`}>
            <BookmarkCheck /> {isInReadList ? "Added to Readlist" : "Add to Readlist"}
          </button>
          <button onClick={toggleLike} className={`cursor-pointer px-4 py-2 transition ${isLiked ? "text-red-500" : "text-gray-800"}`}>
            <Heart color={isLiked ? "#bd0f0f" : "black"} />
          </button>
        </div>

        {/* Synopsis */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Synopsis</h2>
          <p className="text-gray-700">{novel.synopsis}</p>
        </div>

        {/* Chapters */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 space-y-5">
          <h2 className="text-xl font-semibold text-gray-800">Chapters</h2>
          <ul className="space-y-4">
            {novel.chapters?.map((chapter, index) => (
              <li key={chapter._id || index} className="flex items-center">
                <span className="mr-4 font-semibold text-gray-700">{index + 1}.</span>
                <Link href={`/chapters/${chapter._id}`} className="text-blue-600 hover:underline">
                  {chapter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Comments Section */}
        <div className="bg-white space-y-5">
          <CommentSection novelId={novel._id} userId={userId} />
        </div>
      </div>
    </div>
  );
}
