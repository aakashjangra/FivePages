"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import CommentSection from "@/app/components/CommentSection/CommentSection";

export default function ChapterPage() {
  const { id } = useParams();
  const router = useRouter();

  const [chapter, setChapter] = useState(null);
  const [novel, setNovel] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Authentication check
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Fetch chapter and novel data
  useEffect(() => {
    if (!isAuthenticated || !id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const chapterRes = await fetch(`${process.env.NEXT_PUBLIC_PORT}chapters/${id}`);
        if (!chapterRes.ok) throw new Error("Failed to fetch chapter");

        const chapterData = await chapterRes.json();
        chapterData.content = chapterData.content.replace(/\n/g, "<br>");
        setChapter(chapterData);

        const novelRes = await fetch(`${process.env.NEXT_PUBLIC_PORT}novels/${chapterData.novel}`);
        if (!novelRes.ok) throw new Error("Failed to fetch novel");

        const novelData = await novelRes.json();
        setNovel(novelData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isAuthenticated]);

  const { currentIndex, prevChapter, nextChapter } = useMemo(() => {
    if (!novel?.chapters || !id) {
      return { currentIndex: -1, prevChapter: null, nextChapter: null };
    }

    const idx = novel.chapters.findIndex(ch => ch._id === id);
    return {
      currentIndex: idx,
      prevChapter: idx > 0 ? novel.chapters[idx - 1] : null,
      nextChapter: idx < novel.chapters.length - 1 ? novel.chapters[idx + 1] : null,
    };
  }, [novel, id]);

  if (!isAuthenticated) {
    return <div className="text-center py-10">Redirecting to login...</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <h3 className="text-red-800 font-medium">Error loading chapter</h3>
          <p className="text-red-700">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!chapter || !novel) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-gray-600 mb-4">Chapter data not found</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-14 py-8 border-2 bg-white">

      {/* Breadcrumb Navigation */}
      <nav className="flex flex-wrap items-center mb-6 text-sm text-gray-600">

        <Link href="/" className="hover:text-blue-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/novels" className="hover:text-blue-500">Novels</Link>
        <span className="mx-2">/</span>
        <Link href={`/novels/${novel._id}`} className="hover:text-blue-500">{novel.title}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">{chapter.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{novel.title}</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-2">{chapter.title}</h2>
      </div>

      {/* Content */}
      <div className="prose max-w-none">
        {chapter.content ? (
          <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No content available for this chapter.</p>
          </div>
        )}
      </div>


     

      {/* Navigation */}
      <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between">
        {prevChapter ? (
          <Link
            href={`/chapters/${prevChapter._id}`}
            className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous Chapter
          </Link>
        ) : <div></div>}

        <Link
          href={`/novels/${novel._id}`}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          Back to Novel
        </Link>

        {nextChapter ? (
          <Link
            href={`/chapters/${nextChapter._id}`}
            className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Next Chapter
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : <div></div>}
        
      </div>
   
    </div>
  );
}
