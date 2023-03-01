const express = require("express");
const jwt = require("jsonwebtoken");
const sha1 = require("sha1");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/tkt", (err) => {
  if (err) {
    console.error("ERROR while connecting to db");
    console.error(err);
  } else {
    console.log("CONNECTED to tkt database");
  }
});
const UserSchema = require("./schemas/userSchema");
const Bookings = require("./schemas/bookingSchema");

app.post("/my-bookings", async function (req, res) {
  console.log("bookings1");
  try {
    let token = req.body.token;
    console.log("bookings2");
    let verify = jwt.verify(token, process.env.JWT_SECRET);
    if (verify) {
      let email = verify.email;
      console.log("this is email : ", email);
      let user = await UserSchema.find({ email: email });
      console.log("bookings3");
      if (user) {
        console.log("user with that email found");
        console.log("bookings4");
        let bookings = await Bookings.find({ email: email });

        if (bookings) {
          console.log(bookings)
          console.log("bookings5");
          console.log("sufficient balance");
          res.json({
            status: true,
            msg: "done",
            bookings
          });
         
        }
        // res.json({
        //   status: false,
        //   msg: "not enough balance",
        // });
      }
    }
  } catch (error) {
    console.log("error in pay catch block : ", error.message);
  }
});
app.post("/pay", async function (req, res) {
  // to make payment

  // once issue here.. check for uploads with mobile number
  try {
    let { amount, token } = req.body;
    console.log("amoun, token : ", amount, token);
    let verify = jwt.verify(token, process.env.JWT_SECRET);
    if (verify) {
      let email = verify.email;
      console.log("this is email : ", email);
      let user = await UserSchema.find({ email: email });
      if (user) {
        console.log("user with that email found");
        if (user[0].balance >= amount) {
          console.log("sufficient balance");
          let newbalance = user[0].balance - amount;
          const filter = { email };
          const update = { balance: newbalance };
          let updateduser = await UserSchema.findOneAndUpdate(filter, update, {
            new: true,
          });
          if (updateduser) {
            console.log("updated user : ", updateduser);

            let {
              email,
              travels,
              seats,
              source,
              destination,
              amount,
              date,
              passengers,
              duration,
            } = req.body.booking;
            let thisbooking = await Bookings.create(req.body.booking);
            if (thisbooking) {
              console.log("this booking", thisbooking);
              res.json({
                status: true,
                paymentdone: true,
                bookingadded: true,
              });
            }
          }
        }
        res.json({
          status: false,
          msg: "not enough balance",
        });
      }
    }
  } catch (error) {
    console.log("error in pay catch block : ", error.message);
  }
});
app.post("/get-user-info", async (req, res) => {
  let token = req.body.token;

  try {
    let verify = jwt.verify(token, process.env.JWT_SECRET);
    if (verify) {
      let email = verify.email;
      let user = await UserSchema.find({ email: email });
      if (user) {
        let balance = user.balance;
        res.json({
          status: true,
          balance: user[0].balance,
          user: user[0],
        });
      } else {
        res.json({
          status: false,
          msg: "user not found",
        });
      }
    }
  } catch (error) {
    console.log("error in get-user-info catch");
    console.log("ERROR : ", error.message);
    res.json({
      status: false,
      msg: "some error.. pelase try agian later",
    });
  }
});

app.post("/create-user", async function (req, res) {
  // to create -user
  let { firstname, lastname, email, mobile, password } = req.body;

  let userwithemail = await UserSchema.find({ email });
  let userwithmobile = await UserSchema.find({ mobile });
  // once issue here.. check for uploads with mobile number
  password = sha1(password);
  if (userwithemail.length > 0 || userwithmobile.length > 0) {
    res.json({
      status: false,
      msg: "user with this email or mobile exists already",
    });
  } else {
    let newuser = {
      firstname,
      lastname,
      email,
      mobile,
      password,
    };
    let usercreate = await UserSchema.create(newuser);
    if (usercreate) {
      console.log("usercreated");
      let token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({
        status: true,
        msg: "accnt created",
        token: token,
      });
    }
  }
});

app.post("/verify-login", async function (req, res) {
  try {
    let token = req.body.token;
    let verify = jwt.verify(token, process.env.JWT_SECRET);
    if (verify) {
      res.json({
        status: true,
      });
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    console.log(" verify-login trycatch  :error: ", error);
    res.json({
      status: false,
      msg: "some error occurred",
    });
  }
});
app.post("/login", async function (req, res) {
  console.log("trying to login");

  try {
    let { email, password } = req.body;

    let user = await UserSchema.find({ email: email });

    if (user.length > 0) {
      console.log("user matches with email");
      if (user[0].password == sha1(password)) {
        console.log("matche");
        let token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        console.log("new token sent");
        res.json({
          status: true,
          msg: "login found",
          token: token,
        });
      } else {
        res.json({
          status: false,
          msg: "incorrect password",
        });
      }
    } else {
      res.json({ status: false, msg: "email not found" });
    }
  } catch (error) {
    console.log(" login trycatch  :error: ", error);
    res.json({
      status: false,
      msg: "some error occurred",
    });
  }
});

app.get("/home", function (req, res, next) {
  console.log("get request on home");
});

app.listen(8000, () => {
  console.log("listening 8000");
});

// const express = require("express");
// const cors = require("cors");
// const app = express();
// const mongoose = require("mongoose");

// const Cars = require("./schemas/carSchema");
// const sha1= require("sha1");
// app.use(cors());
// app.use(express.json());

// // all post functions
// app.post("/admin-login", async function (req, res) {
//   // verify admin login details

//   if ( req.body.payload.adminemail === "admin@gmail.com" &&  req.body.payload.adminpassword === "password") {
//     res.json({
//       adminVerified: true,
//     });
//   } else {
//     res.json({
//       adminVerified: false,
//     });
//   }
// });
// app.post("/login", async function (req, res) {
//   // login function .. yet to send jokens and jwt .. implement jwt here
//   let payload = req.body.payload;
//   let useralready = await UserSchema.find({
//     email: payload.email,
//     password: sha1(payload.password),
//   });

//   if (useralready.length === 1) {
//     console.log("user found")
//     res.json({
//       userFound: true,
//     });
//   } else {
//     console.log("user not found")
//     res.json({
//       userFound: false,
//     });
//   }
// });
// app.post("/post-a-car", async function (req, res) {

//   // to post a car
//   let payload = req.body.payload;

//   let car = {
//     company: payload.CarCompany.toLowerCase(),
//     model: payload.CarModel.toLowerCase(),
//     type: payload.CarType.toLowerCase(),
//     seats: payload.CarSeats,
//     buyingYear: payload.CarBuyingYear,
//     desc: payload.CarDescription.toLowerCase(),
//     ownerID: payload.CarOwnerID,
//     rentprice: payload.CarRentPrice,
//   };

//   console.log(car)
//   let carentry = await Cars.create(car)

//   if (carentry) {
//     res.json({
//       carCreated  : true
//     })
//   }
//   else {
//     res.json({
//       carCreated : false
//     })
//   }

// });

// // all get functions
// app.get("/all-cars", async function (req, res) {
//   // get all cars in the db
//   let cars = await Cars.find({});
//   res.json({
//     items: cars.length,
//     cars,
//   });
// });
// app.get("/all-users", async function (req, res) {
//   // get all users in the db
//   let users = await UserSchema.find({});
//   res.json({
//     items: users.length,
//     users,
//   });
// });

// app.listen(8000, function () {
//   console.log("listening on 8000");
// });
