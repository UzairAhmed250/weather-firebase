import React from "react";
import sun from "../../assets/sun.svg";
import sunRise from "../../assets/sunrise.svg";
import sunSet from "../../assets/sunset.svg";
import humid from "../../assets/humidity.png";
import press from "../../assets/pressure.png";
import wind from "../../assets/wind.svg";
import uv from "../../assets/uv.png";

function Temp() {
  return (
    <div className="flex justify-center gap-[75px] mt-12">
      <div className="bg-[#44444]  shadow-[12px_13px_10px_0px_rgba(0,0,0,0.9)] w-[25%] h-[220px] rounded-3xl">
        <div className="text-white mt-4 text-[25px] text-center font-bold">
          Athens
        </div>
        <div className="flex flex-col mt-2">
          <div className="text-white text-[65px] text-center font-bold leading-[normal]">
            09:03
          </div>
          <div className="text-white text-[12px] text-center font-bold">
            Thursday, 31 Aug
          </div>
        </div>
      </div>
      <div className="flex justify-around bg-[#44444]  shadow-[12px_13px_10px_0px_rgba(0,0,0,0.9)] w-[65%] h-[220px] rounded-3xl">
        <div className="leading-[normal] ">
          <div className="text-[#b3b3b3] text-[50px] font-bold leading-none mt-5">
            24°C
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-[#b3b3b3] text-[16px] font-semibold ">
              Feels like:
            </div>
            <div className="text-[#b3b3b3] text-[25px] font-bold">22°C</div>
          </div>
          <div className="flex gap-2 items-center text-white font-semibold mt-8">
            <div>
              <img className="" src={sunRise} alt="Sunrise" />
            </div>
            <div>
              <div className="text-[16px]">Sunrise</div>
              <div className="text-[12px]">06:37 AM</div>
            </div>
          </div>
          <div className="flex gap-2 items-center text-white font-semibold">
            <div>
              <img className="w-8" src={sunSet} alt="Sunset" />
            </div>
            <div>
              <div className="text-[16px]">Sunset</div>
              <div className="text-[12px]">20:37 AM</div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="w-28">
            <img src={sun} alt="sun" />
          </div>
          <div className=" text-white text-[25px] font-semibold">Sunny</div>
        </div>
    <div className="flex items-center gap-10"> 
        <div className="">
          <div className="flex flex-col items-center">
            <div>
              <img className="w-14" src={humid} alt="Humidity" />
            </div>
            <div className="text-[white] font-semibold"> 41% </div>
            <div className="text-[white] text-[14px]"> Humidity </div>
          </div>
          <div>
            <div>
              <img className="w-14" src={press} alt="Pressure" />
            </div>
            <div className="text-[white] font-semibold"> 997hpa </div>
            <div className="text-[white] text-[14px]"> Pressure </div>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col items-center">
            <div className=" mt-6">
              <img className="w-14" src={wind} alt="Wind" />
            </div>
            <div className="text-[white] font-semibold "> 2km/h </div>
            <div className="text-[white] text-[14px]"> Wind Speed </div>
          </div>
          <div className="flex flex-col items-center mt-1 ">
            <div>
              <img className="w-12" src={uv} alt="UV" />
            </div>
            <div className="text-[white] font-semibold"> 8 </div>
            <div className="text-[white] text-[14px]"> UV </div>
          </div>
        </div>
    </div>
      </div>
    </div>
  );
}

export default Temp;
