import React from "react";
import lbt from "../images/lbt.jpg";
import lp from "../images/lp.jpg";
import primo from "../images/primo.png";
import { useNavigate } from "react-router-dom";
// import MobileWallet from "../images/MobileWallet.png";

export default function Features() {
  let navigate = useNavigate();
  function goToBookTickets() {
    navigate("/book-tickets");
  }
  return (
    <div className="p-3 mt-5  w-2/3 container-sm block mx-auto">
      <span className="text-4xl block text-center">Features</span>

      <div className=" my-3 block w-2/3 mx-auto">
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-3 my-4 ">
            <div className="">
              <img src={lbt} alt="" width="120px" height="120px" />
            </div>
            <div className="col-span-2">
              <p>
                {" "}
                <span className="font-bold text-lg ">Live Bus Tracking</span> -
                helps passengers track the live location of the bus , thus
                adding to the travel comfort. Tracking link shared 1 hr(s)
                before the journey starts
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3  my-4">
            <div className="col-span-2 text-left">
              {" "}
              <p>
                <span className="font-bold text-lg"> Primo Buses</span> - buses
                that are specifically recognized for their cleanliness ,
                punctuality , safe drivers for a journey while maintaining peace
                of mind
              </p>
            </div>
            <div className="text-right">
              <img src={primo} alt="" width="120px" height="120px" />
            </div>
          </div>
          <div className="grid grid-cols-3 my-4">
            <div>
              <img src={lp} alt="" width="120px" height="120px" />
            </div>
            <div className="col-span-2 text-justify">
              <p>
                <span className="font-bold text-lg">
                  Guaranteed lowest prices
                </span>{" "}
                - assures passengers while ticket booking that these are the
                lowest prices you will find anywhere on the internet, hence
                removing hassle of comparing prices.
              </p>
            </div>
          </div>
        </div>
      </div>

      <center>
        <button
          className="bg-green-600 px-3 hover:bg-green-700 py-2 text-lg text-white rounded "
          onClick={() => {
            goToBookTickets();
          }}
        >
          Book Tickets Now
        </button>
      </center>
    </div>
  );
}
