import React, { Component } from 'react';
import './App.css';
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Authenticator } from 'aws-amplify-react';
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import Routes from "./Navigation/Routes"
import Header from "./Containers/Common/Header"
import '@aws-amplify/ui/dist/style.css';

Amplify.configure(aws_exports);


class App extends Component {
  state = {
    authState: {
      isLoggedIn: false
    },
  };

  handleUserSignIn = () => {
    console.log("App: handleUserSignIn")
    this.setState({ authState: { isLoggedIn: true } });
  };

  render() {
    const childProps = {
      isLoggedIn: this.state.authState.isLoggedIn,
      onUserSignIn: this.handleUserSignIn
    };

    return (
      <div className="App">
        <h1>Amplify Routes Example</h1>
        <Header />
        <div>
          {this.state.authState.isLoggedIn
            ? 'User is Logged In'
            : 'Not Logged In'}
        </div>
        <br />
        <Routes childProps={childProps} />
      </div>
    );
  }
}

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
