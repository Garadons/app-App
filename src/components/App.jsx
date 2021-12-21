import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/signup" />
        <Route path="/signin">
          <LogInForm />
        </Route>
        <Route path="/signup">
          <SignUpForm />
        </Route>
      </Switch>
    </Router>
  );
  // return <SignUpForm/>
}

export default App;
