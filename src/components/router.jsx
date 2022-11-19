import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";

export default class PageRouter extends React.Component {
  constructor() {
    this.state = {
      username: '',
      password: '',
      
    };
  }
  
  render() {
    return(
      <Switch>
        <Route path="/" component={Login(props)} />
        <Route path="/signup" component={Signup(props)} />
        <Route path="/dashboard" component={Dashboard(props)} />
      </Switch>
    );
  }
  
};