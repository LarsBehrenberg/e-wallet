import React from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import PageRegisterBasic1 from '../example-components/PageRegisterBasic/PageRegisterBasic1';

const SignUp = () => {
  const { loggedIn } = useSelector((state) => state.auth);
  return loggedIn ? (
    <Redirect to="/dashboard" />
  ) : (
    <>
      <PageRegisterBasic1 />
    </>
  );
};

export default SignUp;
