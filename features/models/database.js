const mongoose = require("mongoose");

exports.dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => {
      console.log("Database connection Successful");
    })
    .catch((err) => {
      console.log(err);
    });
};
