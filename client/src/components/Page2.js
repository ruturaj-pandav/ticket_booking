import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header"
export default function Page2({
  continuePage2,
  source,
  destination,
  rides,
  backButtonFunction,
}) {
  function handleChange(event) {
    setsort(event.target.value);
  }

  const [sort, setsort] = useState("duration");
  if (sort != "") {
    if (sort == "price") {
      rides.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sort == "duration") {
      rides.sort((a, b) => {
        return a.duration - b.duration;
      });
    }
  }
  return (
    <><Header loggedin={true} /><div className="container  mx-auto block w-2/3">
      <span className="text-3xl block my-3 ">Select Bus Operator</span>
      <span className=" block py-2 my-3  ">
        {rides.length} buses found between{" "}
        <span className="font-semibold">{source} </span> and
        <strong> {destination}</strong>
        {/* here show sort , filter  */}
      </span>
      <hr />
      <div className="block   m-1">
        <span className="text-xl mb-3 font-bold block ">Sort by</span>
        <span>
          <select
            aria-label="Default select example"
            className="w-25 border rounded block  my-2"
            onChange={(event) => {
              handleChange(event);
            }}
          >
            <option value="price">Price</option>
            <option value="duration">Duration</option>
            {/* <option value="3">Three</option> */}
          </select>
        </span>
      </div>
      <hr />
      {rides.map((ride, i) => {
        return (
          <div
            className={
              "my-4 mx-1 border border-grey py-3 px-3 grid grid-cols-6 " +
              (ride.primo
                ? "bg-green-50 border-green-500 shadow-lg rounded "
                : "border-grey shadow-sm ")
            }
          >
            <div className="col-span-5">
              <div>
                <div className="flex justify-between">
                  <div className=" border rounded m-2 px-2 py-1 border-grey h4">
                    {ride.name} travels
                  </div>
                  <div className="border rounded m-2 px-2 py-1 border-grey h4 ms-auto">
                    &#8377; {ride.price}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="border rounded mx-2 my-1  px-2 border-grey">
                    Departure - {ride.departure}:00 hrs
                  </div>
                  <div className="border rounded  mx-2 my-1  px-2 border-grey ms-auto">
                    Arrival - {ride.arrival}:00 hrs
                  </div>
                  <div className="border rounded     mx-2 my-1  px-2 border-grey ms-auto">
                    Duration - {ride.duration} hrs
                  </div>
                </div>
              </div>
            </div>
            <div
              lg={2}
              className="bg-green-500 hover:bg-green-400 text-white text-center text-2xl  rounded  "
              style={{ cursor: "pointer" }}
              onClick={() => {
                continuePage2(ride.name, ride.price, ride.duration, 2200);
              }}
            >
              Book Now
            </div>
          </div>
        );
      })}

      <button
        className="py-1 px-2 rounded bg-red-700 btn-sm hover:bg-red-600 text-white"
        onClick={() => {
          backButtonFunction();
        }}
      >
        back
      </button>

      {/* <button onClick={() => {
        // continuePage2(source, destination, date)
      }}>continue</button> */}
    </div></>
    
  );
}
