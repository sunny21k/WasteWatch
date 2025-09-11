import React from 'react'
import { RiCoinsLine } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { features } from '../assets/assets';
import FeatureCard from './FeatureCard';

const Header = () => {
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className='text-center mt-25 mb-8'>
          <div className='inline-flex justify-center gap-2 rounded-full border-1 text-green-800 
          px-5 mb-6 py-1.5 items-center border-secondary-green'>
            <p>Clean Up and Get Rewarded</p>
            <RiCoinsLine className='w-6 h-6'/>
          </div>

          {/* Main Texts */}
          <h1 className='text-6xl font-bold text-shadow-secondary-gray text-center'>
            Report Your <span className='text-primary-green'>Waste,</span> Earn <br/>
            <span className='text-secondary-green'>Rewards,</span> Make a <span className='text-secondary-green'>Difference.</span>
          </h1>
          <p className='text-center mt-4 text-2xl'>Join the Waste Watch Community and make collecting<br/> waste fun, rewarding, and impactful 
            for your neighborhood.
          </p>

          {/* Buttons */}
          <div className='mt-6 flex justify-center gap-2 flex-wrap'>
            <button className='cursor-pointer rounded-lg border px-5 py-2 hover:bg-primary-green 
            hover:text-white transition-all duration-200 text-sm sm:text-base'>See How It Works</button>
            <button className=' flex items-center gap-3 justify-between cursor-pointer rounded-lg border px-5 py-2 bg-primary-green text-white 
            hover:bg-green-900 transition-all duration-200 text-sm sm:text-base'>Get Started <FaArrowRightLong /></button>
          </div>

          {/* Feature Card */}
          <div className='mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
    </div>
  )
}

export default Header