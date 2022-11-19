import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Login from "../pages/login";
import Signup from "../pages/signup";

export default () => (
    <Switch>
      <Route path="/" component={Login} />
    <Route path="/signup" component={Signup} />
    </Switch>
);
