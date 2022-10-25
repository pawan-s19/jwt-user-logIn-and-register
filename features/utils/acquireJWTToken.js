//creating token and saving it in coookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    message: "success",
    user,
    token,
  });
};
module.exports = sendToken;
