import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Components
import { Grid, Container, Button } from '@material-ui/core';

import Footer from '../components/LandingPage/Footer';
import Navbar from '../components/LandingPage/Navbar';

// Firebase
import { signInWithGoogle } from '../redux/reducers/AuthReducer';

// Images
import hero2 from '../assets/images/hero-bg/hero-2.jpg';
import illustration1 from '../assets/images/illustrations/pack2/credit_card.svg';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';
// import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
// import LocalLibraryTwoToneIcon from '@material-ui/icons/LocalLibraryTwoTone';

const LandingPage = ({ uid, signInWithGoogle }) => {
  if (uid) return <Redirect to="/dashboard" />;

  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-serious-blue">
        <Container className="header-top-section py-2">
          <Navbar signInWithGoogle={signInWithGoogle} />
        </Container>
        <div className="hero-wrapper--content">
          <div
            className="bg-composed-wrapper--image bg-composed-filter-rm"
            style={{ backgroundImage: 'url(' + hero2 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second " />
          <div
            className="bg-composed-wrapper--content"
            style={{
              overflowX: 'hidden'
            }}>
            <Container className="text-second pt-4">
              <Container className="text-white mb-5">
                <Grid container spacing={6}>
                  <Grid item lg={6} className="d-flex align-items-center">
                    <div>
                      <h2 className="display-3 font-weight-bold">
                        Track your Income and Expenses with E-Wallet
                      </h2>
                      <p className="font-size-xl py-3 text-white-50">
                        Keep track of your expenses and income. Know at anytime
                        where you money went and get personalized statistics on
                        a weekly, monthly and yearly basis.
                      </p>
                      <div className="pt-1">
                        <Button
                          className="btn-pill px-4 py-2 font-weight-bold btn-google d-md-none"
                          size="small"
                          onClick={signInWithGoogle}>
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fab', 'google']} />
                          </span>
                          <span className="btn-wrapper--label">
                            Login with Google
                          </span>
                        </Button>
                        {/* <Button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          size="large"
                          className="btn-pill shadow-second-sm btn-first">
                          <span className="btn-wrapper--label">Wallets</span>
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                          </span>
                        </Button>
                        <Button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          size="large"
                          className="bg-white-50 text-second btn-pill ml-3"
                          disableRipple>
                          <span>Learn more</span>
                        </Button> */}
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={6} className="d-flex align-items-center">
                    <img
                      src={illustration1}
                      alt="..."
                      className="m-5 m-lg-0 w-100"
                    />
                  </Grid>
                </Grid>
              </Container>
              {/* <Grid container spacing={6} className="pt-4">
                <Grid item md={6} xl={4}>
                  <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 mb-xl-5 d-block">
                    <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-danger mx-auto">
                      <svg
                        className="blob-wrapper opacity-1"
                        viewBox="0 0 600 600"
                        xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(300,300)">
                          <path
                            d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                      <div className="blob-icon-wrapper">
                        <NotificationsActiveTwoToneIcon />
                      </div>
                    </div>
                    <h5 className="font-weight-bold font-size-lg text-second mb-2">
                      Analytics
                    </h5>
                    <p className="mb-4 text-black-50">
                      View any of the 5+ live previews we&#39;ve set up to learn
                      why this dashboard template is the last one you&#39;ll
                      ever need!
                    </p>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="transition-base rounded-pill py-1 px-4 text-lowercase font-size-xs bg-neutral-danger text-danger d-inline-flex">
                      click for details
                    </a>
                  </Card>
                </Grid>
                <Grid item md={6} xl={4} className="d-none d-md-block">
                  <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 mb-xl-5 d-block">
                    <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-warning mx-auto">
                      <svg
                        className="blob-wrapper opacity-1"
                        viewBox="0 0 600 600"
                        xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(300,300)">
                          <path
                            d="M155,-128.8C192.2,-77,207.7,-13,197.7,50.9C187.7,114.8,152.2,178.6,96.7,208.2C41.1,237.9,-34.6,233.4,-102.6,204C-170.6,174.7,-231.1,120.6,-246.7,55.4C-262.4,-9.9,-233.2,-86.3,-184.6,-140.7C-136,-195.2,-68,-227.6,-4.6,-223.9C58.9,-220.3,117.8,-180.6,155,-128.8Z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                      <div className="blob-icon-wrapper">
                        <SettingsTwoToneIcon />
                      </div>
                    </div>
                    <h5 className="font-weight-bold font-size-lg text-second mb-2">
                      Budgets
                    </h5>
                    <p className="mb-4 text-black-50">
                      View any of the 5+ live previews we&#39;ve set up to learn
                      why this dashboard template is the last one you&#39;ll
                      ever need!
                    </p>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="transition-base rounded-pill py-1 px-4 text-lowercase font-size-xs bg-neutral-warning text-warning d-inline-flex">
                      click for details
                    </a>
                  </Card>
                </Grid>
                <Grid item md={6} xl={4} className="d-none d-lg-block">
                  <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 mb-xl-5 d-block">
                    <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-success mx-auto">
                      <svg
                        className="blob-wrapper opacity-1"
                        viewBox="0 0 600 600"
                        xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(300,300)">
                          <path
                            d="M170.4,-137.2C213.2,-82.3,234.8,-11.9,223.6,56.7C212.4,125.2,168.5,191.9,104.3,226.6C40.2,261.3,-44.1,264,-104,229.8C-163.9,195.7,-199.4,124.6,-216.2,49.8C-233,-25.1,-231,-103.9,-191.9,-158C-152.7,-212.1,-76.4,-241.6,-6.3,-236.6C63.8,-231.6,127.7,-192.2,170.4,-137.2Z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                      <div className="blob-icon-wrapper">
                        <LocalLibraryTwoToneIcon />
                      </div>
                    </div>
                    <h5 className="font-weight-bold font-size-lg text-second mb-2">
                      Performance
                    </h5>
                    <p className="mb-4 text-black-50">
                      View any of the 5+ live previews we&#39;ve set up to learn
                      why this dashboard template is the last one you&#39;ll
                      ever need!
                    </p>
                    <a
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="transition-base rounded-pill py-1 px-4 text-lowercase font-size-xs bg-neutral-success text-success d-inline-flex">
                      click for details
                    </a>
                  </Card>
                </Grid>
              </Grid> */}
            </Container>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const uid = state.auth.user?.uid;
  return {
    uid
  };
};

const mapDispatchToProps = (dispatch) => ({
  signInWithGoogle: () => dispatch(signInWithGoogle())
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
