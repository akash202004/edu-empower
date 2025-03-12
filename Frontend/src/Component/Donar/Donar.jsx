import React, { useEffect } from 'react';
import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const BoldOrgLandingPage = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/organizationdashboard"); // Redirect if already signed in
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <main className="flex-grow mt-24 md:mt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left content */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-indigo-500">Change</span> Someone's<br className="hidden md:block" />
                <span className="text-indigo-500">Life</span> Today
              </h1>
              <p className="text-lg md:text-xl text-gray-700 lg:max-w-xl">
                Create scholarships and funds for the people and causes you care most about.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                <SignedOut>
                  <SignInButton mode="modal" redirectUrl="/organizationdashboard">
                    <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-base font-medium shadow-sm">
                      Start a scholarship
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <button
                    onClick={() => navigate("/organizationdashboard")}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-base font-medium shadow-sm"
                  >
                    Start a scholarship
                  </button>
                </SignedIn>
                
                <button className="px-6 py-3 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border border-indigo-300 rounded-md text-base font-medium">
            How it Works
          </button>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-2 text-gray-600 text-sm md:text-base">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>100% Goes To Deserving Recipients</span>
          </div>
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>100% Tax Deductible</span>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 font-semibold uppercase mb-4">SCHOLARSHIPS FEATURED BY:</p>
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 opacity-70">
            <img src="https://i.pinimg.com/736x/9a/fc/6d/9afc6d04fc8fbf361e25261b83c8cb84.jpg" alt="Princeton University" className="h-20 w-20 object-contain" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTHxjibjLvPaPJSKRAFk2Oxyr_yxfcXeDYg6BF4jWJ5AERnOPn8NgeeMy&s=10" alt="University of Michigan" className="h-12 object-contain" />
          </div>
        </div>
      </div>

      {/* Right side with image and quote */}
      <div className="flex-1 w-full max-w-md mx-auto">
        <div className="rounded-lg overflow-hidden bg-amber-100 shadow-lg">
          <img
            src="https://img.freepik.com/premium-photo/graduate-boy-hd-8k-vector-illustration-wallpaper-stock-image_915071-37074.jpg"
            alt="Edu-Empower Grant Winner"
            className="w-full h-80 object-cover object-center"
          />

          <div className="relative">
            <div className="bg-indigo-900 text-white p-6 pt-8 relative">
              <p className="text-lg">
                I started my own business to help my community and be a symbol of hope, 
                rather than only individually embodying Black excellence.
              </p>

              <div className="mt-4 flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-700 flex items-center justify-center text-xs font-bold">AL</div>
                <div className="ml-3">
                  <p className="text-sm font-medium">AKASH LAHA</p>
                  <p className="text-xs text-indigo-300">Class of 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

      <section className="bg-gray-50 py-16 px-6 text-center">
      {/* Donation Message */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
        <div className="flex items-center justify-center w-16 h-16 bg-indigo-200 rounded-full mb-4">
          <svg className="h-8 w-8 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-indigo-600">100% of your donation <span className="text-gray-900">goes directly to recipients</span></h2>
        <p className="text-gray-600 mt-3 text-lg max-w-xl">
          Your entire tax-deductible donation will go directly to fund the education of deserving recipients.
        </p>
      </div>

      {/* Scholarship Section */}
      <div className="mt-16">
        <h2 className="text-4xl font-extrabold text-gray-900">Support the People and Causes You Care About</h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">
          On Bold.org, anyone and any company can create a customized scholarship, fellowship, or grant in minutes.
        </p>

        {/* Scholarship Cards */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-6xl mx-auto">
          {[{
            title: "David L. Burns Memorial Scholarship",
            fundedBy: "Burns",
            amount: "$3,000",
            imgSrc: "https://bold.org/_next/image/?url=https%3A%2F%2Fstatic.bold.org%2Fdavidl30576cf11e04437eb3c19adf32968a30.jpeg&w=640&q=75"
          }, {
            title: "Keri Sohlman Memorial Scholarship",
            fundedBy: "Matthew Mingle",
            amount: "$1,500",
            imgSrc: "https://bold.org/_next/image/?url=https%3A%2F%2Fstatic.bold.org%2Fkeri-sohlman-1652930703961.jpeg&w=640&q=75"
          }, {
            title: "Patricia Ann Whelan Memorial Scholarship",
            fundedBy: "Whelan Family",
            amount: "$500",
            imgSrc: "https://bold.org/_next/image/?url=https%3A%2F%2Fstatic.bold.org%2Fpatriciaannwhelanmemorialscholarshipe6c24962e22b46b19470a1a9e1d85c5d.jpeg&w=640&q=75"
          }].map((scholarship, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center transition-transform transform hover:scale-105">
              <img src={scholarship.imgSrc} alt={scholarship.title} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-4 text-gray-900 text-center">{scholarship.title}</h3>
              <p className="text-sm text-gray-500">Funded by {scholarship.fundedBy}</p>
              <p className="text-md font-bold text-gray-700 mt-2">Amount: {scholarship.amount}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <SignedOut>
            <SignInButton mode="modal" redirectUrl="/organizationdashboard">
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-lg font-medium shadow-lg transition duration-300 transform hover:scale-105">
                Create a scholarship
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <button 
              onClick={() => navigate("/organizationdashboard")}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-lg font-medium shadow-lg transition duration-300 transform hover:scale-105"
            >
              Create a scholarship
            </button>
          </SignedIn>
          <button className="px-6 py-3 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100 border border-indigo-300 rounded-lg text-lg font-medium shadow-lg transition duration-300 transform hover:scale-105">
            See all scholarships
          </button>
        </div>
      </div>
    </section>



    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 space-y-12">
      {/* Heading */}
      <h2 className="text-center text-2xl md:text-4xl font-bold mb-8 leading-tight">
        Explore All Kinds of Scholarships for All Kinds of Students
      </h2>
      
      {/* Scholarship Categories */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-5 mb-14">
        {["Scholarships for Black Students", "No-Essay Scholarships", "Graduate School Scholarships",
          "Scholarships for High School Seniors", "Scholarships for Women", "Medical School Scholarships",
          "Merit-Based Scholarships", "Scholarships for Nursing Students", "High School Scholarships"].map((item, index) => (
          <button
            key={index}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-300 text-gray-700 transition rounded-full text-sm shadow-sm whitespace-nowrap"
          >
            {item}
          </button>
        ))}
        <button className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition rounded-full text-sm shadow-md">
          View all
        </button>
      </div>
      
      {/* Steps Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-xl md:text-3xl font-bold mb-6 leading-snug">
            Leave the heavy lifting to us
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Work with our donor team to review applications and pick winners in minutes with our streamlined process.
            Get regular updates as your contributions help them reach their goals.
          </p>
        </div>
        <div className="space-y-10">
          {[{
            title: "Define and fund your award.",
            description: "Once you donate, your scholarship will be published and will begin receiving applications."
          }, {
            title: "We'll narrow down a list of finalists.",
            description: "Based on the selection criteria we define together, we'll review hundreds of applications and mark the best ones for you."
          }, {
            title: "Work with our donor team to select winners and finalists.",
            description: "100% of your donation goes directly to fund the education of deserving winners."
          }].map((step, index) => (
            <div key={index} className="flex items-start space-x-5 md:space-x-6">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-blue-600 text-white text-lg font-bold rounded-full shadow-md aspect-square">
                {index + 1}
              </div>
              <div>
                <h4 className="font-bold text-lg md:text-xl text-gray-800">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


    <section className="flex flex-col items-center px-6 py-12 space-y-12">
      {/* Create a Grant Button */}
      <button className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium shadow-md hover:bg-indigo-700 transition">
        Create a Grant
      </button>

      {/* Scholarship Fund Section */}
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-3xl text-center relative">
        <h2 className="text-2xl font-semibold text-gray-900">
          Create a Fund to Launch Scholarships with Your Community
        </h2>
        <p className="text-gray-600 mt-3 text-base leading-relaxed">
          Create a scholarship fund to engage your community around a common
          cause. All contributions are tax-deductible.
        </p>
        <button className="mt-5 bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium shadow-md hover:bg-indigo-700 transition">
          Learn more →
        </button>
      </div>

      {/* Donors Network Section */}
      <div className="text-center w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900">
          Meet the Bold.org Donors Network
        </h2>
        <p className="text-gray-600 text-base mt-2 max-w-xl mx-auto">
          Join entrepreneurs, investors, philanthropists, and brands in growing
          your impact and legacy.
        </p>

        {/* Featured Donors - Responsive Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {[
            {
              name: "Imagine Dragons",
              image:
                "https://static.bold.org/profilePictures/1582869654161-small.jpeg",
              title: "Grammy Winning Rock Band",
            },
            {
              name: "Anonymous Donor",
              image:
                "https://static.bold.org/profilePictures/1590443956339-small.jpeg",
              title: "Tech Philanthropist",
            },
            {
              name: "Jane Doe",
              image:
                "https://static.bold.org/profilePictures/1580925955192-small.jpeg",
              title: "Impact Investor",
            },
          ].map((donor, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md transition hover:shadow-lg"
            >
              <img
                src={donor.image}
                alt={donor.name}
                className="w-16 h-16 rounded-full border-2 border-indigo-600"
              />
              <span className="mt-3 font-semibold text-lg text-gray-800">
                {donor.name}
              </span>
              <span className="text-sm text-gray-500">{donor.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>





      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="grid grid-cols-3 gap-1 mr-2">
                <div className="w-1 h-1 bg-blue-600 rounded-sm"></div>
                <div className="w-1 h-1 bg-blue-600 rounded-sm"></div>
                <div className="w-1 h-1 bg-blue-600 rounded-sm"></div>
                <div className="w-1 h-1 bg-blue-600 rounded-sm"></div>
                <div className="w-1 h-1 bg-blue-600 rounded-sm"></div>
                <div className="w-1 h-1 bg-blue-600 rounded-sm"></div>
              </div>
              <span className="font-bold text-base">Edu-Empower</span>
              <span className="ml-2 text-xs text-gray-500">© 2025 Edu-Empower, Inc.</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Terms</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Contact</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">About</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BoldOrgLandingPage;