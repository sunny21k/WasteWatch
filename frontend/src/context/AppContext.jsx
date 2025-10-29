import axios from "axios";
import { useEffect } from "react";
import { useState, createContext } from "react";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

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
        logout();
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      logout();
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedin(false);
    setUserData(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserData();
    }
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    logout,
  };

  return <AppContent.Provider value={value}>
    {children}
    </AppContent.Provider>;
};
