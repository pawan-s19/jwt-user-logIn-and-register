const productModel = require("../models/productModel");
const Functionality = require("../utils/functionalities");

//show index route
exports.indexController = (req, res, next) => {
  res.json({ message: "This index route" });
};
// create a product // Only Admin can Access
exports.createProduct = async (req, res, next) => {
  req.body.createdBy = req.user.id;
  const product = await productModel.create(req.body);
  await product.populate("createdBy");
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
  const productsToBeShown = 10;
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
  if (!product)
    return res.status(500).json({ message: "Sorry, product NOT FOUND" });
  const productCount = await productModel.countDocuments();
  res.status(200).json({ product, productCount });
};

exports.createReview = async (req, res, next) => {
  const { productId, rating, review } = req.body;

  const reviewDetails = {
    createdByUser: req.user._id,
    name: req.user.username,
    rating: Number(rating),
    review,
  };

  const product = await productModel.findOne({ _id: productId });

  let isReviewed = product.reviews.find(
    (rev) => rev.createdByUser.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach(function (rev) {
      if (rev.createdByUser.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.review = review);
      }
    });
  } else {
    product.reviews.push(reviewDetails);
    product.numberOfReviews = product.reviews.length;
  }
  let reviewAverage = 0;
  product.reviews.forEach(function (elem) {
    reviewAverage += elem.rating;
  });

  product.effectiveRating = reviewAverage / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(201).json({ message: "Review Successfully Uploaded" });
};

exports.getAllReviews = async (req, res, next) => {
  const product = await productModel.findOne({ _id: req.query.id });
  if (!product)
    return res.status(400).json({ message: "product does not exists " });

  res.status(200).json({ reviews: product.reviews });
};

exports.deleteReview = async (req, res, next) => {
  const product = await productModel.findOne({ _id: req.query.productId });

  if (!product)
    return res.status(400).json({ message: "product does not exits" });
  console.log(req.query.reviewId);
  let reviews = product.reviews.filter(
    (elem) => elem._id.toString() !== req.query.reviewId.toString()
  );
  console.log(reviews);
  let totalRating = 0;
  let effectiveRating = 0;
  if (reviews.length !== 0) {
    reviews.forEach((elem) => {
      totalRating += elem.rating;
    });

    effectiveRating = totalRating / reviews.length;
  }
  let numberOfReviews = reviews.length;

  await productModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      effectiveRating,
      numberOfReviews,
    },
    { new: true }
  );

  res.status(201).json({ message: "review deleted successfully !" });
};
