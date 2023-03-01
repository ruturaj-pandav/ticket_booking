import React from "react";
import { useState, useEffect } from "react";

import Header from "./Header";

import moment from "moment";

import axios from "axios";
export default function MyBookings() {
  const [bookings, setbookings] = useState([]);
  const [showgtl, setshowgtl] = useState(false);
  let ride;
  async function getBookings() {
    console.log("my bokings use efeect");
    let token = localStorage.getItem("tkt");
    if (token !== undefined && token !== "" && token !== null) {
      console.log("token from bookigns : ", token);
      let response = await axios.post("http://localhost:8000/my-bookings", {
        token,
      });
      if (response.data.status) {
        console.log("bookings received shayad");
        setbookings(response.data.bookings);
        console.log(response.data.bookings);
      }
    } else {
      setshowgtl(true);
      window.location.href = "http://localhost:3000/login"
    }
  }
  useEffect(() => {
    getBookings();
  }, []);
  return (
    <>
      <Header loggedin={true} />

      <div className="border border-grey p-5  container mx-auto w-2/3  my-4 rounded">
        <span className="text-3xl block my-3">All bookings</span>
        {bookings.map((booking) => {
          return (
            <div>
              <div className="border border-1 rounded my-2 px-3 py-2">
                <div class="flex justify-between   my-5  ">
                  <div>
                    {" "}
                    <span className=" text-2xl block rounded px-2">
                      {booking.travels} travels
                    </span>
                  </div>
                  <div>
                    <span className="text-xl underline ">
                      {" "}
                      {booking.source} - {booking.destination}
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl "> {booking.amount} </span>{" "}
                  </div>
                </div>
                <div class="flex justify-center   my-5 ">
                  <div className="mx-2">
                    {booking.seats.map((seat) => {
                      return <span className="py-1 px-2 border ">{seat} </span>;
                    })}
                  </div>
                  <div className="mx-2">
                    {" "}
                    {booking.passengers.map((passenger) => {
                      return (
                        <span className="py-1 px-2 border ">
                          {passenger.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div class="flex justify-center   my-5  ">
                  <div>
                    <span className="mx-3 ">
                      {" "}
                      Date - :{moment(booking.dateCreated).format("MM/DD/YYYY")}
                    </span>
                  </div>
                  <div>
                    <span className="mx-3 ">
                      {" "}
                      Duration - {booking.duration} hrs
                    </span>
                  </div>
                </div>
                {/* 
                   

                    <div direction="horizontal" gap={3}>
                      <div className="border rounded mx-2 my-1  px-2 border-grey">
                        date - :{" "}
                        {moment(booking.dateCreated).format("MM/DD/YYYY")}
                      </div>
                     
                      <div className="border rounded     mx-2 my-1  px-2 border-grey ms-auto">
                        Duration - {booking.duration} hrs
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          );
        })}

        <div></div>
      </div>
    </>
  );
}
