import React from 'react'
import {FaBinoculars} from "react-icons/fa6"

const AboutUs = () => {
  return (
    <div className='border-t-1 mb-40 border-gray-200 mt-20 p-6 flex flex-col sm:px-16 lg:px-24 lg:flex-row gap-30'>

        {/* Left Side */}
        <div className='lg:w-1/3'>
            <div className='inline-flex font-bold justify-center gap-2 rounded-full border-1  
                px-3 my-4 py-1 items-center'>
                <FaBinoculars className='w-4 h-4'/>
                <p className='text-sm'>WHAT WE DO</p>
            </div>
            <h2 className='text-5xl mt-6'>
                From Waste to <br />  Wins for your <br /> community
            </h2>
            <div className='mt-8 grid grid-cols-3 gap-2'>
                {["Engaging", "Rewarding", "Sustainable", "Collaborative", "Impactful", "Innovative", "Transparent"].map((word, index) => (
                    <div key={index} className='flex justify-center hover:scale-[1.05] transition-all items-center px-8 py-2 rounded-md border border-green-200
                    bg-green-100 text-green-800 font-medium text-sm'>
                        {word}
                    </div>
                ))}
            </div>
        </div>


        {/* Right Side */}
        <div className='space-y-6 lg:w-1/2'>
            <p className='text-secondary-gray text-2xl mb-12'>
                We're helping communities turn waste into opportunity by making
                 reporting and collecting waste fun, rewarding, and impactful.
            </p>
            <p className='text-primary-gray'>
                The mission is simple. Motivate everyone to take part in keeping 
                their neighborhoods clean while earning rewards. We provide an easy
                to use platform where users can report, track, and collect waste efficiently, 
                contributing to a cleaner, healthier environment.
            </p>
            <p className='text-primary-gray'>
                From individuals to local groups, Waste Watch makes it easy to get involved.
                We connect communites, encourage sustainable habits, and turn everyday waste into
                meaningful impact, empowering you to make a difference today and for the future.
            </p>
        </div>
    </div>
  )
}

export default AboutUs