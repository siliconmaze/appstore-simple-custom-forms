# Nuggets 1

amplify pull --appId dkticsgt9zcsl --envName dev

Post-pull status:

Current Environment: dev

| Category | Resource name    | Operation | Provider plugin   |
| -------- | ---------------- | --------- | ----------------- |
| Auth     | appstorebab2f324 | No Change | awscloudformation |
| Storage  | s3358fb663       | No Change | awscloudformation |
| Hosting  | S3AndCloudFront  | No Change | awscloudformation |

===

We are good to go now...

I am now working slowly on a simple interface....

I am going to do a withAuthenticator, and look at what this gives me?

Then I look toward Authenticator
https://blog.kylegalbraith.com/2020/03/31/customizing-the-aws-amplify-authentication-ui-with-your-own-react-components/

===

If we look into the function definition for withAuthenticator, we see that we can pass in a Greetings option, and a list of authenticatorComponents to override I think?

```js
import * as React from 'react';
export { Authenticator } from './Authenticator';
export { AuthPiece } from './AuthPiece';
export { SignIn } from './SignIn';
export { ConfirmSignIn } from './ConfirmSignIn';
export { SignOut } from './SignOut';
export { RequireNewPassword } from './RequireNewPassword';
export { SignUp } from './SignUp';
export { ConfirmSignUp } from './ConfirmSignUp';
export { VerifyContact } from './VerifyContact';
export { ForgotPassword } from './ForgotPassword';
export { Greetings } from './Greetings';
export { FederatedSignIn, FederatedButtons } from './FederatedSignIn';
export { TOTPSetup } from './TOTPSetup';
export { Loading } from './Loading';
export * from './Provider';
export * from './common/types';
export declare function withAuthenticator(Comp: any, includeGreetings?: boolean, authenticatorComponents?: any[], federated?: any, theme?: any, signUpConfig?: {}): {
    new (props: any): {
        authConfig: any;
        handleAuthStateChange(state: any, data: any): void;
        render(): JSX.Element;
        context: any;
        setState<K extends string | number | symbol>(state: any, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<any> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
    };
    contextType?: React.Context<any>;
};
export declare class AuthenticatorWrapper extends React.Component {
    constructor(props: any);
    handleAuthState(state: any, data: any): void;
    renderChildren(): any;
    render(): JSX.Element;
}

```

As we can see from the above Functional Component we have:

https://docs.amplify.aws/lib/auth/customui/q/platform/js#customize-ui-theme

You can then add themes, I would like to look at this later
This is the temlate of Dom objects we have access to customise the themes.
https://github.com/aws-amplify/amplify-js/blob/main/packages/aws-amplify-react/src/Amplify-UI/Amplify-UI-Theme.tsx

I am trying to learn new tricks

https://medium.com/javascript-in-plain-english/the-ultimate-guide-for-integrate-aws-amplify-authentication-for-react-native-15a8eec10890

I think for now, I am going to see if I can levrag my own custom sign in form, leave the login one as is, this would be a great acheivement.

For now I am going to test the following first...I am passing in the Ap Component, which is then wrapped by the withAuthenticator.

```js
export default withAuthenticator(App,{includeGreetings:true})
```

const MyTheme = {
    signInButtonIcon: { 'display': 'none' },
    googleSignInButton: { 'backgroundColor': 'red', 'borderColor': 'red' }
}


I could not figure out why withAuthenticator was not being styles:

There was a breaking chnage:
https://github.com/aws-amplify/amplify-js/issues/5445

Its in the docs https://aws-amplify.github.io/docs/js/react#add-auth under auth for react.

import '@aws-amplify/ui/dist/style.css';

Fixes the rendrring ie styles, see image: so we use these two together

```js
import { Greetings, withAuthenticator } from 'aws-amplify-react';
import '@aws-amplify/ui/dist/style.css';
```

vs

```js
import { Greetings, withAuthenticator } from '@aws-amplify/ui-react'
```

using the `@aws-amplify/ui-react` approach requires:

`yarn add aws-amplify @aws-amplify/ui-react`

But the issue we have is the fact we are using a class, and then we have issues, so I think for now we stay with the older method at least is working!

```js
import { Greetings, withAuthenticator } from 'aws-amplify-react';
import '@aws-amplify/ui/dist/style.css';
```

====

Not at this juncture we have nice looking form as per the pictures saved..

So looking at this, we can continue to use withAuthenticator, but this is not designed for custom forms, to have custom forms we have to use authtenticator. Then I can get the handler working?

Authenticator has:

handleStateChange(state: any, data?: any): void;
handleAuthEvent(state: any, event: any, showToast?: boolean): void;

withAuthenticator has:
handleAuthStateChange(state: any, data: any): void;




class AuthComponent extends Component {
  handleStateChange = state => {
    console.log(state);
    if (state === 'signedIn') {
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


=====

Everything is wroking but page will not redirect

 {this.state.authState.redirect
            ? (<Redirect to="/home" />)
            : (<></>)
          }









