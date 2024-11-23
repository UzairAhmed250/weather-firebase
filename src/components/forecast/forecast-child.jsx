import React from "react";

function Forecastchild({ img, tem, date }) {
  return (
    <div>
      <div className="text-white ">
        <div className=" ">  
          <div className="flex justify-evenly w-[100%] mt-5 leading-normal">
            <div>
              <img className="w-8" src={img} alt="" />
            </div>
            <div> {tem} </div>
            <div> {date} </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Forecastchild;
