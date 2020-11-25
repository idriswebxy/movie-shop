import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Spinner } from "react-bootstrap";

const PrivateRoute = ({
  component: Component,
  auth: { authenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !authenticated && !loading ? (
        <Redirect to="/login" /> 
      ) : (
        <Component {...props} />
      )
    } 
  />
);

// const PrivateRoute = ({ Component, auth: { authenticated }, ...args }) => (
//   <Route
//     component={
//       authenticated
//         ? Component
//         : withAuthenticationRequired(Component, {
//             onRedirecting: () => <Spinner />,
//           })
//     }
//     {...args}
//   />
// );

// PrivateRoute.propTypes = {
//   auth: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
