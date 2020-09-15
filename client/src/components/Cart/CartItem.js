import React, { useEffect } from "react";
import Img from "react-image";
import { connect } from "react-redux";
import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdbreact";
import { deleteItem } from "../../actions/cart";

const CartItem = ({
  movieImg,
  movieDesc,
  movieName,
  movieId,
  deleteItem,
  price,
  cartItems,
}) => {
  return (
    <MDBTable>
      <MDBTableHead>
        <tr>
          <th>Movies</th>
          <th>Price</th> 
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <Img
          className="movie-container"
          src={`https://image.tmdb.org/t/p/w154${movieImg}`}
        />
        <h3>{movieName}</h3>
        <div>${price}</div>
      </MDBTableBody>
    </MDBTable>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cart,
});

export default connect(mapStateToProps, { deleteItem })(CartItem);
