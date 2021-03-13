import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Container, Button } from '@material-ui/core';

export default function LivePreviewExample() {
  const { displayName, photoURL } = useSelector((state) => state.auth.user);

  const { transactions } = useSelector((state) => state.auth);

  const profileImage =
    photoURL ||
    'https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg';

  return (
    <>
      <div className="app-inner-content-layout">
        <div className="app-inner-content-layout--main p-0">
          <div className="hero-wrapper mx-5 rounded-bottom shadow-xxl bg-composed-wrapper bg-royal">
            <div className="flex-grow-1 w-100 d-flex align-items-center">
              <div className="bg-composed-wrapper--image rounded-bottom opacity-3" />
              <div className="bg-composed-wrapper--bg rounded-bottom opacity-4" />
              <div className="bg-composed-wrapper--content px-3 py-5">
                <Container>
                  <div className="d-block d-md-flex align-items-center">
                    <div className=" rounded-circle shadow-sm-dark mr-md-3">
                      <div>
                        <div className="-inner-wrapper rounded-circle">
                          <div className="avatar-icon-wrapper d-80 rounded-circle m-2 bg-grey">
                            <div className="avatar-icon rounded-circle w-100 h-100 mr-md-3">
                              <img src={profileImage} alt="..." />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex w-100 text-white flex-column pl-md-2 ">
                      <div className="d-block d-md-flex align-items-center">
                        <div className="my-3 my-md-0">
                          <div className="d-flex align-items-end">
                            <h3 className="text-white-50">Welcome Back!</h3>
                          </div>
                          <h2 className="my-0">{displayName}</h2>
                        </div>
                        <div className="ml-auto align-self-baseline">
                          <Button
                            size="small"
                            className="btn-first mr-4 shadow-none rounded-lg text-uppercase line-height-1 font-weight-bold font-size-xs px-3 w-auto py-0 d-40"
                            component={Link}
                            to="/profile-settings">
                            Profile
                          </Button>
                          <Button
                            size="small"
                            component={Link}
                            to="/transactions"
                            className="btn-first mr-4 shadow-none rounded-lg text-uppercase line-height-1 font-weight-bold font-size-xs px-3 w-auto py-0 d-40">
                            Transactions
                          </Button>
                          <Button className="btn-icon rounded-lg shadow-none hover-scale-lg d-40 p-0 btn-success">
                            <FontAwesomeIcon icon={['fas', 'plus']} />
                          </Button>
                        </div>
                      </div>
                      <div className="d-flex font-size-xl pt-4 align-items-center">
                        <div className="mr-2">
                          {transactions.length}{' '}
                          <span className="font-size-sm text-white-50">
                            transactions
                          </span>
                        </div>
                        <div className="mr-2">
                          {
                            transactions.filter(
                              (item) => item.type === 'Expenses'
                            ).length
                          }{' '}
                          <span className="font-size-sm text-white-50">
                            achieved saving goals
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
