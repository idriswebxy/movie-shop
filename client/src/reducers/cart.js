import {
  ADD_TO_CART,
  LOAD_CART,
  CART_ERROR,
  DELETE_ITEM,
  PRICE_TOTAL
} from "../actions/types";

const initialState = {
  cart: [],
  price: null,
  loading: true
};

export default function(state = initialState, action) {
  
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [payload, ...state.cart]
      };
    case LOAD_CART:
      return {
        ...state,
        cart: payload,
        loading: false
      };
    case PRICE_TOTAL:
      return {
        ...state,
        price: payload,
      }  
    case DELETE_ITEM:
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== payload)
      };
    case CART_ERROR:
      // return {
      //   ...state,
      //   cart: state.cart
      // }

    default:
      return state;
  }
}
