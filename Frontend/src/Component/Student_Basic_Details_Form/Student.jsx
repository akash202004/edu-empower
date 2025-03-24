import React, { useState, useEffect } from "react";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";


const navigation = [
    { name: "Crowd Funding", path: "/crowdfunding", authRequired: true },
    { name: "Scholarship", path: "/scholarship", authRequired: true },
    { name: "Donation", path: "/donation", authRequired: false },
];

const scholarships = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/901964/pexels-photo-901964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",  // Replace with actual image paths
    title: "David L. Burns Memorial Scholarship",
    amount: "$3,000",
    fundedBy: "Burns",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/7713311/pexels-photo-7713311.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Keri Sohlman Memorial Scholarship",
    amount: "$1,500",
    fundedBy: "Matthew Mingle",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/7713538/pexels-photo-7713538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Patricia Ann Whelan Memorial Scholarship",
    amount: "$500",
    fundedBy: "Whelan Family",
  },
];


export default function ScholarshipHero() {
  const { isSignedIn } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
          navigate("/scholarship"); // Changed from "/scholarship/apply/form" to "/scholarship"
        }
      }, [isSignedIn, navigate]);

  return (
    <div className="scholarship-hero-wrapper">
      <main className="flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto px-6 py-16 lg:py-24 gap-12">
        {/* Left Side - Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Exclusive Scholarships, <br className="hidden md:inline" /> Matched to You
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            New scholarships published daily and matched to you, increasing your chances of winning.
          </p>
          <SignedOut>
            <SignInButton mode="modal" redirectUrl="/scholarship">
            <button className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium rounded-lg">
            Apply for scholarships
          </button>
            </SignInButton>
          </SignedOut>
          
          <p className="mt-2 text-sm text-gray-500">0% spam. 100% free.</p>

          {/* Universities Section */}
          <div className="mt-8">
            <p className="text-xs text-gray-500 font-semibold uppercase mb-4">Scholarships Featured By:</p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 opacity-70">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQBwuddBfDYzFHfvCjSk2dHhn1KL_weVdxIA&s" alt="Harvard" className="h-10" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/The_University_of_California_UCLA.svg/800px-The_University_of_California_UCLA.svg.png" alt="UCLA" className="h-8" />
              <img src="" alt="Vanderbilt" className="h-6" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTHxjibjLvPaPJSKRAFk2Oxyr_yxfcXeDYg6BF4jWJ5AERnOPn8NgeeMy&s=10" alt="Michigan" className="h-8" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_dtvPjZYkcgpbq18XmHvPnTEuyCOGIiGl3ERrtNtzlVeXYvTtp_j-_Odx&s=10" alt="Berkeley" className="h-10" />
              <img src="" alt="Georgetown" className="h-15" />
              <img src="https://collegeaim.org/wp-content/uploads/2021/09/syracuse.png" alt="Syracuse" className="h-8" />
            </div>
          </div>
        </div>

        {/* Right Side - Scholarship Card */}
        <div className="relative flex-1 max-w-md mx-auto">
          <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
              alt="Scholarship Recipients"
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 left-4 bg-white text-green-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow">
              🟢 LIVE • MAR 11
            </div>
            <div className="absolute top-12 left-4 text-white text-2xl font-bold">
              $33,911,846 <br />
              <span className="text-lg font-medium">Awarded to Edu-Empower Members</span>
            </div>
          </div>

          {/* Notification-style Scholarship Popup */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 bg-white rounded-lg shadow-md p-4 flex items-center">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="Hakima Siyad"
              className="h-10 w-10 rounded-full border border-gray-200"
            />
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold">Hakima Siyad won $1,000 scholarship</p>
              <p className="text-xs text-gray-500">Ismat Tariq Muslim Women Empowerment...</p>
            </div>
            <span className="text-xs text-gray-400">Just now</span>
          </div>
        </div>
      </main>
      <section className="py-16 px-4 bg-gray-50 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900">Featured Grants and Scholarships</h2>
        <p className="text-gray-600 mt-4 text-lg">
          Exclusive opportunities, fully managed on Bold.org. Find opportunities for current students and recent graduates at all education levels.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {scholarships.map((scholarship) => (
          <div
            key={scholarship.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-2xl transition-shadow duration-300"
          >
            <img src={scholarship.image} alt={scholarship.title} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-xl text-gray-900">{scholarship.title}</h3>
              <div className="flex justify-between items-center text-gray-600 text-sm mt-3">
                <span className="flex items-center gap-2">
                  <span className="text-gray-700 font-medium">Funded by</span> {scholarship.fundedBy}
                </span>
                <span className="font-bold text-gray-900 text-lg">{scholarship.amount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all duration-300">
          Join Edu-Empower
        </button>
        <button className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg font-medium shadow-md transition-all duration-300">
          See all scholarships
        </button>
      </div>
    </section>
    </div>
  );
}