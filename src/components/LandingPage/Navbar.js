import React from 'react';

import { Container, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import projectLogo from '../../assets/images/react.svg';

const Navbar = ({ signInWithGoogle }) => {
  return (
    <>
      <Container>
        <div className="bg-white-10 p-2 header-nav-wrapper header-nav-wrapper-xl rounded px-4 navbar-dark mt-4">
          <div className="app-nav-logo">
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              title="Bamburgh React Admin Dashboard with Material-UI PRO"
              className="app-nav-logo">
              <div className="app-nav-logo--icon rounded-sm">
                <img
                  alt="Bamburgh React Admin Dashboard with Material-UI PRO"
                  src={projectLogo}
                />
              </div>
              <div className="app-nav-logo--text">
                <span>Your</span>

                <b className="text-capitalize">E-Wallet</b>
              </div>
            </a>
          </div>

          <div className="header-nav-actions flex-grow-0 flex-lg-grow-1">
            <Button
              className="m-2 btn-pill px-4 py-2 font-weight-bold btn-google"
              size="small"
              onClick={signInWithGoogle}>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fab', 'google']} />
              </span>
              <span className="btn-wrapper--label">Login with Google</span>
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Navbar;
