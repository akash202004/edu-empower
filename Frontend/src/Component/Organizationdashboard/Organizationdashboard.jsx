import React from "react";

const OrganizationDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-20 space-y-6 flex flex-col items-center">
      {/* Header */}
      <header className="bg-white shadow p-4 rounded-lg flex justify-between items-center w-full max-w-5xl">
        <h1 className="text-2xl font-semibold text-gray-900">Organizer Dashboard</h1>
      </header>

      {/* Dashboard Content */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Statistics Cards */}
        {[{
          title: "Total Scholarships",
          value: "12",
          color: "bg-blue-500"
        }, {
          title: "Funds Raised",
          value: "$24,000",
          color: "bg-green-500"
        }, {
          title: "Students Supported",
          value: "50",
          color: "bg-purple-500"
        }].map((stat, index) => (
          <div key={index} className={`p-6 text-white rounded-xl shadow-lg ${stat.color} space-y-2`}>
            <h2 className="text-xl font-medium">{stat.title}</h2>
            <p className="text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </main>

      {/* Scholarship List */}
      <section className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Active Scholarships</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="p-3">Scholarship Name</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Applicants</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[{
                name: "STEM Future Leaders",
                amount: "$5,000",
                applicants: "120"
              }, {
                name: "Women in Tech",
                amount: "$3,500",
                applicants: "85"
              }].map((scholarship, index) => (
                <tr key={index} className="border-t hover:bg-gray-100 transition">
                  <td className="p-3">{scholarship.name}</td>
                  <td className="p-3">{scholarship.amount}</td>
                  <td className="p-3">{scholarship.applicants}</td>
                  <td className="p-3">
                    <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default OrganizationDashboard;
