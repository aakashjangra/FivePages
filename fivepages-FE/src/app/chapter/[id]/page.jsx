'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const chapters = [
  { id: 1, title: 'Memories from the Past', content: 'Chapter 1 content goes here...' },
  { id: 2, title: 'Possessed', content: 'Chapter 2 content goes here...' },
  { id: 3, title: "Supervisor's Scheme", content: 'Chapter 3 content goes here...' }
];

const recommendedNovels = [
  { id: 1, title: 'Heavenly Sword Rebirth' },
  { id: 2, title: 'Immortal Dao Chronicles' }
];

export default function ChapterPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const chapter = chapters.find((ch) => ch.id == id);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const user = localStorage.getItem('user'); 
//     if (!user) {
//       router.push('/login');
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   if (!isAuthenticated) {
//     return <p className="text-center text-gray-500 text-lg mt-10">Redirecting to login...</p>;
//   }

  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  if (!chapter) return <p className="text-center text-gray-500 text-lg mt-10">Chapter not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-3xl font-extrabold text-[#4A90E2] text-center">Rebirth of the Supreme Celestial Being</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">{chapter.title}</h2>
      <p className="mt-4 text-lg text-gray-700 leading-relaxed">{chapter.content}</p>

      {/* Navigation */}
      <div className="flex justify-between my-6">
        {chapter.id > 1 ? (
          <Link href={`/chapter/${chapter.id - 1}`} className="px-4 py-2 bg-[#E3E8F0] rounded-lg hover:bg-[#D4DBE8] transition">
            &larr; Prev
          </Link>
        ) : (
          <span className="px-4 py-2 bg-gray-200 rounded-lg opacity-50 pointer-events-none">&larr; Prev</span>
        )}

        {chapter.id < chapters.length ? (
          <Link href={`/chapter/${chapter.id + 1}`} className="px-4 py-2 bg-[#E3E8F0] rounded-lg hover:bg-[#D4DBE8] transition">
            Next &rarr;
          </Link>
        ) : (
          <span className="px-4 py-2 bg-gray-200 rounded-lg opacity-50 pointer-events-none">Next &rarr;</span>
        )}
      </div>

      {/* Recommended Novels */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">📖 Recommended Novels</h3>
        <ul className="mt-4 space-y-2">
          {recommendedNovels.map((novel) => (
            <li key={novel.id} className="text-[#4A90E2] cursor-pointer hover:underline">
              <Link href={`/novel/${novel.id}`}>{novel.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">💬 Comments</h3>
        <div className="mt-4 flex flex-col gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
            placeholder="Leave a comment..."
          />
          <button
            onClick={addComment}
            className="bg-[#A3BCE2] text-white px-4 py-2 rounded-lg hover:bg-[#8FA8D1] transition"
          >
            Post Comment
          </button>
        </div>

        {comments.length > 0 && (
          <ul className="mt-4 space-y-2">
            {comments.map((comment, index) => (
              <li key={index} className="border-b p-2 bg-[#F7F7F7] rounded-lg">{comment}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
