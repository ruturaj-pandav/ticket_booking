import logo from "../images/logo.png";

import { useNavigate, Link } from "react-router-dom";
export default function Header({ loggedin }) {
  let navigate = useNavigate();
  function loginClicked() {
    navigate("../login");
  }
  function registerClicked() {
    navigate("../signup");
  }
  function logoutFunction() {
    localStorage.removeItem("tkt");
    window.location.href = "http://localhost:3000/login";
  }
  return (
    <div class=" py-4 shadow-lg bg-gray-50 ">
      <div class="flex justify-between container mx-auto  align-middle ">
        {" "}
        <div>
          <span
            onClick={() => {
              window.location.href = "http://localhost:3000/";
            }}
            className="text-2xl font-bold block  cursor-pointer hover:scale-105 duration-200"
          >
            <img
              src={logo}
              className="rounded-3  h-12 cursor-pointer hover:scale-105  duration-500"
              alt="logo"
              onClick={() => {
                window.location.href = "http://localhost:3000";
              }}
            />
          </span>
        </div>
        <div className="align-middle ">
          <span
            onClick={() => {
              window.location.href = "http://localhost:3000/about-us";
            }}
            className="text-gray-500 hover:text-gray-400 cursor-pointer duration-300  mx-2 text-lg"
          >
            About us
          </span>
          <span
            onClick={() => {
              window.location.href = "http://localhost:3000/contact-us";
            }}
            className="text-gray-500 hover:text-gray-400 cursor-pointer duration-300  mx-2 text-lg"
          >
            Contact us
          </span>
          <span
            onClick={() => {
              window.location.href = "http://localhost:3000/book-tickets";
            }}
            className="text-gray-500 hover:text-gray-400 cursor-pointer duration-300  mx-2 text-lg"
          >
            Book Tickets
          </span>
        </div>
        {loggedin === true ? (
          <div>
            <button
              onClick={() => {
                window.location.href = "http://localhost:3000/my-bookings";
              }}
              className=" cursor-pointer bg-gray-500 mx-2  hover:bg-gray-400 text-white py-1 px-2  rounded"
            >
              My bookings
            </button>
            <button
              onClick={() => {
                logoutFunction();
              }}
              className=" cursor-pointer bg-red-500 hover:bg-red-400 text-white py-1 px-2  rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                window.location.href = "http://localhost:3000/signup";
              }}
              className=" cursor-pointer bg-white-500 mx-2  hover:bg-white-400 text-gray-600 hover:text-white hover:bg-gray-400 duration-400 border border-gray-500  py-1 px-2  rounded"
            >
              Register
            </button>
            <button
              onClick={() => {
                window.location.href = "http://localhost:3000/login";
              }}
              className=" cursor-pointer bg-blue-500 hover:bg-blue-400 text-white py-1 px-2  rounded"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
    // <div className="container border-2 h-16  mx-auto flex justify-between content-center">
    //   <div className="  ">
    //     <img
    //       src={logo}
    //       className="round-2 h-16 cursor-pointer hover:scale-105  duration-500"
    //       alt="logo"
    //       onClick={() => {
    //         window.location.href = "http://localhost:3000";
    //       }}
    //     />
    //   </div>
    //   <div className="flex justify-between content-center   ">
    //     <span
    //       onClick={() => {
    //         window.location.href = "http://localhost:3000/book-tickets";
    //       }}
    //       className="inline-block  cursor-pointer    content-center  mx-2 text-lg text-gray-500  hover:text-gray-600  "
    //     >
    //       book tickets
    //     </span>
    //     <span
    //       onClick={() => {
    //         window.location.href = "http://localhost:3000/about-us";
    //       }}
    //       className="inline cursor-pointer    content-center   mx-2 text-lg text-gray-500  hover:text-gray-600 "
    //     >
    //       about us{" "}
    //     </span>
    //     <span
    //       onClick={() => {
    //         window.location.href = "http://localhost:3000/contact-us";
    //       }}
    //       className="inline   cursor-pointer  content-center  mx-2 text-lg text-gray-500  hover:text-gray-600  "
    //     >
    //       contact us{" "}
    //     </span>
    //   </div>
    //   <div className="">
    //     {" "}
    //     {loggedin === false ? (
    //       <>
    //         <button
    //           className="bg-green-600 hover:bg-green-500 text-lg text-white mx-2 px-2 py-1 rounded "
    //           onClick={() => {
    //             loginClicked();
    //           }}
    //         >
    //           Login
    //         </button>
    //         <button
    //           className="bg-white  text-lg text-green-600 hover:text-green-500 border border-green-500  mx-2 px-2 py-1 rounded "
    //           onClick={() => {
    //             registerClicked();
    //           }}
    //         >
    //           Register
    //         </button>
    //       </>
    //     ) : (
    //       <>
    //         <Link to={`/my-bookings`}>
    //           {" "}
    //           <button className="mx-1 text-white bg-gray-500 py-1 px-2 rounded hover:bg-gray-600  ">
    //             Bookings
    //           </button>
    //         </Link>
    //         <Link to={`/`}>
    //           {" "}
    //           <button
    //             className="mx-1 bg-red-500 text-white py-1 hover:bg-red-400  px-2 rounded "
    //             onClick={() => {
    //               logout();
    //             }}
    //           >
    //             Logout
    //           </button>
    //         </Link>
    //       </>
    //     )}
    //   </div>
    // </div>
  );
}
