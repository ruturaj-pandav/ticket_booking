import React from "react";
import { useState } from "react";
import Header from "./Header";
export default function Page4({
  setPassengers,
  passengers,
  ticketcount,
  seats,
  continuePage4,
  source,
  destination,
  busname,
  backButtonFunction,
  ticketmailto,
  user,
  ticketsmsto,
  setTicketMailTo,
  setTicketSMSTo,
}) {
  console.log(
    "received this passengers on page 4 from mainbooking ",
    passengers
  );
  // const [passengers, setpassengers] = useState([]);

  const list = [];

  for (let i = 0; i < ticketcount; i++) {
    list.push(
      <div className="my-4">
        <div className="my-2">
          <label className="text-sm block text-gray-500 mb-1 ">Name</label>
          <input
            value={`${passengers[i]["name"]}`}
            type="text"
            className="block  text-sm   border w-full border-gray-200 border-2  p-1 rounded "
            placeholder={`passenger ${i + 1} name`}
            onChange={(e) => {
              setPassengers(i, "name", e.target.value);
            }}
          />
        </div>
        <div className="my-2">
          <label className="text-sm block text-gray-500  mb-1">Age</label>
          <input
            type="text"
            className="block text-sm    border w-full  border-gray-200 border-2 p-1 rounded "
            value={`${passengers[i]["age"]}`}
            placeholder={`passenger ${i + 1} age`}
            onChange={(e) => {
              setPassengers(i, "age", e.target.value);
            }}
          />
        </div>
      </div>
    );
  }

  const [incompleteInformation, setincompleteInformation] = useState();
  const [enterPassengerInformation, setenterPassengerInformation] = useState();
  return (
    <>
      <Header loggedin={true} />
      <div className=" container  border-grey  p-3  w-1/2 mx-auto my-4 rounded">
        <div>
          <span className="text-3xl  block ">Journey details</span>
          <div className="my-3 block ">
            <span className="block my-2 text-lg">{busname} Travels </span>
            <span className="block my-2 text-lg">
              {source} &#8594; {destination}
            </span>
            <span className="block my-2 text-lg">{ticketcount} seat(s)</span>
            <span className="block my-2 text-lg">
              {" "}
              {seats.length > 0
                ? seats.map((seat) => {
                    return (
                      <span className="border border-grey py-1 px-1">
                        {seat}{" "}
                      </span>
                    );
                  })
                : "no seats selected"}
            </span>
          </div>
        </div>
        <hr />
        <div>
          <div>
            <span className="block text-3xl my-3 ">
              Enter details to send ticket
            </span>
            <form className="my-2 w-96">
              <div className="my-2 ">
                <label className="text-sm text-gray-500">Email</label>
                <input
                  type="email"
                  value={ticketmailto}
                  className="block border-2  w-full py-1 px-2 rounded "
                  placeholder="email here"
                  onChange={(e) => {
                    setTicketMailTo(e.target.value);
                  }}
                />
              </div>

              <div className="my-2 ">
                <label className="text-sm text-gray-500">mobile</label>

                <input
                  type="text"
                  value={ticketsmsto}
                  className="block border-2   w-full py-1 px-2 rounded "
                  placeholder="mobile no. here"
                  onChange={(e) => {
                    setTicketSMSTo(e.target.value);
                  }}
                />
              </div>
            </form>
          </div>
        </div>

        {incompleteInformation && (
          <span className="text-red-500 text-sm mb-3 block  ">
            Enter mail and mobile number
          </span>
        )}
        <hr />

        <div className="mt-3">
          <div>
            <span className="text-3xl "> Passenger details</span>

            <form className="my-3 w-96">{list}</form>
            {enterPassengerInformation && (
              <span className="text-red-500 text-sm mb-3 block">
                Enter passenger details
              </span>
            )}
          </div>
        </div>

        <button
          className="py-1 px-2 rounded bg-red-700 btn-sm hover:bg-red-600 text-white "
          onClick={() => {
            backButtonFunction();
          }}
        >
          back
        </button>
        <button
          className="py-1 px-2 rounded bg-green-700 btn-sm  mx-2 hover:bg-green-600 text-white "
          onClick={() => {
            console.log("this is final list", passengers);
            if (ticketmailto !== "" && ticketsmsto !== "") {
              setincompleteInformation(false);
              if (passengers.length === 1) {
                if (passengers[0].name !== "" && passengers[0].age !== "") {
                  continuePage4(ticketmailto, ticketsmsto, passengers);
                } else {
                  setenterPassengerInformation(true);
                }
              } else if (passengers.length === 2) {
                if (
                  passengers[0].name !== "" &&
                  passengers[0].age !== "" &&
                  passengers[1].name !== "" &&
                  passengers[1].age !== ""
                ) {
                  continuePage4(ticketmailto, ticketsmsto, passengers);
                } else {
                  setenterPassengerInformation(true);
                }
              } else if (passengers.length === 3) {
                if (
                  passengers[0].name !== "" &&
                  passengers[0].age !== "" &&
                  passengers[1].name !== "" &&
                  passengers[1].age !== "" &&
                  passengers[2].name !== "" &&
                  passengers[2].age !== ""
                ) {
                  continuePage4(ticketmailto, ticketsmsto, passengers);
                } else {
                  setenterPassengerInformation(true);
                }
              }
            } else {
              setincompleteInformation(true);
              console.log("enter everything .. mail and mobile");
            }
          }}
        >
          Continue
        </button>
      </div>
    </>
  );
}
