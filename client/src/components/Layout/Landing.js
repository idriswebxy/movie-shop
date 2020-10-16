import React, { useEffect, useState } from "react";
import {
  MDBView,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
} from "mdbreact";
import "./Landing.css";
import "../MainImage/MainImage.css";
import { slides } from "../../utils/movie_slides";

const Landing = ({}) => {
  let [index, setIndex] = useState(0);

  useEffect(() => {
    slideTimer();
  }, []);

  const slideTimer = () => {
    setInterval(() => {
      setIndex(++index);
      if (index === 19) {
        index = 0;
      } else {
        return;
      }
    }, 5000);
  };

  return (
    <div style={{ display: 'grid'}}>
      <MDBView>
        <img
          className="d-block w-100"
          src={`http://image.tmdb.org/t/p/w1280${slides[index].backdrop_path}`}
          alt="first slide"
        />
      </MDBView>
    </div>
  );
};

export default Landing;
