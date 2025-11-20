import React, { useContext, useState } from 'react'
import { FaCrown, FaMedal } from "react-icons/fa";
import { HiMiniTrophy } from "react-icons/hi2";
import { RiCoinsLine } from "react-icons/ri";
import { AppContent } from '../context/AppContext';
import axios from 'axios'
import { useEffect } from 'react';

const Leaderboard = () => {

  const {userData, backendUrl} = useContext(AppContent)
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch leaderboard data from backend
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const {data} = await axios.get(`${backendUrl}/user/leaderboard`);

        if (data.success) {
          const sorted = data.users.sort((a, b) => b.points - a.points);
          setLeaderboard(sorted)
        } else {
          console.error("Failed to fetch leaderboard:", data.message)
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard();
  }, [backendUrl]);

  if (loading) {
    return (
      <div className='min-h-screen bg-green-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4'></div>
          <p className='text-green-800 text-lg font-semibold'>Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-5xl mx-auto'>
        
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 
            text-white px-8 py-4 rounded-2xl shadow-lg mb-4'>
            <HiMiniTrophy className='w-10 h-10' />
            <h1 className='text-4xl font-bold'>Leaderboard</h1>
          </div>
          <p className='text-gray-700 text-lg mt-4'>Top environmental champions making a difference</p>
        </div>

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <div className='flex items-end justify-center gap-4 mb-12 px-4'>
            {/* 2nd Place */}
            <div className='flex flex-col items-center flex-1 max-w-xs'>
              <div className='bg-gradient-to-br from-gray-300 to-gray-400 rounded-full w-20 h-20 flex items-center justify-center mb-3 shadow-lg'>
                <FaMedal className='w-10 h-10 text-white' />
              </div>
              <div className='bg-white rounded-2xl shadow-xl p-6 w-full text-center transform hover:scale-105 transition-transform'>
                <div className='text-6xl font-bold text-gray-400 mb-2'>2</div>
                <h3 className='text-xl font-bold text-gray-800 mb-2 truncate'>{leaderboard[1].name}</h3>
                <div className='flex items-center justify-center gap-2 text-green-700 font-semibold text-lg'>
                  <RiCoinsLine className='w-6 h-6' />
                  <span>{leaderboard[1].points}</span>
                </div>
              </div>
              <div className='bg-gradient-to-br from-gray-300 to-gray-500 h-32 w-full rounded-t-2xl mt-4 shadow-lg'></div>
            </div>

            {/* 1st Place */}
            <div className='flex flex-col items-center flex-1 max-w-xs'>
              <div className='bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full w-24 h-24 flex items-center justify-center mb-3 shadow-2xl animate-pulse'>
                <FaCrown className='w-12 h-12 text-white' />
              </div>
              <div className='bg-white rounded-2xl shadow-2xl p-8 w-full text-center border-4 border-yellow-400 transform hover:scale-105 transition-transform'>
                <div className='text-7xl font-bold text-yellow-500 mb-2'>1</div>
                <h3 className='text-2xl font-bold text-gray-800 mb-3 truncate'>{leaderboard[0].name}</h3>
                <div className='flex items-center justify-center gap-2 text-green-700 font-bold text-xl'>
                  <RiCoinsLine className='w-7 h-7' />
                  <span>{leaderboard[0].points}</span>
                </div>
              </div>
              <div className='bg-gradient-to-br from-yellow-400 to-yellow-600 h-40 w-full rounded-t-2xl mt-4 shadow-xl'></div>
            </div>

            {/* 3rd Place */}
            <div className='flex flex-col items-center flex-1 max-w-xs'>
              <div className='bg-gradient-to-br from-orange-600 to-orange-700 rounded-full w-20 h-20 flex items-center justify-center mb-3 shadow-lg'>
                <FaMedal className='w-10 h-10 text-white' />
              </div>
              <div className='bg-white rounded-2xl shadow-xl p-6 w-full text-center transform hover:scale-105 transition-transform'>
                <div className='text-6xl font-bold text-orange-600 mb-2'>3</div>
                <h3 className='text-xl font-bold text-gray-800 mb-2 truncate'>{leaderboard[2].name}</h3>
                <div className='flex items-center justify-center gap-2 text-green-700 font-semibold text-lg'>
                  <RiCoinsLine className='w-6 h-6' />
                  <span>{leaderboard[2].points}</span>
                </div>
              </div>
              <div className='bg-gradient-to-br from-orange-600 to-orange-800 h-24 w-full rounded-t-2xl mt-4 shadow-lg'></div>
            </div>
          </div>
        )}

        {/* Rest of Leaderboard */}
        {leaderboard.length > 3 && (
          <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
            {/* Table Header */}
            <div className='bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6'>
              <div className='flex justify-between items-center font-bold text-sm uppercase tracking-wider'>
                <div className='w-20 text-center'>Rank</div>
                <div className='flex-1 text-left'>Name</div>
                <div className='w-32 text-right'>Points</div>
              </div>
            </div>

            {/* Table Body */}
            <div className='divide-y divide-gray-200'>
              {leaderboard.slice(3).map((user, index) => {
                const actualRank = index + 4;
                const isCurrentUser = userData?._id === user._id;
                
                return (
                  <div
                    key={user._id}
                    className={`flex justify-between items-center px-6 py-4 hover:bg-green-50 transition-colors ${
                      isCurrentUser ? 'bg-green-100 border-l-4 border-green-600' : ''
                    }`}
                  >
                    {/* Rank */}
                    <div className='w-20 text-center'>
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                        isCurrentUser 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {actualRank}
                      </span>
                    </div>

                    {/* Name */}
                    <div className='flex-1 text-left'>
                      <span className={`font-semibold text-lg ${
                        isCurrentUser ? 'text-green-800' : 'text-gray-800'
                      }`}>
                        {user.name}
                        {isCurrentUser && (
                          <span className='ml-2 text-sm bg-green-600 text-white px-2 py-1 rounded-full'>
                            You
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Points */}
                    <div className='w-32 text-right'>
                      <div className='inline-flex items-center justify-end gap-2 bg-green-100 px-4 py-2 rounded-full'>
                        <RiCoinsLine className='w-5 h-5 text-green-700' />
                        <span className='font-bold text-green-800'>{user.points}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {leaderboard.length === 0 && (
          <div className='bg-white rounded-2xl shadow-xl p-12 text-center'>
            <HiMiniTrophy className='w-20 h-20 text-gray-300 mx-auto mb-4' />
            <h3 className='text-2xl font-bold text-gray-700 mb-2'>No Rankings Yet</h3>
            <p className='text-gray-500'>Be the first to earn points and climb the leaderboard!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard