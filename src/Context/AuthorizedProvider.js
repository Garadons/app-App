import React, { createContext, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import auth from "../Configs/firebaseConfig";

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
