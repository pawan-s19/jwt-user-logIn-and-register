const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, "name is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
    maxLength: [8, "price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
  },
  category: {
    type: String,
    required: [true, "Category of the product is required"],
  },
});

module.exports = model("productModel", productSchema);
