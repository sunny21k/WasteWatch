import React from 'react'
import {FaBinoculars} from "react-icons/fa6"
import {footerDetails} from "../assets/assets"
import { Link } from 'react-router-dom'

const Footer = () => {

  const getLinkPath = (linkName) => {
    if (linkName === "Home") {
      return "/"
    } else if (linkName === "Report Waste") {
      return "/report-waste"
    } else if (linkName === "Collect Waste") {
      return "/collect-waste"
    } else if (linkName === "Leaderboard") {
      return "/leaderboard"
    } else if (linkName === "Rewards") {
      return "/rewards"
    } 
    else return "#"
  }

  return (
    <div className='px-6 border-t-1 mt-20 border-gray-200 md:px-16 lg:px-24 xl:px-32 bg-green-200'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10
      py-10 border-b text-secondary-gray'>
        <div>
          <div className='flex items-center gap-3'>
            <FaBinoculars className='w-8 h-8 text-green-900' />
            <p className='text-2xl font-extrabold'>Waste Watch</p>
          </div>
            <p className='max-w-[700px] mt-6'>
              Welcome to Waste Watch - your community platform to report, collect, and track
              waste easily Earn rewards, make a difference, and help keep your neighborhood
              clean and sustainable.
            </p>
        </div>
        <div className='flex justify-end gap-30 w-full'>
          {footerDetails.map((footer, index) => (
            <div key={index}>
              <h4 className='mb-3 text-gray-700 font-bold text-lg'>
                {footer.title}
              </h4>
              <ul className='space-y-1 text-sm'>
                {footer.links.map((link, index) => (
                  <li key={index}>
                    <Link className='hover:underline transition' to={getLinkPath(link)}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer