const mongoose = require("mongoose");
const { phoneNumber, isEmail } = require("../utils/validator");

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    symptoms: {
      type: Array,
      default: [],
    },
    datetime: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
appointmentSchema.path("mobile").validate(function (mobile) {
  return phoneNumber(mobile);
}, "mobile must be a 10 digit number");

appointmentSchema.path("email").validate(function (email) {
  return isEmail(email);
}, "Invalid email was provided");

module.exports =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
