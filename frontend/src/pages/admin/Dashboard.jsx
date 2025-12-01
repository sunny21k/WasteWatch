import React, { useState, useEffect, useContext } from "react";
import { FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { AppContent } from "../../context/AppContext";
import axios from "axios";

const Dashboard = () => {
  const { backendUrl } = useContext(AppContent);
  const [reports, setReports] = useState([]);
  const [activeTab, setActiveTab] = useState("reports"); // "reports" or "completions"

  // Fetch reports from backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${backendUrl}/admin/all-reports`, {
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

  // Toggle report verification
  const toggleVerify = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(`${backendUrl}/admin/verify`,
        { id },
        { headers: { Authorization: token } }
      );
      if (data.success) {
        console.log("Verified")
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

  // Toggle completion verification
  const toggleCompletionVerify = async (reportId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${backendUrl}/admin/verify-completed`,
        { reportId },
        { headers: { Authorization: token } }
      );
      
      if (data.success) {
        console.log("Completion verified");
        // Update the report in state
        setReports((prev) =>
          prev.map((r) =>
            r._id === reportId ? { ...r, completionVerified: !r.completionVerified } : r
          )
        );
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
      alert("Failed to verify completion");
    }
  };

  // Delete report
  const deleteReport = async (id) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${backendUrl}/admin/delete`,
        { id },
        { headers: { Authorization: token } }
      );
      
      if (data.success) {
        setReports((prev) => prev.filter((r) => r._id !== id));
        alert("Report deleted successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
      alert("Failed to delete report");
    }
  };

  // Filter reports for each tab
  const allReports = reports;
  const completedReports = reports.filter(r => r.completed);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-green-100">
      <h1 className="text-4xl font-bold text-green-900 mb-6">Admin Dashboard</h1>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("reports")}
          className={`px-6 py-3 rounded-xl cursor-pointer font-semibold transition-all duration-200 ${
            activeTab === "reports"
              ? "bg-green-900 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-green-100"
          }`}
        >
          All Reports ({allReports.length})
        </button>
        <button
          onClick={() => setActiveTab("completions")}
          className={`px-6 py-3 rounded-xl cursor-pointer font-semibold transition-all duration-200 ${
            activeTab === "completions"
              ? "bg-green-900 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-green-100"
          }`}
        >
          Completed Collections ({completedReports.length})
        </button>
      </div>

      {/* All Reports Tab */}
      {activeTab === "reports" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReports.map((report) => (
            <div
              key={report._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Status Banner */}
              <div className={`h-2 ${report.verified ? 'bg-green-500' : 'bg-red-500'}`}></div>
              
              {/* Report Image */}
              {report.image && (
                <img
                  src={report.image}
                  alt={report.wasteType}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-6">
                {/* Header with Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
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
                <div className="space-y-2 mb-5">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Location</p>
                    <p className="text-gray-800 font-medium">{report.location}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Waste Type</p>
                    <p className="text-gray-800 font-medium">{report.wasteType}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Quantity</p>
                    <p className="text-gray-800 font-medium">{report.quantity}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase">Status</p>
                    <p className="text-gray-800 font-medium capitalize">{report.status}</p>
                  </div>

                  {report.collector && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Collector</p>
                      <p className="text-gray-800 font-medium">{report.collector.name || 'Unknown'}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => toggleVerify(report._id)}
                    className={`flex-1 cursor-pointer px-4 py-2 rounded-md font-medium transition-all ${
                      report.verified
                        ? 'bg-slate-600 hover:bg-slate-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {report.verified ? 'Unverify' : 'Verify'}
                  </button>
                  <button 
                    onClick={() => deleteReport(report._id)}
                    className="px-4 py-2 cursor-pointer rounded-md bg-red-600 text-white hover:bg-red-700 transition-all"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Collections Tab */}
      {activeTab === "completions" && (
        <div>
          {completedReports.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Completed Collections Yet
              </h3>
              <p className="text-gray-500">
                Completed collections awaiting verification will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedReports.map((report) => (
                <div
                  key={report._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Completion Status Banner */}
                  <div className={`h-2 ${report.completionVerified ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                  
                  {/* Before and After Images */}
                  <div className="grid grid-cols-2 gap-1">
                    {/* Before Image */}
                    <div className="relative">
                      {report.image && (
                        <>
                          <img
                            src={report.image}
                            alt="Before"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute bottom-1 left-1 bg-red-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                            Before
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* After Image */}
                    <div className="relative">
                      {report.completionPhoto && (
                        <>
                          <img
                            src={report.completionPhoto}
                            alt="After"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute bottom-1 right-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                            After
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800">
                          Collector: {report.collector?.name || 'Unknown'}
                        </span>
                        {report.completionVerified ? (
                          <div className="flex items-center gap-1 text-blue-600">
                            <FaCheckCircle />
                            <span className="text-sm font-semibold">Verified</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-amber-600">
                            <FaTimesCircle />
                            <span className="text-sm font-semibold">Pending</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        Reported by: {report.user?.name || 'Unknown'}
                      </p>
                    </div>

                    {/* Collection Details */}
                    <div className="space-y-2 mb-5">
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Location</p>
                        <p className="text-gray-800 font-medium">{report.location}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Waste Type</p>
                        <p className="text-gray-800 font-medium">{report.wasteType}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Quantity</p>
                        <p className="text-gray-800 font-medium">{report.quantity}</p>
                      </div>

                      {report.completionVerified && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mt-3">
                          <p className="text-sm text-blue-700 font-semibold">
                            ✓ 50 Points Awarded
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => toggleCompletionVerify(report._id)}
                        className={`flex-1 px-4 cursor-pointer py-2 rounded-md font-medium transition-all ${
                          report.completionVerified
                            ? 'bg-slate-600 hover:bg-slate-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {report.completionVerified ? 'Unverify Collection' : 'Verify Collection'}
                      </button>
                      <button 
                        onClick={() => deleteReport(report._id)}
                        className="px-4 cursor-pointer py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-all"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;