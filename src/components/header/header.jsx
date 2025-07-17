import React, { useEffect, useState } from "react";
// import SearchOutlined from 'antd';
import "./header.css";
import { GlobalOutlined, SearchOutlined } from "@ant-design/icons";

export default function Header({ onSearch, onCurrentLocation }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);


  useEffect(() => {
    if (!input.trim()) return; 

    const handler = setTimeout(() => {
      onSearch(input.trim());
    }, 5000); 

    return () => clearTimeout(handler); 
  }, [input, onSearch]);


  return (
    <div className=" flex justify-around items-center mt-5 ">
      <div className=" h-6">
        <input type="checkbox" id="switch" className="checkbox" />
        <label htmlFor="switch" className="toggle">
          <p>&nbsp;&nbsp;</p>
        </label>
      </div>
      <div className="relative w-[50%]">
        <form className="w-[100%]">
          <input
            type="search"
            placeholder="Search for your preffered city..."
            className=" w-[100%] rounded-[50px] h-10 bg-[#444444] border-[none]  shadow-slate-800 shadow pl-14"
            onChange={handleInputChange}
            value={input}
          />
        </form>
        <div>
          <div className="absolute top-0 left-5 text-[24px] text-center pt-[2px] text-[white]">
            <SearchOutlined />
          </div>
        </div>
      </div>
      <div
        className="flex justify-center items-center gap-2 bg-[#59bb18] w-[13%] h-10 rounded-[25px] cursor-pointer shadow-slate-800 shadow"
        onClick={onCurrentLocation}
      >
        <div className="text-[20px] ">
          <GlobalOutlined />
        </div>
        <div className="text-white font-semibold">Current Location</div>
      </div>
    </div>
  );
}
