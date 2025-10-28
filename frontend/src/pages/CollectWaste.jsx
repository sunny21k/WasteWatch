import React from 'react'
import { fakeReports } from '../assets/assets'

const CollectWaste = () => {

  const statusColors = {
    open: "bg-green-500 text-white",
    pending: "bg-yellow-500 text-white",
    collected: "bg-red-500 text-white"
  };

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-12'>
      <h1 className='text-4xl font-bold text-green-900 text-center mb-4'>Reported Waste</h1>
      <p className='text-center text-gray-600 mb-10'>Browse reported waste in your community. Collect 
        open reports and make a difference!</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
          {fakeReports.map((report) => (
            <div
            key={report.id}
            className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all'
            >
              <img className='w-full h-40 object-cover' src={report.image} alt={report.type} />
              <div className='p-6'>
                <div className='flex justify-between items-center mb-3'>
                  <h2 className='text-xl font-bold text-green-900'>{report.type}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[report.status]}`}>
                  {report.status.toUpperCase()}
                </span>
                </div>
                <p className="text-gray-700 mb-1">
                Quantity: <span className="font-semibold">{report.quantity} kg</span>
              </p>
              <p className="text-gray-700 mb-1">
                Location: <span className="font-semibold">{report.location}</span>
              </p>
              <p className="text-gray-700 mb-4">
                Reported by: <span className="font-semibold">{report.user}</span>
              </p>
              <button className={`w-full py-2 rounded-lg font-semibold transition-all duration-200 ${
                report.status === "open" ? "bg-green-900 cursor-pointer text-white hover:bg-green-700" :
                "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              disabled={report.status !== "open"}>
                Collect Waste
              </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default CollectWaste