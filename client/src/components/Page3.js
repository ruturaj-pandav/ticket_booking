import React from "react";
import { useState } from "react";
import Header from "./Header";
import Modal from "react-bootstrap/Modal";
export default function Page3({
  seats,
  beforeseats,
  setSeats,
  resetSeats,
  removeSeat,
  continuePage3,
  backButtonFunction,
}) {
  console.log("seats aye hai ye  : ", seats);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [maxseats, setmaxseats] = useState(seats.length > 3 ? true : false);

  let div1 = [];
  let div2 = [];
  let div3 = [];
  let div4 = [];

  for (let i = 0; i < 10; i++) {
    div1.push(
      <div
        style={{
          cursor: beforeseats.includes(i + 1) ? "no-drop" : "pointer",
          pointerEvents: beforeseats.includes(i + 1) && "none",
        }}
        className={`border border-gray-300 py-1 px-2 rounded   mx-1 ${
          seats.includes(i + 1) ? "text-white bg-green-500 " : ""
        } ${beforeseats.includes(i + 1) ? "text-white bg-gray-500 " : ""}`}
        onClick={() => {
          if (seats.includes(i + 1)) {
            removeSeat(i + 1);
          } else {
            if (seats.length < 3) {
              setSeats(i + 1);
            } else {
              setmaxseats(true);
            }
          }
        }}
      >
        <span
          className={`"text-muted ${
            seats.includes(i + 1) ? "text-white " : ""
          } ${beforeseats.includes(i + 1) ? "text-white " : ""}`}
        >
          {i + 1}
        </span>
      </div>
    );
  }
  for (let i = 10; i < 20; i++) {
    div2.push(
      <div
        style={{
          cursor: beforeseats.includes(i + 1) ? "no-drop" : "pointer",
          pointerEvents: beforeseats.includes(i + 1) && "none",
        }}
        className={`border border-gray-300 py-1 px-2 rounded   mx-1 ${
          seats.includes(i + 1) ? "text-white bg-green-500 " : ""
        } ${beforeseats.includes(i + 1) ? "text-white bg-gray-500 " : ""}`}
        onClick={() => {
          console.log("seat clicked");
          if (seats.includes(i + 1)) {
            console.log("seat includes already");
            removeSeat(i + 1);
          } else {
            console.log("seat not therw");
            if (seats.length < 3) {
              setSeats(i + 1);
            } else {
              setmaxseats(true);
            }
          }
        }}
      >
        <span
          className={`"text-muted ${
            seats.includes(i + 1) ? "text-white " : ""
          } ${beforeseats.includes(i + 1) ? "text-white " : ""}`}
        >
          {i + 1}
        </span>
      </div>
    );
  }
  for (let i = 20; i < 30; i++) {
    div3.push(
      <div
        style={{
          cursor: beforeseats.includes(i + 1) ? "no-drop" : "pointer",
          pointerEvents: beforeseats.includes(i + 1) && "none",
        }}
        className={`border border-gray-300 py-1 px-2 rounded   mx-1 ${
          seats.includes(i + 1) ? "text-white bg-green-500 " : ""
        } ${beforeseats.includes(i + 1) ? "text-white bg-gray-500 " : ""}`}
        onClick={() => {
          console.log("seat clicked");
          if (seats.includes(i + 1)) {
            console.log("seat includes already");
            removeSeat(i + 1);
          } else {
            console.log("seat not therw");
            if (seats.length < 3) {
              setSeats(i + 1);
            } else {
              setmaxseats(true);
            }
          }
        }}
      >
        <span
          className={`"text-muted ${
            seats.includes(i + 1) ? "text-white " : ""
          } ${beforeseats.includes(i + 1) ? "text-white " : ""}`}
        >
          {i + 1}
        </span>
      </div>
    );
  }
  for (let i = 30; i < 40; i++) {
    div4.push(
      <div
        style={{
          cursor: beforeseats.includes(i + 1) ? "no-drop" : "pointer",
          pointerEvents: beforeseats.includes(i + 1) && "none",
        }}
        className={`border border-gray-300 py-1 px-2 rounded   mx-1 ${
          seats.includes(i + 1) ? "text-white bg-green-500 " : ""
        } ${beforeseats.includes(i + 1) ? "text-white bg-gray-500 " : ""}`}
        onClick={() => {
          console.log("seat clicked");
          if (seats.includes(i + 1)) {
            console.log("seat includes already");
            removeSeat(i + 1);
          } else {
            console.log("seat not therw");
            if (seats.length < 3) {
              setSeats(i + 1);
            } else {
              setmaxseats(true);
            }
          }
        }}
      >
        <span
          className={`"text-muted ${
            seats.includes(i + 1) ? "text-white " : ""
          } ${beforeseats.includes(i + 1) ? "text-white " : ""}`}
        >
          {i + 1}
        </span>
      </div>
    );
  }
  return (
    <>
      <Header loggedin={true} />
      <div className=" container w-2/3 mx-auto border-grey p-5   my-4 rounded">
        {show && (
          <div
            className=" antialiased font-medium text-gray-800  bg-white"
            x-data="{ modal: true }"
          >
            <div className="max-w-sm p-2 mx-auto bg-white border-[1px] border-gray-200 shadow rounded-xl hover:shadow-lg transition-all duration-150 ease-linear">
              <div className="relative p-6">
                <span className="text-3xl ">Proceed ?</span>
                <p className="text-sm text-gray-500">
                  Are you sure you want to proceed with the selected seats
                </p>

                <div className="flex flex-row mt-6 space-x-2 justify-evenly">
                  <button
                    onClick={() => {
                      handleClose();
                    }}
                    className=" cursor-pointer bg-red-500 hover:bg-red-400 text-white py-1 px-3  rounded"
                  >
                    back
                  </button>
                  <button
                    onClick={() => {
                      continuePage3(seats);
                    }}
                    className="bg-green-600 px-3 hover:bg-green-700 py-2 text-lg text-white rounded "
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!show && (
          <div>
            {" "}
            <span className="block text-3xl my-2 ">Select seats</span>
            <p className=" pt-3">
              {seats.length > 0 ? (
                seats.map((seat) => {
                  return (
                    <span className="border border-grey py-1 px-2">
                      {seat}{" "}
                    </span>
                  );
                })
              ) : (
                <span className="block text-gray-600 my-2 ">
                  No seats selected{" "}
                </span>
              )}
            </p>
            {maxseats && (
              <span className="block my-3 text-red-500">
                max 3 seats can be selected
              </span>
            )}
            {seats.length > 0 && (
              <button
                onClick={() => {
                  resetSeats();
                }}
                className="block  bg-yellow-300 text-white hover:bg-yellow-400 py-1 px-2 rounded my-3  "
              >
                reset seats
              </button>
            )}
            <div className="border border-dark rounded w-2/3 my-4">
              <div className="px-3 py-1 grid grid-cols-10">{div1}</div>
              <div className="px-3 py-1 grid grid-cols-10">{div2}</div>
              <br />
              <div className="px-3 py-1 grid grid-cols-10">{div3}</div>
              <div className="px-3 py-1 grid grid-cols-10">{div4}</div>
            </div>
            <button
              className="py-1 px-2 rounded bg-red-700 btn-sm hover:bg-red-600 text-white "
              onClick={() => {
                console.log("back button clicke here ... ");
                backButtonFunction();
              }}
            >
              Back
            </button>
            {seats.length > 0 ? (
              <button
                className="py-1 px-2 rounded bg-green-600 btn-sm mx-2 hover:bg-green-700 text-white"
                onClick={() => {
                  if (seats.length > 0) {
                    handleShow();
                    // continuePage3(seats);
                  } else {
                    alert("select at least one seat");
                  }
                }}
              >
                continue
              </button>
            ) : (
              <span className=" m-1 text-success">select seats to proceed</span>
            )}
          </div>
        )}
      </div>{" "}
    </>
  );
}
