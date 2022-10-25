var express = require("express");
var router = express.Router();
const {
  indexController,
  createProduct,
  updateProduct,
  deleteProduct,
  allProducts,
  singleProduct,
} = require("../controllers/productController");

/* GET / */
router.get("/", indexController);

/* POST /createProduct accessible by admin only*/
router.post("/createProduct", createProduct);

/*PUT /updateProduct accessible by admin only */
router.put("/updateProduct/:id", updateProduct);

/*DELETE /deleteProduct accessible by admin only */
router.delete("/deleteProduct/:id", deleteProduct);

/*GET /allProducts */
router.get("/allProducts", allProducts);

/*POST /singleProdcut */
router.post("/singleProduct/:id", singleProduct);
module.exports = router;
