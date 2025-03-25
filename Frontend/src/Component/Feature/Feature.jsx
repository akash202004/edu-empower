import React from 'react';
import { FiAward, FiDollarSign, FiUsers, FiSearch, FiCheckCircle, FiClock } from 'react-icons/fi';

const Feature = () => {
  const features = [
    {
      icon: <FiAward className="h-8 w-8 text-indigo-600" />,
      title: "Scholarship Matching",
      description: "Our intelligent system matches students with scholarships that fit their profile and needs."
    },
    {
      icon: <FiDollarSign className="h-8 w-8 text-indigo-600" />,
      title: "Crowdfunding Platform",
      description: "Raise funds for your education with our dedicated crowdfunding tools and supportive community."
    },
    {
      icon: <FiUsers className="h-8 w-8 text-indigo-600" />,
      title: "Donor Connections",
      description: "Connect directly with donors who are passionate about supporting educational journeys."
    },
    {
      icon: <FiSearch className="h-8 w-8 text-indigo-600" />,
      title: "Resource Discovery",
      description: "Find educational resources, mentorship opportunities, and support networks."
    },
    {
      icon: <FiCheckCircle className="h-8 w-8 text-indigo-600" />,
      title: "Verified Organizations",
      description: "All educational institutions and organizations on our platform are thoroughly verified."
    },
    {
      icon: <FiClock className="h-8 w-8 text-indigo-600" />,
      title: "Deadline Reminders",
      description: "Never miss an application deadline with our automated reminder system."
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Our platform provides comprehensive tools and resources to help students access educational funding.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        {feature.icon}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;