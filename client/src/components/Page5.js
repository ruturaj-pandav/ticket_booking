import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
export default function Page5({
  passengers,
  source,
  destination,
  busname,
  busduration,
  ticketmailto,
  ticketsmsto,
  perticketprice,
  ticketcount,
  paymentFunction,
  balance,
  backButtonFunction,
}) {
  console.log("on page 5 , these are passengers : ", passengers);
  return (
    <>
      <Header loggedin={true} />{" "}
      <div className=" container mx-auto  p-3  w-1/2 my-4 rounded">
        <div className="my-5">
          <div>
            <span className="block  text-3xl  my-2 ">Journey summary</span>
            <span className="block ">
              {" "}
              {source} &#8594; {destination}
            </span>
            <span className="block "> {busduration} hrs</span>
            <span className="block "> {ticketcount} seats</span>
            <span className="block "> {busname} Travels</span>
          </div>
        </div>
        <div className="my-5">
          <div>
            <span className="block  text-3xl  my-2 ">
              Passenger information
            </span>
            {passengers.map((passenger) => {
              return (
                <div className="my-5">
                  <span className="border border-gray-200 px-3 rounded shadow-sm   py-2">
                    {passenger.name}
                  </span>
                  <span className="border border-gray-200 px-3 rounded shadow-sm   py-2 mx-2">
                    {passenger.age}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="my-5">
          <div>
            <span className="block  text-3xl  my-2 ">Bill Details</span>
            <div className="my-5">
              <span className="border border-1 border-grey px-3 rounded shadow-sm   py-2">
                total seats
              </span>
              <span className="border border-1 border-grey px-3 rounded shadow-sm   mx-1 py-2">
                {ticketcount}
              </span>
            </div>
            <div className="my-5">
              <span className="border border-1 border-grey px-3 rounded shadow-sm   py-2">
                price/seat
              </span>
              <span className="border border-1 border-grey px-3 rounded shadow-sm  mx-1 py-2">
                {perticketprice}
              </span>
            </div>
            <div className="my-5">
              <span className="border border-1 border-dark border-2 px-3 rounded shadow  py-2 ">
                total amount
              </span>
              <span className="border border-1 border-dark border-2 px-3 rounded shadow   mx-1 py-2 ">
                {perticketprice * ticketcount}
              </span>
            </div>
          </div>
        </div>

        <div className="my-5">
          <div>
            <span className="block  text-3xl  my-2 ">
              Tickets will be sent to{" "}
            </span>
            <span className="block ">{ticketmailto}</span>

            <span className="block ">{ticketsmsto}</span>
          </div>
        </div>
        <div className="my-5">
          <div>
            <span className="block  text-3xl  my-2 ">Payment mode</span>
            <span className="block ">Wallet balance :- {balance} </span>
          </div>
        </div>

        <button
          className="py-1 px-2 rounded bg-red-700 btn-sm hover:bg-red-600 text-white"
          onClick={() => {
            backButtonFunction();
          }}
        >
          back
        </button>
        <button
          className="py-1 px-2 rounded bg-green-700 btn-sm  mx-2 hover:bg-green-600 text-white"
          onClick={() => {
            let totalamount = perticketprice * ticketcount;

            paymentFunction(totalamount);
          }}
        >
          Pay {ticketcount * perticketprice} from wallet
        </button>
      </div>
    </>
  );
}
