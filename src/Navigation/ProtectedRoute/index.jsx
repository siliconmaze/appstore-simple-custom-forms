import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';


const ProtectedRoute = ({ render: C, props: childProps, ...rest }) => {
  console.log("ENTER: ProtectedRoute")
  return (
    <Route
      {...rest}
      render={rProps =>
        childProps.isLoggedIn ? (
          <C {...rProps} {...childProps} />
        ) : (
          <Redirect
            to={`/auth?redirect=${rProps.location.pathname}${
              rProps.location.search
            }`}
          />
        )
      }
    />
  )}

export default ProtectedRoute