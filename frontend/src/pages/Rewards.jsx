import React, { useContext, useState, useEffect } from "react";
import { RiCoinsLine } from "react-icons/ri";
import { FaMapMarkerAlt, FaRecycle, FaWeight, FaCheckCircle, FaClock } from "react-icons/fa";
import { AppContent } from "../context/AppContext";
import axios from "axios";

const Rewards = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const [myReports, setMyReports] = useState([]);

  // Fetch reports created by the logged-in user
  useEffect(() => {
    const fetchMyReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${backendUrl}/report/my-reports`, {
          headers: { Authorization: token },
        });

        if (data.success) setMyReports(data.reports);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchMyReports();
  }, [backendUrl]);

  return (
    <div className="min-h-screen bg-green-50 pt-20 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Rewards Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4">
            Your Rewards Dashboard
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            Track your points and waste collection contributions
          </p>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Points Card */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 shadow-xl rounded-2xl p-8 text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold opacity-90">Total Points</h3>
              <RiCoinsLine className="w-8 h-8 opacity-80" />
            </div>
            <div className="text-5xl font-bold mb-2">{userData?.points ?? 0}</div>
            <p className="text-sm opacity-80">Keep reporting to earn more!</p>
          </div>

          {/* Total Reports Card */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border-l-4 border-emerald-500 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Reports</h3>
              <FaRecycle className="w-7 h-7 text-emerald-600" />
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-2">{myReports.length}</div>
            <p className="text-sm text-gray-600">Waste reports submitted</p>
          </div>

          {/* Verified Reports Card */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border-l-4 border-green-500 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Verified</h3>
              <FaCheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {myReports.filter(r => r.verified).length}
            </div>
            <p className="text-sm text-gray-600">Confirmed collections</p>
          </div>
        </div>

        {/* My Reports Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-green-900 mb-2">
            Your Submitted Reports
          </h2>
          <p className="text-gray-600">View all your waste collection reports</p>
        </div>

        {/* If none */}
        {myReports.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FaRecycle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Reports Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start reporting waste to earn points and make a difference!
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Submit Your First Report
            </button>
          </div>
        )}

        {/* Reports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myReports.map((report) => (
            <div
              key={report._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Status Banner */}
              <div className={`h-2 ${report.verified ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}></div>
              
              <div className="p-6">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                    report.verified 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {report.verified ? (
                      <>
                        <FaCheckCircle className="w-4 h-4" />
                        <span>Verified</span>
                      </>
                    ) : (
                      <>
                        <FaClock className="w-4 h-4" />
                        <span>Unverified</span>
                      </>
                    )}
                  </div>
                  
                  {/* Points Indicator */}
                  {report.verified && (
                    <div className="flex items-center gap-1 text-green-600 font-bold">
                      <RiCoinsLine className="w-5 h-5" />
                      <span>+10</span>
                    </div>
                  )}
                </div>

                {/* Report Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3 group">
                    <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                      <FaMapMarkerAlt className="text-green-600 w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Location</p>
                      <p className="text-gray-900 font-medium leading-tight">{report.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group">
                    <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                      <FaRecycle className="text-green-600 w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Waste Type</p>
                      <p className="text-gray-900 font-medium">{report.wasteType}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group">
                    <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                      <FaWeight className="text-green-600 w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Quantity</p>
                      <p className="text-gray-900 font-medium">{report.quantity}</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                {!report.verified && (
                  <div className="mt-5 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      Awaiting admin verification
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rewards;