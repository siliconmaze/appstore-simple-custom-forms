import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ProppedRoute from "../ProppedRoute"
import ProtectedRoute from "../ProtectedRoute"
import AuthComponent from "../../Components/Auth/AuthComponent"

// <Route exact path="/" render={() => <div>Home</div>} />
const Routes = ({ childProps }) => (
    <Switch>
     
      <ProppedRoute
        exact
        path="/auth"
        render={AuthComponent}
        props={childProps}
      />
      <ProtectedRoute
        exact
        path="/secret"
        render={() => <div>Secret Page</div>}
        props={childProps}
      />
      <ProtectedRoute
        exact
        path="/"
        render={() => <div>Home Page</div>}
        props={childProps}
      />
      <Route exact path="/about" render={() => <div>About Content</div>} />
    </Switch>
  );

export default Routes