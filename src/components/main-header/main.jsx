import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function MainHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex h-[80px] items-center justify-between bg-[#444444] px-6 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)] sm:px-10">
      <div className="cursor-pointer font-display text-[22px] font-bold text-white sm:text-[26px]">
        Weather Web App
      </div>
      <div className="flex items-center gap-6 text-[16px] text-white sm:gap-[50px]">
        <Link to="/home">
          <span className="cursor-pointer rounded-md px-2 py-1 hover:bg-[#E7E7E7] hover:text-black">
            Home
          </span>
        </Link>
        <Link to="/aboutus">
          <span className="cursor-pointer rounded-md px-2 py-1 hover:bg-[#E7E7E7] hover:text-black">
            About
          </span>
        </Link>
        <Link to="/contactus">
          <span className="cursor-pointer rounded-md px-2 py-1 hover:bg-[#E7E7E7] hover:text-black">
            Contact
          </span>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="cursor-pointer rounded-md bg-[#59bb18] px-3 py-1 font-semibold hover:opacity-90"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default MainHeader;
