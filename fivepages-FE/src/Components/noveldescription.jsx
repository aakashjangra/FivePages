"use client"
import { useState } from "react";
import Link from 'next/link';

export default function NovelPage() {
  const novel = {
    title: "Rebirth of the Supreme Celestial Being",
    image: "/novel-cover.jpg", // Replace with actual image URL
    author: "冰糖莲子羹",
    totalChapters: 774,
    tags: ["Completed", "Doting Love Interest", "Fantasy", "Adventure", "mpreg", "Rebirth", "Cultivation", "Second Chance", "Xianxia", "Happy Ending"],
    synopsis: "The genius cultivator Lin Xuanzhi didn’t let down the world in his past life, yet he only betrayed a single Yan Tianhen.",
    chapters: [
      { id: 1, title: 'Memories from the Past', content: 'Chapter 1 content here...' },
      { id: 2, title: 'Possessed', content: 'Chapter 2 content here...' },
      { id: 3, title: 'Supervisor\'s Scheme', content: 'Chapter 3 content here...' }
    ],
    recommended: [
      "Heavenly Sword Sect",
      "Reincarnation of the Martial God",
      "Celestial Emperor's Return"
    ],
  };

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { user: "You", time: "Just now", text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div className="border p-6">
      {/* Novel Header */}
      <div className="flex gap-4">
        <img src={novel.image} alt={novel.title} className=" border w-40 h-60 object-cover rounded" />
        <div>
          <h1 className="text-2xl font-bold">{novel.title}</h1>
          <p className="text-gray-600">Author: {novel.author}</p>
          <p className="text-gray-600">Total Chapters: {novel.totalChapters}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {novel.tags.map((tag, index) => (
          <span key={index} className="px-3 py-4 bg-gray-200 text-gray-700 rounded text-sm">{tag}</span>
        ))}
      </div>

      {/* Synopsis */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Synopsis</h2>
        <p className="text-gray-700">{novel.synopsis}</p>
      </div>

      {/* Chapter List */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Chapters</h2>
        <ul className="list-disc pl-5 text-blue-600">
          {novel.chapters.map((chapter) => (
            <li key={chapter.id}>
              <Link href={`/chapter/${chapter.id}`} className="text-blue-500 cursor-pointer">
                {chapter.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Novels */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Recommended Novels</h2>
        <ul className="list-disc pl-5">
          {novel.recommended.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>

      {/* Comment Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Leave a Comment</h2>
        <textarea
          className="w-full p-2 border rounded-lg"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleCommentSubmit}
        >
          Post Comment
        </button>
      </div>

      {/* Comments List */}
      {comments.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>
          {comments.map((comment, index) => (
            <div key={index} className="mt-2 px-4 py-2 border border rounded">
              <p className="font-semibold">{comment.user} <span className="text-gray-500 text-sm">{comment.time}</span></p>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
