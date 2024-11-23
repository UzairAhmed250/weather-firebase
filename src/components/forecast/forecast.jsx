import React from 'react'
import Forecastchild from './forecast-child';
import "./forecast.css";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import sun from "../../assets/sun.svg";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import { UpOutlined } from '@ant-design/icons';

// image, tem, date

function Forecast() {
  return (
   <>
   <div className='flex justify-around mt-10  '>
 <div className='flex flex-col  text-white items-center bg-[#44444]  shadow-[5px_5px_10px_0px_rgba(0,0,0,0.9)] w-[22%] h-[330px] rounded-3xl font-semibold'>  
 <div className="font-bold text-[22px] mt-5">
    5 Days Forecast: 
    </div>
 <div className='w-[100%]'>
 <Forecastchild img={ img1 } tem= {"20°C"} date="Friday, 8 Oct"/>
 <Forecastchild img={ img2 } tem= {"22°C"} date="Saturday, 9 Oct"/>
 <Forecastchild img={ sun } tem= {"27°C"} date="Sunday, 10 Oct"/>
 <Forecastchild img={ img3 } tem= {"18°C"} date="Monday, 11 Oct"/>
 <Forecastchild img={ img4 } tem= {"16°C"} date="Tuesday, 12 Oct"/>
 </div>
 </div>

 <div className="flex flex-col items-center  text-white bg-[#44444] shadow-[5px_5px_10px_0px_rgba(0,0,0,0.9)] h-[330px] rounded-3xl font-semibold w-[68%] ">
            <div className='text-[25px] font-bold'>Hourly Forcast:</div>

{/* for chart */}
<div className='flex justify-evenly font-semibold w-[100%] mt-10'>
            <div className='flex flex-col gap-3 items-center justify-center bg-[#373636] w-28 h-60 rounded-[20px]'>
                <div className='text-[22px] font-bold'>12:00</div>
                <div>
                    <img className='w-[50px]' src={sun} alt='Sun' />
                </div>
                <div className='text-[22px] font-bold'>26°C</div>
                <div className='text-[22px] font-bold'><UpOutlined /></div>
                <div className='text-[18px] font-bold'>3km/h</div>
            </div>
            <div className='flex flex-col gap-3 items-center justify-center bg-[#373636] w-28 h-60 rounded-[20px]'>
                <div className='text-[22px] font-bold'>12:00</div>
                <div>
                    <img className='w-[50px]' src={sun} alt='Sun' />
                </div>
                <div className='text-[22px] font-bold'>26°C</div>
                <div className='text-[22px] font-bold'><UpOutlined /></div>
                <div className='text-[18px] font-bold'>3km/h</div>
            </div>
            <div className='flex flex-col gap-3 items-center justify-center bg-[#373636] w-28 h-60 rounded-[20px]'>
                <div className='text-[22px] font-bold'>12:00</div>
                <div>
                    <img className='w-[50px]' src={sun} alt='Sun' />
                </div>
                <div className='text-[22px] font-bold'>26°C</div>
                <div className='text-[22px] font-bold'><UpOutlined /></div>
                <div className='text-[18px] font-bold'>3km/h</div>
            </div>
            <div className='flex flex-col gap-3 items-center justify-center bg-[#373636] w-28 h-60 rounded-[20px]'>
                <div className='text-[22px] font-bold'>12:00</div>
                <div>
                    <img className='w-[50px]' src={sun} alt='Sun' />
                </div>
                <div className='text-[22px] font-bold'>26°C</div>
                <div className='text-[22px] font-bold'><UpOutlined /></div>
                <div className='text-[18px] font-bold'>3km/h</div>
            </div>
            <div className='flex flex-col gap-3 items-center justify-center bg-[#373636] w-28 h-60 rounded-[20px]'>
                <div className='text-[22px] font-bold'>12:00</div>
                <div>
                    <img className='w-[50px]' src={sun} alt='Sun' />
                </div>
                <div className='text-[22px] font-bold'>26°C</div>
                <div className='text-[22px] font-bold'><UpOutlined /></div>
                <div className='text-[18px] font-bold'>3km/h</div>
            </div>
            </div>
        </div>

 </div>
   </>
  )
}

export default Forecast