import React from 'react'
import { FaTrashAlt, FaMapMarkerAlt, FaCamera, FaClipboardList } from "react-icons/fa";


const ReportWaste = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-green-50 py-12 px-6'>
      <div className='bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl'>
        <div className='flex items-center gap-3 mb-6'>
          <FaTrashAlt className='text-3xl text-green-900'/>
          <h1 className='text-3xl font-bold text-green-900'>Report Waste</h1>
        </div>

        <p className='text-gray-600 mb-6'>
          Help keep your community clean! Fill out the form below to report waste in your area.
        </p>

        <form onSubmit="" className='space-y-5'>
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">
                <FaMapMarkerAlt className="inline mr-2 text-green-700" />
                Location
              </label>
              <input 
              type="text" 
              name='location'
              placeholder="Enter the location or address"
              className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-700 focus:outline-none'
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-1 font-semibold'>
                <FaClipboardList className='inline mr-2 text-green-700'/>
                Waste Type
              </label>
              <select name='category'
              required
              className='w-full border boder-gray-300 rounded-md p-3 bg-white focus:ring-2 focus:ring-green-700 focus:outline-none'
              >
                <option value="">Select type of waste</option>
                <option value="Plastic Waste">Plastic Waste</option>
                <option value="Household Trash">Household Trash</option>
                <option value="Construction Debris">Construction Debris</option>
                <option value="Hazardous Waste">Hazardous Waste</option>
              </select>
            </div>

            <div>
              <label className='block text-gray-700 mb-1 font-semibold'>
                Description
              </label>
              <textarea name="description" 
              placeholder='Briefly describe the waste...'
              required
              className="w-full border border-gray-300 rounded-md p-3 h-24 
                focus:ring-2 focus:ring-green-700 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-semibold">
                <FaCamera className="inline mr-2 text-green-700" />
                Upload Photo
              </label>
              <input type="file" 
              name='photo'
              accept='image/*'
              className="w-full border border-gray-300 rounded-md p-3
                 bg-white focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-900 text-white py-3 rounded-md 
              font-semibold hover:bg-green-800 transition-all cursor-pointer"
            >
              Submit Report
            </button>
        </form>
      </div>
    </div>
  )
}

export default ReportWaste