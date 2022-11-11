import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Nav from "./components/Nav";
import "./stylesheets/app.css";
import { getProductsAsync } from "./counter/counterSlice";
import LandingPage from "./components/LandingPage";
import Products from "./components/Products";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProductsAsync());
  // }, []);

  return (
    <div className="main">
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/product/details/:id" element={<ProductDetails />}></Route>
      </Routes>
    </div>
  );
};

export default App;
