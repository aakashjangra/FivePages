"use client";

import { useEffect, useState } from "react";
import {
  fetchCommentsByNovel,
  postComment,
  deleteCommentById,
} from "./../../utlis/api";

export default function CommentSection({ novelId }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser?._id); // 👈 extract userId from localStorage
    }
  }, []);

  useEffect(() => {
    if (novelId) loadComments();
  }, [novelId]);

  const loadComments = async () => {
    const data = await fetchCommentsByNovel(novelId);
    if (!data.error) {
      // Sort by newest
      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setComments(sorted);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim() || !userId) return;

    const newEntry = await postComment({ content: newComment, userId, novelId });
    if (!newEntry.error) {
      setComments([newEntry, ...comments]);
      setNewComment("");
    }
  };

  const handleDelete = async (commentId) => {
    const res = await deleteCommentById(commentId);
    if (!res.error) {
      setComments(comments.filter((c) => c._id !== commentId));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 space-y-5">
      <h2 className="text-xl font-semibold text-gray-800">Leave a Comment</h2>

      <textarea
        className="w-full p-5 border border-gray-300 rounded-lg"
        placeholder="Write your comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />

      <button
        className="cursor-pointer px-6 py-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
        onClick={handlePostComment}
      >
        Post Comment
      </button>

      <div className="space-y-4 pt-6">
        {comments.map((comment) => (
          <div key={comment._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <div>
              <p className="text-gray-800">{comment.content}</p>
              <p className="text-sm text-gray-500">
                by {comment.user?.name || "Anonymous"}
              </p>
            </div>
            {comment.user?._id === userId && (
              <button
                className="text-red-500 hover:text-red-700 text-sm"
                onClick={() => handleDelete(comment._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
