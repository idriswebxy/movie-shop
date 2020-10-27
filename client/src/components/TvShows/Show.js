import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getShow } from "../../actions/movie";
// import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart, addToCartTvShow } from "../../actions/cart";
import moment from "moment";
import {
  MDBView,
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBAnimation,
  MDBRow,
  MDBCol,
} from "mdbreact";

const Show = ({
  id,
  image,
  getShow,
  isLoading,
  tvShowObj,
  price,
  index,
  addToCart,
}) => {
  let showList = (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <MDBView hover zoom>
            <Link to={"/show_details/" + id} onClick={() => getShow(id)}>
              <img src={`http://image.tmdb.org/t/p/w500${image}`} />
            </Link>
          </MDBView>

          <div style={{ textAlign: "center", paddingBottom: "50px" }}>
            <h5>{tvShowObj.name}</h5>
            <h6>{moment(tvShowObj.releaseDate).format("LL")}</h6>
            <h5>${price}</h5>

            <MDBBtn onClick={() => addToCart(tvShowObj, index)}>
              Add To Cart <MDBIcon icon="cart-plus" />
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );

  return (
    <div>
      <MDBAnimation type="zoomIn" duration="1s">
        {showList}
      </MDBAnimation>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, { getShow, addToCart })(Show);
