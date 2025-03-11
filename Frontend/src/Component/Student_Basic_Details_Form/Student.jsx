export default function ScholarshipHero() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto px-6 py-16 lg:py-24 gap-12">
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
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/UCLA_Bruins_script.svg/512px-UCLA_Bruins_script.svg.png" alt="UCLA" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Vanderbilt_University_wordmark.svg" alt="Vanderbilt" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Michigan_Wolverines_Logo.svg/640px-Michigan_Wolverines_Logo.svg.png" alt="Michigan" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/UC_Berkeley_seal.svg/800px-UC_Berkeley_seal.svg.png" alt="Berkeley" className="h-10" />
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Georgetown_University_seal.svg/800px-Georgetown_University_seal.svg.png" alt="Georgetown" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/Syracuse_University_Seal.svg" alt="Syracuse" className="h-8" />
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
            <span className="text-lg font-medium">Awarded to Bold.org Members</span>
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
    </section>
  );
}
