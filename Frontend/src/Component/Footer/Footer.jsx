import React, { useState } from 'react';
import { Users, Handshake, Heart } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic here
  };

  return (
    <footer className="py-6 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Edu-Empower</h2>
            <div className="flex gap-4">
              <Users className="w-6 h-6" />
              <Handshake className="w-6 h-6" />
              <Heart className="w-6 h-6" />
            </div>
          </div>

          {/* Peer Support Section */}
          <div>
            <h3 className="font-semibold mb-4">Peer Support</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Support Groups & Skill</li>
              <li>Volunteer Opportunities</li>
              <li>How-to Guides &</li>
            </ul>
          </div>

          {/* Skill-Sharing Section */}
          <div>
            <h3 className="font-semibold mb-4">Skill-Sharing</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Mental Health Support</li>
              <li>FAQ & Customer</li>
              <li>Subscription Options</li>
            </ul>
          </div>

          {/* Mental Health Section with Email Subscription */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Mental Health</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:help@edufundconnect" className="text-gray-600">
                    help@edufundconnect
                  </a>
                </li>
                <li className="text-gray-600">+123 456 789 000</li>
              </ul>
            </div>
            
            {/* Email Subscription */}
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter Your Email Here"
                className="px-4 py-2 border rounded-md w-full text-gray-600 focus:outline-none focus:border-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors w-full"
                onClick={handleSubmit}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
