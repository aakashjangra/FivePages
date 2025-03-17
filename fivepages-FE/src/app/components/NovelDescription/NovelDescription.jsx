"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { BookmarkCheck, BookOpen, Heart } from "lucide-react";
import styles from "./NovelDescription.module.css";

export default function NovelPage() {
  const router = useRouter();
  const { id } = useParams(); // Get the novel ID from the URL

  // State Optimization using useState
  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInReadList, setIsInReadList] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  // Fetch novel data only when the ID changes
  useEffect(() => {
    if (!id) return;

    const fetchNovel = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/novels/${id}`);
        if (!response.ok) throw new Error("Failed to fetch novel data.");
        const data = await response.json();
        setNovel(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNovel();
  }, [id]);

  // Memoize handlers using useCallback to avoid unnecessary re-renders
  const handleCommentSubmit = useCallback(() => {
    if (!newComment.trim()) return;
    setComments((prev) => [...prev, { user: "You", time: "Just now", text: newComment }]);
    setNewComment("");
  }, [newComment]);

  const toggleReadList = useCallback(() => {
    setIsInReadList((prev) => !prev);
    alert(`${novel?.title} ${isInReadList ? "removed from" : "added to"} Read List!`);
  }, [isInReadList, novel?.title]);

  const toggleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
    alert(`${novel?.title} ${isLiked ? "removed from" : "added to"} Liked Novels!`);
  }, [isLiked, novel?.title]);

  const readNow = useCallback(() => {
    router.push(`/chapter/1`);
  }, [router]);

  // Memoized Novel Tags for performance
  const novelTags = useMemo(() => (
    novel?.tags?.map((tag, index) => (
      <span key={index} className="px-5 py-3 bg-[#E3EAFD] text-[#4A5B94] rounded-full text-sm">{tag}</span>
    ))
  ), [novel?.tags]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!novel) return <div>Novel not found</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F4F4F4] p-8">
      <div className="w-full max-w-3xl p-10 bg-white shadow-md border border-gray-300 rounded-xl space-y-10">
        {/* Novel Header */}
        <div className="flex gap-8">
          <img src={novel.image || "/placeholder.jpg"} alt={novel.title} className="w-44 h-64 object-cover rounded-lg border border-gray-300" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800">{novel.title}</h1>
            <p className="text-gray-600 mt-3"><span className="font-semibold">Author:</span> {novel.author}</p>
            <p className="text-gray-600 mt-3"><span className="font-semibold">Published Year:</span> {novel.publishedYear}</p>
            <p className="text-gray-600 mt-3"><span className="font-semibold">Type:</span> {novel.type}</p>
            <p className="text-gray-600 mt-3"><span className="font-semibold">Original Language:</span> {novel.language}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <button onClick={readNow} className="px-4 py-2 flex gap-2 items-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <BookOpen /> Start Reading
          </button>
          <button onClick={toggleReadList} className={`px-4 py-2 border flex gap-2 items-center rounded-lg transition ${isInReadList ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"}`}>
            <BookmarkCheck /> {isInReadList ? "Added to Readlist" : "Add to Readlist"}
          </button>
          <button onClick={toggleLike} className={`px-4 py-2 transition ${isLiked ? "text-red-500" : "text-gray-800"}`}>
            <span className="text-2xl h-10 w-10">
              {isLiked ? <span className={styles.redHeart}><Heart color="#bd0f0f" /></span> : <Heart />}
            </span>
          </button>
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-5">
          {novelTags}
        </div>

        {/* Synopsis */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Synopsis</h2>
          <p className="text-gray-700 leading-8">{novel.synopsis}</p>
        </div>

        {/* Recommended Novels */}
        {novel.recommended?.length > 0 && (
          <div className="bg-white p-10 rounded-xl shadow-md border border-gray-300 space-y-5">
            <h2 className="text-xl font-semibold text-gray-800">Recommended Novels</h2>
            <ul className="list-disc pl-8 text-gray-700 space-y-3">
              {novel.recommended.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Comments Section */}
        <div className="bg-white p-10 rounded-xl shadow-md border border-gray-300 space-y-5">
          <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
          {comments.length === 0 ? <p className="text-gray-500">No comments yet.</p> : (
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
          <textarea className="w-full p-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B0C4DE] transition leading-7" placeholder="Write your comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
          <button className="px-6 py-4 bg-[#B0C4DE] text-white rounded-lg font-semibold hover:bg-[#9AB1C9] transition" onClick={handleCommentSubmit}>Post Comment</button>
        </div>
      </div>
    </div>
  );
}
