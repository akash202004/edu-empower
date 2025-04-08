import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AuthRedirect = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user) {
        const role = user.publicMetadata?.role || "STUDENT";
        
        // Redirect based on role
        if (role === "STUDENT") {
          navigate("/student"); // Changed from "/student/details" to "/student"
        } else if (role === "ORGANIZATION") {
          navigate("/organization");
        } else {
          navigate("/home"); // Changed from "/donation" to "/home"
        }
      } else {
        // If not signed in, redirect to home page or login
        navigate("/home");
      }
    }
  }, [isSignedIn, user, isLoaded, navigate]);

  // Return a loading state while checking auth
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default AuthRedirect;