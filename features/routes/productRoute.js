var express = require("express");
var router = express.Router();
const {
  indexController,
  createProduct,
  updateProduct,
  deleteProduct,
  allProducts,
  singleProduct,
  createReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

/* GET / */
router.get("/", indexController);

/* POST /createProduct accessible by admin only*/
router.post(
  "/admin/createProduct",
  isAuthenticated,
  isAdmin("admin"),
  createProduct
);

/*PUT /updateProduct accessible by admin only */
router.put(
  "/admin/updateProduct/:id",
  isAuthenticated,
  isAdmin("admin"),
  updateProduct
);

/*DELETE /deleteProduct accessible by admin only */
router.delete(
  "/admin/deleteProduct/:id",
  isAuthenticated,
  isAdmin("admin"),
  deleteProduct
);

/*GET /allProducts */
router.get("/allProducts", allProducts);

/*POST /singleProdcut */
router.get("/singleProduct/:id", singleProduct);

/*Post /createreview */
router.post("/createreview", isAuthenticated, createReview);

/*GET /getallreviews */
router.get("/getallreviews", getAllReviews);

/*GET /deletereview */
router.get("/deletereview", isAuthenticated, deleteReview);
module.exports = router;
