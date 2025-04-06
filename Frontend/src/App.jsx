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
// Add this import at the top with your other imports
import LoadingScreen from "./Component/Common/LoadingScreen";
// Keep only one import for OrganizationProfile
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
import CrowdFundingPage2 from "./Component/CrowdFunding/CrowdFundingPage2";
import Layout from "./Component/Layout/Layout";
import ScholarshipApplicationForm from "./Component/Scholarship/ScholarshipApplicationForm";
import ApplicationSuccess from "./Component/Scholarship/ApplicationSuccess";
import Contact from "./Component/Contact/Contact";

// Import new organization dashboard components
import OrganizationDashboard from "./Component/Organization/Dashboard/OrganizationDashboard";
import CreateScholarship from "./Component/Organization/Dashboard/CreateScholarship";
// Make sure to import the ScholarshipAnalytics component
import ScholarshipAnalytics from "./Component/Organization/Dashboard/ScholarshipAnalytics";

// Remove this duplicate import
// Import both About components
// import About from './Component/About/About';


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

  if (isSignedIn && user?.publicMetadata?.role === "ORGANIZATION") {
    return <Navigate to="/organization/dashboard" replace />;
  }

  return <Organization />;
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

function App() {
  <Toaster position="top-right" reverseOrder={false} />;
  useSmoothScroll(80);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Combine minimum loading time with actual resource loading
    const minLoadingTime = 4000; // Minimum 4 seconds
    const startTime = Date.now();

    // Simulate checking if resources are loaded
    const checkResourcesLoaded = () => {
      const elapsedTime = Date.now() - startTime;

      // Ensure minimum loading time has passed
      if (elapsedTime >= minLoadingTime) {
        setLoading(false);
      } else {
        // If minimum time hasn't passed, wait until it does
        setTimeout(() => setLoading(false), minLoadingTime - elapsedTime);
      }
    };

    // Start checking if resources are loaded
    window.addEventListener("load", checkResourcesLoaded);

    // Fallback in case the load event already fired
    if (document.readyState === "complete") {
      checkResourcesLoaded();
    }

    // Set a maximum loading time as fallback
    const maxLoadingTimer = setTimeout(() => setLoading(false), 6000);

    return () => {
      window.removeEventListener("load", checkResourcesLoaded);
      clearTimeout(maxLoadingTimer);
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Routes>
          {/* Root route */}
          <Route path="/" element={<AuthRedirect />} />

          {/* Auth routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/role-selection" element={<RoleSelection />} />

         
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/about-edu-empower" element={<MainLayout><AboutEduEmpower /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />

          {/* Student routes */}
          <Route
            path="/student"
            element={
              <Layout>
                <Student />
              </Layout>
            }
          />
          <Route
            path="/student/details"
            element={
              <Layout>
                <StudentDetailsForm />
              </Layout>
            }
          />
          <Route
            path="/student/basic-details"
            element={
              <Layout>
                <StudentBasicDetailsForm />
              </Layout>
            }
          />
          <Route
            path="/student/profile"
            element={
              <RequireAuth>
                <StudentProfile />
              </RequireAuth>
            }
          />

          {/* Scholarship routes */}
          <Route
            path="/scholarship"
            element={
              <Layout>
                <ScholarshipPage />
              </Layout>
            }
          />
          <Route path="/scholarship/:id" element={<ScholarshipDetails />} />
          <Route
            path="/scholarship/application-form"
            element={
              <RequireAuth>
                <ScholarshipApplicationForm />
              </RequireAuth>
            }
          />
          <Route
            path="/scholarship/apply/:id"
            element={
              <RequireAuth>
                <Scholarshipapply />
              </RequireAuth>
            }
          />
          <Route
            path="/scholarship/application/success"
            element={
              <RequireAuth>
                <ApplicationSuccess />
              </RequireAuth>
            }
          />

          {/* Crowdfunding routes */}
          <Route path="/crowdfunding" element={<CrowdFundingPage2 />} />
          <Route path="/crowdfunding3" element={<CrowdFundingPage2 />} />

          {/* Organization routes */}
          <Route path="/organization" element={<OrganizationRoute />} />

          {/* Organization dashboard routes */}
          <Route
            path="/organization/dashboard"
            element={
              <RequireAuth>
                <OrganizationDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/organization/profile"
            element={
              <RequireAuth>
                <OrganizationProfile />
              </RequireAuth>
            }
          />
          <Route
            path="/organization/create-scholarship"
            element={
              <RequireAuth>
                <CreateScholarship />
              </RequireAuth>
            }
          />
          <Route
            path="/organization/analytics"
            element={
              <RequireAuth>
                <ScholarshipAnalytics />
              </RequireAuth>
            }
          />

          {/* Donor route */}
          <Route path="/donation" element={<DonarPage />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;
