import React from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaHandsHelping, FaMedal } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

        {/* First Section */}
        <div className="bg-green-900 text-white text-center mt-10 py-20 px-6">
            <h1 className="text-5xl font-extrabold mb-4">How It Works</h1>
            <p className="max-w-2xl mx-auto text-lg opacity-90">
                Waste Watch turns cleanup into community impact — simple, rewarding, and eco-friendly.
            </p>
        </div>

        {/* Timeline Section */}
        <div className="max-w-6xl mx-auto py-24 px-6 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-green-200 hidden md:block"></div>

            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center mb-20 relative">
                <div className="w-full md:w-1/2 md:pr-10 text-right md:text-left">
                    <h2 className="text-3xl font-bold text-green-800 mb-3">1. Spot & Report</h2>
                    <p className="text-lg text-gray-700">
                        Found waste in your area? Open the Waste Watch app or website, snap a photo, and describe the issue.
                        Your report helps locate cleanup sites faster.
                    </p>
                </div>
                <div className="w-16 h-16 bg-green-800 text-white flex items-center justify-center rounded-full 
                    text-3xl cursor-pointer shadow-lg mx-auto md:mx-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                    <FaTrashAlt />
                </div>
                <div className="hidden md:block md:w-1/2"></div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center mb-20 relative md:flex-row-reverse">
                <div className="w-full md:w-1/2 md:pl-10 text-left md:text-right">
                    <h2 className="text-3xl font-bold text-green-800 mb-3">2. Team Up & Collect</h2>
                    <p className="text-lg text-gray-700">
                        Join local cleanup drives or start your own. Work with friends, neighbors, or volunteers to collect and dispose of waste responsibly.
                    </p>
                </div>
                <div className="w-16 h-16 bg-green-800 text-white flex items-center justify-center rounded-full 
                    text-3xl cursor-pointer shadow-lg mx-auto md:mx-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                    <FaHandsHelping />
                </div>
                <div className="hidden md:block md:w-1/2"></div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center mb-20 relative">
                <div className="w-full md:w-1/2 md:pr-10 text-right md:text-left">
                    <h2 className="text-3xl font-bold text-green-800 mb-3">3. Earn Rewards</h2>
                    <p className="text-lg text-gray-700">
                        Each verified cleanup earns you eco-points and community badges. Redeem points for rewards or special recognition on the leaderboard.
                    </p>
                </div>
                <div className="w-16 h-16 bg-green-800 text-white flex items-center justify-center rounded-full 
                    text-3xl cursor-pointer shadow-lg mx-auto md:mx-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                    <FaMedal />
                </div>
                <div className="hidden md:block md:w-1/2"></div>
            </div>
        </div>

        <div className="bg-green-900 text-white text-center py-16">
            <h2 className="text-3xl font-bold mb-4">
                Be Part of the Change
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">It’s easy to make an impact - one report, one cleanup, one reward at a time.</p>
            <Link to="/report-waste">
                <button className="bg-white cursor-pointer text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-100 transition-all">
                    Report Waste Now
                </button>
            </Link>
        </div>
    </div>
  )
}

export default HowItWorks