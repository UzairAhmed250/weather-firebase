import React from 'react'
import { Link } from 'react-router-dom'

function MainHeader() {
  return (
    <div>
        <div className='flex justify-between px-10 h-[80px] bg-[#44444] items-center shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)]'>
            <div className='text-[26px] cursor-pointer text-white'>Weahter Web App</div>
           <div className='text-[16px] text-white flex gap-[50px]'> 
           <Link to="/"> <div className='hover:bg-[#E7E7E7] rounded-md hover:text-black cursor-pointer '>Home</div></Link>
           <Link to="/aboutus"> <div className='hover:bg-[#E7E7E7] rounded-md hover:text-black cursor-pointer'>About</div></Link>
            <Link to="/contactus"><div className='hover:bg-[#E7E7E7] rounded-md hover:text-black cursor-pointer'>Contact us</div></Link>
            </div>
        </div>
    </div>
  )
}

export default MainHeader