import React from 'react';
import { A } from 'hookrouter';

import SignupForm from '../../common/forms/SignupForm';

const Signup = () => {
  return (
    <div id="Signup">
      <h1 className="p-heading text-center display-4 mb-5">Sign Up</h1>
      <SignupForm />
      <br />
      <p className="lead text-center">
        If you already have an account, Let's <A href="/sign-in">Sign In</A>
      </p>
    </div>
  );
};

export default Signup;
