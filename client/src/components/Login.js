import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  function registerClicked() {
    navigate("/signup");
  }
  const [email, setemail] = useState("ruturajpandav18@gmail.com");
  const [password, setpassword] = useState("Rxcd8ki@123");
  const [msg, setmsg] = useState("");

  async function loginFunction() {
    if (email != "" && password != "") {
      let response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      if (response) {
        if (response.data.status) {
          console.log("login grant");
          let token = response.data.token;
          localStorage.removeItem("tkt");
          localStorage.setItem("tkt", token);
          navigate("/");
        } else {
          setmsg(response.data.msg);
        }
      }
    } else {
      setmsg("Enter email and password");
    }
  }
  return (
    <>
      {" "}
      <Header  />{" "}
      <div className=" container  py-3 px-5   block w-1/2 my-5 mx-auto rounded">
        <span className="my-4 block text-3xl   ">Enter login credentials</span>
        <form
          className="block  w-2/3  my-2"
          onSubmit={(e) => {
            e.preventDefault();
            loginFunction();
          }}
        >
          <div>
            <label className="block text text-gray-500  my-1">Email</label>
            <input
              type="email"
              name="userEmail"
              className="block border border-gray-300 py-1 px-2 rounded  w-2/3"
              value={email}
              placeholder="enter your email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="block text text-gray-500  my-1">Password</label>
            <input
              type="password"
              className="block border border-gray-300 py-1 px-2 rounded  w-2/3"
              name="userPassword"
              value={password}
              placeholder="enter your password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>
          <span className="block text-red-500 my-2">{msg}</span>
          <button
            type="submit"
            className="bg-green-600 px-3 hover:bg-green-700 py-2 text-lg text-white rounded my-2"
          >
            login
          </button>
        </form>

        <br />

        <span
          className="text-blue-500 block cursor-pointer hover:text-blue-700"
          onClick={() => {
            registerClicked();
          }}
        >
          Create an account
        </span>
      </div>
    </>
  );
}
