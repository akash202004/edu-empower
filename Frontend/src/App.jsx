import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ClerkProvider, useUser } from "@clerk/clerk-react";
import useSmoothScroll from "./hooks/useSmoothScroll";
import LoadingScreen from "./Component/Common/LoadingScreen";
import OrganizationProfile from "./Component/Organization/OrganizationProfile";
import { Toaster } from "react-hot-toast";

// Import components
import Login from "./Component/Auth/Login";
import StudentDetailsForm from "./Component/Student/StudentDetailsForm";
import Navbar from "./Component/Navbar/Navbar";
import Hero from "./Component/Hero/Hero";
import About from "./Component/About/About";
import AboutEduEmpower from "./Component/About/AboutEduEmpower";
import Feature from "./Component/Feature/Feature";
import Footer from "./Component/Footer/Footer";
import RoleSelection from "./Component/Auth/RoleSelection";
import Student from "./Component/Student_Basic_Details_Form/Student";
import StudentBasicDetailsForm from "./Component/Student_Basic_Details_Form/StudentDetailsForm";
import ScholarshipPage from "./Component/Scholarship/ScholarshipPage";
import ScholarshipDetails from "./Component/Scholarship/ScholarshipDetails";
import Scholarshipapply from "./Component/Scholarship/Scholarshipapply";
import DonarPage from "./Component/Donar/Donar";
import Organization from "./Component/Organization/Organization";
import StudentProfile from "./Component/Student/StudentProfile";
import Layout from "./Component/Layout/Layout";
import ScholarshipApplicationForm from "./Component/Scholarship/ScholarshipApplicationForm";
import ApplicationSuccess from "./Component/Scholarship/ApplicationSuccess";
import Contact from "./Component/Contact/Contact";
import ContactSubmitted from "./Component/Contact/ContactSubmitted";

// Import new organization dashboard components
import OrganizationDashboard from "./Component/Organization/Dashboard/OrganizationDashboard";
import CreateScholarship from "./Component/Organization/Dashboard/CreateScholarship";
import ScholarshipAnalytics from "./Component/Organization/Dashboard/ScholarshipAnalytics";

// Get Clerk publishable key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// HomePage Component
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Hero />
        <About />
        <Feature />
      </div>
      <Footer />
    </div>
  );
};

// Authentication Redirection
const AuthRedirect = () => {
  const { isSignedIn, user } = useUser();

  if (isSignedIn) {
    const role = user?.publicMetadata?.role || "STUDENT";

    if (role === "STUDENT") {
      // return <Navigate to="/student/details" replace />;
    } else if (role === "ORGANIZATION") {
      return <Navigate to="/organization/dashboard" replace />;
    } else {
      return <Navigate to="/donation" replace />;
    }
  }

  return <HomePage />;
};

// Require Authentication Component
const RequireAuth = ({ children }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    // return <Navigate to="/auth/login" replace />;
  }

  return children;
};

// Custom Organization Route
const OrganizationRoute = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      if (user?.publicMetadata?.role === "ORGANIZATION") {
        navigate("/organization/dashboard", { replace: true });
      } else {
        // If signed in but not an organization, redirect to role selection
        navigate("/auth/role-selection", { 
          state: { message: "Please select the Organization role to continue" } 
        });
      }
    } else {
      // If not signed in, redirect to login with organization role preselected
      navigate("/auth/login", { 
        state: { 
          role: "ORGANIZATION",
          redirectTo: "/organization/dashboard" 
        } 
      });
    }
  }, [isSignedIn, user, navigate]);

  // Return null while redirecting
  return null;
};


const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};
import CrowdFunding from "./Component/CrowdFunding/CrowdFunding";
import ProjectDetail from "./Component/CrowdFunding/ProjectDetail";
// Removed StartCampaign import

function App() {
  useSmoothScroll();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about-edu-empower" element={<MainLayout><AboutEduEmpower /></MainLayout>} />
          <Route path="/auth/role-selection" element={<RoleSelection />} />
          <Route path="/auth/login" element={<Login />} />
          
          {/* Add the crowdfunding routes */}
          <Route path="/crowdfunding" element={<MainLayout><CrowdFunding /></MainLayout>} />
          <Route path="/crowdfunding/project/:id" element={<MainLayout><ProjectDetail /></MainLayout>} />
          {/* Removed start-campaign route */}
          
          {/* Other existing routes */}
          <Route path="/student" element={<RequireAuth><Student /></RequireAuth>} />
          <Route path="/student/details" element={<RequireAuth><StudentDetailsForm /></RequireAuth>} />
          <Route path="/student/profile" element={<RequireAuth><StudentProfile /></RequireAuth>} />
          <Route path="/scholarship" element={<MainLayout><ScholarshipPage /></MainLayout>} />
          <Route path="/scholarship/:id" element={<MainLayout><ScholarshipDetails /></MainLayout>} />
          <Route path="/scholarship/:id/apply" element={<MainLayout><Scholarshipapply /></MainLayout>} />
          <Route path="/scholarship/:id/application-form" element={<MainLayout><ScholarshipApplicationForm /></MainLayout>} />
          <Route path="/scholarship/application-success" element={<MainLayout><ApplicationSuccess /></MainLayout>} />
          <Route path="/donation" element={<MainLayout><DonarPage /></MainLayout>} />
          <Route path="/organization" element={<OrganizationRoute />} />
          <Route path="/organization/profile" element={<RequireAuth><OrganizationProfile /></RequireAuth>} />
          <Route path="/organization/dashboard" element={<RequireAuth><OrganizationDashboard /></RequireAuth>} />
          <Route path="/organization/dashboard/create-scholarship" element={<RequireAuth><CreateScholarship /></RequireAuth>} />
          <Route path="/organization/dashboard/scholarship-analytics" element={<RequireAuth><ScholarshipAnalytics /></RequireAuth>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/contact/submitted" element={<MainLayout><ContactSubmitted /></MainLayout>} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;
