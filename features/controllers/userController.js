const userModel = require("../models/userModel");
const sendToken = require("../utils/acquireJWTToken");
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
    res.status(500).json({ message: "user not found ! invalid credentials" });

  const matchingUserPassword = user.comparePassword(password);

  if (!matchingUserPassword)
    res.status(500).json({ message: "user not found ! invalid credentials" });

  sendToken(user, 200, res);
};
