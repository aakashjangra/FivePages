"use client";
import { useRouter } from "next/navigation";

const NewReleases = ({ books }) => {
  const router = useRouter();

  return (
    <section className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <span className="text-green-600 text-3xl mr-2">▌</span> New Releases
        </h2>
        <button
          onClick={() => router.push("/new-releases-page")}
          className="text-green-600 font-semibold text-sm hover:underline"
        >
          See More →
        </button>
      </div>

      <div className="grid grid-cols-5 gap-6 mt-6">
        {books.slice(0, 5).map((book, index) => (
          <div key={index} className="text-center">
            <img
              src={book.image}
              alt={book.title}
              className="w-32 h-48 object-cover rounded-lg shadow-md mx-auto"
            />
            <h3 className="text-md font-semibold mt-2">{book.title}</h3>
            <p className="text-sm text-gray-500">By: {book.author}</p>
            <p className="text-green-600 font-bold text-sm">
              {book.views.toLocaleString()} Views
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewReleases;
