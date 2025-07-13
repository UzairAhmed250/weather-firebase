import { LoginOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {addDoc, collection, firestore, getAuth, signInWithEmailAndPassword} from "../../config/firebase/config"



function Login() {

  const auth = getAuth();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(
    {
      email:"",
      password: ""
      
    }
  )

  const userlogin = async() => {
    try {
      const result = await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
      // .then((userCred) => {
        const user = result.user;
        // setUserDetails(user);
        console.log(user);
        navigate("/home");
  
      // })
      
      // console.log(result, "111222")  
    } catch (error) {
      console.error("error: " + error)
    }
    
};

  return (
    <div className="flex flex-col gap-12 m-auto text-center w-2/6 shadow-[5px_10px_5px_2px_rgba(0,0,0,0.9)] rounded-3xl bg-[#44444] h-[95vh] mt-5 mb-5">
      <div className="flex flex-col gap-4 pt-14">
        <div className="text-white text-[35px]">
          <LoginOutlined />
        </div>
        <div className="text-[#fcfdff] text-[24px] font-bold">Weather Web</div>
        <div className="ml-8 mr-8">
          <p className="text-white text-[16px] text-left ">
            WeatherWeb users are now required to register to use this site. If
            you have not yet done so, please register below. After registration,
            you will be sent an email with a validation link. Once validated,
            you will be able to login with your email address and the password
            you've set for yourself.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-6">
        <div className="flex flex-col gap-4 ">
          <div className="w-[100%] pr-8 pl-8 ">
            <input
              className="w-[100%] pl-10 h-10 border border-inherit outline-none rounded-xl focus:border-[#59bb18]"
              type="email"
              placeholder="Email address"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}

            />
          </div>
          <div className="w-[100%] pr-8 pl-8">
            <input
              className="w-[100%] pl-10 h-10 border border-inherit outline-none rounded-xl focus:border-[#59bb18]"
              type="password"
              placeholder="password"
              value={userDetails.password}
              onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}

            />
          </div>
        </div>
        <div className="flex items-center gap-2 ml-8">
          <div>
            <input className="cursor-pointer" type="checkbox" />
          </div>
          <div className="text-[12px] font-semibold text-white ">Remember me</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-[#59bb18] rounded-[25px] cursor-pointer text-white h-10 text-[20px] font-bold pt-1 ml-8 mr-8 " role="button" onClick={() => userlogin()}>
          Log In
        </div>
        <Link to="/forgot-password">
        <div className="bg-[#59bb18] rounded-[25px] cursor-pointer text-white h-10 text-[20px] font-bold pt-1 ml-8 mr-8" >
          Forgot password
        </div>
        </Link>
        <Link to="/signup"><div className="bg-[#59bb18] rounded-[25px] cursor-pointer text-white h-10 text-[20px] font-bold pt-1 ml-8 mr-8">
          Register
        </div></Link>
        <button > put Data </button>
      </div>
    </div>
  );
}

export default Login;
