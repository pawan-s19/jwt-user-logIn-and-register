import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetailsAsync } from "../counter/counterSlice";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-stars";
import loader from "../assets/loader.webp";
import "../stylesheets/productdetails.css";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const product = useSelector((e) => e.counter.productDetails);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductDetailsAsync(id));
  }, []);

  return (
    <Fragment>
      <div className="product-dets ">
        {product ? (
          <Fragment>
            {" "}
            <div className="carousel">
              <Carousel autoPlay={false}>
                {product.images &&
                  product.images.map((e, i) => (
                    <div className="image-holder" key={e.url}>
                      <img src={e.url} alt={`${i} image`} />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div className="product-info d-flex justify-content-center align-items-center">
              <div className="dets">
                <h5 className="category">
                  {product.category && product.category.toUpperCase()}
                </h5>
                <h1 className="mt-3 name">{product && product.productName}</h1>
                <h5 className="description mt-4 fs-5">{product.description}</h5>
                <div className="quantity-cart mt-5 d-flex align-items-center ">
                  <div className="quantity d-flex align-items-center">
                    <button>-</button>
                    <input
                      className="text-center"
                      type="text"
                      value={1}
                      readOnly
                    ></input>
                    <button>+</button>
                  </div>
                  <button className="cart">Add to Cart</button>
                </div>
                <div className="rating mt-4 d-flex  align-items-center">
                  <ReactStars
                    size={window.innerWidth < 600 ? 20 : 25}
                    color="#ffd700"
                    value={product && product.effectiveRating}
                    edit={false}
                  ></ReactStars>{" "}
                  &nbsp; &nbsp; {product && product.numberOfReviews} reveiws
                </div>
                <h6 className="mt-3">
                  {product.stock !== 0 ? (
                    <h6 style={{ color: "green" }}>IN STOCK</h6>
                  ) : (
                    <h6 style={{ color: "red" }}>NOT AVAILABLE</h6>
                  )}
                </h6>
                <h1 className="mt-3">{`₹ ${product && product.price}`}</h1>
              </div>
            </div>
          </Fragment>
        ) : (
          <img style={{ height: "100%" }} src={loader}></img>
        )}
      </div>
    </Fragment>
  );
};

export default ProductDetails;
