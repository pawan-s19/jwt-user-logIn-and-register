import { createSlice } from "@reduxjs/toolkit";
import axios from "../../src/axiosConfig/axios";
const initialState = {
  products: [],
  productDetails: {},
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getProductDetail: (state, action) => {
      state.productDetails = action.payload.product;
    },
  },
});
export const { increment, decrement, getProducts, getProductDetail } =
  counterSlice.actions;
export default counterSlice.reducer;

export const getProductsAsync = () => async (dispatch) => {
  const products = await axios.get("/allProducts");
  dispatch(getProducts(products.data));
};

export const getProductDetailsAsync = (id) => async (dispatch) => {
  const productDetails = await axios.get(`/singleProduct/${id}`);
  dispatch(getProductDetail(productDetails.data));
};
