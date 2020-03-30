import React, { useEffect } from "react";
import Img from "react-image";
import { connect } from "react-redux";
import { MDBBtn, MDBIcon } from "mdbreact";
import { deleteItem } from "../../actions/cart";



const CartItem = ({ movieImg, movieDesc, movieName, movieId, deleteItem, price }) => {
  return (
    <div>
      <div>
        <Img
          className="movie-container"
          src={`https://image.tmdb.org/t/p/w154${movieImg}`}
        />
        <MDBBtn onClick={() => deleteItem(movieId)} color="red">
            Remove
        </MDBBtn>
        <h3>{movieName}</h3>
        <div>${price}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { deleteItem })(CartItem);
