import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useAuth0 } from "../../react-auth0-spa";

const PrivateRoute = ({
  component: Component,
  auth: { authenticated, isLoading },
  path,
  ...rest
}) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (authenticated || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };
    fn();
  }, [isAuthenticated, loginWithRedirect, loading, path]);
  return (
    <Route
      {...rest}
      render={props =>
        !authenticated && !isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
