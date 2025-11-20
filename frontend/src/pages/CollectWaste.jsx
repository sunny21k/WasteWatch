import React, { useState, useContext } from 'react';
import { AppContent } from '../context/AppContext';

const CollectWaste = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const { reports = [] } = useContext(AppContent);

  const statusColors = {
    open: "bg-green-500 text-white",
    pending: "bg-yellow-500 text-white",
    collected: "bg-red-500 text-white"
  };

  // Filter reports based on selected status
  const filteredReports = reports.filter(report =>
    filterStatus === "all" || report.status === filterStatus
  );

  return (
    <div className='min-h-screen bg-green-50 px-6 py-12'>
      {/* Header */}
      <div className='max-w-4xl mx-auto text-center mb-12'>
        <h1 className='text-4xl sm:text-5xl font-extrabold text-green-900 mb-4'>Reported Waste</h1>
        <p className='text-gray-600 text-lg sm:text-xl'>
          Browse reported waste in your community. Collect open reports and make a difference!
        </p>
      </div>

      {/* Filter Buttons */}
      <div className='flex justify-center flex-wrap gap-3 mb-10'>
        {["all", "open", "pending", "collected"].map(status => (
          <button
            key={status}
            className={`px-5 cursor-pointer py-2 rounded-full font-semibold transition-all duration-200 shadow-md hover:scale-105 ${
              filterStatus === status
                ? "bg-green-900 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-green-100"
            }`}
            onClick={() => setFilterStatus(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Waste Reports Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        {filteredReports.length === 0 ? (
          <p className='col-span-full text-center text-gray-500 text-lg'>
            No reports found.
          </p>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report._id}
              className='bg-white rounded-3xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105'
            >
              <img
                className='w-full h-48 object-cover'
                src={report.image}
                alt={report.wasteType}
              />
              <div className='p-6'>
                <div className='flex justify-between items-center mb-3'>
                  <h2 className='text-xl font-bold text-green-900'>{report.wasteType}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      statusColors[report.status] || "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {report.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Quantity:</span> {report.quantity} kg
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Location:</span> {report.location}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">Reported by:</span> {report.user?.name || "Unknown"}
                </p>
                <button
                  className={`w-full py-2 rounded-lg font-semibold transition-all duration-200 shadow-md ${
                    report.status === "open"
                      ? "bg-green-900 text-white hover:bg-green-700 cursor-pointer"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={report.status !== "open"}
                >
                  Collect Waste
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CollectWaste;
