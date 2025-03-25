import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  const location = useLocation();
  const role = location.state?.role || "STUDENT";
  
  // Always redirect students to the profile form after login
  const returnTo = role === "STUDENT" 
    ? "/student/details" 
    : (role === "ORGANIZATION" ? "/organization" : "/donation");

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