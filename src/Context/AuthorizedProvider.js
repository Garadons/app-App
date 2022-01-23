import React, { createContext, useState } from "react";

const AuthorizedContext = createContext();

const AuthorizedProvider = (props) => {
  const [authorized, setAuthorized] = useState(
    localStorage.getItem("accessToken")
  );
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
