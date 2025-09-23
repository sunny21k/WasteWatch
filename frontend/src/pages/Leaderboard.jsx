import React from 'react'
import { leaderBoardData } from '../assets/assets'

const Leaderboard = () => {

  // leaderBoardData.map((user) => {
  //   console.log(user.rank)
  //   console.log(user.name)
  //   console.log(user.id)
  // })

  return (
    <div>
      <h1>Leaderboard</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderBoardData.slice().sort((a, b) => b.points - a.points).map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard