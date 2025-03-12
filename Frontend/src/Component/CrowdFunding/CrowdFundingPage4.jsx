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

function CrowdFundingPage4() {
    const { isSignedIn, user } = useUser();
    const navigate = useNavigate();


    return (
        <div className="font-sans text-gray-900 min-h-screen flex flex-col">
            {/* Main Content */}
            <div className="container mx-auto py-20 px-10 text-center">
                <h1 className="text-2xl font-bold">Thank You for Your Generous Donation!</h1>
                <p className="mt-4">Dear [Donor Name],</p>
                <p className="mt-2">
                    Your contribution to the [Scholarship Program Name] is greatly appreciated and will make a significant impact in the lives of many students.
                </p>

                {/* Donation Details */}
                <div className="bg-gray-200 p-6 rounded-lg mt-10 text-left">
                    <h2 className="font-bold text-xl mb-4">Donation Details</h2>
                    <p className="mb-2"><strong>Donation Amount:</strong> $[Amount]</p>
                    <p className="mb-2"><strong>Program Name:</strong> [Scholarship Program Name]</p>
                    <p className="mt-4">
                        Your donation will help provide scholarships to underprivileged students, enabling them to pursue their dreams and achieve academic success.
                    </p>
                </div>

                {/* Next Steps */}
                <div className="mt-10 text-left">
                    <h2 className="font-bold text-xl mb-4">Next Steps</h2>
                    <p>Stay updated with our latest news and updates by subscribing to our newsletter.</p>
                    <p>Consider becoming a recurring donor to make an even greater impact.</p>
                </div>

                {/* Social Share Buttons */}
                <div className="flex justify-center space-x-4 mt-6">
                    <a href="">
                        <button className="bg-black text-white px-4 py-2 cursor-pointer rounded-md">Share on Facebook</button>
                    </a>
                    <a href="">
                        <button className="bg-black text-white px-4 py-2 cursor-pointer rounded-md">Share on Twitter</button>
                    </a>
                    <a href="">
                        <button className="bg-black text-white px-4 py-2 cursor-pointer rounded-md">Share on LinkedIn</button>
                    </a>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black text-white py-4 text-center">
                <p>&copy; 2023 ScholarshipDonor. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default CrowdFundingPage4
