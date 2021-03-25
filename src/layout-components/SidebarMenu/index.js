import React, { useState, useEffect } from 'react';

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
  // Redux props
  const { setSidebarToggleMobile, transactions } = props;

  // Redux action
  const toggleSidebarMobile = () => setSidebarToggleMobile(false);

  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  // Calc years/months from transactions
  const months = transactions.map((item) => {
    const date = new Date(1970, 0, 1);
    date.setSeconds(item.date.seconds);
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`;
  });
  const monthsDescending = [
    ...new Set(months.sort((a, b) => new Date(b) - new Date(a)))
  ];
  const monthsAscending = [
    ...new Set(months.sort((a, b) => new Date(a) - new Date(b)))
  ];
  const years = [...new Set(monthsDescending.map((item) => item.slice(0, 4)))];

  // Handle Dropdown States
  const [transactionsOpen, setTransactionsOpen] = useState(false);
  const toggleTransactions = (event) => {
    event.preventDefault();
    setTransactionsOpen(!transactionsOpen);
  };

  const [menuItemsOpen, setMenuItemsOpen] = useState({});
  const toggleMenuItem = (e, year) => {
    e.preventDefault();
    setMenuItemsOpen({
      ...menuItemsOpen,
      [year]: !menuItemsOpen[year]
    });
  };

  const [dashboardOpen, setDashboardOpen] = useState(false);
  const toggleDashboard = (event) => {
    setDashboardOpen(!dashboardOpen);
    event.preventDefault();
  };

  // Populate state with available months and years based on users transactions
  useEffect(() => {
    const yearsState = {};
    years.forEach((year) => (yearsState[year] = false));
    setMenuItemsOpen(yearsState);
  }, []);

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
                  {years.map((year) => (
                    <li key={year}>
                      <a
                        href="#/"
                        onClick={(e) => toggleMenuItem(e, year)}
                        className={clsx('pr-0', {
                          active: menuItemsOpen[year]
                        })}>
                        <span className="sidebar-item-label">{year}</span>
                        <span className="sidebar-icon-indicator">
                          <ChevronRightTwoToneIcon />
                        </span>
                      </a>
                      <Collapse in={menuItemsOpen[year]}>
                        <ul>
                          {monthsAscending
                            .filter((item) => item.slice(0, 4) === year)
                            .map((month) => (
                              <li key={month}>
                                <NavLink to={`/transactions/${month}`}>
                                  {monthNames[parseInt(month.slice(-2)) - 1]}
                                </NavLink>
                              </li>
                            ))}
                        </ul>
                      </Collapse>
                    </li>
                  ))}
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

  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,

  transactions: state.auth.transactions
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
