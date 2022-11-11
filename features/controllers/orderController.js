const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel");

exports.createOrder = async (req, res, next) => {
  const {
    shippingDetails,
    orderedItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await orderModel.create({
    shippingDetails,
    orderedItems,
    orderedByUser: req.user._id,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
  });
  res.status(201).json({ message: "success", order });
};

exports.getSingleOrder = async (req, res, next) => {
  const order = await orderModel
    .findOne({ _id: req.params.id })
    .populate("orderedByUser", "username email");

  if (!order) return res.status(500).json({ message: "No order found" });

  res.status(201).json({ order });
};

exports.getLoggedInUsersOrders = async (req, res, next) => {
  const orders = await orderModel.find({ orderedByUser: req.user._id });

  if (!orders) return res.status(500).json({ message: "No order found" });

  res.status(201).json({ orders });
};

//admin can see all orders
exports.getAllOrders = async (req, res, next) => {
  const orders = await orderModel.find();

  let revenue = 0;
  orders.forEach((elem) => {
    revenue += elem.totalPrice;
  });

  if (!orders) return res.status(500).json({ message: "sorry no orders" });
  res.status(201).json({ orders, revenue });
};

//admin can update order status
exports.updateOrdersStatus = async (req, res, next) => {
  const order = await orderModel.findOne({ _id: req.params.id });

  if (!order) return res.status(500).json({ message: "order not found" });
  if (order.orderStatus === "Delivered") {
    return res
      .status(500)
      .json({ message: "sorry order is already delivered" });
  }

  order.orderedItems.forEach(async (elem) => {
    await updateStock(elem.product, elem.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(201).json({ success: "true" });
};

async function updateStock(product_id, quantity) {
  const product = await productModel.findById(product_id);

  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//admin can delete order
exports.deleteOrder = async (req, res, next) => {
  const order = orderModel.findById(req.params.id);

  if (!order) return res.status(500).json({ message: "order not found" });
  await order.remove();

  res.status(201).json({ message: "order deleted successfully" });
};
