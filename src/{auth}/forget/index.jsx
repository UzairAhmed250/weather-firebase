import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../../config/firebase/config";

function Forget() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError(
        err.code === "auth/user-not-found"
          ? "No account found with this email."
          : "Failed to send reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto mb-52 mt-52 w-[90%] max-w-lg rounded-3xl bg-[#444444] py-6 text-center shadow-[3px_10px_10px_1px_rgba(0,0,0,0.9)] sm:w-2/6">
        <div className="flex items-center justify-between px-6">
          <Link to="/">
            <span className="cursor-pointer text-[22px] font-semibold text-white hover:text-[#59bb18]">
              <ArrowLeftOutlined />
            </span>
          </Link>
          <div className="text-[24px] font-semibold text-white">
            Forgot password
          </div>
          <div className="w-6" />
        </div>

        <div className="mt-6 flex flex-col gap-2 px-8">
          <label htmlFor="email" className="text-left font-light text-white">
            Email
          </label>
          <input
            id="email"
            className="h-10 w-full rounded-xl border border-inherit pl-4 outline-none focus:border-[#59bb18]"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="mx-8 mt-4 rounded-lg bg-red-900/50 px-3 py-2 text-sm text-white">
            {error}
          </div>
        )}
        {success && (
          <div className="mx-8 mt-4 rounded-lg bg-green-900/50 px-3 py-2 text-sm text-white">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mx-auto mt-8 block h-10 w-1/2 rounded-[25px] bg-[#59bb18] text-[20px] font-light text-white disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send email"}
        </button>
      </div>
    </form>
  );
}

export default Forget;
