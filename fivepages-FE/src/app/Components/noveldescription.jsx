"use client";
import { useState } from "react";
import Link from "next/link";

export default function NovelPage() {
  const novel = {
    title: "Rebirth of the Supreme Celestial Being",
    image: "/novel-cover.jpg", // Replace with actual image URL
    author: "冰糖莲子羹",
    totalChapters: 774,
    publishedYear: 2021,
    type: "Webnovel",
    originalLanguage: "Chinese", 
    tags: [
      "Completed",
      "Doting Love Interest",
      "Fantasy",
      "Adventure",
      "mpreg",
      "Rebirth",
      "Cultivation",
      "Second Chance",
      "Xianxia",
      "Happy Ending",
    ],
    synopsis:
      "The genius cultivator Lin Xuanzhi didn’t let down the world in his past life, yet he only betrayed a single Yan Tianhen.",
    chapters: [
      { id: 1, title: "Memories from the Past" },
      { id: 2, title: "Possessed" },
      { id: 3, title: "Supervisor's Scheme" },
    ],
    recommended: [
      "Heavenly Sword Sect",
      "Reincarnation of the Martial God",
      "Celestial Emperor's Return",
    ],
  };

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        { user: "You", time: "Just now", text: newComment },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F4F4F4] p-8">
      <div className="w-full max-w-3xl p-10 bg-white shadow-md border border-gray-300 rounded-xl space-y-10">
        {/* Novel Header */}
        <div className="flex gap-8">
          <img
            src={novel.image}
            alt={novel.title}
            className="w-44 h-64 object-cover rounded-lg border border-gray-300"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800">{novel.title}</h1>
            <p className="text-gray-600 mt-3">
              <span className="font-semibold">Author:</span> {novel.author}
            </p>
            <p className="text-gray-600 mt-3">
              <span className="font-semibold">Total Chapters:</span> {novel.totalChapters}
            </p>
            <p className="text-gray-600 mt-3">
              <span className="font-semibold">Published Year:</span> {novel.publishedYear}
            </p>
            <p className="text-gray-600 mt-3">
              <span className="font-semibold">Type:</span> {novel.type}
            </p>
            <p className="text-gray-600 mt-3">
              <span className="font-semibold">Original Language:</span> {novel.originalLanguage}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-5">
          {novel.tags.map((tag, index) => (
            <span
              key={index}
              className="px-5 py-3 bg-[#E3EAFD] text-[#4A5B94] rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Synopsis */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Synopsis</h2>
          <p className="text-gray-700 leading-8">{novel.synopsis}</p>
        </div>

        {/* Chapters */}
        <div className="bg-white p-10 rounded-xl shadow-md border border-gray-300 space-y-5">
          <h2 className="text-xl font-semibold text-gray-800">Chapters</h2>
          <ul className="space-y-4">
            {novel.chapters.map((chapter, index) => (
              <li key={chapter.id} className="flex items-center">
                <span className="mr-4 font-semibold text-gray-700">
                  {index + 1}.
                </span>
                <Link
                  href={`/chapter/${chapter.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {chapter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Novels */}
        <div className="bg-white p-10 rounded-xl shadow-md border border-gray-300 space-y-5">
          <h2 className="text-xl font-semibold text-gray-800">Recommended Novels</h2>
          <ul className="list-disc pl-8 text-gray-700 space-y-3">
            {novel.recommended.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>

        {/* Comments Section */}
        <div className="bg-white p-10 rounded-xl shadow-md border border-gray-300 space-y-5">
          <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((comment, index) => (
                <li key={index} className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-gray-800 font-semibold">{comment.user}</p>
                  <p className="text-gray-500 text-sm">{comment.time}</p>
                  <p className="text-gray-700 mt-2">{comment.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Leave a Comment */}
        <div className="bg-white p-10 rounded-xl shadow-md border border-gray-300 space-y-5">
          <h2 className="text-xl font-semibold text-gray-800">Leave a Comment</h2>
          <textarea
            className="w-full p-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B0C4DE] transition leading-7"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="px-6 py-4 bg-[#B0C4DE] text-white rounded-lg font-semibold hover:bg-[#9AB1C9] transition"
            onClick={handleCommentSubmit}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}
