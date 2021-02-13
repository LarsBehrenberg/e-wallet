import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import PageRegisterBasic1 from '../example-components/PageRegisterBasic/PageRegisterBasic1';

const SignUp = ({ uid }) => {
  return uid ? (
    <Redirect to="/dashboard" />
  ) : (
    <>
      <PageRegisterBasic1 />
    </>
  );
};

const mapStateToProps = ({ firebase }) => ({ uid: firebase.auth.uid });

export default connect(mapStateToProps)(SignUp);
