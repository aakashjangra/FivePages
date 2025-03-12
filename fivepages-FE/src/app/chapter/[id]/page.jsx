'use client';
import { useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const chapters = [
  { id: 1, title: 'Memories from the Past', content: 'Chapter 1 ' },
  { id: 2, title: 'Possessed', content: 'Chapter 2 ' },
  { id: 3, title: 'Supervisor\'s Scheme', content: 'Chapter 3 ' }
];

const recommendedNovels = [
  { id: 1, title: 'Heavenly Sword Rebirth' },
  { id: 2, title: 'Immortal Dao Chronicles' }
];

export default function ChapterPage({ params }) {
  
  const router = useRouter();
  const {id} = use(params);
  const chapter = chapters.find((ch) => ch.id == id);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // // re
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate authentication check (Replace with actual logic)
    
    const user = localStorage.getItem('user'); // Assuming you store user data in localStorage
    if (!user) {
      router.push('/login'); // Redirect to login page if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <p>Redirecting to login...</p>;
  } 

  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  if (!chapter) return <p>Chapter not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-red-600">Rebirth of the Supreme Celestial Being</h1>
      <h2 className="text-xl font-semibold my-2">{chapter.title}</h2>
      <p className="mt-4">{chapter.content}</p>
      
      <div className="flex justify-between my-4">
        {chapter.id > 1 ? (
          <Link href={`/chapter/${chapter.id - 1}`} className="p-2 bg-gray-200 rounded">
            Prev
          </Link>
        ) : (
          <span className="p-2 bg-gray-200 rounded opacity-50 pointer-events-none">Prev</span>
        )}
        
        {chapter.id < chapters.length ? (
          <Link href={`/chapter/${chapter.id + 1}`} className="p-2 bg-gray-200 rounded">
            Next
          </Link>
        ) : (
          <span className="p-2 bg-gray-200 rounded opacity-50 pointer-events-none">Next</span>
        )}
      </div>

      <h3 className="text-lg font-semibold mt-6">Recommended Novels</h3>
      <ul>
        {recommendedNovels.map((novel) => (
          <li key={novel.id} className="text-blue-500 cursor-pointer">
            <Link href={`/novel/${novel.id}`}>{novel.title}</Link>
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mt-6">Comments</h3>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="border p-2 w-full"
        placeholder="Leave a comment..."
      />
      <button onClick={addComment} className="bg-red-500 text-white p-2 mt-2">Post Comment</button>
      
      {comments.length > 0 && (
        <ul className="mt-4">
          {comments.map((comment, index) => (
            <li key={index} className="border-b p-2">{comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function NovelPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Novel Chapters</h1>
      <ul className="mt-4">
        {chapters.map((chapter) => (
          <li key={chapter.id} className="text-blue-500 cursor-pointer">
            <Link href={`/chapter/${chapter.id}`}>{chapter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
