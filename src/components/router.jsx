import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";

export default () => (
  <Switch>
    <Route path="/" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);
