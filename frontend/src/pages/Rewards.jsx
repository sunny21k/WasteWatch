import React, { useContext, useState, useEffect } from "react";
import { RiCoinsLine } from "react-icons/ri";
import { FaMapMarkerAlt, FaRecycle, FaWeight, FaCheckCircle, FaClock, FaTruck, FaCircle, FaCamera, FaUpload } from "react-icons/fa";
import { AppContent } from "../context/AppContext";
import axios from "axios";

const Rewards = () => {
  const { backendUrl, userData, getUserData } = useContext(AppContent);
  const [myReports, setMyReports] = useState([]);
  const [myCollections, setMyCollections] = useState([]);
  const [activeTab, setActiveTab] = useState("submitted");
  const [completionImages, setCompletionImages] = useState({}); // Store images by reportId
  const [uploading, setUploading] = useState(null); // Track which report is uploading

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

  // Fetch reports being collected by the user
  useEffect(() => {
    const fetchMyCollections = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${backendUrl}/report/my-collections`, {
          headers: { Authorization: token },
        });

        if (data.success) setMyCollections(data.collections);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchMyCollections();
  }, [backendUrl]);

  // Handle completion photo submission
  const handleCompleteCollection = async (reportId) => {
    const imageFile = completionImages[reportId];
    
    if (!imageFile) {
      alert("Please select a completion photo");
      return;
    }

    try {
      setUploading(reportId);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("reportId", reportId);
      formData.append("image", imageFile);

      const { data } = await axios.post(
        `${backendUrl}/report/complete`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (data.success) {
        alert("Collection completed! Awaiting admin verification.");
        // Clear the image for this report
        setCompletionImages(prev => {
          const updated = { ...prev };
          delete updated[reportId];
          return updated;
        });
        
        // Refresh collections
        const collectionsData = await axios.get(`${backendUrl}/report/my-collections`, {
          headers: { Authorization: token },
        });
        if (collectionsData.data.success) {
          setMyCollections(collectionsData.data.collections);
        }
        
        // Refresh user data to update points
        getUserData();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
      alert(error.response?.data?.message || "Failed to submit completion");
    } finally {
      setUploading(null);
    }
  };

  const statusColors = {
    open: { bg: "bg-green-100", text: "text-green-700", dot: "text-green-500" },
    pending: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "text-yellow-500" },
    collected: { bg: "bg-blue-100", text: "text-blue-700", dot: "text-blue-500" }
  };

  const displayReports = activeTab === "submitted" ? myReports : myCollections;

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Total Points Card */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 shadow-xl rounded-2xl p-8 text-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold opacity-90">Total Points</h3>
              <RiCoinsLine className="w-8 h-8 opacity-80" />
            </div>
            <div className="text-5xl font-bold mb-2">{userData?.points ?? 0}</div>
            <p className="text-sm opacity-80">Keep reporting!</p>
          </div>

          {/* Total Reports Card */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border-l-4 border-emerald-500 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Submitted</h3>
              <FaRecycle className="w-7 h-7 text-emerald-600" />
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-2">{myReports.length}</div>
            <p className="text-sm text-gray-600">Reports submitted</p>
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
            <p className="text-sm text-gray-600">Confirmed reports</p>
          </div>

          {/* Collecting Card */}
          <div className="bg-white shadow-xl rounded-2xl p-8 border-l-4 border-blue-500 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Collecting</h3>
              <FaTruck className="w-7 h-7 text-blue-600" />
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {myCollections.length}
            </div>
            <p className="text-sm text-gray-600">Active collections</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("submitted")}
            className={`px-6 py-3 rounded-xl cursor-pointer font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTab === "submitted"
                ? "bg-green-900 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-green-100"
            }`}
          >
            <FaRecycle />
            Your Submitted Reports
          </button>
          <button
            onClick={() => setActiveTab("collecting")}
            className={`px-6 py-3 rounded-xl cursor-pointer font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTab === "collecting"
                ? "bg-green-900 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-green-100"
            }`}
          >
            <FaTruck />
            Currently Collecting
          </button>
        </div>

        {/* If none */}
        {displayReports.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            {activeTab === "submitted" ? (
              <>
                <FaRecycle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Reports Yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Start reporting waste to earn points and make a difference!
                </p>
              </>
            ) : (
              <>
                <FaTruck className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Active Collections
                </h3>
                <p className="text-gray-500 mb-6">
                  Start collecting waste reports to help clean your community!
                </p>
              </>
            )}
          </div>
        )}

        {/* Reports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReports.map((report) => {
            const statusColor = statusColors[report.status] || statusColors.open;
            const canSubmitCompletion = activeTab === "collecting" && 
              report.status === "pending" && 
              !report.completed;
            const awaitingVerification = report.completed && !report.completionVerified;
            const isVerified = report.completionVerified;
            
            return (
              <div
                key={report._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Status Banner */}
                <div className={`h-2 ${report.verified ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}></div>
                
                {/* Show completion photo if uploaded */}
                {report.completionPhoto && (
                  <div className="relative">
                    <img
                      className='w-full h-48 object-cover'
                      src={report.completionPhoto}
                      alt="Cleaned area"
                    />
                    <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      After Cleanup
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  {/* Status Badges */}
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
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

                    {/* Collection Status Badge */}
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}>
                      <FaCircle className={`w-2 h-2 ${statusColor.dot}`} />
                      <span className='capitalize'>{report.status}</span>
                    </div>
                    
                    {/* Points Indicator */}
                    {report.verified && activeTab === "submitted" && (
                      <div className="flex items-center gap-1 text-green-600 font-bold">
                        <RiCoinsLine className="w-5 h-5" />
                        <span>+10</span>
                      </div>
                    )}

                    {/* Collection verified points */}
                    {isVerified && activeTab === "collecting" && (
                      <div className="flex items-center gap-1 text-blue-600 font-bold">
                        <RiCoinsLine className="w-5 h-5" />
                        <span>+50</span>
                      </div>
                    )}
                  </div>

                  {/* Awaiting Collection Verification Badge */}
                  {awaitingVerification && (
                    <div className="mb-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-amber-700">
                        <FaClock className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                          Awaiting Admin Verification
                        </span>
                      </div>
                      <p className="text-xs text-amber-600 mt-1">
                        Your completion photo is under review
                      </p>
                    </div>
                  )}

                  {/* Collection Verified Badge */}
                  {isVerified && (
                    <div className="mb-3 bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-green-700">
                        <FaCheckCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                          Collection Verified! +50 Points
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Show reporter name if this is a collection */}
                  {activeTab === "collecting" && (
                    <div className="mb-3 text-sm text-gray-600">
                      <span className="font-semibold">Reported by:</span> {report.user?.name || "Unknown"}
                    </div>
                  )}

                  {/* Report Details */}
                  <div className="space-y-4 mb-5">
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

                  {/* Collection Completion Upload */}
                  {canSubmitCompletion && (
                    <div className="border-t border-gray-200 pt-4">
                      <label className="block mb-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FaCamera className="text-green-600" />
                          Upload cleaned area photo
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setCompletionImages(prev => ({
                              ...prev,
                              [report._id]: e.target.files[0]
                            }));
                          }}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
                        />
                      </label>
                      
                      <button
                        onClick={() => handleCompleteCollection(report._id)}
                        disabled={!completionImages[report._id] || uploading === report._id}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${
                          completionImages[report._id] && uploading !== report._id
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 cursor-pointer"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {uploading === report._id ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <FaUpload />
                            Submit Completion
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Footer */}
                  {!report.verified && activeTab === "submitted" && (
                    <div className="mt-5 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 text-center">
                        Awaiting admin verification
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Rewards;