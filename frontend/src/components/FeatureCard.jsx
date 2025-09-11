import React from 'react'

const FeatureCard = ({title, description, icon: Icon}) => {
  return (
    <div className='bg-white shadow-lg border-b-green-600 border-b-3 rounded-lg p-6 flex items-center flex-col min-h-[300px]'>
        {Icon && <Icon className='w-8 h-8 mb-6'/>}
        <h3 className='font-extrabold text-xl mb-2'>{title}</h3>
        <p className='text-primary-gray'>{description}</p>
    </div>
  )
}

export default FeatureCard