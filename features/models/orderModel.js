const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const orderSchema = new Schema({
  shippingDetails: {
    address: {
      type: String,
      required: true,
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: Number, required: true },
    phoneNo: { type: Number, required: true },
  },
  orderedItems: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productModel",
        required: true,
      },
    },
  ],
  orderedByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemPrice: {
    type: Number,
    default: 0,
    required: true,
  },

  taxPrice: {
    type: Number,
    default: 0,
    required: true,
  },

  shippingPrice: {
    type: Number,
    default: 0,
    required: true,
  },

  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("orderModel", orderSchema);
