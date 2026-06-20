import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="mx-auto mt-20 w-[90%] max-w-2xl rounded-3xl bg-[#444444] p-8 text-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)]">
      <h1 className="text-3xl font-bold text-[#59bb18]">About Weather Web</h1>
      <p className="mt-4 leading-relaxed text-[#e0e0e0]">
        Weather Web is a real-time weather dashboard that provides current
        conditions, 5-day forecasts, and hourly updates for cities around the
        world. Data is powered by the Weatherstack API.
      </p>
      <p className="mt-4 leading-relaxed text-[#e0e0e0]">
        Create an account to save your session and access personalized weather
        reports from any device.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-[25px] bg-[#59bb18] px-6 py-2 font-semibold text-white hover:opacity-90"
      >
        Back to Login
      </Link>
    </div>
  );
}

export default About;
