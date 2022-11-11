import React from "react";
import "../stylesheets/products.css";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Products = () => {
  const products = useSelector((e) => e.counter.products);
  const productsToShow = products.map((e) => (
    <div className="product-card" key={e._id}>
      <Link
        to={`/product/details/${e._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="product-image">
          <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"></img>
        </div>
        <div className="product-details d-flex flex-column align-items-center justify-content-center">
          <h5 className="mt-3">{e.productName}</h5>
          <p>This Amazing Zara's bag is crafted in Italy</p>
        </div>
        <div className="product-rating d-flex align-items-center justify-content-between">
          <ReactStars
            size={window.innerWidth < 600 ? 20 : 25}
            color="#ffd700"
            value={e.effectiveRating}
            edit={false}
          ></ReactStars>
          {`₹ ${e.price}`}
        </div>
      </Link>
    </div>
  ));
  let options = {
    size: window.innerWidth < 600 ? 20 : 25,
    color: "#ffd700",
  };
  return (
    <div className="products ">
      <div className="product-heading d-flex justify-content-center ">
        <h2 className="mt-4">Featured Products</h2>
      </div>
      <div className="product-grid d-flex flex-wrap">{productsToShow}</div>
    </div>
  );
};

export default Products;
