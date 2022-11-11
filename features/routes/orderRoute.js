var express = require("express");
var router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const {
  createOrder,
  getSingleOrder,
  getLoggedInUsersOrders,
  getAllOrders,
  updateOrdersStatus,
  deleteOrder,
} = require("../controllers/orderController");

/* POST /createorder */
router.post("/createorder", isAuthenticated, createOrder);

/* GET /getsingleorder */
router.get("/getsingleorder/:id", isAuthenticated, getSingleOrder);

/* GET /get/your/orders */
router.get("/get/your/orders", isAuthenticated, getLoggedInUsersOrders);

/* GET /getallorders (admin) */
router.get("/getallorders", isAuthenticated, isAdmin("admin"), getAllOrders);

/* GET /update/order/status (admin) */
router.post(
  "/update/order/status/:id",
  isAuthenticated,
  isAdmin("admin"),
  updateOrdersStatus
);

/*GET /deleteorder (admin) */
router.get("/deleteorder/:id", isAuthenticated, isAdmin("admin"), deleteOrder);

module.exports = router;
