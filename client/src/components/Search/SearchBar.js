import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBContainer,
} from "mdbreact";

const SearchBar = ({ onSearch, hideResults }) => {
  const [term, setTerm] = useState("");

  useEffect(() => {
    hideResults(term);
  }, [term]);

  const onChange = (e) => {
    setTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <MDBContainer>
      <MDBCol style={{ marginTop: "100px" }} md="6">
        <form className="form-inline mt-4 mb-4">
          <MDBIcon icon="search" />
          <input
            className="form-control form-control-sm ml-3 w-75"
            type="text"
            placeholder="Search movies..."
            aria-label="Search"
            onChange={(e) => onChange(e)}
          />
        </form>
      </MDBCol>
    </MDBContainer>
  );
};

export default SearchBar;
