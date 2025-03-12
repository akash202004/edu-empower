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

function CrowdFundingPage3() {
    const { isSignedIn, user } = useUser();
    const navigate = useNavigate();
    
    return (
        <div className="font-sans text-gray-900 min-h-screen">
            {/* Navbar */}
            <nav className="bg-white py-4 px-10 flex justify-between items-center">
                
            </nav>

            {/* Form Sections */}
            <div className="container mx-auto py-10 px-10 space-y-8">
                {/* Personal Information */}
                <div className="bg-gray-200 p-6 rounded-lg">
                    <h2 className="font-bold text-xl mb-4">Personal Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" className="p-2 w-full border rounded" />
                        <input type="text" placeholder="Last Name" className="p-2 w-full border rounded" />
                        <input type="email" placeholder="Email" className="col-span-2 p-2 w-full border rounded" />
                    </div>
                </div>

                {/* Donation Details */}
                <div className="bg-gray-200 p-6 rounded-lg">
                    <h2 className="font-bold text-xl mb-4">Donation Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" placeholder="Donation Amount" className="p-2 w-full border rounded" />
                        <div className="flex items-center space-x-4">
                            <label><input type="radio" name="frequency" /> One-time</label>
                            <label><input type="radio" name="frequency" /> Recurring</label>
                        </div>
                    </div>
                </div>

                {/* Payment Information */}
                <div className="bg-gray-200 p-6 rounded-lg">
                    <h2 className="font-bold text-xl mb-4">Payment Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Credit Card Number" className="p-2 w-full border rounded" />
                        <input type="text" placeholder="Expiration Date" className="p-2 w-full border rounded" />
                        <input type="text" placeholder="CVV" className="col-span-2 p-2 w-full border rounded" />
                    </div>
                </div>

                {/* Summary */}
                <div className="bg-gray-200 p-6 rounded-lg">
                    <h2 className="font-bold text-xl mb-4">Summary</h2>
                    <p className="mb-4">Please review your details and the donation amount before confirming your donation.</p>
                    <button className="bg-black text-white px-6 py-2 rounded-lg cursor-pointer" onClick={() => navigate('/crowdfunding4')}>Confirm Donation</button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black text-white py-10 px-10 flex justify-between">
                <div>
                    <h2 className="font-bold text-lg mb-2">About ScholarshipDonor</h2>
                    <p>We connect generous donors with students in need of scholarship.</p>
                </div>
                <div>
                    <h2 className="font-bold text-lg mb-2">Contact Us</h2>
                    <p>Email: support@scholarshipdonor.com</p>
                    <p>Phone: (123) 456-7890</p>
                </div>
            </footer>
        </div>
    )
}

export default CrowdFundingPage3
