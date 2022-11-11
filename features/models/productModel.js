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
  effectiveRating: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: [true, "Category of the product is required"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      createdByUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      review: {
        type: String,
        required: true,
      },
    },
  ],
  stock: {
    type: Number,
    required: [true, "please enter no. of products available"],
    maxLength: [3, "cannot exceed three 3 characters"],
    default: 1,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
});

module.exports = model("productModel", productSchema);
