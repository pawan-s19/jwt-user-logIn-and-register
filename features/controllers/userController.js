const userModel = require("../models/userModel");
const sendToken = require("../utils/acquireJWTToken");
const { sendMail } = require("../utils/sendMail");
const crypto = require("crypto");
const productModel = require("../models/productModel");
exports.registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await userModel.create({
    username,
    email,
    password,
    profilePic: { public_id: "abc", url: "cde" },
  });

  if (!user) res.status(500).json({ message: "unable to create user" });
  sendToken(user, 201, res);
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ messsage: "Missing credentials" });
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user)
    return res
      .status(500)
      .json({ message: "user not found ! invalid credentials" });

  const matchingUserPassword = await user.comparePassword(password);

  if (!matchingUserPassword)
    return res
      .status(500)
      .json({ message: "user not found ! invalid credentials" });

  sendToken(user, 200, res);
};

//logout user

exports.logout = async (req, res, next) => {
  // req.cookie("token", null, {
  //   expires: new Date(Date.now()),
  //   httpOnly: true,
  // });
  // res.status(201).json({message:"Logged Out Successfully"})

  res.clearCookie("token");
  res.status(200).json({ message: "user logged out" });
};

exports.forgotPassword = async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  const token = user.getPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/resetpassword/${token}`;

  const message = `Your password reset url is ${resetUrl}`;

  try {
    await sendMail({
      email: user.email,
      subject: "E-commerce Password recovery",
      message: message,
    });

    res.status(200).json({
      message: `Email sent successfully to ${user.email}`,
    });
  } catch (err) {
    (user.resetPasswordToken = undefined),
      (user.resetPasswordExpire = undefined),
      await user.save({ validateBeforeSave: false });
    return res.status(500).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Link is invalid or has expired" });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
};

exports.getUserDetails = async (req, res, next) => {
  const user = await userModel.findOne({ _id: req.user.id });

  if (!user) return res.status(500).json({ message: "user not found" });

  res.status(200).json({ message: "success", user });
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await userModel
      .findOne({ _id: req.user.id })
      .select("+password");

    const isPasswordMatched = await user.comparePassword(
      req.body.currentPassword
    );
    if (!isPasswordMatched)
      return res.status(400).json({ message: "Incorrect Password" });

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({ message: "Passwords doesn't match" });
    }

    user.password = req.body.newPassword;

    await user.save();
    sendToken(user, 200, res);
  } catch (err) {
    console.log(err.message);
  }
};

exports.updateProfile = async (req, res, next) => {
  const updateDetails = {
    username: req.body.username,
    email: req.body.email,
  };
  const user = await userModel.findByIdAndUpdate(req.user.id, updateDetails);

  res.status(200).json({ message: "success", user });
};
//admin can get all users
exports.getAllUsers = async (req, res, next) => {
  const users = await userModel.find();
  if (!users) return res.status(400).json({ message: "No users found !" });
  res.status(200).json({ message: "success", users });
};
// admin can see single user
exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id });
    if (!user)
      return res
        .status(400)
        .json({ message: `No user exists with id : ${req.params.id}` });
    res.status(200).json({ message: "success", user });
  } catch (err) {
    res.status(401).json({ message: "Invalid user id" });
  }
};
//only admin can update User with role
exports.updateUserRole = async (req, res, next) => {
  const updateDetails = {
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
  };
  await userModel.findByIdAndUpdate(req.params.id, updateDetails);

  res.status(200).json({ message: "success" });
};
//only admin can delete user
exports.deleteUser = async (req, res, next) => {
  const user = await userModel.findOne({ _id: req.params.id });
  if (!user) return res.status(400).json({ message: "user not found" });
  await user.remove();
  res.status(200).json({ message: "user deleted successfully !" });
};
