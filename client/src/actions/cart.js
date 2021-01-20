import {
  ADD_TO_CART,
  CART_ERROR,
  LOAD_CART,
  DELETE_ITEM,
  PRICE_TOTAL,
  CHANGE_LOAD,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";




export const addToCart = (movie) => async (dispatch) => {


  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // movie.price = 2.99;
  // movie.index = index

  const body = JSON.stringify(movie);

  try {
    const res = await axios.post(`/api/cart`, body, config);

    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
    });
  }
};



export const addToCartTvShow = (item) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(item);

  try {
    const res = await axios.post("/api/cart/tv_show", body, config);

    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
    });
  }
};



export const loadCart = () => async (dispatch) => {
  try {

    const res = await axios.get("/api/cart");

    dispatch({
      type: LOAD_CART,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CART_ERROR,
    });
  }
};




export const deleteItem = (id, index, price) => async (dispatch) => {

  try {

    await axios.delete(`api/cart/${id}`);

    dispatch({
      type: DELETE_ITEM,
      payload: { index, price }
    });

    dispatch(setAlert("Item Removed", "success"));


  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};



export const getPriceTotal = (id) => async (dispatch) => {

  console.log(id)
  try {
    const res = await axios.get(`/api/cart/total/${id}`);

    dispatch({
      type: PRICE_TOTAL,
      payload: res.data,
    });
  } catch (error) {
    console.error(error)
  }
};



export const auth0_addToCart = (movie) => async (dispatch) => {


  try {

    dispatch({
      type: ADD_TO_CART,
      payload: movie,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
    });
  }
};
