{/* Used AI to fix user data bug */}

import axios from "axios";
import { useEffect } from "react";
import { useState, createContext } from "react";
export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [reports, setReports] = useState([]);

  // Get user data from backend
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axios.get(`${backendUrl}/data`, {
        headers: {
          Authorization: token,
        },
      });

      if (data.success) {
        setUserData(data.user);
        setIsLoggedin(true);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      logout();
    }
  };

  // User will stay logged in when page refreshed
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      getUserData()
    }
  }, [])

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedin(false);
    setUserData(null);
  };

  // Fetches all the reports
  const fetchReports = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/report/all-reports`);

      if (data.success) {
        setReports(data.reports)
      } 
    } catch (error) {
      console.log(error.response?.data.message || error.message)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    logout,
    fetchReports
  };

  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};
