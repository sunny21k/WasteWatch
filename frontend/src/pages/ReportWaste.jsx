import axios from "axios";
import { FaTrashAlt, FaMapMarkerAlt, FaCamera, FaClipboardList } from "react-icons/fa";
import { AppContent } from '../context/AppContext';
import { useContext, useState } from 'react';

const ReportWaste = () => {

  const {backendUrl} = useContext(AppContent)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form fields states
  const [location, setLocation] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(false);

  // Handles form submission
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      setIsSubmitting(true)

      // Prepares report data
      const report = {
        wasteType, 
        quantity, 
        location, 
        description
      }

      const reportData = new FormData();

      reportData.append('report', JSON.stringify(report))
      reportData.append('image', image)

      const token = localStorage.getItem("token")

      // Sends POST request to backend
      const {data} = await axios.post(`${backendUrl}/report/create`, reportData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token
        }
      })

      if (data.success) {
        console.log(data.message)
        // Resets form after successful submission
        setImage(false)
        setLocation("");
        setWasteType("");
        setQuantity("");
        setDescription("");
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

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

        <form onSubmit={onSubmitHandler} className='space-y-5'>
          
          {/* Location input */}
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">
                <FaMapMarkerAlt className="inline mr-2 text-green-700" />
                Location
              </label>
              <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              name='location'
              placeholder="Enter the location or address"
              className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-700 focus:outline-none'
              />
            </div>

            {/* Waste type select */}
            <div>
              <label className='block text-gray-700 mb-1 font-semibold'>
                <FaClipboardList className='inline mr-2 text-green-700'/>
                Waste Type
              </label>
              <select name='category'
              required
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
              className='w-full border boder-gray-300 rounded-md p-3 bg-white focus:ring-2 focus:ring-green-700 focus:outline-none'
              >
                <option value="">Select type of waste</option>
                <option value="Plastic Waste">Plastic Waste</option>
                <option value="Household Trash">Household Trash</option>
                <option value="Construction Debris">Construction Debris</option>
                <option value="Hazardous Waste">Hazardous Waste</option>
              </select>
            </div>

            {/* Quantity input */}
            <div>
              <label className='block text-gray-700 mb-1 font-semibold'>Quantity (approx. lbs)</label>
              <input type="number" 
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="0"
              required
              className='w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus-ring-green-700 focus:outline-none'
              placeholder="Enter approximate quantity (e.g. 3, 15)"
              />
            </div>

            {/* Description textarea */}
            <div>
              <label className='block text-gray-700 mb-1 font-semibold'>
                Description
              </label>
              <textarea name="description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Briefly describe the waste...'
              required
              className="w-full border border-gray-300 rounded-md p-3 h-24 
                focus:ring-2 focus:ring-green-700 focus:outline-none resize-none"
              />
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-gray-700 mb-1 font-semibold">
                <FaCamera className="inline mr-2 text-green-700" />
                Upload Photo
              </label>
              <input type="file" 
              onChange={(e) => setImage(e.target.files[0])}
              name='photo'
              accept='image/*'
              className="w-full border border-gray-300 rounded-md p-3
                 bg-white focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
            </div>

            {/* Submit button */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-green-900 text-white py-3 rounded-md 
              font-semibold hover:bg-green-800 transition-all cursor-pointer"
            >
              {isSubmitting ? "Submiting..." : "Submit Report"}
            </button>
        </form>
      </div>
    </div>
  )
}

export default ReportWaste