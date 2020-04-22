import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBView,
  MDBMask,
  MDBContainer,
} from "mdbreact";
import { Redirect } from "react-router-dom";

const Landing = () => {
  return (
    <div className="">
      <MDBView src="https://mdbootstrap.com/img/Photos/Others/img%20(51).jpg"></MDBView>
      <main>
        <MDBContainer className="text-center my-5"></MDBContainer>
      </main>
    </div>
  );
};

export default Landing;
