const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  source: {
    type: String,
    required: true,
  },

  destination: {
    type: String,
    required: true,
  },
  travels: {
    type: String,
    required: true,
  },
  seats: { type: [Number], required: true },

  passengers: {
    type: [Object],
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
   required :true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

let Bookings = mongoose.model("bookings", bookingSchema);
module.exports = Bookings;
