import React from 'react';
import { A } from 'hookrouter';

import LoginForm from '../../common/forms/LoginForm';

const Login = () => {
  return (
    <div id="Login">
      <h1 className="p-heading text-center display-4 mb-5">Sign In</h1>
      <LoginForm />
      <br />
      <p className="lead text-center">
        You don't have an account? Let's <A href="/sign-up">Sign Up</A>
      </p>
    </div>
  );
};

export default Login;
