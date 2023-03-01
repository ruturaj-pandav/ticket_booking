const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique : true
  },
  mobile: {
    type: String,
    required: true,
    unique : true
  },
 
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default : 5000
  },
  joined: {
    type: Date,
    default: Date.now,
  },
});

let Users = mongoose.model("users", usersSchema);
module.exports = Users;
