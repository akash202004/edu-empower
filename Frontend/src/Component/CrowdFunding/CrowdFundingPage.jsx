import React, { useState, useEffect } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";


const navigation = [
  { name: "Crowd Funding", path: "/crowdfunding", authRequired: true },
  { name: "Scholarship", path: "/scholarship", authRequired: true },
  { name: "Donation", path: "/donation", authRequired: false },
];

export default function CrowedFunding() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
 

  return (

    <div>

    </div>
    
    
  );
}