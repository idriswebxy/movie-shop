import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({
  component: Component,
  auth: { authenticated, loading },
  ...rest
}) => {
  const { isAuthenticated } = useAuth0();

  return (
  
    <Route
      {...rest}
      render={(props) =>
        (isAuthenticated || authenticated) && !loading ? (
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
