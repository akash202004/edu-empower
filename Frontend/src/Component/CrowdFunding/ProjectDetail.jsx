import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiDollarSign, FiUsers, FiShare2, FiHeart, FiBookmark } from "react-icons/fi";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Sample project data (in a real app, this would come from an API)
const projectsData = [
  {
    id: 1,
    title: "Engineering Scholarship for Rural Students",
    description: "Help talented students from rural areas pursue engineering degrees at top universities.",
    fullDescription: `
      <p>This campaign aims to provide full scholarships to 5 exceptionally talented students from rural areas who have been accepted into top engineering programs but cannot afford the tuition.</p>
      
      <p>These students have overcome significant obstacles to excel academically, and with your support, they can pursue their dreams of becoming engineers and giving back to their communities.</p>
      
      <h3>What Your Donation Will Cover:</h3>
      <ul>
        <li>Full tuition for a 4-year engineering degree</li>
        <li>Textbooks and essential study materials</li>
        <li>Laptop and technical equipment</li>
        <li>Housing stipend</li>
        <li>Mentorship program connecting students with industry professionals</li>
      </ul>
      
      <h3>Meet the Students:</h3>
      <p>Maria, 18, from a small farming community, scored in the top 1% nationally on her entrance exams despite having limited access to educational resources.</p>
      
      <p>James, 19, taught himself programming using borrowed textbooks and has already developed apps to help his community access agricultural information.</p>
      
      <p>Your contribution will directly impact these students' lives and help create a more diverse and inclusive engineering workforce.</p>
    `,
    raised: 12500,
    goal: 25000,
    backers: 78,
    daysLeft: 15,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
    ],
    updates: [
      {
        date: "June 15, 2023",
        title: "First student selected!",
        content: "We're excited to announce that Maria has been selected as our first scholarship recipient. She'll be attending MIT this fall."
      },
      {
        date: "May 30, 2023",
        title: "Halfway to our goal",
        content: "Thanks to your generous donations, we're halfway to our funding goal! Keep sharing our campaign."
      }
    ],
    comments: [
      {
        name: "Sarah Johnson",
        date: "June 10, 2023",
        content: "This is such an important initiative. I was the first in my family to attend college and know how life-changing it can be."
      },
      {
        name: "Michael Chen",
        date: "June 5, 2023",
        content: "Happy to support these talented students. Education changed my life and I want to pay it forward."
      }
    ]
  },
  // Add more projects as needed
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState(50);
  const [activeTab, setActiveTab] = useState("about");
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // In a real app, fetch project data from API
    // For now, we'll use our sample data
    const fetchProject = () => {
      setLoading(true);
      try {
        const foundProject = projectsData.find(p => p.id === parseInt(id));
        if (foundProject) {
          setProject(foundProject);
        } else {
          // Handle project not found
          navigate("/crowdfunding");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [id, navigate]);

  const handleDonate = (e) => {
    e.preventDefault();
    // Handle donation logic
    console.log(`Donating $${donationAmount} to project ${id}`);
    // Show success message and redirect
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
          <button 
            onClick={() => navigate("/crowdfunding")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/crowdfunding")}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition font-medium"
          >
            <FiArrowLeft className="h-5 w-5" /> Back to Projects
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="md:col-span-2">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              {/* Project Gallery */}
              <div className="bg-white rounded-2xl overflow-hidden border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
                <div className="h-96 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Thumbnail Gallery */}
                {project.gallery && project.gallery.length > 1 && (
                  <div className="p-4 flex gap-2 overflow-x-auto">
                    {project.gallery.map((img, index) => (
                      <div 
                        key={index}
                        className="h-20 w-32 flex-shrink-0 rounded-lg overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-indigo-500 transition"
                      >
                        <img 
                          src={img} 
                          alt={`Gallery ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Project Title and Stats */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
                <p className="text-xl text-gray-700 mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center">
                    <FiDollarSign className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="font-semibold">${project.raised.toLocaleString()}</span>
                    <span className="text-gray-500 ml-1">raised of ${project.goal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="font-semibold">{project.backers}</span>
                    <span className="text-gray-500 ml-1">backers</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="font-semibold">{project.daysLeft}</span>
                    <span className="text-gray-500 ml-1">days left</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                  <div 
                    className="bg-indigo-600 h-4 rounded-full" 
                    style={{ width: `${Math.min((project.raised / project.goal) * 100, 100)}%` }}
                  ></div>
                </div>
                
                {/* Share buttons */}
                <div className="flex gap-3">
                  <button className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                    <FiShare2 className="h-4 w-4" /> Share
                  </button>
                  <button className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                    <FiHeart className="h-4 w-4" /> Like
                  </button>
                  <button className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                    <FiBookmark className="h-4 w-4" /> Save
                  </button>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="mb-8">
                <div className="flex border-b border-gray-200">
                  <button 
                    className={`px-6 py-3 font-medium ${activeTab === 'about' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('about')}
                  >
                    About
                  </button>
                  <button 
                    className={`px-6 py-3 font-medium ${activeTab === 'updates' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('updates')}
                  >
                    Updates ({project.updates?.length || 0})
                  </button>
                  <button 
                    className={`px-6 py-3 font-medium ${activeTab === 'comments' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('comments')}
                  >
                    Comments ({project.comments?.length || 0})
                  </button>
                </div>
                
                <div className="py-6">
                  {activeTab === 'about' && (
                    <div className="prose prose-indigo max-w-none" dangerouslySetInnerHTML={{ __html: project.fullDescription }}></div>
                  )}
                  
                  {activeTab === 'updates' && (
                    <div className="space-y-6">
                      {project.updates?.length > 0 ? (
                        project.updates.map((update, index) => (
                          <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                            <div className="text-sm text-gray-500 mb-1">{update.date}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{update.title}</h3>
                            <p className="text-gray-700">{update.content}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No updates yet.</p>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'comments' && (
                    <div className="space-y-6">
                      {project.comments?.length > 0 ? (
                        project.comments.map((comment, index) => (
                          <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                            <div className="flex justify-between mb-2">
                              <span className="font-semibold text-gray-900">{comment.name}</span>
                              <span className="text-sm text-gray-500">{comment.date}</span>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                      )}
                      
                      {/* Comment form */}
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold mb-4">Leave a comment</h3>
                        <form className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                            <textarea 
                              rows="4" 
                              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              placeholder="Your comment..."
                            ></textarea>
                          </div>
                          <button 
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                          >
                            Post Comment
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar - 1/3 width */}
          <div>
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white p-6 rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Support This Project</h2>
              
              <form onSubmit={handleDonate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Donation Amount</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="number" 
                      min="5"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {[25, 50, 100, 250, 500].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount)}
                      className={`px-4 py-2 rounded-lg border ${
                        donationAmount === amount 
                          ? 'bg-indigo-100 border-indigo-500 text-indigo-700' 
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  whileHover={{ y: -5, x: -5, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Donate Now
                </motion.button>
                
                <div className="text-sm text-gray-500 text-center">
                  Your donation is tax-deductible to the extent allowed by law.
                </div>
              </form>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-4">Share this project</h3>
                <div className="flex gap-3">
                  <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778C2.036 8.746 2 12 2 12s.036 3.259.403 4.819a2.5 2.5 0 0 0 1.767 1.763c1.566.41 7.83.417 7.83.417s6.265.007 7.831-.403a2.51 2.51 0 0 0 1.767-1.763C21.964 15.26 22 12 22 12s-.036-3.253-.407-4.797zM10 15V9l5.2 3-5.2 3z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;