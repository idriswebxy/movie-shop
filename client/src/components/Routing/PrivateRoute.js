import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";



const PrivateRoute = ({
  component: Component,
  auth: { authenticated },
  ...rest
}) => {


  const isAuthenticated = useAuth0();

  console.log(isAuthenticated)
   
  return (
    <Route
      {...rest}
      render={props =>
        !authenticated && !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
