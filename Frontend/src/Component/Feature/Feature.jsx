import React from 'react';
import { TrendingUp, CircleDot } from 'lucide-react';

const Feature = () => {
  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-white md:w-8 md:h-8 lg:w-10 lg:h-10" />,
      label: 'Personalized Recommendations'
    },
    {
      icon: <CircleDot className="w-6 h-6 text-white md:w-8 md:h-8 lg:w-10 lg:h-10" />,
      label: 'Virtual Counseling'
    },
    {
      icon: <CircleDot className="w-6 h-6 text-white md:w-8 md:h-8 lg:w-10 lg:h-10" />,
      label: 'Career Planning Tools'
    },
    {
      icon: <CircleDot className="w-6 h-6 text-white md:w-8 md:h-8 lg:w-10 lg:h-10" />,
      label: 'Progress Tracking'
    },
    {
      icon: <CircleDot className="w-6 h-6 text-white md:w-8 md:h-8 lg:w-10 lg:h-10" />,
      label: 'Loan Forgiveness Options'
    }
  ];

  return (
    <div className="shadow-xl max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-16">
        Innovative Platform Benefits
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-8 mb-16">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-black rounded-full shadow-lg p-6 mb-4 
              w-16 h-16 
              sm:w-20 sm:h-20 
              md:w-24 md:h-24 
              lg:w-28 lg:h-28 
              xl:w-32 xl:h-32
              flex items-center justify-center 
              transition-all duration-300">
              {benefit.icon}
            </div>
            <span className="text-sm text-center max-w-[140px]">{benefit.label}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="bg-black text-white px-16 py-3 rounded hover:bg-gray-800 transition-colors">
          Join Now
        </button>
      </div>
    </div>
  );
};

export default Feature;