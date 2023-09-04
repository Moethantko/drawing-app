import React, { useState } from 'react'
import icon from '../../assets/stemsims-icon.png'

const NavBar = () => {
  
  return (
    <div className='flex justify-around items-center bg-gray-100 p-2 font-medium'>
      <div>
        <a href="https://stemsims.com/about/" target='_blank' className='mr-4 hover:cursor-pointer'>About</a>
        <a href="https://stemsims.com/subscribe" target='_blank' className='hover:cursor-pointer'>Pricing</a>
      </div>
      <img src={icon} alt="app icon" className='w-16 h-16' />
      <div>
        <a href="" className='mr-4 hover:cursor-pointer'>Log In</a>
        <a href="" className='hover:cursor-pointer'>Sign Up</a>
      </div>
    </div>
  )
}

export default NavBar