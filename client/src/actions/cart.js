import { ADD_TO_CART, CART_ERROR, LOAD_CART, DELETE_ITEM, PRICE_TOTAL } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const addToCart = movieObj => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(movieObj);

  try {
    const res = await axios.post("/api/cart", body, config);

    dispatch({
      type: ADD_TO_CART,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR
    });
  }
};

export const loadCart = () => async dispatch => {
  try {
    const res = await axios.get("/api/cart");

    dispatch({
      type: LOAD_CART,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: CART_ERROR
    });
  }
};

export const getCart = id => async dispatch => {
  try {
    const res = await axios.get(`/api/cart/${id}`);

    dispatch({
      type: LOAD_CART,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteItem = id => async dispatch => {
  try {
    await axios.delete(`api/cart/${id}`);

    dispatch({
      type: DELETE_ITEM,
      payload: id
    });

    dispatch(setAlert("Item Removed", "success"));
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPriceTotal = array => async dispatch => {
  let sum;

  for (let i = 0; i < array.length; i++) {
    sum = array[i].price + array[i].price;
  }

  dispatch({
    type: PRICE_TOTAL,
    payload: sum
  })
};
