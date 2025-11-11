import React, { useContext, useState } from 'react'
import { RiCoinsLine } from 'react-icons/ri';
import { AppContent } from '../context/AppContext';

const Rewards = () => {
  const [rewards, setRewards] = useState(0)

  const {userData} = useContext(AppContent)

  return (
    <div className='flex flex-col items-center justify-start pt-20 px-6'>

      {/* Rewards Header Section */}
      <div className='text-center mb-10'>
        <h1 className='text-4xl sm:text-5xl font-bold text-green-900 mb-4'>Your Rewards Dashboard</h1>
        <p className='text-lg sm:text-xl text-primary-gray'>See your points, achievements, and how you're making a difference in your community.</p>
      </div>

      {/* Rewards Card */}
      <div className='`flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl p-8 w-72 sm:w-96 
        border-b-3 my-10 border-b-green-800'>
        <div className='flex items-center gap-3 text-green-700 text-3xl sm:text-4xl font-bold'>
          <RiCoinsLine className='w-10 h-10'/>
          <span>{userData?.points ?? 0}</span>
        </div>
        <p className='text-primary-gray mt-2 text-center'>points earned so far! Keep reporting and collecting waste to earn more.</p>
      </div>
    </div>
  )
}

export default Rewards