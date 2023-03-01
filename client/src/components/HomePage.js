import Features from "./Features";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import Header from "./Header";
// import Carouse from "./Carouse";

import React, { Component } from "react";
import axios from "axios";
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
    };
  }
  componentDidMount() {
    
    this.isLoggedIn();
  }
  isLoggedIn = async () => {
    console.log("checking if loggedin");
    let token = localStorage.getItem("tkt");
    if (token !== null || token !== undefined) {
      console.log("hoempage : token : ", token);
      let response = await axios.post("http://localhost:8000/verify-login", {
        token,
      });
      if (response.data.status) {
        this.setState({ loggedin: true });
      } else {
        this.setState({ loggedin: false });
      }
    }
  };
  render() {
    return (
      <>
        <Header loggedin={this.state.loggedin} />
        {/* <Header loggedin={this.state.loggedin} /> */}
        {/* <Carouse /> */}
        <Features />
        <ContactUs  loggedin={this.state.loggedin}/>
        <Footer />
      </>
    );
  }
}
