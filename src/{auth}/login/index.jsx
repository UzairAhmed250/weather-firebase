import { LoginOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../config/firebase/config";
import { ensureUserProfile } from "../../services/firestoreService";

const getAuthErrorMessage = (code) => {
  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password.";
    default:
      return "Login failed. Please try again.";
  }
};

function Login() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const userlogin = async () => {
    setLoading(true);
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      await ensureUserProfile(userCredential.user.uid, userDetails.email);

      navigate("/home");
    } catch (err) {
      setError(getAuthErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userlogin();
  };

  return (
    <div className="mx-auto mb-5 mt-5 flex h-auto min-h-[90vh] w-[90%] max-w-lg flex-col gap-8 rounded-3xl bg-[#444444] text-center shadow-[0px_0px_5px_2px_rgba(0,0,0,0.9)] sm:w-2/6">
      <div className="flex flex-col gap-4 pt-14">
        <div className="text-[35px] text-white">
          <LoginOutlined />
        </div>
        <div className="text-[24px] font-bold text-[#fcfdff]">Weather Web</div>
        <div className="mx-8">
          <p className="text-left text-[16px] text-white">
            Sign in to access real-time weather forecasts, hourly updates, and
            location-based reports for cities worldwide.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 px-8">
          <input
            className="h-10 w-full rounded-xl border border-inherit pl-4 outline-none focus:border-[#59bb18]"
            type="email"
            placeholder="Email address"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            required
          />
          <input
            className="h-10 w-full rounded-xl border border-inherit pl-4 outline-none focus:border-[#59bb18]"
            type="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
            required
          />
        </div>

        {error && (
          <div className="mx-8 rounded-lg bg-red-900/50 px-3 py-2 text-sm text-white">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4 px-8 pb-10">
          <button
            type="submit"
            disabled={loading}
            className="h-10 rounded-[25px] bg-[#59bb18] text-[20px] font-bold text-white disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
          <Link
            to="/forgot-password"
            className="block h-10 rounded-[25px] bg-[#59bb18] pt-1 text-[20px] font-bold text-white"
          >
            Forgot password
          </Link>
          <Link
            to="/signup"
            className="block h-10 rounded-[25px] bg-[#59bb18] pt-1 text-[20px] font-bold text-white"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
