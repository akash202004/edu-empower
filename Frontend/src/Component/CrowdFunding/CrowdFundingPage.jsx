import React, { useState, useEffect } from "react";
import donateimg from '../../assets/donateimg.png'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FiSmile } from "react-icons/fi";


const navigation = [
  { name: "Crowd Funding", path: "/crowdfunding", authRequired: true },
  { name: "Scholarship", path: "/scholarship", authRequired: true },
  { name: "Donation", path: "/donation", authRequired: false },
];

export default function CrowedFunding() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();


  return (

    <div className="font-sans text-gray-900 min-h-screen bg-white">
      <div className="container  mx-auto px-4 py-20">
        <div className="flex justify-center items-center mt-10">
          <img src={donateimg} alt="Mentorship Icon" className="w-32 h-32" />
        </div>
        <div className="flex justify-center items-center mt-8">
          <h1 className="text-4xl text-center w-100 font-semibold">Make a Difference With Your Donation</h1>
        </div>
        <div className="flex mt-12 justify-center items-center">
          <button class="bg-black text-white font-bold py-2 px-4 shadow-md transition duration-300 cursor-pointer"
          onClick={() => navigate('/crowdfunding2')}>
            Get involved
          </button>
        </div>
      </div>
      <div className="bg-gray-200 mx-auto px-4 py-20">
        <div className="w-full flex justify-between px-8 space-x-1">
          <div className="w-1/3 flex justify-between">
            <div className="w-1/4 flex items-center pl-5">
              <FiSmile className="overflow-hidden h-15 w-15" />
            </div>
            <div className="w-3/4">
              <h2 className="font-semibold py-2">Supporting Education</h2>
              <h3>Empower future leader with quality education.</h3>
            </div>
          </div>
          <div className="w-1/3 flex justify-between">
            <div className="w-1/4 flex items-center pl-5">
              <FiSmile className="overflow-hidden h-15 w-15" />
            </div>
            <div className="w-3/4">
              <h2 className="font-semibold py-2">Empower Future Leaders</h2>
              <h3>Provide opportuneties for bride future.</h3>
            </div>
          </div>
          <div className="w-1/3 flex justify-between">
            <div className="w-1/4 flex items-center pl-5">
              <FiSmile className="overflow-hidden h-15 w-15" />
            </div>
            <div className="w-3/4">
              <h2 className="font-semibold py-2">Recognization and Gratitude</h2>
              <h3>Celebrate the impact of your genarocity.</h3>
            </div>
          </div>
        </div>
        <div className="flex mt-16 w-full items-center justify-center">
          <h1 className="font-bold text-xl">Join ScholarshipDonor Community and Support Education for All</h1>
        </div>
        <div className="flex mt-16 w-full items-center justify-between space-x-10 px-10">
          <div className="w-1/4 h-64 px-5 bg-black text-white">
            <h1 className="text-6xl">,,</h1>
            <h1 className="mt-10 text-2xl">Education is empowerment</h1>
            <h1 className="mt-14">Emily s. Content creator</h1>
          </div>
          <div className="w-1/4 h-64 px-5 bg-black text-white">
            <h1 className="text-6xl">,,</h1>
            <h1 className="mt-10 text-2xl">Education is empowerment</h1>
            <h1 className="mt-14">Emily s. Content creator</h1>
          </div>
          <div className="w-1/4 h-64 px-5 bg-black text-white">
            <h1 className="text-6xl">,,</h1>
            <h1 className="mt-10 text-2xl">Education is empowerment</h1>
            <h1 className="mt-14">Emily s. Content creator</h1>
          </div>
          <div className="w-1/4 h-64 px-5 bg-black text-white">
            <h1 className="text-6xl">,,</h1>
            <h1 className="mt-10 text-2xl">Education is empowerment</h1>
            <h1 className="mt-14">Emily s. Content creator</h1>
          </div>
        </div>
      </div>
      <div className="flex mt-16 w-full items-center justify-center">
        <h1 className="font-semibold text-2xl">Select Your Contribution</h1>
      </div>
      <div className="flex items-center mt-10 justify-between space-x-4 px-10 h-auto">
        <div className="w-1/3 h-64 bg-gray-200 rounded-3xl">
          <div className="flex justify-between items-center px-5 mt-5">
            <h1 className="font-bold text-xl">Basic</h1>
            <FiSmile className="h-7 w-7" />
          </div>
          <h1 className="font-semibold text-2xl px-5">Donate $76/Month</h1>
          <div className="px-4">
            <ul className="list-disc mt-10 pl-5">
              <li>Support 20 student monthly</li>
              <li>Scholarship programmms</li>
              <li>Connect with recipients</li>
            </ul>
          </div>
          <button class="bg-white text-Black text-xs text-center ml-5 mt-5 py-2 px-4 shadow-md transition duration-300">
            Donate Now
          </button>
        </div>
        <div className="w-1/3 h-64 bg-gray-200 rounded-3xl">
          <div className="flex justify-between items-center px-5 mt-5">
            <h1 className="font-bold text-xl">Basic</h1>
            <FiSmile className="h-7 w-7" />
          </div>
          <h1 className="font-semibold text-2xl px-5">Donate $76/Month</h1>
          <div className="px-4">
            <ul className="list-disc mt-10 pl-5">
              <li>Support 20 student monthly</li>
              <li>Scholarship programmms</li>
              <li>Connect with recipients</li>
            </ul>
          </div>
          <button class="bg-white text-Black text-xs text-center ml-5 mt-5 py-2 px-4 shadow-md transition duration-300">
          Donate Now
          </button>
        </div>
        <div className="w-1/3 h-64 bg-gray-200 rounded-3xl">
          <div className="flex justify-between items-center px-5 mt-5">
            <h1 className="font-bold text-xl">Basic</h1>
            <FiSmile className="h-7 w-7" />
          </div>
          <h1 className="font-semibold text-2xl px-5">Donate $76/Month</h1>
          <div className="px-4">
            <ul className="list-disc mt-10 pl-5">
              <li>Support 20 student monthly</li>
              <li>Scholarship programmms</li>
              <li>Connect with recipients</li>
            </ul>
          </div>
          <button class="bg-white text-Black text-xs text-center ml-5 mt-5 py-2 px-4 shadow-md transition duration-300">
          Donate Now
          </button>
        </div>
      </div>
      <footer className="bg-black text-white mt-16 py-10 px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="font-bold text-lg mb-2">Contact Us</h2>
            <p>Email: info@scholarshipdonor.org</p>
            <p>Phone: +1 234 567 890</p>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-2">Follow Us</h2>
            <p>Social icons here</p>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-2">Resources</h2>
            <p>FAQ</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
        </footer>
    </div>


  );
}