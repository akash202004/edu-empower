import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Hero from "./Component/Hero/Hero";
import About from "./Component/About/About";
import Feature from "./Component/Feature/Feature";
import Footer from "./Component/Footer/Footer";
import Student from "./Component/Student_Basic_Details_Form/Student";
import Organization from "./Component/Organization_Basic_details/Organization";

const App = () => {
  return (
    <div>
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
        <Route path="/student" element={<Student />} />
        <Route path="/organization" element={<Organization />} />
        {/* <Route path="/crowdfunding" element={<Crowedfunding />} /> */}
      </Routes>
    </div>
  );
};

export default App;
