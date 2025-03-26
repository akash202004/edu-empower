import { useEffect } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiAward, FiUsers, FiBookOpen, FiArrowRight, FiDollarSign, FiHeart } from "react-icons/fi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  // Sync Clerk user data with the backend
  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (isSignedIn && user) {
        try {
          const { data } = await axios.post(
            "http://localhost:5001/api/users/registerorupdate",
            {
              userId: user.id,
              name: user.fullName,
              email: user.primaryEmailAddress?.emailAddress || null,
              role: user.publicMetadata.role || "STUDENT",
            }
          );

          console.log("User synced:", data);

          // Redirect based on role - direct to profile form for students
          if (window.location.pathname === "/") {
            if (data.role === "STUDENT") {
              navigate("/student/details");
            } else if (data.role === "ORGANIZATION") {
              navigate("/organization");
            } else {
              navigate("/donation");
            }
          }
        } catch (error) {
          console.error("Error syncing user data:", error.response?.data || error.message);
        }
      }
    };

    syncUserWithBackend();
  }, [isSignedIn, user, navigate]);

  return (
    <Disclosure as="nav" className="bg-white shadow-md fixed w-full z-10">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <button
                  onClick={() => navigate("/")}
                  className="text-black text-lg font-bold transition-all duration-300 hover:text-blue-600"
                >
                  Edu-Empower
                </button>
              </div>

              {/* User Auth Section */}
              <div className="flex items-center ml-auto">
                <SignedOut>
                  <Menu as="div" className="relative">
                    <MenuButton className="bg-black text-white rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white-500">
                      Login
                    </MenuButton>
                    <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white border rounded-md shadow-lg focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => navigate("/student")}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                            )}
                          >
                            Login as Student
                          </button>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => navigate("/donor")}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                            )}
                          >
                            Login as Donor
                          </button>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={() => navigate("/organization")}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                            )}
                          >
                            Login as Organization
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}


import React from "react";

function Organization() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 h-[70vh] flex items-center">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="md:flex items-center">
              <div className="md:w-1/2 text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Empowering Dreams Through Education
                </h1>
                <p className="text-lg md:text-xl mb-8">
                  We connect talented students with scholarship opportunities to help them achieve their academic goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => navigate('/scholarship')}
                    className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition shadow-lg"
                  >
                    Find Scholarships
                  </button>
                  <button 
                    onClick={() => navigate('/organization/apply')}
                    className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition"
                  >
                    Partner With Us
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0">
                <img 
                  src="/assets/hero-students.jpg" 
                  alt="Students celebrating graduation" 
                  className="rounded-lg shadow-2xl mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="inline-block p-4 bg-indigo-100 rounded-full mb-4">
                <FiAward className="text-indigo-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-2">$2.5M+</h3>
              <p className="text-gray-600">Scholarship Funds Awarded</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="inline-block p-4 bg-indigo-100 rounded-full mb-4">
                <FiUsers className="text-indigo-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-2">500+</h3>
              <p className="text-gray-600">Students Supported</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="inline-block p-4 bg-indigo-100 rounded-full mb-4">
                <FiBookOpen className="text-indigo-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-2">50+</h3>
              <p className="text-gray-600">Partner Universities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Crowdfunding Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500">
        <div className="container mx-auto px-6">
          <div className="md:flex items-center">
            <div className="md:w-1/2 text-white mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Fund Your Education Through Crowdfunding</h2>
              <p className="text-lg mb-8">
                Can't find the right scholarship? Our crowdfunding platform connects you with donors who believe in your potential. Share your story and receive support from our community.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-full mr-3">
                    <FiDollarSign className="text-purple-600 text-xl" />
                  </div>
                  <span>Average funding: $3,500</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-full mr-3">
                    <FiHeart className="text-purple-600 text-xl" />
                  </div>
                  <span>200+ successful campaigns</span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/crowdfunding')}
                className="mt-8 bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition shadow-lg"
              >
                Apply for Crowdfunding
              </button>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img 
                    src="/assets/crowdfunding-1.jpg" 
                    alt="Student crowdfunding success" 
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="font-bold">Maria's Medical School Journey</h3>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full w-3/4"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>$15,000 raised</span>
                    <span>75%</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img 
                    src="/assets/crowdfunding-2.jpg" 
                    alt="Student crowdfunding success" 
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="font-bold">David's Engineering Degree</h3>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full w-4/5"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>$8,000 raised</span>
                    <span>80%</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img 
                    src="/assets/crowdfunding-3.jpg" 
                    alt="Student crowdfunding success" 
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="font-bold">Priya's Art School Tuition</h3>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full w-full"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>$12,000 raised</span>
                    <span>100%</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img 
                    src="/assets/crowdfunding-4.jpg" 
                    alt="Student crowdfunding success" 
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="font-bold">James' Computer Science Degree</h3>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full w-1/2"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>$5,000 raised</span>
                    <span>50%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Scholarships */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Scholarships</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular scholarship opportunities available right now
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "STEM Excellence Scholarship",
                amount: "$10,000",
                deadline: "March 15, 2024",
                image: "/assets/stem-scholarship.jpg"
              },
              {
                title: "Future Leaders Grant",
                amount: "$5,000",
                deadline: "April 30, 2024",
                image: "/assets/leadership-scholarship.jpg"
              },
              {
                title: "Creative Arts Fellowship",
                amount: "$7,500",
                deadline: "May 20, 2024",
                image: "/assets/arts-scholarship.jpg"
              }
            ].map((scholarship, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                <img 
                  src={scholarship.image} 
                  alt={scholarship.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{scholarship.title}</h3>
                  <div className="flex justify-between mb-4">
                    <span className="text-indigo-600 font-semibold">{scholarship.amount}</span>
                    <span className="text-gray-500">Deadline: {scholarship.deadline}</span>
                  </div>
                  <button 
                    onClick={() => navigate('/scholarship/details')}
                    className="w-full bg-indigo-600 text-white py-2 rounded font-medium hover:bg-indigo-700 transition flex items-center justify-center"
                  >
                    View Details <FiArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/scholarship')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              View All Scholarships
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from students whose lives have been transformed through our scholarships
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                university: "Stanford University",
                quote: "The scholarship I received opened doors I never thought possible. I'm now pursuing my dream career in biomedical engineering.",
                image: "/assets/testimonial-1.jpg"
              },
              {
                name: "Michael Chen",
                university: "MIT",
                quote: "As a first-generation college student, this scholarship didn't just help financially—it gave me the confidence to believe in myself.",
                image: "/assets/testimonial-2.jpg"
              },
              {
                name: "Aisha Patel",
                university: "Columbia University",
                quote: "I can focus on my studies instead of working multiple jobs. This scholarship changed the trajectory of my academic journey.",
                image: "/assets/testimonial-3.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.university}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a student seeking opportunities or an organization looking to make an impact, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/student')}
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Apply as Student
            </button>
            <button 
              onClick={() => navigate('/organization/register')}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition"
            >
              Register as Organization
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Edu-Empower</h3>
              <p className="text-gray-400">
                Connecting students with life-changing scholarship opportunities since 2015.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Scholarships</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">For Organizations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Application Tips</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Stay Connected</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-gray-900"
                />
                <button className="bg-indigo-600 px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2023 Edu-Empower. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Organization;
