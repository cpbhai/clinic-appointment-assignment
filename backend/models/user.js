const mongoose = require("mongoose");
const { Password, isEmail } = require("../utils/validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profile_pic: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  });
};

//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.path("email").validate(function (email) {
  return isEmail(email);
}, "Invalid email was provided");

userSchema.path("password").validate(function (password) {
  return Password(password);
}, "Password must be equal or greater than 6 characters.");

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
