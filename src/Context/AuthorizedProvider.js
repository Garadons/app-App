import React, { createContext, useState } from "react";

const AuthorizedContext = createContext();

const AuthorizedProvider = (props) => {
  const [authorized, setAuthorized] = useState(false);

  return (
    <AuthorizedContext.Provider
      value={{
        authorized,
        setAuthorized,
      }}
    >
      {props.children}
    </AuthorizedContext.Provider>
  );
};

export { AuthorizedContext, AuthorizedProvider };
