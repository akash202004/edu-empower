import React from "react";
import donateimg from '../../assets/donateimg.png';
import { useNavigate } from "react-router-dom";
import { FiSmile } from "react-icons/fi";

export default function CrowedFunding() {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-900 min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-center items-center mt-10">
          <img src={donateimg} alt="Mentorship Icon" className="w-24 h-24 sm:w-32 sm:h-32" />
        </div>
        <div className="text-center mt-8 px-4">
          <h1 className="text-3xl sm:text-4xl font-semibold">Make a Difference With Your Donation</h1>
        </div>
        <div className="flex mt-12 justify-center">
          <button 
            className="bg-black text-white font-bold py-2 px-4 shadow-md transition duration-300 cursor-pointer"
            onClick={() => navigate('/crowdfunding2')}
          >
            Get involved
          </button>
        </div>
      </div>
      
      <div className="bg-gray-200 px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {[
            { title: "Supporting Education", desc: "Empower future leaders with quality education." },
            { title: "Empower Future Leaders", desc: "Provide opportunities for a bright future." },
            { title: "Recognition and Gratitude", desc: "Celebrate the impact of your generosity." }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg">
              <FiSmile className="h-10 w-10 text-gray-700" />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-16 px-4">
        <h1 className="font-semibold text-2xl">Select Your Contribution</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-4">
        {Array(3).fill().map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-3xl p-6 shadow-md">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-xl">Basic</h1>
              <FiSmile className="h-7 w-7" />
            </div>
            <h1 className="font-semibold text-2xl mt-2">Donate $76/Month</h1>
            <ul className="list-disc mt-4 pl-5">
              <li>Support 20 students monthly</li>
              <li>Scholarship programs</li>
              <li>Connect with recipients</li>
            </ul>
            <button className="bg-white text-black text-xs mt-5 py-2 px-4 shadow-md transition duration-300">
              Donate Now
            </button>
          </div>
        ))}
      </div>
      
      <footer className="bg-black text-white mt-16 py-10 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
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