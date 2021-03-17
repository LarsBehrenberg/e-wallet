import React from 'react';

import { Container, Button } from '@material-ui/core';

import projectLogo from '../../assets/images/react.svg';

const Navbar = () => {
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
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="text-uppercase font-weight-bold text-nowrap font-size-xs shadow-sm-dark btn-success">
              Sign In With Google
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Navbar;
