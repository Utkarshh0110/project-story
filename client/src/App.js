import "./App.css";
import React from "react";
import SignIn from "./components/signInForm/SignUp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import UserDashboard from "./components/dashboard/UserDashboard";
import ViewProject from "./components/dashboard/ViewProject/ViewProject";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <PrivateRoute exact path="/dashboard" component={UserDashboard} />
        <Route exact path="/dashboard/:id" component={ViewProject} />
      </Switch>
    </Router>
  );
};

export default App;
