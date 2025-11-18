import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { FaBinoculars, FaCheck } from "react-icons/fa6";
import axios from "axios"

import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";

export const LoginSignin = () => {
  
  const navigate = useNavigate();

  const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContent)

  axios.defaults.withCredentials = true
  
  const [action,setAction] = useState("Login"); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()

      if (action === "Sign Up") {
        const {data} = await axios.post(`${backendUrl}/user/register`, {name, email, password})

        if (data.success) {
        localStorage.setItem("token", data.token);
        setIsLoggedin(true)
        getUserData()
        navigate('/')
        } else {
          alert(data.message)
        }
      } else {
        const {data} = await axios.post(`${backendUrl}/user/login`, {email, password})

        if (data.success) {
        localStorage.setItem("token", data.token);

        // Decode the JWT to get user id and role
        const decoded = JSON.parse(atob(data.token.split(".")[1]));
        const userId = decoded.id;
        const userRole = decoded.role;

        // Save user info in localStorage for role-based routing
        localStorage.setItem("user", JSON.stringify({ id: userId, role: userRole }));

        setIsLoggedin(true)
        getUserData()

        if (userRole === "admin") {
          navigate('/admin')
        } else {
          navigate('/')
        }
        } else {
          alert(data.message)
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-white shadow-lg rounded-r-2xl px-10">
        <div className="flex flex-col items-center gap-2 w-full mb-8">
          <h1 className="text-5xl font-extrabold text-green-900">{action}</h1>
          <p className="text-gray-500 mt-2 text-sm">
            {action === "Login"
              ? "Welcome back! Please login to continue."
              : "Join Waste Watch today and make a difference"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5 w-full max-w-md">
          {action === "Sign Up" && (
            <div className="flex items-center bg-gray-100 rounded-md px-4 py-3">
              <img src={user_icon} alt="User icon" className="w-6 h-6 mr-3" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                className="flex-1 bg-transparent outline-none text-gray-600 text-base"
                required
              />
            </div>
          )}

          <div className="flex items-center bg-gray-100 rounded-md px-4 py-3">
            <img src={email_icon} alt="Email icon" className="w-6 h-6 mr-3" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              className="flex-1 bg-transparent outline-none text-gray-600 text-base"
              required
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded-md px-4 py-3">
            <img src={password_icon} alt="Password icon" className="w-6 h-6 mr-3" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="flex-1 bg-transparent outline-none text-gray-600 text-base"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="my-6 w-full bg-green-900 text-white rounded-lg py-2 cursor-pointer font-semibold hover:bg-green-800 transition-all"
          >
            {action === "Login" ? "Log In" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Login/Sign Up */}
        <div className="flex gap-6 mt-4">
          <button
            onClick={() => setAction("Sign Up")}
            className={`cursor-pointer rounded-lg px-6 py-2 text-sm sm:text-base font-semibold transition-all duration-200 ${
              action === "Sign Up"
                ? "bg-green-900 text-white"
                : "border bg-gray-100 text-gray-700 hover:bg-primary-green hover:text-white"
            }`}
          >
            Create Account
          </button>

          <button
            onClick={() => setAction("Login")}
            className={`cursor-pointer rounded-lg px-6 py-2 text-sm sm:text-base font-semibold transition-all duration-200 ${
              action === "Login"
                ? "bg-green-900 text-white"
                : "border bg-gray-100 text-gray-700 hover:bg-primary-green hover:text-white"
            }`}
          >
            Log In
          </button>
        </div>
      </div>

      {/* Right Side - Info Section */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-green-900 text-white p-12 rounded-l-2xl">
        <div className="flex items-center gap-3 mb-4">
          <FaBinoculars className="text-4xl" />
          <h2 className="text-4xl font-bold">Welcome to Waste Watch</h2>
        </div>

        <p className="text-lg max-w-md mb-8 text-center leading-relaxed">
          Help keep our communities clean. Report waste, track your contributions, and earn rewards while making a real-world impact.
        </p>

        <ul className="text-left text-sm space-y-3 mb-8">
          <li className="flex items-center gap-2">
            <FaCheck className="text-white" /> Earn rewards for reporting and collecting waste
          </li>
          <li className="flex items-center gap-2">
            <FaCheck className="text-white" /> Track your cleanup progress in real time
          </li>
          <li className="flex items-center gap-2">
            <FaCheck className="text-white" /> Compete on the leaderboard with your community
          </li>
        </ul>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-white cursor-pointer text-green-900 font-semibold rounded-lg hover:bg-gray-200 transition-all text-sm sm:text-base"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};