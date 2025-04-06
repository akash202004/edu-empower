import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
// import studentService from "../../api/studentService"; // Import the student service

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
        navigate("/scholarship")
      } else if (role === "ORGANIZATION") {
        // Direct redirect to dashboard for organization users
        navigate("/organization/dashboard");
      } else {
        navigate("/donation");
      }
    }
  }, [isSignedIn, user, navigate, redirectAfterDetails]);

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
            redirectUrl="/auth/login"
            afterSignInUrl="/auth/login"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
