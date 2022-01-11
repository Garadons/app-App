import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  let authorized = JSON.parse(localStorage.getItem("authorized"));
  return (
    <Route
      {...rest}
      render={({}) =>
        authorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
