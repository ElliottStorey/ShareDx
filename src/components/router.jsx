import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Login from "../pages/login";

export default () => (
    <Switch>
      <Route path="/" component={Login} />
    </Switch>
);
