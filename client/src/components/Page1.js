import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
function isDateInFuture(date) {
  return date > Date.now();
}

export default function Page1({
  continuePage1,
  setSource,
  setDestination,
  setDate,
  date,
  source,
  destination,
}) {
  const [incompleteInformation, setincompleteInformation] = useState("");
  const [dateissue, setdateissue] = useState("");

  return (
    <>
      <Header loggedin={true} />
      <div className="container  w-1/2 p-4   my-4 mx-auto rounded">
        <span className="block text-3xl my-2">Journey details</span>
        <form className="my-3 ">
          <div className="mb-3 " controlId="formBasicEmail">
            <label className="text-lg block my-1">Enter source</label>
            <input
              type="text"
              className="block border my-2  py-1 px-2 rounded "
              onChange={(e) => setSource(e.target.value)}
              placeholder="enter source"
              value={source}
            />
          </div>

          <div className="mb-3" controlId="formBasicPassword">
            <label className="text-lg block my-1">Enter destination</label>
            <input
              type="text"
              className="block border my-2 w-100 py-1 px-2 rounded "
              onChange={(e) => setDestination(e.target.value)}
              placeholder="enter destination"
              value={destination}
            />
          </div>
          <div className="mb-3" controlId="formBasicPassword">
            <label className="text-lg block my-1">Enter date of journey</label>
            <input
              type="date"
              placeholder="enter date of journey"
              className="block border my-2 w-100 py-1 px-2 rounded "
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
            {dateissue && (
              <span className="text-muted">
                Date should be greater than today's
              </span>
            )}
          </div>
          <div className="mb-3" controlId="formBasicCheckbox">
            {incompleteInformation && (
              <span className="text-red-600 block  ">
                Source and destination cannot be empty
              </span>
            )}
          </div>
          <button
            variant="primary"
            type="submit"
            className="bg-green-600 px-3 hover:bg-green-700 py-2 text-lg text-white rounded "
            onClick={(e) => {
              e.preventDefault();
              if (source != "" && destination != "") {
                if (isDateInFuture(new Date(date))) {
                  continuePage1(source, destination, date);
                  setdateissue(false);
                  setincompleteInformation(false);
                } else {
                  console.log("date ");
                  setdateissue(true);
                  setincompleteInformation(false);
                }
              } else {
                // console.log("enter everything")
                setincompleteInformation(true);
                setdateissue(false);
              }
            }}
          >
            Continue
          </button>
        </form>
      </div>{" "}
    </>
  );
}
