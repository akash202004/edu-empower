import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import useSmoothScroll from './hooks/useSmoothScroll';

// Import components
import Login from './Component/Auth/Login';
import StudentDetailsForm from './Component/Student/StudentDetailsForm';
import Navbar from './Component/Navbar/Navbar';
import Hero from './Component/Hero/Hero';
import About from './Component/About/About';
import Feature from './Component/Feature/Feature';
import Footer from './Component/Footer/Footer';
import RoleSelection from './Component/Auth/RoleSelection';
import Student from './Component/Student_Basic_Details_Form/Student';
import StudentBasicDetailsForm from './Component/Student_Basic_Details_Form/StudentDetailsForm';
import ScholarshipPage from './Component/Scholarship/ScholarshipPage';
import ScholarshipDetails from './Component/Scholarship/ScholarshipDetails';
import Scholarshipapply from './Component/Scholarship/Scholarshipapply';
import DonarPage from './Component/Donar/Donar';
import Organization from './Component/Organization/Organization';
import StudentProfile from './Component/Student/StudentProfile';
import CrowdFundingPage2 from './Component/CrowdFunding/CrowdFundingPage2';
import Layout from './Component/Layout/Layout';
import ScholarshipApplicationForm from './Component/Scholarship/ScholarshipApplicationForm';
import ApplicationSuccess from './Component/Scholarship/ApplicationSuccess';

// Import new organization dashboard components
import OrganizationDashboard from './Component/Organization/Dashboard/OrganizationDashboard';
import CreateScholarship from './Component/Organization/Dashboard/CreateScholarship';

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
      return <Navigate to="/student/details" replace />;
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
    return <Navigate to="/auth/login" replace />;
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

function App() {
  useSmoothScroll(80);

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Routes>
          {/* Root route */}
          <Route path="/" element={<AuthRedirect />} />

          {/* Auth routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/role-selection" element={<RoleSelection />} />

          {/* Student routes */}
          <Route path="/student" element={<Layout><Student /></Layout>} />
          <Route path="/student/details" element={<Layout><StudentDetailsForm /></Layout>} />
          <Route path="/student/basic-details" element={<Layout><StudentBasicDetailsForm /></Layout>} />
          <Route path="/student/profile" element={<RequireAuth><StudentProfile /></RequireAuth>} />

          {/* Scholarship routes */}
          <Route path="/scholarship" element={<Layout><ScholarshipPage /></Layout>} />
          <Route path="/scholarship/:id" element={<ScholarshipDetails />} />
          <Route path="/scholarship/application-form" element={<RequireAuth><ScholarshipApplicationForm /></RequireAuth>} />
          <Route path="/scholarship/apply/:id" element={<RequireAuth><Scholarshipapply /></RequireAuth>} />
          <Route path="/scholarship/application/success" element={<RequireAuth><ApplicationSuccess /></RequireAuth>} />

          {/* Crowdfunding routes */}
          <Route path="/crowdfunding" element={<CrowdFundingPage2 />} />
          <Route path="/crowdfunding3" element={<CrowdFundingPage2 />} />

          {/* Organization routes */}
          <Route path="/organization" element={<OrganizationRoute />} />

          {/* Organization dashboard routes */}
          <Route path="/organization/dashboard" element={<RequireAuth><OrganizationDashboard /></RequireAuth>} />
          <Route path="/organization/create-scholarship" element={<RequireAuth><CreateScholarship /></RequireAuth>} />

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
