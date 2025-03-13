

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
          <button className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium rounded-lg">
            Apply for scholarships
          </button>
          <p className="mt-2 text-sm text-gray-500">0% spam. 100% free.</p>

          {/* Universities Section */}
          <div className="mt-8">
            <p className="text-xs text-gray-500 font-semibold uppercase mb-4">Scholarships Featured By:</p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 opacity-70">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQBwuddBfDYzFHfvCjSk2dHhn1KL_weVdxIA&s" alt="Harvard" className="h-10" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/The_University_of_California_UCLA.svg/800px-The_University_of_California_UCLA.svg.png" alt="UCLA" className="h-8" />
              <img src="data:image/jpeg;base64,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" alt="Vanderbilt" className="h-6" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTHxjibjLvPaPJSKRAFk2Oxyr_yxfcXeDYg6BF4jWJ5AERnOPn8NgeeMy&s=10" alt="Michigan" className="h-8" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_dtvPjZYkcgpbq18XmHvPnTEuyCOGIiGl3ERrtNtzlVeXYvTtp_j-_Odx&s=10" alt="Berkeley" className="h-10" />
              <img src="data:image/png;base64,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" alt="Georgetown" className="h-15" />
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
