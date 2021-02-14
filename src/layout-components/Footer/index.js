import React from 'react';

import clsx from 'clsx';

import { List, ListItem } from '@material-ui/core';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Footer = (props) => {
  const { footerShadow, footerBgTransparent } = props;
  return (
    <>
      <div
        className={clsx('app-footer text-black-50', {
          'app-footer--shadow': footerShadow,
          'app-footer--opacity-bg': footerBgTransparent
        })}>
        <div className="app-footer--first">
          <List
            component="div"
            className="nav-neutral-primary d-flex align-items-center">
            <ListItem
              className="rounded-sm"
              button
              component={NavLink}
              to="/dashboard">
              <span>Dashboard</span>
            </ListItem>
            <ListItem
              className="rounded-sm"
              button
              component={NavLink}
              to="/transactions">
              <span>Transactions</span>
            </ListItem>
          </List>
        </div>
        <div className="app-footer--second">
          <span>e-wallet</span> © {new Date().getFullYear()} - crafted with{' '}
          <span className="text-danger px-1">❤</span> by{' '}
          <a
            href="https://larsbehrenberg.com"
            target="_blank"
            title="LarsBehrenberg.com"
            rel="noopener noreferrer">
            Lars Behrenberg
          </a>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  footerShadow: state.ThemeOptions.footerShadow,
  footerBgTransparent: state.ThemeOptions.footerBgTransparent
});

export default connect(mapStateToProps)(Footer);
