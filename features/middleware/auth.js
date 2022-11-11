const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res
      .status(401)
      .json({ message: "Sorry you are not loggedIn ! Login to continue" });
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await userModel.findOne({ _id: decodedData.id });
  next();
};

exports.isAdmin = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role type ${req.user.role} cannot access this resource`,
      });
    }
    next();
  };
};
