"use client";
import { useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          {["dashboard", "novels", "update-chapters", "users", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${
                activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"
              }`}
            >
              {tab.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "novels" && <NovelsTab />}
          {activeTab === "update-chapters" && <UpdateChapters />}
          {activeTab === "users" && <UsersTab />}
          {activeTab === "settings" && <Settings />}
        </div>
      </div>
    </div>
  );
}

// Dashboard
function Dashboard() {
  return <h2 className="text-xl font-semibold">Welcome to the Admin Dashboard</h2>;
}

// Novels Management
function NovelsTab() {
  const [novels, setNovels] = useState([]);
  const [newNovel, setNewNovel] = useState({
    title: "",
    author: "",
    year: "",
    language: "",
    type: "",
    totalChapters: "",
  });

  const addNovel = () => {
    if (newNovel.title && newNovel.author && newNovel.year) {
      setNovels([...novels, { ...newNovel, id: novels.length + 1, chapters: [] }]);
      setNewNovel({ title: "", author: "", year: "", language: "", type: "", totalChapters: "" });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Novels</h2>

      {/* Add Novel */}
      <div className="mb-4 p-4 border rounded">
        <input
          type="text"
          placeholder="Title"
          value={newNovel.title}
          onChange={(e) => setNewNovel({ ...newNovel, title: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={newNovel.author}
          onChange={(e) => setNewNovel({ ...newNovel, author: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="number"
          placeholder="Published Year"
          value={newNovel.year}
          onChange={(e) => setNewNovel({ ...newNovel, year: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Language"
          value={newNovel.language}
          onChange={(e) => setNewNovel({ ...newNovel, language: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Book Type"
          value={newNovel.type}
          onChange={(e) => setNewNovel({ ...newNovel, type: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="number"
          placeholder="Total Chapters"
          value={newNovel.totalChapters}
          onChange={(e) => setNewNovel({ ...newNovel, totalChapters: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <button onClick={addNovel} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
          <PlusCircle className="mr-2" /> Add Novel
        </button>
      </div>

      {/* List of Novels */}
      {novels.map((novel) => (
        <div key={novel.id} className="border p-4 rounded mb-4">
          <h3 className="text-lg font-semibold">{novel.title}</h3>
          <p>Author: {novel.author}</p>
          <p>Year: {novel.year}</p>
          <p>Language: {novel.language}</p>
          <p>Type: {novel.type}</p>
          <p>Total Chapters: {novel.totalChapters}</p>
        </div>
      ))}
    </div>
  );
}

// Update Chapters
function UpdateChapters() {
  const [novels, setNovels] = useState([
    { id: 1, title: "The Lost Kingdom", chapters: ["Chapter 1", "Chapter 2"] },
    { id: 2, title: "Rise of the Phoenix", chapters: ["Prologue", "Chapter 1"] },
  ]);

  const [selectedNovel, setSelectedNovel] = useState(null);
  const [newChapter, setNewChapter] = useState("");

  const addChapter = () => {
    if (selectedNovel && newChapter) {
      setNovels((prevNovels) =>
        prevNovels.map((novel) =>
          novel.id === selectedNovel.id
            ? { ...novel, chapters: [...novel.chapters, newChapter] }
            : novel
        )
      );
      setNewChapter("");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Update Chapters</h2>

      {/* Select Novel */}
      <select
        onChange={(e) =>
          setSelectedNovel(novels.find((novel) => novel.id === Number(e.target.value)))
        }
        className="border p-2 rounded w-full mb-2"
      >
        <option value="">Select a Novel</option>
        {novels.map((novel) => (
          <option key={novel.id} value={novel.id}>
            {novel.title}
          </option>
        ))}
      </select>

      {/* Add Chapter */}
      {selectedNovel && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Chapter Title"
            value={newChapter}
            onChange={(e) => setNewChapter(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <button onClick={addChapter} className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
            <PlusCircle className="mr-2" /> Add Chapter
          </button>
        </div>
      )}
    </div>
  );
}

// Users Tab
function UsersTab() {
  return <h2 className="text-xl font-semibold">User Management</h2>;
}

// Settings Tab
function Settings() {
  return <h2 className="text-xl font-semibold">Settings</h2>;
}
