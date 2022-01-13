import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import tasksContext from "./tasksContext";

import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import Home from "./Home";
import Dogs from "./Dogs";
import Page from "./Page";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [tasks, onTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [active, setActive] = useState(
    localStorage.getItem("currentPage") || 1
  );

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
        <PrivateRoute path="/home">
          <tasksContext.Provider value={{ tasks, onTasks }}>
            <Page
              active={active}
              setActive={setActive}
              content={() => <Home />}
            />
          </tasksContext.Provider>
        </PrivateRoute>
        <PrivateRoute path="/dogs">
          <Page
            active={active}
            setActive={setActive}
            content={() => <Dogs />}
          />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
