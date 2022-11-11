import React from "react";
import "../stylesheets/nav.css";
const Nav = () => {
  return (
    <div className="nav d-flex justify-content-between align-items-center">
      <h3>E-commerce</h3>
      <div className="search-links d-flex align-items-center">
        <textarea placeholder="Search Products"></textarea>
        <h5>Home</h5>
        <h5>Products</h5>
      </div>
      <div className="cart-profile d-flex align-items-center">
        <i className="ri-shopping-cart-2-line"></i>
        {/* <i class="ri-user-3-line"></i> */}
        <button className="btn">Login/Signup</button>
      </div>
    </div>
  );
};

export default Nav;
