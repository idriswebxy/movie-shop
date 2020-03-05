import {
  GET_MOVIES,
  GET_MOVIE_ERR,
  SET_MOVIES,
  SET_MOVIE_ERR,
  SET_SEARCHED_MOVIE,
  CLEAR_MOVIE,
  GET_SEARCHED_MOVIE,
  LOAD_MOVIE_DETAILS
} from "../actions/types";


const initialState = {
  isLoading: true,
  movies: [],
  searchedMovie: [],
};


export default function(state = initialState, action) {
  
  const { type, payload } = action;

  switch (type) {

    case GET_MOVIES: 
      return {
        ...state,
        searchedMovie: state.movies.find(movie => movie.id === payload),
        isLoading: false
      };
    case GET_SEARCHED_MOVIE:
      return {
        ...state,
        searchedMovie: state.searchedMovie.find(movie => movie.id === payload),
      };  
    case CLEAR_MOVIE:
      return {
        ...state,
        searchedMovie: null
      };  
    case GET_MOVIE_ERR:
      return;
    case SET_SEARCHED_MOVIE:
      return {
        ...state,
        searchedMovie: payload
      };
    case SET_MOVIES:
      return {
        ...state,
        movies: payload,
        isLoading: false
      };

    case SET_MOVIE_ERR:
      return;
    case LOAD_MOVIE_DETAILS:
      return {
        ...state,
        searchedMovie: payload
      }  

    default:
      return state;
  }
}
