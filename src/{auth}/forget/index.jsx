import { ArrowLeftOutlined } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'

function Forget() {
  return (
    <div>
    <div className='m-auto text-center w-2/6 shadow-[3px_10px_10px_1px_rgba(0,0,0,0.9)] rounded-3xl bg-[#44444] h-[35vh] mt-52 mb-52'>
        <div className='flex justify-between items-center' >
            <Link to="/"><div
             className='mt-5 px-1 ml-7 overflow-x-auto text-white text-[22px] font-semibold cursor-pointer hover:bg-[#D8D8D8] hover:text-[#59bb18] '>
                <ArrowLeftOutlined />
                </div>
                </Link>
            <div className='text-[24px] font-semibold text-white pt-5 mr-8'>Forgot password</div>
            <div className=''></div>
        </div>
        <div className='flex flex-col gap-2'>
            <div className='text-left text-white font-light pr-8 pl-8'>
                <label htmlFor='Email' >Email</label>
            </div >
            <div className="w-[100%] text-left pr-8 pl-8">
                <input 
                className='w-[100%] pl-10 h-10 border border-inherit outline-none rounded-xl focus:border-[#59bb18]' 
                type='text'
                 placeholder='Enter your email' 
                 required />
            </div>
        </div>
        <div className='bg-[#59bb18] rounded-[25px] cursor-pointer w-[50%] text-white h-10 text-[20px] font-light pt-1 ml-32 mt-8 '>
            <button className='w-[100%] rounded-[25px] h-7 '>Send email</button>
        </div>
    </div>
</div>
  )
}

export default Forget