import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { TasksProvider } from "../Context/TasksProvider";
import { AuthorizedProvider } from "../Context/AuthorizedProvider";

import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import Home from "./Home";
import Dogs from "./Dogs";
import Page from "./Page";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [active, setActive] = useState(
    localStorage.getItem("currentPage") || 1
  );

  return (
    <Router>
      <AuthorizedProvider>
        <TasksProvider>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/signin">
              <LogInForm />
            </Route>
            <Route path="/signup">
              <SignUpForm />
            </Route>
            <PrivateRoute path="/home">
              <Page
                active={active}
                setActive={setActive}
                content={() => <Home />}
              />
            </PrivateRoute>
            <PrivateRoute path="/dogs">
              <Page
                active={active}
                setActive={setActive}
                content={() => <Dogs />}
              />
            </PrivateRoute>
          </Switch>
        </TasksProvider>
      </AuthorizedProvider>
    </Router>
  );
}

export default App;
