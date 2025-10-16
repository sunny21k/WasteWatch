import axios from "axios";
import { useState } from "react";
import { createContext } from "react";

export const AppContent = createContext()

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)

    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/userData`, {
            withCredentials: true
        });
            if (data.success) {
            setUserData(data.userData);
        } else {
            console.log(data.message);
        }
        } catch (error) {
            console.log(error.response?.data?.message || error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setIsLoggedin(false)
        setUserData(null)
    }

    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData,
        logout,
    }

    return (
        <AppContent.Provider value={value}> 
            {props.children}
        </AppContent.Provider>
    )
}