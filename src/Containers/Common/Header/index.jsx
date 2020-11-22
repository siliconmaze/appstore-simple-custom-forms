import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';

const Header = props => (
    <ul>
      <li>
        <Link to="/">Create Account/Login</Link>
      </li>
      <li>
        <Link to="/secret">Home Page (Protected)</Link>
      </li>
      <li>
        <Link to="/about">
          About Page (we don't care if you're logged in or not)
        </Link>
      </li>
    </ul>
  );
  
export default Header