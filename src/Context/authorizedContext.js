import React from "react";

import auth from '../firebase-config'

const authorizedContext = {user: auth.currentUser};

export default React.createContext(authorizedContext);