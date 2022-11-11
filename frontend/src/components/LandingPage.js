import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductsAsync } from "../counter/counterSlice";
import "../stylesheets/landingpage.css";
import { useDispatch } from "react-redux";
import Products from "./Products";
const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAsync());
  }, []);

  return (
    <Fragment>
      <div className="landing-page d-flex align-items-center justify-content-center flex-column">
        <h1>Welcome To E-commerce</h1>
        <h3>Find Amazing Products Below</h3>

        <div className="scroll">
          <i className="ri-mouse-line"></i>
          <h5>Scroll Now</h5>
        </div>
      </div>
      <div id="prod">
        <Products />
      </div>
    </Fragment>
  );
};

export default LandingPage;
