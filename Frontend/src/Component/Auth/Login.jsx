import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import studentService from "../../api/studentService"; // Import the student service

const Login = () => {
  const location = useLocation();
  const role = location.state?.role || "STUDENT";
  const redirectAfterDetails = location.state?.redirectAfterDetails || null;
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isSignedIn && user) {
      const role = user?.publicMetadata?.role || "STUDENT";
      
      if (role === "STUDENT") {
        // Check if the student has already completed their profile
        checkStudentProfile(user.id);
      } else if (role === "ORGANIZATION") {
        // Direct redirect to dashboard for organization users
        navigate("/organization/dashboard");
      } else {
        navigate("/donation");
      }
    }
  }, [isSignedIn, user, navigate, redirectAfterDetails]);
  
  // Function to check if student profile exists
  const checkStudentProfile = async (userId) => {
    try {
      // First register or update the user in our system
      await studentService.registerOrUpdateUser({
        userId: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        role: "STUDENT"
      });
      
      // Then check if they have a complete profile
      const studentData = await studentService.getStudentProfile(userId);
      
      // If they have a complete profile with required fields
      if (studentData && studentData.fullName && studentData.dateOfBirth && studentData.contactNumber) {
        // If we have a specific redirect after details, use that
        if (redirectAfterDetails) {
          navigate(redirectAfterDetails);
        } else {
          // Otherwise go to profile page
          navigate("/student/profile");
        }
      } else {
        // If profile is incomplete or doesn't exist, send them to the details form
        // Pass along the redirect destination for after they complete the form
        navigate("/student/details", { 
          state: { redirectAfterSubmit: redirectAfterDetails || "/student/profile" } 
        });
      }
    } catch (error) {
      console.error("Error checking student profile:", error);
      // If there's an error (like 404 not found), send them to the details form
      navigate("/student/details", { 
        state: { redirectAfterSubmit: redirectAfterDetails || "/student/profile" } 
      });
    }
  };
  
  // Always redirect students to the profile form after login
  const returnTo = role === "STUDENT" 
    ? "/student/details" 
    : (role === "ORGANIZATION" ? "/organization/dashboard" : "/donation");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please sign in to continue as a {role.toLowerCase()}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignIn 
            routing="path" 
            path="/auth/login" 
            signUpUrl="/auth/sign-up"
            redirectUrl={returnTo}
            afterSignInUrl={returnTo}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
