import React, {createContext, useState} from 'react';

import { onAuthStateChanged } from "firebase/auth";
import auth from "../Configs/firebase-config";

const AuthorizedContext = createContext();

const AuthorizedProvider = (props) => {

    const [authorized, setAuthorized] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
      setAuthorized(currentUser);
    });
    
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
  }

  export  {AuthorizedContext, AuthorizedProvider} ;
