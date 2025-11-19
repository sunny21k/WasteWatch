import React, { useState, useEffect, useContext } from "react";
import { FaTrash, FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaUser, FaRecycle, FaWeight } from "react-icons/fa";
import { AppContent } from "../../context/AppContext";
import axios from "axios";

const Dashboard = () => {
  const { backendUrl } = useContext(AppContent);
  const [reports, setReports] = useState([]);

  // Fetch reports from backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${backendUrl}/report/all-reports`, {
          headers: { 
            Authorization: token
          },
        });
        if (data.success) setReports(data.reports);
        else alert(data.message);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchReports();
  }, [backendUrl]);

  // Toggle verification
  const toggleVerify = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(`${backendUrl}/admin/verify`,
        { id },
        { headers: { 
          Authorization: token 
        }}
      );
      if (data.success) {
        setReports((prev) =>
          prev.map((r) =>
            r._id === id ? { ...r, verified: !r.verified } : r
          )
        );
      } else alert(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete report
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this report?")) return;

  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `${backendUrl}/admin/delete`,
      { id },
      { headers: { Authorization: token } }
    );

    if (data.success) {
      // Remove the report from local state
      setReports((prev) => prev.filter((r) => r._id !== id));
      console.log("Report deleted");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};


  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">Admin Dashboard</h1>
          <p className="text-green-700">Manage and verify waste reports</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
            <h3 className="text-gray-600 text-sm font-medium">Total Reports</h3>
            <p className="text-3xl font-bold text-green-900">{reports.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-600">
            <h3 className="text-gray-600 text-sm font-medium">Verified</h3>
            <p className="text-3xl font-bold text-emerald-700">
              {reports.filter(r => r.verified).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-600">
            <h3 className="text-gray-600 text-sm font-medium">Pending</h3>
            <p className="text-3xl font-bold text-amber-700">
              {reports.filter(r => !r.verified).length}
            </p>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div 
              key={report._id} 
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
            >
              {/* Status Banner */}
              <div className={`h-2 ${report.verified ? 'bg-green-400' : 'bg-red-400'}`}></div>
              
              <div className="p-6">
                {/* Header with Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-green-700" />
                    <span className="font-semibold text-gray-800">
                      {report.user?.name || 'Unknown User'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {report.verified ? (
                      <FaCheckCircle className="text-green-600" />
                    ) : (
                      <FaTimesCircle className="text-red-600" />
                    )}
                    <span className={`text-sm font-semibold ${
                      report.verified ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {report.verified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                </div>

                {/* Report Details */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Location</p>
                      <p className="text-gray-800 font-medium">{report.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FaRecycle className="text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Waste Type</p>
                      <p className="text-gray-800 font-medium">{report.wasteType}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FaWeight className="text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Quantity</p>
                      <p className="text-gray-800 font-medium">{report.quantity}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => toggleVerify(report._id)}
                    className={`flex-1 cursor-pointer px-4 py-2 rounded-md font-medium transition-all ${
                      report.verified
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {report.verified ? 'Unverify' : 'Verify'}
                  </button>
                  <button 
                    onClick={() => handleDelete(report._id)}
                    className="px-4 py-2 cursor-pointer rounded-md bg-red-600 text-white hover:bg-red-700 transition-all"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {reports.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaRecycle className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reports Yet</h3>
            <p className="text-gray-500">Waste reports will appear here once submitted by users.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;