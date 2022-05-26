const userModel = require("../models/user");
// const mongoose = require("mongoose");
const { saveImg } = require("../utils/cloudinary");
exports.signup = async (req, res) => {
  try {
    const result = await saveImg(req.files.profile_pic);
    req.body.profile_pic = result.secure_url;
    const user = await userModel.create(req.body);
    user.password = undefined;
    const token = user.getJWTToken();
    res.status(201).json({
      success: true,
      data: user,
      token,
      message: "Successfully signed up",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) throw { message: "Password is missing" };
    delete req.body.password;
    const user = await userModel.findOne(req.body).select("+password");
    if (!user) throw { message: "No Such User Found" };
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) throw { message: "No Such User Found" };
    const token = user.getJWTToken();
    user.password = undefined;
    res.status(200).json({
      success: true,
      data: user,
      token,
      message: "Logged In Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.loadUser = (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};
