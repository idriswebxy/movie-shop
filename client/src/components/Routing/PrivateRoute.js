import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { connect } from "react-redux";



const PrivateRoute = (
  { component: Component, path, auth: { authenticated } },
  ...rest
) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  // useEffect(() => {
  //   if (loading || isAuthenticated) {
  //     return;
  //   }
  //   const fn = async () => {
  //     await loginWithRedirect({
  //       appState: { targetUrl: path },
  //     });
  //   };
  //   fn();
  // }, [loading, isAuthenticated, loginWithRedirect, path, authenticated]);

  const render = (props) =>
    isAuthenticated === true || authenticated == true ? (
      <Component {...props} />
    ) : null;

  return <Route path={path} render={render} {...rest} />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
