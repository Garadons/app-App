import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthorizedContext } from "../../Context/AuthorizedProvider";

function PrivateRoute({ children, ...rest }) {
  const { authorized } = useContext(AuthorizedContext);
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
