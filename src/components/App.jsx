import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import Home from "./Home";
import Dogs from './Dogs'

function App() {
  const [tasks, onTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
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
        <Route path="/home">
          <Home tasks={tasks} onTasks={onTasks} />
        </Route>
        <Route path="/dogs">
          <Dogs/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
