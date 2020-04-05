import React, { useEffect } from "react";
import config from "../../config.json";
import { connect } from "react-redux";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from "mdbreact";

const RelatedMovies = ({ movieId }) => {
  // useEffect(() => {
  //   fetch(
  //     `https://api.themoviedb.org/3/movie/${}/recommendations?api_key=${
  //       config.API_KEY
  //     }&language=en-US&page=1`
  //   )
  //     .then(res => res.json())
  //     .then(data => console.log(data));
  //   console.log(movieId.map(movie => console.log(movie)));
  // }, []);

  return (

      <MDBCarousel
        activeItem={1}
        length={3}
        slide={true}
        showControls={true}
        showIndicators={true}
        multiItem
      >
        <MDBCarouselInner>
          <MDBRow>
            <MDBCarouselItem itemId="1">
              <MDBCol md="4">
                <MDBCard className="mb-2">
                  <MDBCardImage
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>MDBCard title</MDBCardTitle>
                    <MDBCardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </MDBCardText>
                    <MDBBtn color="primary">MDBBtn</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="4">
                <MDBCard className="mb-2">
                  <MDBCardImage
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(18).jpg"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>MDBCard title</MDBCardTitle>
                    <MDBCardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </MDBCardText>
                    <MDBBtn color="primary">MDBBtn</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="4">
                <MDBCard className="mb-2">
                  <MDBCardImage
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(35).jpg"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>MDBCard title</MDBCardTitle>
                    <MDBCardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </MDBCardText>
                    <MDBBtn color="primary">MDBBtn</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBCarouselItem>


            
            <MDBCarouselItem itemId="2">
              <MDBCol md="4">
                <MDBCard className="mb-2">
                  <MDBCardImage
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(60).jpg"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>MDBCard title</MDBCardTitle>
                    <MDBCardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </MDBCardText>
                    <MDBBtn color="primary">MDBBtn</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="4">
                <MDBCard className="mb-2">
                  <MDBCardImage
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(47).jpg"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>MDBCard title</MDBCardTitle>
                    <MDBCardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </MDBCardText>
                    <MDBBtn color="primary">MDBBtn</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="4">
                <MDBCard className="mb-2">
                  <MDBCardImage
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(48).jpg"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>MDBCard title</MDBCardTitle>
                    <MDBCardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </MDBCardText>
                    <MDBBtn color="primary">MDBBtn</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBCol md="4">
                <MDBCard className="mb-2">
                  <MDBCardImage
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(53).jpg"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>MDBCard title</MDBCardTitle>
                    <MDBCardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </MDBCardText>
                    <MDBBtn color="primary">MDBBtn</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="4">
                <MDBCard className="mb-2">
                  <MDBCardImage
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(45).jpg"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>MDBCard title</MDBCardTitle>
                    <MDBCardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </MDBCardText>
                    <MDBBtn color="primary">MDBBtn</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="4">
                <MDBCard className="mb-2">
                  <MDBCardImage
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(41).jpg"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>MDBCard title</MDBCardTitle>
                    <MDBCardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </MDBCardText>
                    <MDBBtn color="primary">MDBBtn</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBCarouselItem>
          </MDBRow>
        </MDBCarouselInner>
      </MDBCarousel>
  );
};

const mapStateToProps = state => ({
  movieId: state.cart.cart
});

export default connect(mapStateToProps)(RelatedMovies);
