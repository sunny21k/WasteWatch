import React, { useState, useContext } from 'react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { FaCheckCircle, FaClock, FaMapMarkerAlt, FaUser, FaWeight, FaCircle, FaTrash } from 'react-icons/fa';

const CollectWaste = () => {
  const [filterVerified, setFilterVerified] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const { reports = [], userData, backendUrl } = useContext(AppContent);

  // Filter reports based on verification and status
  const filteredReports = reports.filter(report => {
    const verifiedMatch = 
      filterVerified === "all" || 
      (filterVerified === "verified" && report.verified) ||
      (filterVerified === "unverified" && !report.verified);
    
    const statusMatch = 
      filterStatus === "all" || report.status === filterStatus;
    
    return verifiedMatch && statusMatch;
  });

  const handleCollect = async (reportId) => {
    try {
      const token = localStorage.getItem("token");
      const userId = userData._id; 

      const { data } = await axios.post(
        `${backendUrl}/report/collect`,
        { reportId, userId },
        { headers: { Authorization: token } }
      );

      if (data.success) {
        alert("Waste collection initiated!");
        // Refresh the reports or update the specific report in state
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
      alert("Failed to collect waste");
    }
  };

  const statusColors = {
    open: { bg: "bg-green-100", text: "text-green-700", dot: "text-green-500" },
    pending: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "text-yellow-500" },
    collected: { bg: "bg-red-100", text: "text-red-700", dot: "text-red-500" }
  };

  return (
    <div className='min-h-screen bg-green-50 px-6 py-12'>
      {/* Header */}
      <div className='max-w-4xl mx-auto text-center mb-12'>
        <h1 className='text-4xl sm:text-5xl font-extrabold text-green-900 mb-4'>
          Reported Waste
        </h1>
        <p className='text-gray-700 text-lg sm:text-xl'>
          Browse verified waste reports in your community and help collect them!
        </p>
      </div>

      {/* Verification Filter Buttons */}
      <div className='flex justify-center flex-wrap gap-3 mb-4'>
        <button
          className={`px-6 py-2.5 rounded-full cursor-pointer font-semibold transition-all duration-200 shadow-md hover:scale-105 ${
            filterVerified === "all"
              ? "bg-green-900 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-green-100"
          }`}
          onClick={() => setFilterVerified("all")}
        >
          All Reports
        </button>
        <button
          className={`px-6 py-2.5 cursor-pointer rounded-full font-semibold transition-all duration-200 shadow-md hover:scale-105 flex items-center gap-2 ${
            filterVerified === "verified"
              ? "bg-green-900 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-green-100"
          }`}
          onClick={() => setFilterVerified("verified")}
        >
          <FaCheckCircle />
          Verified
        </button>
        <button
          className={`px-6 cursor-pointer py-2.5 rounded-full font-semibold transition-all duration-200 shadow-md hover:scale-105 flex items-center gap-2 ${
            filterVerified === "unverified"
              ? "bg-green-900 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-green-100"
          }`}
          onClick={() => setFilterVerified("unverified")}
        >
          <FaClock />
          Unverified
        </button>
      </div>

      {/* Status Filter Buttons - Smaller */}
      <div className='flex justify-center flex-wrap gap-2 mb-10'>
        <button
          className={`px-4 py-1.5 text-sm rounded-full cursor-pointer font-medium transition-all duration-200 shadow-sm hover:scale-105 ${
            filterStatus === "all"
              ? "bg-gray-700 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setFilterStatus("all")}
        >
          All Status
        </button>
        <button
          className={`px-4 py-1.5 text-sm rounded-full cursor-pointer font-medium transition-all duration-200 shadow-sm hover:scale-105 flex items-center gap-1.5 ${
            filterStatus === "open"
              ? "bg-green-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setFilterStatus("open")}
        >
          <FaCircle className="w-2 h-2" />
          Open
        </button>
        <button
          className={`px-4 py-1.5 text-sm rounded-full cursor-pointer font-medium transition-all duration-200 shadow-sm hover:scale-105 flex items-center gap-1.5 ${
            filterStatus === "pending"
              ? "bg-yellow-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setFilterStatus("pending")}
        >
          <FaCircle className="w-2 h-2" />
          Pending
        </button>
        <button
          className={`px-4 py-1.5 text-sm rounded-full cursor-pointer font-medium transition-all duration-200 shadow-sm hover:scale-105 flex items-center gap-1.5 ${
            filterStatus === "collected"
              ? "bg-red-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setFilterStatus("collected")}
        >
          <FaCircle className="w-2 h-2" />
          Collected
        </button>
      </div>

      {/* Stats Bar */}
      <div className='max-w-6xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <div className='bg-white rounded-xl shadow-md p-4 text-center'>
          <p className='text-gray-600 text-sm font-semibold mb-1'>Total Reports</p>
          <p className='text-3xl font-bold text-green-900'>{reports.length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-md p-4 text-center border-l-4 border-green-500'>
          <p className='text-gray-600 text-sm font-semibold mb-1'>Verified</p>
          <p className='text-3xl font-bold text-green-600'>
            {reports.filter(r => r.verified).length}
          </p>
        </div>
        <div className='bg-white rounded-xl shadow-md p-4 text-center border-l-4 border-amber-500'>
          <p className='text-gray-600 text-sm font-semibold mb-1'>Pending</p>
          <p className='text-3xl font-bold text-amber-600'>
            {reports.filter(r => !r.verified).length}
          </p>
        </div>
      </div>

      {/* Waste Reports Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        {filteredReports.length === 0 ? (
          <div className='col-span-full bg-white rounded-2xl shadow-lg p-12 text-center'>
            <div className='flex justify-center text-6xl mb-4'>
              <FaTrash className='text-gray-700'/>
            </div>
            <h3 className='text-xl font-semibold text-gray-700 mb-2'>No Reports Found</h3>
            <p className='text-gray-500'>
              Try adjusting your filters to see more reports.
            </p>
          </div>
        ) : (
          filteredReports.map((report) => {
            const statusColor = statusColors[report.status] || statusColors.open;
            
            return (
              <div
                key={report._id}
                className='bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1'
              >
                {/* Verification Status Banner */}
                <div className={`h-2 ${report.verified ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}></div>
                
                {report.image && (
                  <img
                    className='w-full h-48 object-cover'
                    src={report.image}
                    alt={report.wasteType}
                  />
                )}
                
                <div className='p-6'>
                  {/* Header with Badges */}
                  <div className='flex justify-between items-start mb-4'>
                    <h2 className='text-xl font-bold text-green-900 flex-1'>
                      {report.wasteType}
                    </h2>
                    <div className='flex flex-col gap-2'>
                      {/* Verification Badge */}
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        report.verified 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {report.verified ? (
                          <>
                            <FaCheckCircle className="w-3 h-3" />
                            <span>Verified</span>
                          </>
                        ) : (
                          <>
                            <FaClock className="w-3 h-3" />
                            <span>Pending</span>
                          </>
                        )}
                      </div>
                      {/* Status Badge */}
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}>
                        <FaCircle className={`w-2 h-2 ${statusColor.dot}`} />
                        <span className='capitalize'>{report.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Report Details */}
                  <div className='space-y-3 mb-5'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-green-100 p-2 rounded-lg'>
                        <FaWeight className='text-green-600 w-4 h-4' />
                      </div>
                      <div>
                        <p className='text-xs text-gray-500 uppercase font-semibold'>Quantity</p>
                        <p className='text-gray-800 font-medium'>{report.quantity}</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <div className='bg-green-100 p-2 rounded-lg'>
                        <FaMapMarkerAlt className='text-green-600 w-4 h-4' />
                      </div>
                      <div>
                        <p className='text-xs text-gray-500 uppercase font-semibold'>Location</p>
                        <p className='text-gray-800 font-medium'>{report.location}</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <div className='bg-green-100 p-2 rounded-lg'>
                        <FaUser className='text-green-600 w-4 h-4' />
                      </div>
                      <div>
                        <p className='text-xs text-gray-500 uppercase font-semibold'>Reported By</p>
                        <p className='text-gray-800 font-medium'>{report.user?.name || "Unknown"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 shadow-md ${
                      report.verified
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:shadow-lg cursor-pointer"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    onClick={() => report.verified && handleCollect(report._id)}
                    disabled={!report.verified}
                  >
                    {report.verified ? "Collect Waste" : "Awaiting Verification"}
                  </button>

                  {!report.verified && (
                    <p className='text-xs text-center text-gray-500 mt-2'>
                      This report needs admin verification first
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CollectWaste;