import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg'
import { Greetings, withAuthenticator } from 'aws-amplify-react';
import '@aws-amplify/ui/dist/style.css';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const MyTheme = {
  //signInButtonIcon: { 'display': 'none' },
  signInButton: { 'backgroundColor': 'red', 'borderColor': 'red' },
  input: { 'backgroundColor': 'red', 'borderColor': 'red' },
  button: { 'backgroundColor': 'red', 'borderColor': 'red' }
  //googleSignInButton: { 'backgroundColor': 'red', 'borderColor': 'red' }
}

class App extends Component {

  state = {
    authState: {
      isLoggedIn: false
    }
  };

  handleUserSignIn = () => {
    this.setState({ authState: { isLoggedIn: true } });
  };

  render() {

    const childProps = {
      isLoggedIn: this.state.authState.isLoggedIn,
      onUserSignIn: this.handleUserSignIn
    };

  
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App">Amplify withAuthenticator Example</h1>
          <span>
          {this.state.authState.isLoggedIn
            ? 'User is Logged In'
            : 'Not Logged In'}
        </span> 
        <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

/*

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/


/*
For for information on withAuthenticator params see docs/_nuggets1.md
*/

export default withAuthenticator(App,{includeGreetings:true},{theme:MyTheme})