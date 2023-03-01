import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
export default function Page6({
  ticketsmsto,
  ticketmailto,
  goToBookingPage,
  paymentsuccess,
}) {
  let navigate = useNavigate();
  function goHome() {
    navigate("/");
  }
  return (
    <>
    <Header loggedin ={true}/>
      <div className="container  mx-auto text-center">
        {paymentsuccess === true ? (
          <div className="w-96  mx-auto">
            <center>
              <FaCheckCircle className="text-green-500 text-8xl " />
            </center>
            <div>
              <div>
                <center>Payment Success</center>
              </div>
              <div className="my-5">
                <span className="text-center my-3 block ">
                  Amount deducted from wallet
                </span>

                {ticketmailto && ticketsmsto ? (
                  <div className="my-4">
                    <span className="block  text-2xl ">
                      {" "}
                      details sent to :{" "}
                    </span>
                    <span className="block">{ticketmailto}</span>
                    <span className="block">{ticketsmsto}</span>
                  </div>
                ) : null}
              </div>
              <center>
                {" "}
                <button
                  className="bg-green-600 px-3 hover:bg-green-700 py-2 text-white rounded"
                  onClick={() => {
                    goHome();
                  }}
                >
                  Go Home
                </button>
              </center>
            </div>
          </div>
        ) : (
          <div className="w-25 border-0">
            <center>
              <FaTimesCircle className="text-red-600 text-8xl " />
            </center>
            <div>
              <span className="text-red-500">Payment Failed</span>
              <div className="my-3">
                <center>Amount hasn't been deducted</center>
                <br />
              </div>
              <center>
                <button
                  className="bg-green-600 px-3 hover:bg-green-700 py-2 text-white rounded"
                  onClick={() => {
                    goHome();
                  }}
                >
                  Go Home
                </button>
              </center>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
