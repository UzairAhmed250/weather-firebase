import React, { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto mt-20 w-[90%] max-w-2xl rounded-3xl bg-[#444444] p-8 text-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)]">
      <h1 className="text-3xl font-bold text-[#59bb18]">Contact Us</h1>
      <p className="mt-4 text-[#e0e0e0]">
        Have a question or feedback? Send us a message and we will get back to
        you.
      </p>

      {submitted ? (
        <div className="mt-6 rounded-lg bg-green-900/50 px-4 py-3">
          Thank you for your message. We will be in touch soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your name"
            className="h-10 rounded-xl border-none bg-[#373636] px-4 outline-none focus:ring-2 focus:ring-[#59bb18]"
            required
          />
          <input
            type="email"
            placeholder="Your email"
            className="h-10 rounded-xl border-none bg-[#373636] px-4 outline-none focus:ring-2 focus:ring-[#59bb18]"
            required
          />
          <textarea
            placeholder="Your message"
            rows={4}
            className="rounded-xl border-none bg-[#373636] px-4 py-3 outline-none focus:ring-2 focus:ring-[#59bb18]"
            required
          />
          <button
            type="submit"
            className="h-10 rounded-[25px] bg-[#59bb18] font-semibold text-white hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      )}

      <Link
        to="/"
        className="mt-6 inline-block text-[#59bb18] hover:underline"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default Contact;
