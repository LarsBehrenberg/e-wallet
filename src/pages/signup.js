import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

import { Grid, Button, TextField } from '@material-ui/core';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    console.log(this.state);

    return this.props.loggedIn ? (
      <Redirect to="/dashboard" />
    ) : (
      <>
        <div className="app-wrapper bg-white min-vh-100">
          <div className="app-main min-vh-100">
            <div className="app-content p-0">
              <div className="app-content--inner d-flex align-items-center">
                <div className="flex-grow-1 w-100 d-flex align-items-center mx-4 mx-md-0">
                  <div className="bg-composed-wrapper--content py-5">
                    <Grid item md={10} lg={8} xl={4} className="mx-auto">
                      <div className="text-center mb-4">
                        <h1 className="display-4 mb-1 font-weight-bold">
                          Create your account
                        </h1>
                        <p className="font-size-lg mb-0 text-black-50">
                          And start saving money today!
                        </p>
                      </div>
                      <div className="mb-4">
                        <label className="font-weight-bold mb-2">
                          Full Name
                        </label>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="displayName"
                          value={displayName}
                          placeholder="Enter your name"
                          onChange={this.handleChange}
                          type="name"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="font-weight-bold mb-2">
                          Email address
                        </label>
                        <TextField
                          variant="outlined"
                          size="small"
                          name="email"
                          value={email}
                          onChange={this.handleChange}
                          fullWidth
                          placeholder="Enter your email address"
                          type="email"
                        />
                      </div>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <label className="font-weight-bold mb-2">
                            Password
                          </label>
                        </div>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          name="password"
                          value={password}
                          onChange={this.handleChange}
                          placeholder="Enter your password"
                          type="password"
                        />
                      </div>
                      <div className="mb-3">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={confirmPassword}
                          name="confirmPassword"
                          onChange={this.handleChange}
                          fullWidth
                          placeholder="Confirm your password"
                          type="password"
                        />
                      </div>
                      <div className="my-4">
                        By clicking the <strong>Create account</strong> button
                        below you agree to our terms of service and privacy
                        statement.
                      </div>
                      <div className="text-center mb-4">
                        <Button className="btn-primary text-uppercase font-weight-bold font-size-sm my-3">
                          Create account
                        </Button>
                      </div>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

export default connect(mapStateToProps)(SignUp);
