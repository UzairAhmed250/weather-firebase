import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   console.log(firstName,"Fn")

    const handleFnValues = (e) => {
      setFirstName(e.target.value);
    };
console.log("First Name: " + firstName);

    const handleLnValues = (e) => {
    setLastName(e.target.value);
};
console.log("Last Name: " + lastName);
    const handleEValues = (e) => {
    setEmail(e.target.value);
};  
console.log("Email: " + email);
    const handlePValues = (e) => {
        setPassword(e.target.value);
};
console.log("Password: " + password);
      



    return (
    <div>
      <div className="m-auto text-center w-2/6 shadow-[3px_10px_10px_1px_rgba(0,0,0,0.9)] h-[62vh] rounded-3xl  mt-40 mb-40">
        <div>
          <div className="text-[24px] font-semibold text-white pt-5">
            Create new account
          </div>
          <div className="text-white font-light">
            Already have an account?{" "}
            <Link to="/">
              <span className="font-semibold cursor-pointer rounded-[50px] px-2 text-[#59bb18] hover:bg-[#59bb18] hover:text-white">
                login
              </span>
            </Link>
          </div>
        </div>

        {/* First Name and Last Name Fields */}
        <div className="flex mt-5">
          <div className="text-white font-light pr-8 pl-8">
            <label htmlFor="firstName">First Name:</label>
          </div>
          <div className="text-white font-light pr-8 pl-[130px]">
            <label htmlFor="lastName">Last Name:</label>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="w-[100%] text-left pr-1 pl-8">
            <input
              className="w-[100%] pl-10 h-10 border border-inherit outline-none rounded-xl focus:border-[#59bb18]"
              type="text"
              placeholder="Enter your first name"
              onChange={handleFnValues}
              value={firstName}
              required
            />
          </div>
          <div className="w-[100%] text-left pr-8">
            <input
              className="w-[100%] pl-10 h-10 border border-inherit outline-none rounded-xl focus:border-[#59bb18]"
              type="text"
              placeholder="Enter your last name"
              onChange={handleLnValues}
              value={lastName}
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-2 mt-5">
          <div className="text-left text-white font-light pr-8 pl-8">
            <label htmlFor="email">Email</label>
          </div>
          <div className="w-[100%] text-left pr-8 pl-8">
            <input
              className="w-[100%] pl-10 h-10 border border-inherit outline-none rounded-xl focus:border-[#59bb18]"
              type="email"
              placeholder="Enter your email"
              onChange={handleEValues}
              value={email}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2 mt-5">
          <div className="text-left text-white font-light pr-8 pl-8">
            <label htmlFor="password">Password</label>
          </div>
          <div className="w-[100%] text-left pr-8 pl-8">
            <input
              className="w-[100%] pl-10 h-10 border border-inherit outline-none rounded-xl focus:border-[#59bb18]"
              type="password"
              placeholder="Enter your password"
              onChange={handlePValues}
              value={password}
              required
            />
          </div>
        </div>

        {/* Register Button */}
        <div className="bg-[#59bb18] rounded-[25px] cursor-pointer w-[50%] text-white h-10 text-[20px] font-semibold pt-1 ml-32 mt-8">
          <button >Register</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
