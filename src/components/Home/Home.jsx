import React from "react";

import Button from "../common/Button";
import Form from "../common/Form";

function logOut() {
  localStorage.clear();
}

function Home() {
  return <Button onClick={logOut} value="Log Out" to="signin" />;
}

export default Home;
