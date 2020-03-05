import React, { useState, useEffect } from "react";
import { MDBCol, MDBIcon } from "mdbreact";
import axios from "axios";
import { connect } from "react-redux";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";
import { setSearchedMovies } from "../../actions/movie";
import { API_KEY } from "../../config/config";



const Search = ({ setSearchedMovies }) => {


  const [results, setResults] = useState([]);  
  const [movieResults, showMovieResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const hideResults = term => {
    if (term.length === 0) {
      showMovieResults(false);
    }
  };

  
  const searchMovies = async query => {
    try {
      if (!query || query.length <= 1) return;

      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

      let res = await fetch(url);

      let data = await res.json();

      setResults(data.results, showMovieResults(true));
      setSearchedMovies(data.results);
    } catch (err) {
      return err;
    }
  };

  return (
    <div>
      <SearchBar hideResults={hideResults} onSearch={searchMovies} />
      {movieResults ? <SearchResults results={results} /> : null}
    </div>
  );
};

export default connect(null, { setSearchedMovies })(Search);
