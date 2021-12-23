import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./Home";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/signin">
          <LogInForm />
        </Route>
        <Route path="/signup">
          <SignUpForm />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
