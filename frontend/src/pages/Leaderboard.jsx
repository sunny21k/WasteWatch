import React from 'react'
import { leaderBoardData } from '../assets/assets'
import { FaCrown } from "react-icons/fa";
import { HiMiniTrophy } from "react-icons/hi2";
import { RiCoinsLine } from "react-icons/ri";

const Leaderboard = () => {

  // Sorts the data into numerical order
  const sortedData = leaderBoardData.slice().sort((a, b) => b.points - a.points)

  // leaderBoardData.map((user) => {
  //   console.log(user.rank)
  //   console.log(user.name)
  //   console.log(user.id)
  // })

  return (
    <div className='mx-8 sm:mx-16 xl:ms-24 mt-10'>
      <h1 className='rounded-t-2xl p-6 text-4xl text-white bg-gradient-to-r from-green-400 to-green-600 
      font-bold flex items-center justify-center gap-3 text-center'>
        <HiMiniTrophy className='w-8 h-8' />
        Leaderboard
      </h1>

      <div className='bg-green-100 shadow-md p-4 flex flex-col gap-4'>
        <div className='flex justify-between items-center text-center py-2 rounded px-4'>
          <div className='w-1/6'>RANK</div>
          <div className='w-1/6'>NAME</div>
          <div className='w-1/6'>POINTS</div>
        </div>

          {/* Maps the sorted data and puts it into the leaderboard */}
          {sortedData.map((user, index) => {

            const crownColor = index === 0 ? "text-yellow-400" : index === 1 ? "text-gray-400" : index === 2 ? "text-orange-900" : "";

            return (
              <div
              key={user.id}
              className='flex items-center justify-between px-4 py-3 bg-green-100 rounded 
              shadow hover:bg-green-200 transition'
              >
                {/* Checks to see what is the index of the first 3 and uses the correct trophy color */}
                <div className='w-1/6 text-center flex items-center justify-center gap-3'>
                {index < 3 && <FaCrown className={`w-5 h-5 ${crownColor}`}/>}
                {index + 1}</div>

                <div className='w-1/6 text-center'>{user.name}</div>

                <div className='w-1/6 text-center flex items-center justify-center gap-2'>
                  <RiCoinsLine className='w-5 h-5 text-green-900' />
                  <span>{user.points}</span>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Leaderboard