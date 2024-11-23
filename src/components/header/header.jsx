import React from "react";
// import SearchOutlined from 'antd';
import "./header.css";
import { GlobalOutlined, SearchOutlined } from "@ant-design/icons";

export default function Header() {
  return (
    
    <div className=" flex justify-around items-center mt-5 ">
      <div className=" h-6">
      <input type="checkbox" 
               id="switch" 
               class="checkbox" 
               />
        <label htmlFor="switch" className="toggle">
          <p>&nbsp;&nbsp;</p>
        </label>
      </div>
      <div className="relative w-[50%]">
        <div className="w-[100%]">
          <input
            type="search"
            placeholder="Search for your preffered city..."
            className=" w-[100%] rounded-[50px] h-10 bg-[#444444] border-[none]  shadow-slate-800 shadow pl-14"
          />
        </div>
        <div>
        <div className="absolute top-0 left-5 text-[30px] text-[white]">
          <SearchOutlined />
        </div>
      </div>
        </div>
        <div className="flex justify-center items-center gap-2 bg-[#59bb18] w-[13%] h-10 rounded-[25px] cursor-pointer shadow-slate-800 shadow">
          <div className="text-[20px] ">
            <GlobalOutlined />
          </div>
          <div className="text-white font-semibold">Current Location</div>
        </div>
    </div>
  );
}
