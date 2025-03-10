import React, { useState } from 'react';

const EduEmpowerCrowdfunding = () => {
  const [activeTab, setActiveTab] = useState('scholarships');
  
  // Sample organization campaigns data
  const organizationCampaigns = [
    {
      id: 1,
      title: "Future Engineers Fund",
      organization: "TechBright Foundation",
      goal: 75000,
      raised: 52300,
      donors: 328,
      daysLeft: 45,
      studentsToSupport: 15,
      description: "Supporting underrepresented students pursuing engineering degrees at top universities.",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Healthcare Heroes Scholarship",
      organization: "MedPath Alliance",
      goal: 100000,
      raised: 83750,
      donors: 592,
      daysLeft: 60,
      studentsToSupport: 20,
      description: "Funding future healthcare professionals from low-income communities across the country.",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Creative Arts Education Initiative",
      organization: "ArtsForward Collective",
      goal: 50000,
      raised: 42800,
      donors: 263,
      daysLeft: 30,
      studentsToSupport: 10,
      description: "Ensuring talented arts students can pursue their education regardless of financial barriers.",
      image: "/api/placeholder/400/250"
    }
  ];

  // Statistics for the platform
  const statistics = {
    totalRaised: 12500000,
    organizationsSupported: 85,
    studentsHelped: 1850,
    successRate: 94
  };

  // Partner organizations
  const partnerOrganizations = [
    {
      name: "National Education Foundation",
      studentsSupported: 450,
      amountRaised: 2350000,
      logo: "/api/placeholder/120/60",
      description: "Supporting STEM education initiatives across 35 states."
    },
    {
      name: "Global Scholars Initiative",
      studentsSupported: 280,
      amountRaised: 1850000,
      logo: "/api/placeholder/120/60",
      description: "Providing international study opportunities for exceptional students from developing nations."
    }
  ];

  return (
    <div className="font-sans text-gray-900 min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-black text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">Edu-Empower</span>
            <span className="text-xs md:text-sm bg-white text-black px-2 py-1 rounded-full">Organizational Crowdfunding</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <button className="hover:underline font-medium" onClick={() => setActiveTab('scholarships')}>Scholarship Programs</button>
            <button className="hover:underline font-medium" onClick={() => setActiveTab('organizations')}>Partner Organizations</button>
            <button className="hover:underline font-medium" onClick={() => setActiveTab('impact')}>Our Impact</button>
            <button className="hover:underline font-medium" onClick={() => setActiveTab('apply')}>Apply</button>
          </div>
          <div className="md:hidden">
            <button className="p-2">Menu</button>
          </div>
          <button className="hidden md:block bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition duration-200">Partner With Us</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 opacity-90 z-0"></div>
        <div className="absolute inset-0 opacity-30 z-0">
          <img 
            src="/api/placeholder/1920/1080" 
            alt="Students at graduation"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">Empowering Organizations to Fund Educational Dreams</h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">Join leading organizations in creating scholarship funds that transform lives and build futures through education.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-200 shadow-lg">Start a Scholarship Fund</button>
              <button className="border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition duration-200">Become a Partner</button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition duration-200">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-black">${(statistics.totalRaised / 1000000).toFixed(1)}M+</div>
              <div className="text-sm md:text-base text-gray-600">Total Funding Raised</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition duration-200">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-black">{statistics.organizationsSupported}</div>
              <div className="text-sm md:text-base text-gray-600">Partner Organizations</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition duration-200">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-black">{statistics.studentsHelped.toLocaleString()}</div>
              <div className="text-sm md:text-base text-gray-600">Students Supported</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition duration-200">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-black">{statistics.successRate}%</div>
              <div className="text-sm md:text-base text-gray-600">Campaign Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Organization Campaigns */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Scholarship Programs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Join these organizations in making education accessible for deserving students through structured scholarship programs.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {organizationCampaigns.map(campaign => (
              <div key={campaign.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black text-white text-xs px-3 py-1 rounded-full">
                    {campaign.daysLeft} days left
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{campaign.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">By: {campaign.organization}</p>
                  <p className="mb-6 text-gray-700">{campaign.description}</p>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div 
                      className="bg-black h-3 rounded-full" 
                      style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-4">
                    <span className="font-bold">${campaign.raised.toLocaleString()}</span>
                    <span className="text-gray-600">of ${campaign.goal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <span className="font-medium">{campaign.donors}</span>
                      <span className="text-gray-600 ml-1">donors</span>
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <span className="font-medium">{campaign.studentsToSupport}</span>
                      <span className="text-gray-600 ml-1">students to support</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-200">
                    Support This Program
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="inline-flex items-center px-6 py-3 border-2 border-black rounded-full font-medium hover:bg-black hover:text-white transition duration-200">
              View All Programs
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Organizational Funding Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">A transparent process designed to connect educational organizations with donors to create lasting impact.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-black text-white text-xl font-bold mb-4">1</div>
              <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300 -z-10"></div>
              <h3 className="text-xl font-bold mb-3">Register Your Organization</h3>
              <p className="text-gray-600">Complete our verification process to become an approved educational partner.</p>
            </div>
            
            <div className="relative text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-black text-white text-xl font-bold mb-4">2</div>
              <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300 -z-10"></div>
              <h3 className="text-xl font-bold mb-3">Create a Scholarship Fund</h3>
              <p className="text-gray-600">Design your scholarship program with our experts and set your funding goals.</p>
            </div>
            
            <div className="relative text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-black text-white text-xl font-bold mb-4">3</div>
              <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300 -z-10"></div>
              <h3 className="text-xl font-bold mb-3">Launch Your Campaign</h3>
              <p className="text-gray-600">We'll help promote your scholarship to our network of donors and supporters.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-black text-white text-xl font-bold mb-4">4</div>
              <h3 className="text-xl font-bold mb-3">Award Scholarships</h3>
              <p className="text-gray-600">Select recipients and distribute funds with our transparent management system.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition duration-200 shadow-md">
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Partner Organizations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partner Organizations</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Joining forces with these leading educational institutions to create opportunities for students worldwide.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {partnerOrganizations.map((org, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md flex flex-col md:flex-row gap-6 items-center">
                <img src={org.logo} alt={org.name} className="w-32 h-16 object-contain" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{org.name}</h3>
                  <p className="text-gray-600 mb-4">{org.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                      <span className="font-bold text-black">{org.studentsSupported}</span>
                      <span className="text-gray-600 ml-1">students supported</span>
                    </div>
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                      <span className="font-bold text-black">${(org.amountRaised / 1000000).toFixed(1)}M</span>
                      <span className="text-gray-600 ml-1">raised</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="inline-flex items-center px-6 py-3 border-2 border-black rounded-full font-medium hover:bg-black hover:text-white transition duration-200">
              View All Partners
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join our network of educational organizations creating meaningful scholarship opportunities.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-200 shadow-lg">Start a Scholarship Fund</button>
            <button className="border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition duration-200">Schedule a Consultation</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="font-bold text-xl">Edu-Empower</span>
                <span className="text-xs bg-white text-black px-2 py-1 rounded-full">Organizational Crowdfunding</span>
              </div>
              <p className="mb-4 text-gray-400">Connecting educational organizations with donors to fund the next generation of leaders since 2020.</p>
              <div className="flex space-x-4">
                <span className="cursor-pointer w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-white hover:text-black transition duration-200">FB</span>
                <span className="cursor-pointer w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-white hover:text-black transition duration-200">TW</span>
                <span className="cursor-pointer w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-white hover:text-black transition duration-200">IG</span>
                <span className="cursor-pointer w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-white hover:text-black transition duration-200">LI</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">For Organizations</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition duration-200">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">Create a Scholarship</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">Partner Resources</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">For Donors</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition duration-200">Why Donate</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">Find Programs</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">Corporate Giving</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">Tax Benefits</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <span className="mr-2">📧</span>
                  partnerships@edu-empower.org
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📞</span>
                  1-800-EDU-FUND
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📍</span>
                  123 Education Lane, New York, NY 10001
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2025 Edu-Empower. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EduEmpowerCrowdfunding;