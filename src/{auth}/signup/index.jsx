import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
} from "../../config/firebase/config";
import { createUserProfile } from "../../services/firestoreService";

const getAuthErrorMessage = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    default:
      return "Registration failed. Please try again.";
  }
};

function SignUp() {
  const [userDetail, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userDetail.email,
        userDetail.password
      );

      await createUserProfile(userCredential.user.uid, {
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        email: userDetail.email,
      });

      navigate("/home");
    } catch (err) {
      setError(getAuthErrorMessage(err.code));
    } finally {
      setLoader(false);
    }
  };

  const handleOnchange = (e) => {
    setUserDetails({
      ...userDetail,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="mx-auto mb-20 mt-20 w-[90%] max-w-lg rounded-3xl bg-[#444444] py-8 text-center shadow-[3px_10px_10px_1px_rgba(0,0,0,0.9)] sm:w-2/6">
        <div className="pt-2 text-[24px] font-semibold text-white">
          Create new account
        </div>
        <div className="text-white font-light">
          Already have an account?
          <Link to="/">
            <span className="cursor-pointer rounded-[50px] px-2 font-semibold text-[#59bb18] hover:bg-[#59bb18] hover:text-white">
              Login
            </span>
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-4 px-8">
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              className="h-10 w-full rounded-xl border border-inherit pl-4 outline-none focus:border-[#59bb18]"
              type="text"
              placeholder="First name"
              onChange={handleOnchange}
              value={userDetail.firstName}
              name="firstName"
              required
            />
            <input
              className="h-10 w-full rounded-xl border border-inherit pl-4 outline-none focus:border-[#59bb18]"
              type="text"
              placeholder="Last name"
              onChange={handleOnchange}
              value={userDetail.lastName}
              name="lastName"
              required
            />
          </div>
          <input
            className="h-10 w-full rounded-xl border border-inherit pl-4 outline-none focus:border-[#59bb18]"
            type="email"
            placeholder="Email"
            onChange={handleOnchange}
            value={userDetail.email}
            name="email"
            required
          />
          <input
            className="h-10 w-full rounded-xl border border-inherit pl-4 outline-none focus:border-[#59bb18]"
            type="password"
            placeholder="Password (min 6 characters)"
            onChange={handleOnchange}
            value={userDetail.password}
            name="password"
            minLength={6}
            required
          />
        </div>

        {error && (
          <div className="mx-8 mt-4 rounded-lg bg-red-900/50 px-3 py-2 text-sm text-white">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loader}
          className="mx-auto mt-8 block h-10 w-1/2 rounded-[25px] bg-[#59bb18] text-[20px] font-semibold text-white disabled:opacity-60"
        >
          {loader ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
  );
}

export default SignUp;
