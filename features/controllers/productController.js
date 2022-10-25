const productModel = require("../models/productModel");
const Functionality = require("../utils/functionalities");

//show index route
exports.indexController = (req, res, next) => {
  res.json({ message: "This index route" });
};
// create a product // Only Admin can Access
exports.createProduct = async (req, res, next) => {
  const product = await productModel.create(req.body);
  res.status(200).json(product);
};

//update a product // only Admin can Access

exports.updateProduct = async (req, res, next) => {
  const product = await productModel.findOne({ _id: req.params.id });
  if (!product) res.status(500).json({ message: "product not found" });
  const updatedProduct = await productModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.status(200).json(updatedProduct);
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id });
    if (!product) return res.status(500).json({ message: "product not found" });
    await product.remove();
    res.status(200).json({ message: "prodcut deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};
exports.allProducts = async (req, res, next) => {
  const productsToBeShown = 5;
  const productCount = await productModel.countDocuments();
  const functionality = new Functionality(productModel.find(), req.query)
    .search()
    .filter()
    .pagination(productsToBeShown);
  const product = await functionality.query;
  if (!product) res.status(500).json({ message: "No products found" });
  res.status(200).json(product);
};

exports.singleProduct = async (req, res, next) => {
  const product = await productModel.findOne({ _id: req.params.id });
  if (!product) res.statust(500).json({ message: "Sorry, product NOT FOUND" });
  res.status(200).json(product, productCount);
};
