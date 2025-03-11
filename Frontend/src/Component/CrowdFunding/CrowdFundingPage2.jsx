import React, { useState, useEffect } from "react";
import scholarbg1 from '../../assets/scholarbg1.jpg'
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

function CrowdFundingPage2() {
    const { isSignedIn, user } = useUser();
    const navigate = useNavigate();

    return (
        <div className="font-sans text-gray-900">
            {/* Hero Section */}
            <div className="relative">
                <img
                    src={scholarbg1}
                    alt="Graduates"
                    className="w-full h-96 object-cover bg-no-repeat"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <h1 className="text-4xl font-bold">Welcome to ScholarshipDonor</h1>
                    <p className="mt-4 text-center max-w-2xl">
                        Join us in making a difference by helping less fortunate students. Our scholarship programs have transformed countless futures.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-md cursor-pointer"
                    onClick={() => navigate('/crowdfunding3')}>Donate Now</button>
                </div>
            </div>

            {/* Program Overview */}
            <div className="container mx-auto py-16 px-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: "Our Mission", description: "We provide scholarships to disadvantaged students, empowering them through quality education." },
                    { title: "Our Impact", description: "Over 50,000 scholarships provided, positively transforming countless lives." },
                    { title: "Global Reach", description: "Support to students across 30+ countries worldwide." },
                ].map((program, index) => (
                    <div key={index} className="bg-gray-100 p-6 rounded-lg shadow">
                        <h2 className="font-bold text-xl mb-2">{program.title}</h2>
                        <p>{program.description}</p>
                    </div>
                ))}
            </div>

            {/* Impact Stories */}
            <div className="bg-gray-200 py-16 px-10">
                <h2 className="text-center text-3xl font-bold mb-10">Impact Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { name: "Maya's Journey", description: "Maya's story is a reminder that financial hardship should never block education." },
                        { name: "Ahmed's Achievement", description: "From adversity to opportunity, Ahmed excelled in university thanks to our support." },
                        { name: "The Future Leaders", description: "Providing access to knowledge to shape future innovators." },
                    ].map((story, index) => (
                        <div key={index} className="p-6 rounded-lg shadow">
                            <img src={scholarbg1} alt="Graduates" className="w-full h-64 object-cover" />
                            <h3 className="font-bold text-xl mb-2">{story.name}</h3>
                            <p>{story.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black text-white py-10 px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="font-bold text-lg mb-2">Contact Us</h2>
                    <p>Email: info@scholarshipdonor.org</p>
                    <p>Phone: +1 234 567 890</p>
                </div>
                <div>
                    <h2 className="font-bold text-lg mb-2">Follow Us</h2>
                    <p>Social icons here</p>
                </div>
                <div>
                    <h2 className="font-bold text-lg mb-2">Resources</h2>
                    <p>FAQ</p>
                    <p>Terms & Conditions</p>
                    <p>Privacy Policy</p>
                </div>
            </footer>
        </div>
    )
}

export default CrowdFundingPage2
