"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How can I contact you?",
    answer:
      "The best (and only!) way to reach us is through Discord! We hang out there, chat with readers, and handle support. Join us here: [Discord Invite Link] 🎉",
  },
  {
    question: "Do you provide email or phone support?",
    answer:
      "Nope! We keep things simple and fun—all support happens on Discord. That way, you can get help quickly and chat with other readers too!",
  },
  {
    question: "What can I ask in the Discord server?",
    answer:
      "Pretty much anything related to the website! You can: \n - Report issues or bugs 🛠️\n - Suggest novels you’d love to read 📚\n - Get help with your account 👤\n - Just hang out and discuss your favorite books with other readers! 💬",
  },
  {
    question: "I can’t access the Discord server. What should I do?",
    answer:
      "Oh no! 😲 First, make sure you’re logged into Discord. If the invite link isn’t working, check our website for the latest one or let us know through a friend on the server!",
  },
  {
    question: "How long does it take to get a response?",
    answer:
      "We try our best to reply within 24 hours, but honestly, our community is so active that you might get an answer even faster! 😉",
  },
  {
    question: "Can I request a novel to be added?",
    answer:
      "Absolutely! Drop your request in the #novel-requests channel on Discord. If enough people want it, we’ll do our best to add it! 📖✨",
  },
];

export default function ContactUs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Contact Us</h1>

        {/* Discord Section */}
        <div className="p-5 bg-gray-100 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MessageCircle className="text-blue-500 w-12 h-12" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Join Our Discord Community</h2>
              <p className="text-gray-600 text-sm">
                Connect with fellow readers, share your thoughts, and participate in exciting book discussions!
              </p>
            </div>
          </div>
          <Link 
            href="/discord-invite"
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all"
          >
            Join
          </Link>
        </div>

        {/* FAQ Section */}
        <h2 className="text-2xl font-semibold mt-10 mb-5 text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-gray-300 pb-3 transition hover:bg-gray-50 rounded-lg p-3"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left font-medium py-2 text-gray-900"
              >
                {faq.question}
                <ChevronDown
                  className={`transform transition-transform ${
                    openIndex === index ? "rotate-180 text-blue-500" : "text-gray-600"
                  }`}
                />
              </button>
              {openIndex === index && (
                <p className="text-gray-700 mt-2 leading-relaxed">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}