import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import authorizedContext from "../../Context/authorizedContext";

function PrivateRoute({ children, ...rest }) {
  const { authorized } = useContext(authorizedContext);
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
