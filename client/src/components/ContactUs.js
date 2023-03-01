import React from "react";

export default function ContactUs({ loggedin }) {
  return (
    <div className="  my-3  container  w-2/3   mx-auto">
      {loggedin && (
        <>
          <span className="text-3xl block text-center my-8">
            Contact us - share your feedback
          </span>
          <form className="w-1/2   mx-auto ">
            <div className="my-3">
              <label className="text-lg block  my-2">Your email</label>
              <input
                type="email"
                placeholder="your email "
                className="block border-2 w-full   py-1 px-2 rounded"
              />
            </div>
            <div className="my-3">
              <label className="text-lg block  my-2">Your message</label>
              <textarea
                rows="4"
                placeholder="your message here"
                className="block border-2 w-full   py-1 px-2 rounded"
              ></textarea>
            </div>

            <button className="text-white rounded bg-green-600 text-lg hover:bg-green-700 py-2 px-3">
              Submit Feedback
            </button>
          </form>
        </>
      )}
    </div>
  );
}
