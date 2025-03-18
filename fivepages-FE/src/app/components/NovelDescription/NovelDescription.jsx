"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { BookmarkCheck, BookOpen, Heart } from "lucide-react";
import styles from "./NovelDescription.module.css";

export default function NovelPage() {
  const router = useRouter();
  const { id } = useParams();

  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInReadList, setIsInReadList] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!id) {
      console.error("Novel ID is undefined");
      return;
    }
  
    const fetchNovel = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/novels/${id}`);
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
  

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/like/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setIsLiked(data.isLiked);
        }
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };

    fetchLikeStatus();
  }, [id]);

  useEffect(() => {
    const fetchReadListStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/readlist/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setIsInReadList(data.isInReadList);
        }
      } catch (error) {
        console.error("Error fetching readlist status:", error);
      }
    };

    fetchReadListStatus();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/novels/${id}/comments`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (err) {
        console.error("Error fetching comments", err);
      }
    };
    fetchComments();
  }, [id]);

  const handleCommentSubmit = useCallback(() => {
    if (!newComment.trim()) return;
    setComments(prev => [...prev, { user: "You", time: "Just now", text: newComment }]);
    setNewComment("");
  }, [newComment]);

  const toggleLike = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/like/${id}`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setIsLiked(data.isLiked);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  }, [id]);

  const toggleReadList = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/readlist/${id}`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setIsInReadList(data.isInReadList);
      }
    } catch (error) {
      console.error("Error updating readlist status:", error);
    }
  }, [id]);

  const readNow = useCallback(() => {
    router.push(`/chapter/${novel?.firstChapterId || 1}`);
  }, [router, novel]);

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
        <div className="flex gap-8">
          <img src={novel.image || "/placeholder.jpg"} alt={novel.title} className="w-44 h-64 object-cover rounded-lg border border-gray-300" />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800">{novel.title}</h1>
            <p className="text-gray-600 mt-3 font-semibold">Author: {novel.author}</p>
            <p className="text-gray-600 mt-3 font-semibold">Published: {novel.publishedYear}</p>
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <button onClick={readNow} className="px-4 py-2 flex gap-2 items-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            <BookOpen /> Start Reading
          </button>
          <button onClick={toggleReadList} className={`px-4 py-2 border flex gap-2 items-center rounded-lg transition ${isInReadList ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"}`}>
            <BookmarkCheck /> {isInReadList ? "Added to Readlist" : "Add to Readlist"}
          </button>
          <button onClick={toggleLike} className={`px-4 py-2 transition ${isLiked ? "text-red-500" : "text-gray-800"}`}>
            <Heart className={isLiked ? styles.redHeart : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}
