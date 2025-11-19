import React, { useState, useEffect, useContext } from "react";
import { FaTrash } from "react-icons/fa6";
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
            Authorization: `Bearer ${token}` 
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
      const { data } = await axios.put(`${backendUrl}/report/verify`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        // Update local state
        console.log("Verfied")
        setReports((prev) =>
          prev.map((r) =>
            r._id === id ? { ...r, verified: !r.verified } : r
          )
        );
      } else alert(data.message);
      console.log("DOesn't work")
    } catch (error) {
      console.log(error.message);
      console.log("Dn't wrk")
    }
  };

  return (
    <div className="min-h-screen p-8 bg-green-50">
      <h1 className="text-4xl font-bold text-green-900 mb-6">Admin Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-md bg-white">
          <thead>
            <tr className="bg-green-100 text-center">
              <th className="p-3 border-b">User</th>
              <th className="p-3 border-b">Location</th>
              <th className="p-3 border-b">Waste Type</th>
              <th className="p-3 border-b">Quantity</th>
              <th className="p-3 border-b">Verified</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id} className="hover:bg-green-50">
                <td className="p-3 border-b">{report.user?.name}</td>
                <td className="p-3 border-b">{report.location}</td>
                <td className="p-3 border-b">{report.wasteType}</td>
                <td className="p-3 border-b">{report.quantity}</td>
                <td className="p-3 border-b">
                  <span
                    className={`font-semibold ${
                      report.verified ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {report.verified ? "Verified" : "Unverified"}
                  </span>
                </td>
                <td className="p-3 border-b flex gap-2 justify-center">
                  <button
                    onClick={() => toggleVerify(report._id)}
                    className="px-3 py-1 rounded-md bg-green-900 text-white hover:bg-green-800 transition-all"
                  >
                    {report.verified ? "Unverify" : "Verify"}
                  </button>
                  <button className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-500 transition-all">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
