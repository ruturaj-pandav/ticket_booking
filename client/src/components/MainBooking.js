import * as React from "react";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Header from "./Header";
import Page4 from "./Page4";

import Page5 from "./Page5";
import Page6 from "./Page6";
import axios from "axios";

class DashboardContent extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      onstage: 1,

      /////
      source: "",
      destination: "",
      date: "",
      ////
      busname: "",
      busdeparture: null,
      busduration: null,
      perticketprice: 0,
      ////
      ticketcount: 0,
      seats: [],
      rides: [],
      beforeseats: [],

      paymentmode: "",

      ////////////////////////////////
      ticketmailto: "",
      ticketsmsto: "",
      passengers: [],
      ///
      balance: 0,
      paymentsuccess: false,
    };
  }

  // page1 methods - start
  genRandomSeats = () => {
    let thisarray = [];
    for (let i = 0; i < 10; i++) {
      let r = Math.floor(Math.random() * 39) + 1;
      if (!thisarray.includes(r)) {
        thisarray.push(r);
      }
    }
    this.setState({ beforeseats: thisarray });
  };
  setSeats = (seat) => {
    let curr = this.state.seats;

    let newarray = [...curr, seat];
    this.setState({ seats: newarray });
  };
  removeSeat = (seat) => {
    if (this.state.seats.includes(seat)) {
      let curr = this.state.seats;
      curr.splice(curr.indexOf(seat), 1);

      this.setState({ seats: curr });
    }
  };
  resetSeats = () => {
    this.setState({ seats: [] });
  };
  setSource = (source) => {
    this.setState({ source: source });
  };
  setDestination = (destination) => {
    this.setState({ destination: destination });
  };
  setDate = (date) => {
    this.setState({ date: date });
  };
  // page1 methods -end

  setTicketMailTo = (mail) => {
    this.setState({ ticketmailto: mail });
    // console.log("setting source to ", source);
  };
  goToBookingPage = () => {
    this.setState({ onstage: 1 });
  };

  setTicketSMSTo = (mobile) => {
    this.setState({ ticketsmsto: mobile });
    // console.log("setting source to ", source);
  };

  generatingBusData = () => {
    let operators = [
      "Shreyas",
      "Humsafar",
      "Rahi",
      "Himalaya",
      "Grand",
      "Purple",
      "Orange",
      "VRL",
      "Shatabdi",
      "Zing",
      "Neo",
      "Kesari",
      "Radheya",
    ];
    let thisdata = [];
    console.log("generating bus data");
    function getRandomNumberBetween(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    for (let i = 0; i < 8; i++) {
      let name = operators[getRandomNumberBetween(0, 9)];
      let price = getRandomNumberBetween(500, 1000);
      let primo = getRandomNumberBetween(0, 1);
      let duration = getRandomNumberBetween(5, 10);
      let departure = getRandomNumberBetween(20, 24);

      let arrival = duration + departure;
      if (arrival >= 24) {
        arrival = arrival - 24;
      }

      let thisbus = {
        name,
        price,
        primo,
        duration,
        arrival,
        departure,
      };
      // console.log(thisbus)

      thisdata.push(thisbus);
    }
    this.setState({ rides: thisdata });
  };

  getUserInfo = async () => {
    let token = localStorage.getItem("tkt");

    console.log("getuserinfo : token : ", token);
    if (token !== undefined || token !== null || token !== "") {
      let response = await axios.post("http://localhost:8000/get-user-info", {
        token,
      });
      if (response) {
        if (response.data.status) {
          this.setState({ ticketmailto: response.data.user.email });
          this.setState({ user: response.data.user });
          this.setState({ ticketsmsto: response.data.user.mobile });

          this.setState({ balance: parseInt(response.data.balance) });
          // this.setState({ gtlmodal: false });
        } else {
          console.log("user not verifyed");
          // this.setState({ gtlmodal: true });
          window.location.href = "http://localhost:3000/login";
        }
      }
    }
  };

  continuePage1 = (source, destination, date) => {
    console.log(source, destination, date);
    this.setState({
      source: source.toLowerCase(),
      destination: destination.toLowerCase(),
      date: date,
    });
    this.setState({ onstage: this.state.onstage + 1 });
    this.generatingBusData();
  };

  continuePage2 = (busname, perticketprice, busduration, busdeparture) => {
    this.setState({ busname: busname });
    this.setState({ perticketprice: perticketprice });
    this.setState({ busduration: busduration });
    this.setState({ busdeparture: busdeparture });
    this.setState({ onstage: this.state.onstage + 1 });
  };

  continuePage3 = (seats) => {
    this.setState({ ticketcount: seats.length });
    this.setState({ seats: seats });
    this.setState({ onstage: this.state.onstage + 1 });
    if (seats.length === 1) {
      this.setState({ passengers: [] });
      this.setState({
        passengers: [{ name: this.state.user.firstname, age: "" }],
      });
    } else if (seats.length === 2) {
      this.setState({ passengers: [] });
      this.setState({
        passengers: [
          { name: this.state.user.firstname, age: "" },
          { name: "", age: "" },
        ],
      });
    } else if (seats.length === 3) {
      this.setState({ passengers: [] });
      this.setState({
        passengers: [
          { name: this.state.user.firstname, age: "" },
          { name: "", age: "" },
          { name: "", age: "" },
        ],
      });
    }
  };
  paymentFunction = async (amount) => {
    if (amount <= this.state.balance) {
      let token = localStorage.getItem("tkt");
      console.log("this is amount , ", amount);
      let booking = {
        email: this.state.user.email,
        travels: this.state.busname,
        seats: this.state.seats,
        source: this.state.source,
        destination: this.state.destination,
        date: this.state.date,
        amount: amount,
        passengers: this.state.passengers,
        duration: this.state.busduration,
      };
      if (token !== undefined || token !== "" || token !== null) {
        let response = await axios.post("http://localhost:8000/pay", {
          amount,
          token,
          booking,
        });
        if (response.data.status) {
          this.state.paymentsuccess = true;

          this.setState({ onstage: this.state.onstage + 1 });
        } else {
          if (response.data.enoughFunds === false) {
            this.state.paymentsuccess = false;

            this.setState({ onstage: this.state.onstage + 1 });
          }
        }
      }
    } else {
      alert("not enoguh");
      // not enough bal
    }
  };
  backButtonFunction = () => {
    this.setState({ onstage: this.state.onstage - 1 });
  };
  setPassengers = (i, col, val) => {
    let curr = this.state.passengers;
    curr[i][col] = val;
    this.setState({ passengers: curr });
  };
  continuePage4 = (ticketmailto, ticketsmsto, passengers) => {
    this.setState({ ticketmailto: ticketmailto });
    this.setState({ passengers: passengers });
    this.setState({ ticketsmsto: ticketsmsto });
    this.setState({ onstage: this.state.onstage + 1 });
  };

  componentDidMount() {
    this.getUserInfo();
    this.genRandomSeats();
  }

  /*-----------------*/
  render() {
    // if (this.state.thisUser == 0) {
    //   return <Navigate to="/login" replace={true} />;
    // }
    // if (this.state.userLoggedOut == 1) {
    //   return <Navigate to="/signin" replace={true} />;
    // }

    return (
      <>
        {this.state.onstage === 1 ? (
          <div>
            <Page1
              continuePage1={this.continuePage1}
              setSource={this.setSource}
              setDestination={this.setDestination}
              setDate={this.setDate}
              date={this.state.date}
              source={this.state.source}
              destination={this.state.destination}
            />
          </div>
        ) : null}
        {this.state.onstage === 2 ? (
          <div>
            <Page2
              continuePage2={this.continuePage2}
              backButtonFunction={this.backButtonFunction}
              source={this.state.source}
              destination={this.state.destination}
              rides={this.state.rides}
            />
          </div>
        ) : null}
        {this.state.onstage === 3 ? (
          <div>
            <Page3
              seats={this.state.seats}
              beforeseats={this.state.beforeseats}
              setSeats={this.setSeats}
              resetSeats={this.resetSeats}
              backButtonFunction={this.backButtonFunction}
              continuePage3={this.continuePage3}
              removeSeat={this.removeSeat}
              buschosen={this.state.buschosen}
            />
          </div>
        ) : null}
        {this.state.onstage === 4 ? (
          <div>
            <Page4
              setPassengers={this.setPassengers}
              passengers={this.state.passengers}
              ticketcount={this.state.ticketcount}
              seats={this.state.seats}
              continuePage4={this.continuePage4}
              backButtonFunction={this.backButtonFunction}
              source={this.state.source}
              ticketsmsto={this.state.ticketsmsto}
              destination={this.state.destination}
              ticketmailto={this.state.ticketmailto}
              busname={this.state.busname}
              setTicketMailTo={this.setTicketMailTo}
              user={this.state.user}
              setTicketSMSTo={this.setTicketSMSTo}
            />
          </div>
        ) : null}
        {this.state.onstage === 5 ? (
          <div>
            <Page5
              balance={this.state.balance}
              passengers={this.state.passengers}
              source={this.state.source}
              destination={this.state.destination}
              busname={this.state.busname}
              busduration={this.state.busduration}
              ticketmailto={this.state.ticketmailto}
              ticketsmsto={this.state.ticketsmsto}
              perticketprice={this.state.perticketprice}
              ticketcount={this.state.ticketcount}
              // balance={this.state.thisUser.user.balance}
              paymentFunction={this.paymentFunction}
              backButtonFunction={this.backButtonFunction}
            />
          </div>
        ) : null}
        {this.state.onstage === 6 ? (
          <div>
            <Page6
              paymentsuccess={this.state.paymentsuccess}
              ticketmailto="ruturajpandav18@gmail.com"
              // ticketmailto={this.state.ticketmailto}
              goToBookingPage={this.goToBookingPage}
              ticketsmsto="8605392969"
              // ticketsmsto={this.state.ticketsmsto}
            />
          </div>
        ) : null}
      </>
    );
  }
}
export default DashboardContent;
