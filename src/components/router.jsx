import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";

export default class PageRouter extends React.Component {
  
  render() {
    return (
      <Switch>
        <Route path="/" component={Login(this.state)} />
        <Route path="/signup" component={Signup(this.state)} />
        <Route path="/dashboard" component={Dashboard(this.state)} />
      </Switch>
    );
  }
}
