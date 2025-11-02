import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className=' bg-[#E9E9E9] py-10'>
           <Outlet></Outlet>
        </div>
       
    </div>
  )
}

export default RootLayout