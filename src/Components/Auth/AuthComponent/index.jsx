
import React, { Component } from 'react';
import { Authenticator } from 'aws-amplify-react';
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../../../aws-exports';
Amplify.configure(aws_exports);


class AuthComponent extends Component {
    handleStateChange = state => {
      console.log("AuthComponent: state=",state);
      if (state === 'signedIn') {
        console.log("AuthComponent: this.props.onUserSignIn() from paretn which is App.")
        this.props.onUserSignIn();
      }
    };
    render() {
      console.log(this.props);
      return (
        <div>
          <Authenticator onStateChange={this.handleStateChange} />
        </div>
      );
    }
  }

  export default AuthComponent
