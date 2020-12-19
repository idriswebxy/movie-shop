import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const PrivateRoute = ({
  component: Component,
  auth: { googleAuth, loading, authenticated },
  ...rest
}) => {
  const { isAuthenticated } = useAuth0();

  const checkAuth = async () => {
    try {
      let isAuth = await isAuthenticated;
      return isAuth;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        (authenticated || checkAuth) && !loading ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
