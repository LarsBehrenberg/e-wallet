import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import PageRegisterBasic1 from '../example-components/PageRegisterBasic/PageRegisterBasic1';

const SignUp = (props) => {
  return props.UserOptions.currentUser ? (
    <Redirect to="/dashboard" />
  ) : (
    <>
      <PageRegisterBasic1 />
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SignUp);
