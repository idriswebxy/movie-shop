import React, { useEffect, useState } from "react";
import {
  MDBView,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBAnimation,
} from "mdbreact";
import "./Landing.css";
import "../MainImage/MainImage.css";
import { slides } from "../../utils/movie_slides";
import "../../App.css";

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
    <div>
      <MDBView>
        <MDBAnimation type="zoomIn" duration="1s">
          <img
            className="landing-page"
            src={`http://image.tmdb.org/t/p/w1280${slides[index].backdrop_path}`}
            alt="first slide"
          />
        </MDBAnimation>
      </MDBView>
    </div>
  );
};

export default Landing;
