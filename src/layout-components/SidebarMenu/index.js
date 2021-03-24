import React, { useState } from 'react';

import clsx from 'clsx';

import { Collapse } from '@material-ui/core';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { setSidebarToggleMobile } from '../../redux/reducers/ThemeOptions';

import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone';
import BallotTwoToneIcon from '@material-ui/icons/BallotTwoTone';

const SidebarMenu = (props) => {
  const { setSidebarToggleMobile } = props;

  const toggleSidebarMobile = () => setSidebarToggleMobile(false);

  const [transactionsOpen, setTransactionsOpen] = useState(false);
  const toggleTransactions = (event) => {
    event.preventDefault();
    setTransactionsOpen(!transactionsOpen);
  };

  const [dashboardOpen, setDashboardOpen] = useState(false);
  const toggleDashboard = (event) => {
    setDashboardOpen(!dashboardOpen);
    event.preventDefault();
  };

  return (
    <>
      <PerfectScrollbar>
        {/* {sidebarUserbox && <SidebarUserbox />} */}
        <div className="sidebar-navigation">
          <div className="sidebar-header">
            <span>Navigation menu</span>
          </div>
          <ul>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/dashboard">
                <span className="sidebar-icon">
                  <AccountBalanceIcon />
                </span>
                Dashboard
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRightTwoToneIcon />
                </span>
              </NavLink>
            </li>
            <li>
              <a
                href="#/"
                onClick={toggleTransactions}
                className={clsx({ active: transactionsOpen })}>
                <span className="sidebar-icon">
                  <BallotTwoToneIcon />
                </span>
                <span className="sidebar-item-label">Transactions</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={transactionsOpen}>
                <ul>
                  <li>
                    <NavLink to="/dashboard">Yearly</NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            <li>
              <a
                href="#/"
                onClick={toggleDashboard}
                className={clsx({ active: dashboardOpen })}>
                <span className="sidebar-icon">
                  <VerifiedUserTwoToneIcon />
                </span>
                <span className="sidebar-item-label">Analytics</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRightTwoToneIcon />
                </span>
              </a>
              <Collapse in={dashboardOpen}>
                <ul>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardCommerce">
                      Yearly
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardAnalytics">
                      Monthly
                    </NavLink>

                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/DashboardAnalytics">
                      Weekly
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul>
        </div>
      </PerfectScrollbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarUserbox: state.ThemeOptions.sidebarUserbox,

  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
