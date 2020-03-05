import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    console.log("Token Set!")
  } 
  else {
    delete axios.defaults.headers.common['x-auth-token'];
    console.log("No token...")
  }
};

export default setAuthToken;
