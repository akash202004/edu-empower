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

        {/* Protected Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <Student />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crowdfunding"
          element={
            <ProtectedRoute>
              <CrowdFundingPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/scholarship"
          element={
            <ProtectedRoute>
              <ScholarshipPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <h1 className="text-center text-3xl font-bold mt-10">Donation Page</h1>
            </ProtectedRoute>
          }
        />

        {/* Centered Clerk Sign-In Page */}
        <Route
          path="/sign-in"
          element={
            <div className="clerk-login-container">
              <SignIn />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
