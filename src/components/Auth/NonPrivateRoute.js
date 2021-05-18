import React from "react";
import { Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { useAuth } from "../../context/auth";

function NonPrivateRoute({ component: Component, ...rest }) {
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
        authorized() ? <Component {...props} /> : <Component {...props} />
      }
    />
  );
}
export default NonPrivateRoute;
