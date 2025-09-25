import React, { useState } from 'react'
import { RiCoinsLine } from 'react-icons/ri';

const Rewards = () => {
  const [rewards, setRewards] = useState(100)

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-6'>
      <h1 className='text-4xl sm:text-5xl font-bold text-green-900 mb-6 text-center'>Your Rewards</h1>

      <div className='flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl p-8 w-72 sm:w-96 
        border-b-3 border-b-green-800'>
        <div className='flex items-center gap-3 text-green-700 text-3xl sm:text-4xl font-bold'>
          <RiCoinsLine className='w-10 h-10'/>
          <span>{rewards}</span>
        </div>
        <p className='text-primary-gray mt-2 text-center'>points earned so far! Keep reporting and collecting waste to earn more.</p>
      </div>
    </div>
  )
}

export default Rewards