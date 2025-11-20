import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBinoculars } from "react-icons/fa6"
import { FaTimes, FaBars, FaHome, FaTrashAlt, FaRecycle, FaTrophy } from "react-icons/fa";
import { menuLinks } from '../assets/assets'
import { RiCoinsLine } from "react-icons/ri";
import { AppContent } from '../context/AppContext';

const Navbar = () => {
  const { userData, isLoggedin, logout } = useContext(AppContent)
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav>
      <div className='flex justify-between text-sm items-center p-4 border-b-4 border-green-700 max-w-7xl mx-auto'>

        {/* Logo */}
        <Link to={"/"} className='flex items-center hover:scale-[1.1] transition-all'>
          <FaBinoculars className='w-8 h-8 text-green-900'/>
          <h1 className='ml-2 text-xl text-secondary-green font-bold sm:text-2xl transition-all'>
            Waste <span className='text-green-900'>Watch</span>
          </h1>
        </Link>

        {/* Desktop Menu Links */}
        <div className='hidden lg:flex space-x-6'>
          {menuLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.path} 
              className='text-secondary-gray hover:border-b-2 hover:text-secondary-green transition-all duration-200'
            >
              {link.name}
            </Link>
          ))}

          {/* Admin Dashboard Button */}
          {userData?.role === "admin" && (
            <Link 
              to="/admin" 
              className='text-secondary-gray hover:border-b-2 hover:text-secondary-green transition-all duration-200 font-semibold'
            >
              Admin Dashboard
            </Link>
          )}
        </div>

        {/* Auth Buttons & Points */}
        <div className='flex space-x-4'>
          <div className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl px-5 py-2.5 shadow-md hover:shadow-lg transition-all'>
            <RiCoinsLine className='text-green-600 w-6 h-6'/>
            <span className='font-bold text-green-800 text-lg'>{userData?.points ?? 0}</span>
          </div>
          
          {isLoggedin ? (
            <>
              <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-700'>
                Welcome back, {userData?.name || "Collector"}!
              </div>
              <button 
                onClick={logout}
                className='cursor-pointer rounded-lg border px-5 py-2 hover:bg-black hover:text-white transition-all duration-200 text-sm sm:text-base'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/login-signin"}>
                <button className='cursor-pointer rounded-lg border px-5 py-2 hover:bg-primary-green hover:text-white transition-all duration-200 text-sm sm:text-base'>
                  Log In
                </button>
              </Link>
              <Link to={"/login-signin"}>
                <button className='cursor-pointer text-white rounded-lg px-5 py-2 bg-primary-green hover:bg-green-900 transition-all duration-200 text-sm sm:text-base'>
                  Create Account
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className='lg:hidden flex items-center'>
          <button onClick={toggleMenu} className='text-2xl text-secondary-green cursor-pointer ml-4'>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className='lg:hidden bg-green-50'>
          <div className='flex flex-col items-center p-5 space-y-6'>
            {menuLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className='text-secondary-gray flex hover:text-secondary-green transition-all'
              >
                {link.name === "Home" ? <FaHome className='w-6 h-6'/> :
                 link.name === "Report Waste" ? <FaTrashAlt className='w-6 h-6'/> :
                 link.name === "Collect Waste" ? <FaRecycle className='w-6 h-6'/> :
                 link.name === "Leaderboard" ? <FaTrophy className='w-6 h-6'/> :
                 link.name === "Rewards" ? <RiCoinsLine className='w-6 h-6'/> : null}
                <span className='ml-2'>{link.name}</span>
              </Link>
            ))}

            {/* Admin Dashboard for mobile */}
            {userData?.role === "admin" && (
              <Link 
                to="/admin" 
                onClick={() => setIsMenuOpen(false)}
                className='text-secondary-gray hover:text-secondary-green transition-all font-semibold'
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
