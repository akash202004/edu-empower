import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Navbar from "./Component/Navbar/Navbar";
import Hero from "./Component/Hero/Hero";
import About from "./Component/About/About";
import Feature from "./Component/Feature/Feature";
import Footer from "./Component/Footer/Footer";
import Student from "./Component/Student_Basic_Details_Form/Student";
import CrowdFundingPage from "./Component/CrowdFunding/CrowdFundingPage";
import ScholarshipPage from "./Component/Scholarship/ScholarshipPage";
import Organizationdashboard from "./Component/Organizationdashboard/Organizationdashboard";
import CrowdFundingPage2 from "./Component/CrowdFunding/CrowdFundingPage2";
import CrowdFundingPage3 from "./Component/CrowdFunding/CrowdFundingPage3";
import CrowdFundingPage4 from "./Component/CrowdFunding/CrowdFundingPage4";
import DonarPage from "./Component/Donar/Donar";
import Organization from "./Component/Organization/Organization";
import Scholarshipapply from "./Component/Scholarship/Scholarshipapply";
import ScholarshipapplyForm from "./Component/Scholarship/ScholarshipapplyForm";

const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  );
};

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Feature />
              <Footer />
            </>
          }
        />
        <Route path="/donar" element={<DonarPage/> } /> {/* Public Donor page */}
        <Route path="/student" element={<Student />} /> {}
        <Route path="/organization" element={<Organization />} /> {}
        {/* Protected Routes */}
        <Route path="/crowdfunding" element={<ProtectedRoute><CrowdFundingPage /></ProtectedRoute>} />
        <Route path="/crowdfunding2" element={<ProtectedRoute><CrowdFundingPage2 /></ProtectedRoute>} />
        <Route path="/crowdfunding3" element={<ProtectedRoute><CrowdFundingPage3 /></ProtectedRoute>} />
        <Route path="/crowdfunding4" element={<ProtectedRoute><CrowdFundingPage4 /></ProtectedRoute>} />
        <Route path="/scholarship" element={<ProtectedRoute><ScholarshipPage /></ProtectedRoute>} />
        <Route path="/scholarship/apply" element={<ProtectedRoute><Scholarshipapply /></ProtectedRoute>} />
        <Route path="/scholarship/apply/form" element={<ProtectedRoute><ScholarshipapplyForm /></ProtectedRoute>} />
        <Route path="/organizationdashboard" element={<ProtectedRoute><Organizationdashboard /></ProtectedRoute>} />
        <Route path="/donation" element={<ProtectedRoute><h1 className="text-center text-3xl font-bold mt-10">Donation Page</h1></ProtectedRoute>} />

        {/* Centered Clerk Sign-In Page */}
        <Route path="/sign-in" element={<div className="clerk-login-container"><SignIn /></div>} />
      </Routes>
    </div>
  );
};

export default App;
