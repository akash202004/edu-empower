import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { 
  FiArrowLeft, 
  FiUsers, 
  FiAward, 
  FiDollarSign,
  FiCalendar,
  FiX,
  FiChevronRight,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiFile,
  FiEye,
  FiDownload,
  FiHome,
  FiUser,
  FiInfo
} from 'react-icons/fi';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

const ScholarshipAnalytics = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [stats, setStats] = useState({
    totalScholarships: 0,
    totalApplicants: 0,
    totalFunding: 0,
    activeScholarships: 0
  });
  const [viewingDocument, setViewingDocument] = useState(null);
  
  // Mock applicant data - in a real app, this would come from your backend
  const mockApplicants = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.s@example.com",
      phone: "9876543210",
      gender: "Male",
      marks: 85,
      status: "Submitted",
      educationLevel: "Undergraduate",
      institution: "Delhi University",
      address: "123 Main Street, New Delhi, Delhi 110001",
      parentName: "Rajesh Sharma",
      guardianName: "Rajesh Sharma",
      about: "I am a dedicated student pursuing Computer Science with a passion for AI and machine learning. I come from a middle-income family and need financial support to continue my education.",
      tenthMarks: 92,
      twelfthMarks: 88,
      documents: [
        { id: 4, name: "Domicile Certificate", type: "pdf", url: "https://example.com/domicile1.pdf" },
        { id: 5, name: "10th Marksheet", type: "pdf", url: "https://example.com/10th_marks1.pdf" },
        { id: 6, name: "12th Marksheet", type: "pdf", url: "https://example.com/12th_marks1.pdf" }
      ]
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.p@example.com",
      phone: "8765432109",
      gender: "Female",
      marks: 92,
      status: "Submitted",
      educationLevel: "Postgraduate",
      institution: "IIT Mumbai",
      address: "456 Park Avenue, Mumbai, Maharashtra 400001",
      parentName: "Suresh Patel",
      guardianName: "Suresh Patel",
      about: "I am pursuing my Masters in Biotechnology. I have been consistently among the top performers in my class and have published two research papers.",
      tenthMarks: 95,
      twelfthMarks: 94,
      documents: [
        { id: 9, name: "Domicile Certificate", type: "pdf", url: "https://example.com/domicile2.pdf" },
        { id: 10, name: "10th Marksheet", type: "pdf", url: "https://example.com/10th_marks2.pdf" },
        { id: 11, name: "12th Marksheet", type: "pdf", url: "https://example.com/12th_marks2.pdf" }
      ]
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.k@example.com",
      phone: "7654321098",
      gender: "Male",
      marks: 78,
      status: "In Progress",
      educationLevel: "Undergraduate",
      institution: "Bangalore University"
    },
    {
      id: 4,
      name: "Sneha Gupta",
      email: "sneha.g@example.com",
      phone: "6543210987",
      gender: "Female",
      marks: 88,
      status: "Submitted",
      educationLevel: "High School",
      institution: "DPS School"
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.s@example.com",
      phone: "5432109876",
      gender: "Male",
      marks: 75,
      status: "Submitted",
      educationLevel: "Undergraduate",
      institution: "Chennai University"
    }
  ];

  useEffect(() => {
    // Check if user is signed in
    if (!isSignedIn) {
      navigate('/auth/login', { 
        state: { 
          role: 'ORGANIZATION',
          redirectTo: '/organization/analytics'
        } 
      });
      return;
    }

    // Load scholarships from local storage
    const loadScholarships = () => {
      try {
        // Get all scholarships
        const allStoredScholarships = localStorage.getItem('organizationScholarships');
        
        if (allStoredScholarships) {
          const parsedData = JSON.parse(allStoredScholarships);
          
          // Combine all categories (upcoming, current, past)
          const allScholarships = [
            ...parsedData.upcoming || [],
            ...parsedData.current || [],
            ...parsedData.past || []
          ];
          
          console.log("Loaded scholarships:", allScholarships);
          
          // Add mock applicants data to each scholarship
          const enhancedScholarships = allScholarships.map(scholarship => {
            // Generate a random number of applicants between 5-15
            const applicantCount = scholarship.applicants || Math.floor(Math.random() * 10) + 5;
            
            // Randomly select that many applicants from our mock data
            // In a real app, you would fetch the actual applicants for this scholarship
            const randomApplicants = [...mockApplicants]
              .sort(() => 0.5 - Math.random())
              .slice(0, applicantCount);
              
            return {
              ...scholarship,
              applicants: applicantCount,
              applicantDetails: randomApplicants
            };
          });
          
          setScholarships(enhancedScholarships);
          
          // Calculate stats
          calculateStats(enhancedScholarships);
          setLoading(false);
        } else {
          console.log("No scholarships found in local storage");
          setScholarships([]);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading scholarships from local storage:', err);
        setError('Failed to load scholarship data. Please try again later.');
        setLoading(false);
      }
    };
    
    loadScholarships();
  }, [isSignedIn, navigate, user]);

  // Calculate statistics from scholarship data
  const calculateStats = (scholarshipData) => {
    const now = new Date();
    
    // Count active scholarships (deadline in the future)
    const active = scholarshipData.filter(s => {
      const deadline = new Date(s.deadline);
      return deadline > now;
    }).length;
    
    // Sum up total applicants and funding
    const applicants = scholarshipData.reduce((sum, s) => sum + (s.applicants || 0), 0);
    const funding = scholarshipData.reduce((sum, s) => {
      const amount = parseFloat(s.totalAmount || s.amount || 0);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    
    setStats({
      totalScholarships: scholarshipData.length,
      totalApplicants: applicants,
      totalFunding: funding,
      activeScholarships: active
    });
  };

  // Handle scholarship selection for detailed view
  const handleScholarshipClick = (scholarship) => {
    setSelectedScholarship(scholarship);
  };

  // Calculate gender ratio for a scholarship
  const calculateGenderRatio = (applicants) => {
    if (!applicants || applicants.length === 0) return { male: 0, female: 0, other: 0 };
    
    const genderCounts = applicants.reduce((counts, applicant) => {
      const gender = applicant.gender || 'Other';
      counts[gender] = (counts[gender] || 0) + 1;
      return counts;
    }, {});
    
    return {
      male: genderCounts['Male'] || 0,
      female: genderCounts['Female'] || 0,
      other: genderCounts['Other'] || 0
    };
  };

  // Calculate application statistics
  const calculateApplicationStats = (applicants) => {
    if (!applicants || applicants.length === 0) {
      return { submitted: 0, inProgress: 0, avgMarks: 0 };
    }
    
    const submitted = applicants.filter(a => a.status === 'Submitted').length;
    const inProgress = applicants.filter(a => a.status === 'In Progress').length;
    
    // Calculate average marks of submitted applications
    const submittedApplicants = applicants.filter(a => a.status === 'Submitted');
    const avgMarks = submittedApplicants.length > 0 
      ? submittedApplicants.reduce((sum, a) => sum + a.marks, 0) / submittedApplicants.length
      : 0;
    
    return { submitted, inProgress, avgMarks };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  // Handle document view
  const handleViewDocument = (document) => {
    setViewingDocument(document);
  };

  // Close document viewer
  const handleCloseDocumentViewer = () => {
    setViewingDocument(null);
  };

  // Render document viewer modal
  const renderDocumentViewer = () => {
    if (!viewingDocument) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {viewingDocument.name}
            </h2>
            <div className="flex items-center space-x-4">
              <a 
                href={viewingDocument.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                <FiDownload className="mr-1" /> Download
              </a>
              <button 
                onClick={handleCloseDocumentViewer}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden bg-gray-100 p-4">
            <div className="h-full flex items-center justify-center">
              {viewingDocument.type === 'pdf' ? (
                <iframe 
                  src={`${viewingDocument.url}#toolbar=0&navpanes=0`} 
                  className="w-full h-full border-0 rounded"
                  title={viewingDocument.name}
                />
              ) : (
                <img 
                  src={viewingDocument.url} 
                  alt={viewingDocument.name} 
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button 
              onClick={handleCloseDocumentViewer}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render scholarship detail modal
  const renderScholarshipDetail = () => {
    if (!selectedScholarship) return null;
    
    const applicants = selectedScholarship.applicantDetails || [];
    const genderRatio = calculateGenderRatio(applicants);
    const applicationStats = calculateApplicationStats(applicants);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">{selectedScholarship.title}</h2>
            <button 
              onClick={() => setSelectedScholarship(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>
          
          {/* Content - scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Scholarship overview */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Scholarship Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-sm text-indigo-700">Amount</p>
                  <p className="text-xl font-bold">₹{selectedScholarship.totalAmount || selectedScholarship.amount}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">Deadline</p>
                  <p className="text-xl font-bold">{selectedScholarship.deadline}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-700">Total Applicants</p>
                  <p className="text-xl font-bold">{selectedScholarship.applicants || 0}</p>
                </div>
              </div>
            </div>
            
            {/* Application Statistics */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Application Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">Submitted Applications</p>
                  <p className="text-xl font-bold">{applicationStats.submitted}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-700">In Progress</p>
                  <p className="text-xl font-bold">{applicationStats.inProgress}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-orange-700">Average Marks</p>
                  <p className="text-xl font-bold">{applicationStats.avgMarks.toFixed(1)}</p>
                </div>
              </div>
            </div>
            
            {/* Gender Distribution */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Gender Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">Male</p>
                  <p className="text-xl font-bold">{genderRatio.male}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${applicants.length ? (genderRatio.male / applicants.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="text-sm text-pink-700">Female</p>
                  <p className="text-xl font-bold">{genderRatio.female}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-pink-500 h-2.5 rounded-full" 
                      style={{ width: `${applicants.length ? (genderRatio.female / applicants.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-700">Other</p>
                  <p className="text-xl font-bold">{genderRatio.other}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-purple-500 h-2.5 rounded-full" 
                      style={{ width: `${applicants.length ? (genderRatio.other / applicants.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Applicant List */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Applicant Details</h3>
              {applicants.length > 0 ? (
                <div>
                  {applicants.map((applicant, index) => (
                    <div key={applicant.id} className="mb-8 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-700 font-medium text-lg">{applicant.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg font-medium text-gray-900">{applicant.name}</h4>
                            <p className="text-sm text-gray-500">{applicant.gender} • {applicant.educationLevel}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                          applicant.status === 'Submitted' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {applicant.status}
                        </span>
                      </div>
                      
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-3">Personal Information</h5>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <FiMail className="mt-0.5 mr-2 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Email</p>
                                  <p className="text-sm text-gray-500">{applicant.email}</p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <FiPhone className="mt-0.5 mr-2 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Phone</p>
                                  <p className="text-sm text-gray-500">{applicant.phone}</p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <FiHome className="mt-0.5 mr-2 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Address</p>
                                  <p className="text-sm text-gray-500">{applicant.address}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-3">Family Information</h5>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <FiUser className="mt-0.5 mr-2 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Parent's Name</p>
                                  <p className="text-sm text-gray-500">{applicant.parentName}</p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <FiUser className="mt-0.5 mr-2 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Guardian's Name</p>
                                  <p className="text-sm text-gray-500">{applicant.guardianName}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-3">Educational Information</h5>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <FiBookOpen className="mt-0.5 mr-2 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Current Institution</p>
                                  <p className="text-sm text-gray-500">{applicant.institution}</p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <FiBookOpen className="mt-0.5 mr-2 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Current Course Marks</p>
                                  <p className="text-sm text-gray-500">{applicant.marks}%</p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <FiBookOpen className="mt-0.5 mr-2 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">10th Standard Marks</p>
                                  <p className="text-sm text-gray-500">{applicant.tenthMarks}%</p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <FiBookOpen className="mt-0.5 mr-2 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">12th Standard Marks</p>
                                  <p className="text-sm text-gray-500">{applicant.twelfthMarks}%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-3">About</h5>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <div className="flex items-start">
                                <FiInfo className="mt-0.5 mr-2 text-gray-400" />
                                <p className="text-sm text-gray-600">{applicant.about}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Submitted Documents</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {applicant.documents && applicant.documents.length > 0 ? (
                              applicant.documents.map(doc => (
                                <button
                                  key={doc.id}
                                  onClick={() => handleViewDocument(doc)}
                                  className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                  <div className="h-10 w-10 flex-shrink-0 bg-indigo-50 rounded-md flex items-center justify-center">
                                    <FiFile className="text-indigo-500" />
                                  </div>
                                  <div className="ml-3 text-left">
                                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                    <p className="text-xs text-gray-500">{doc.type.toUpperCase()}</p>
                                  </div>
                                  <FiEye className="ml-auto text-gray-400" />
                                </button>
                              ))
                            ) : (
                              <div className="col-span-3 text-center py-4 bg-gray-50 rounded-md">
                                <p className="text-sm text-gray-500">No documents submitted</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No applicant data available for this scholarship.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button 
              onClick={() => setSelectedScholarship(null)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header with back button */}
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => navigate('/organization/dashboard')}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <FiArrowLeft className="mr-2" /> Back to Dashboard
            </button>
            
            <h1 className="text-2xl font-bold text-gray-900">Scholarship Analytics</h1>
          </div>
          
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <FiAward className="text-indigo-500" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Total Scholarships</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalScholarships}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <FiUsers className="text-purple-500" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Total Applicants</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalApplicants}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <FiDollarSign className="text-green-500" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Total Funding</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">₹{stats.totalFunding.toLocaleString()}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <FiCalendar className="text-orange-500" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Active Scholarships</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeScholarships}</p>
            </div>
          </div>
          
          {/* Scholarship List */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Your Scholarships</h2>
            </div>
            
            <div className="overflow-x-auto">
              {scholarships.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applicants
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deadline
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {scholarships.map((scholarship, index) => {
                      const deadline = new Date(scholarship.deadline);
                      const now = new Date();
                      const isActive = deadline > now;
                      
                      return (
                        <tr key={scholarship.id || index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{scholarship.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">₹{scholarship.totalAmount || scholarship.amount}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{scholarship.applicants || 0}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{scholarship.deadline}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {isActive ? 'Active' : 'Expired'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleScholarshipClick(scholarship)}
                              className="text-indigo-600 hover:text-indigo-900 flex items-center"
                            >
                              View Details <FiChevronRight className="ml-1" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No scholarships found. Create your first scholarship to see analytics.</p>
                  <button 
                    onClick={() => navigate('/organization/create-scholarship')}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Create Scholarship
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scholarship detail modal */}
      {renderScholarshipDetail()}
      
      <Footer />
    </div>
  );
};

export default ScholarshipAnalytics;