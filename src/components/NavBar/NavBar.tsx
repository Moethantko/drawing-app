import React, { useState } from 'react'
import icon from '../../assets/stemsims-icon.png'

const NavBar = () => {
  
  return (
    <div className='flex justify-around items-center bg-gray-100 p-2 font-medium font-jost'>
      <div>
        <a href="https://stemsims.com/about/" target='_blank' className='mr-4 hover:cursor-pointer text-xl'>About</a>
        <a href="https://stemsims.com/subscribe" target='_blank' className='hover:cursor-pointer text-xl'>Pricing</a>
      </div>
      <img src={icon} alt="app icon" className='w-16 h-16' />
      <div>
        <a href="#" 
          className='mr-4 p-3 text-xl border-[1px] border-gray-400 rounded-md hover:cursor-pointer hover:bg-green-color hover:text-white transition delay-75'>
            Log In
        </a>
        <a href="#" 
          className='p-3 text-xl border-[1px] border-gray-400 rounded-md hover:cursor-pointer hover:bg-green-color hover:text-white transition delay-75'>
            Sign Up
        </a>
      </div>
    </div>
  )
}

export default NavBar