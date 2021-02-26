import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { useAuth } from "../../context/auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { authToken } = useAuth();
  const authorized = () => {
    if (authToken) {
      if (jwt_decode(authToken).exp < Date.now() / 1000) {
        localStorage.clear();
        return false;
      }
      return true;
    }
    return false;
  };
  return (
    <Route
      {...rest}
      render={(props) =>
        authorized() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
export default PrivateRoute;
