import React from 'react';

const BoldOrgLandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="grid grid-cols-3 gap-1 mr-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                  </div>
                  <span className="font-bold text-xl">bold.org</span>
                </div>
              </div>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <a href="#" className="flex items-center text-gray-700 hover:text-indigo-600">
                  <span>Scholarships</span>
                  <svg className="ml-1 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a href="#" className="flex items-center text-gray-700 hover:text-indigo-600">
                  <span>Funds</span>
                  <svg className="ml-1 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a href="#" className="flex items-center text-gray-700 hover:text-indigo-600">
                  <span>Company</span>
                  <svg className="ml-1 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Login</a>
              <a href="#" className="ml-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium">Join Bold.org</a>
            </div>
            <div className="flex md:hidden">
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>


      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left content */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">
                  <span className="text-indigo-500">Change</span> Someone's<br className="hidden md:block" /> 
                  <span className="text-indigo-500">Life</span> Today
                </h1>
                <p className="text-lg md:text-xl text-gray-700 lg:max-w-xl">
                  Create scholarships and funds for the people and causes you care most about.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-base font-medium shadow-sm">
                  Start a scholarship
                </button>
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





      <section className="bg-gray-50 py-12 px-4 text-center">
      {/* Donation Message */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-indigo-200 p-3 rounded-full flex items-center justify-center">
            <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-indigo-600">100% of your donation <span className="text-gray-900">goes directly to recipients</span></h2>
        <p className="text-gray-600 mt-2 text-lg">Your entire tax-deductible donation will go directly to fund the education of deserving recipients.</p>
      </div>

      {/* Scholarship Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-900">Support the People and Causes You Care about Most</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-lg">
          On Bold.org, anybody and any company can create a customized scholarship, fellowship, or grant, in minutes.
        </p>

        {/* Scholarship Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-6xl mx-auto">
          {[{
            title: "David L. Burns Memorial Scholarship",
            fundedBy: "Burns",
            amount: "$3,000",
            imgSrc: "https://bold.org/_next/image/?url=https%3A%2F%2Fstatic.bold.org%2Fdavidl30576cf11e04437eb3c19adf32968a30.jpeg&w=640&q=75"
          }, {
            title: "Keri Sohlman Memorial Scholarship",
            fundedBy: "Matthew Mingle",
            amount: "$1,500",
            imgSrc: "/api/placeholder/300/200"
          }, {
            title: "Patricia Ann Whelan Memorial Scholarship",
            fundedBy: "Whelan Family",
            amount: "$500",
            imgSrc: "/api/placeholder/300/200"
          }].map((scholarship, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center">
              <img src={scholarship.imgSrc} alt={scholarship.title} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-lg font-bold mt-4 text-gray-900 text-center">{scholarship.title}</h3>
              <p className="text-sm text-gray-500">Funded by {scholarship.fundedBy}</p>
              <p className="text-sm font-semibold text-gray-700">Amount: {scholarship.amount}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-base font-medium shadow-md transition duration-300">
            Create a scholarship
          </button>
          <button className="px-6 py-3 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border border-indigo-300 rounded-md text-base font-medium transition duration-300">
            See all scholarships
          </button>
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