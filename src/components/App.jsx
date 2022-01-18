import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

import auth from "../Configs/firebase-config";

import tasksContext from "../Context/TasksProvider";
import {
  AuthorizedContext,
  AuthorizedProvider,
} from "../Context/AuthorizedProvider";

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
      <AuthorizedProvider>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/signin">
            <LogInForm />
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <PrivateRoute path="/home">
            <tasksContext.Provider
              value={{ tasks, onTasks, ...tasksContext._currentValue }}
            >
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
      </AuthorizedProvider>
    </Router>
  );
}

export default App;
