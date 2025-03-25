import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Hero from "./Component/Hero/Hero";
import About from "./Component/About/About";
import Feature from "./Component/Feature/Feature";
import Footer from "./Component/Footer/Footer";
import RoleSelection from "./Component/Auth/RoleSelection";
import Student from "./Component/Student_Basic_Details_Form/Student";
import StudentDetailsForm from "./Component/Student_Basic_Details_Form/StudentDetailsForm";
import Login from "./Component/Auth/Login";
import ScholarshipPage from "./Component/Scholarship/ScholarshipPage";
import ScholarshipApplyForm from "./Component/Scholarship/ScholarshipapplyForm";
import ScholarshipDetails from "./Component/Scholarship/ScholarshipDetails";
import Scholarshipapply from "./Component/Scholarship/Scholarshipapply";
import DonarPage from "./Component/Donar/Donar";
import Organization from "./Component/Organization/Organization";
import StudentProfile from "./Component/Student/StudentProfile";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
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
        <Route path="/auth/role-selection" element={<RoleSelection />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student/details" element={<StudentDetailsForm />} />
        <Route path="/create-profile" element={<StudentDetailsForm />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/dashboard" element={<div>Student Dashboard (Coming Soon)</div>} />
        <Route path="/donation" element={<DonarPage />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/scholarship" element={<ScholarshipPage />} />
        <Route path="/scholarship/details" element={<ScholarshipDetails />} />
        <Route path="/scholarship/apply" element={<Scholarshipapply />} />
        <Route path="/scholarship/apply/form" element={<ScholarshipApplyForm />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
