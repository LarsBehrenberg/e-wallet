import React from 'react';

import { Container, List, ListItem } from '@material-ui/core';

import projectLogo from '../../assets/images/react.svg';

export default function LivePreviewExample() {
  return (
    <>
      <div className="font-size-sm pb-5 pt-3">
        <div className="pt-3">
          <a
            href="#/"
            onClick={(e) => e.preventDefault()}
            title="Bamburgh React Admin Dashboard with Material-UI PRO"
            className="d-70 d-block mx-auto bg-white rounded-circle">
            <img
              alt="Bamburgh React Admin Dashboard with Material-UI PRO"
              className="img-fluid p-2"
              src={projectLogo}
            />
          </a>
        </div>
        <Container className="pt-5">
          <div className="divider mt-4 bg-white opacity-2" />
          <div className="divider mb-4 bg-white opacity-2" />
          <div className="py-3 d-block d-lg-flex align-items-center justify-content-between">
            <div className="text-center d-block mb-3 mb-md-0 text-white">
              Copyright &copy; 2020 - UiFort.com
            </div>
            <List
              component="div"
              className="nav-transparent-alt text-nowrap d-flex justify-content-center">
              <ListItem
                button
                className="text-white-50"
                href="#/"
                onClick={(e) => e.preventDefault()}>
                Privacy Policy
              </ListItem>
              <ListItem
                button
                className="text-white-50"
                href="#/"
                onClick={(e) => e.preventDefault()}>
                Terms of Service
              </ListItem>
            </List>
            <List
              component="div"
              className="nav-transparent-alt text-nowrap d-flex justify-content-center">
              <ListItem
                button
                className="text-white-50"
                href="#/"
                onClick={(e) => e.preventDefault()}>
                My Account
              </ListItem>
            </List>
          </div>
        </Container>
      </div>
    </>
  );
}
