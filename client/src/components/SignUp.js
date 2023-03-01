import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import Header from "./Header"
export default function SignUp() {
  let navigate = useNavigate();

  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [msg, setmsg] = useState("");
  function loginClicked() {
    navigate("../login");
  }
  async function createNewUserFunction() {
    if (
      firstname != "" &&
      lastname != "" &&
      mobile != "" &&
      password != "" &&
      email != ""
    ) {
      setmsg("");
      let response = await axios.post("http://localhost:8000/create-user", {
        firstname,
        lastname,
        email,
        mobile,
        password,
      });
      if (response) {
        if (response.data.status) {
          console.log("shayad created");
          let token = response.data.token;
          localStorage.setItem("tkt", token);
          navigate("/");
        }
        setmsg(response.data.msg);
      }
    } else {
      setmsg("enter everything");
    }
  }
  return (
    <> <Header />
    <div className="  p-3  w-1/2 mx-auto my-4 rounded  ">
      <span className="my-4  text-3xl block ">Create new account</span>
      <form className="  my-2">
        <div className="my-3">
          <label className="text-sm text-gray-500 block ">First Name</label>
          <input
            type="text"
            name="firstName"
            className="block border border-gray-300 rounded py-1  px-2 w-1/2 "
            placeholder="First Name"
            onChange={(e) => {
              setfirstName(e.target.value);
            }}
          />
        </div>
        <div className="my-3">
          <label className="text-sm text-gray-500 block">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="block border border-gray-300 rounded py-1  px-2  w-1/2"
            placeholder="Last Name"
            onChange={(e) => {
              setlastName(e.target.value);
            }}
          />
        </div>
        <div className="my-3">
          <label className="text-sm text-gray-500 block ">Email</label>

          <input
            type="email"
            name="email"
            className="block border border-gray-300 rounded py-1  px-2 w-1/2 "
            placeholder="email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </div>
        <div className="my-3">
          <label className="text-sm text-gray-500 block ">Mobile No.</label>

          <input
            type="text"
            name="mobile"
            className="block border border-gray-300 rounded py-1  px-2 w-1/2"
            placeholder="mobile"
            onChange={(e) => {
              setmobile(e.target.value);
            }}
          />
        </div>

        <div className="my-3">
          <label className="text-sm text-gray-500 block ">Password</label>
          <input
            type="password"
            className="block border border-gray-300 rounded py-1  px-2 w-1/2"
            name="password"
            placeholder="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>
      </form>
      {msg && <span className="block text-red-600 my-3">{msg}</span>}
      <button
        className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 rounded block my-3 "
        onClick={() => {
          if (
            firstname != "" &&
            lastname != "" &&
            mobile != "" &&
            password != "" &&
            email != ""
          ) {
            setmsg("");
            createNewUserFunction();
          } else {
            setmsg("enter everything");
          }
        }}
      >
        Register
      </button>
      <br />
      <span
        className="block cursor-pointer text-blue-500 "
        
        onClick={() => {
          loginClicked();
        }}
      >
        {" "}
        Already have an account ? Login
      </span>
    </div></>
  );
}
