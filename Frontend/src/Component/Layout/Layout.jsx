import React from "react";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default Layout;