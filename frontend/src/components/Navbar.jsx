import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FaBinoculars} from "react-icons/fa6"
import { FaTimes, FaBars, FaHome, FaTrashAlt, FaRecycle, FaTrophy } from "react-icons/fa";
import { menuLinks } from '../assets/assets'
import { RiCoinsLine } from "react-icons/ri";

const Navbar = () => {
  
  // Mobile menu functionality 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav>
      <div className='flex justify-between items-center p-4 border-b-4 border-green-700 max-w-7xl mx-auto'>

        {/* Logo */}
        <Link to={"/"} className='flex items-center'>
          <FaBinoculars className='w-8 h-8 text-green-900'/>
          <h1 className='ml-2 text-xl text-secondary-green font-bold sm:text-2xl transition-all'>Waste <span className='text-green-900'>Watch</span></h1>
        </Link>

        {/* Menu Links */}
        <div className='hidden lg:flex space-x-6'>
          {menuLinks.map((link, index) => (
            <Link className='text-secondary-gray hover:text-secondary-green transition-all duration-200' key={index} to={link.path}>
                {link.name}
            </Link>
          ))}
        </div>

          {/* Auth Buttons and rewards */}
        <div className='flex space-x-4'>
          <div className='border rounded-2xl flex items-center min-w-22 max-w-32 bg-gray-100 border-none p-2'>
            <RiCoinsLine className='text-green-500 w-6 h-6 m-1'/>
            0
          </div>

          <Link to={"/login-signin"}>
          <button className='cursor-pointer rounded-lg border px-5 py-2 hover:bg-primary-green
           hover:text-white transition-all duration-200 text-sm sm:text-base'>Log In</button>
          </Link>

           <Link to={"/login-signin"}>
          <button className='cursor-pointer rounded-lg border px-5 py-2 bg-primary-green 
          ext-white hover:bg-green-900 transition-all duration-200 text-sm sm:text-base'>Create Account</button>
          </Link>
        </div>

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
              <Link onClick={() => setIsMenuOpen(false)} key={index} to={link.path} 
              className='text-secondary-gray flex hover:text-secondary-green transition-all'>
                {link.name === "Home" ? <FaHome className='w-6 h-6'/> :
                link.name === "Report Waste" ? <FaTrashAlt className='w-6 h-6'/> :
                link.name === "Collect Waste" ? <FaRecycle className='w-6 h-6'/> :
                link.name === "Leaderboard" ? <FaTrophy className='w-6 h-6'/> : 
                link.name === "Rewards" ? <RiCoinsLine className='w-6 h-6'/> :null}
                  <span className='ml-2'>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}


export default Navbar