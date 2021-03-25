import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { ClimbingBoxLoader } from 'react-spinners';

import { ThemeProvider } from '@material-ui/styles';

import MuiTheme from './theme';

// Layout Blueprints

import {
  LeftSidebar
  // CollapsedSidebar,
  // MinimalLayout
  // PresentationLayout
} from './layout-blueprints';

// Real Pages
const LandingPage = lazy(() => import('./pages/landing-page'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const ProfileSettings = lazy(() => import('./pages/profile-settings.js'));
const Transactions = lazy(() => import('./pages/transactions'));
const Import = lazy(() => import('./pages/import'));
// const Login = lazy(() => import('./pages/login'));
// const SignUp = lazy(() => import('./pages/signup'));

// Example Pages

const Routes = () => {
  const location = useLocation();
  const { loggedIn } = useSelector((state) => state.auth);

  const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.3
  };

  const SuspenseLoading = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
      let timeout = setTimeout(() => setShow(true), 300);
      return () => {
        clearTimeout(timeout);
      };
    }, []);

    return (
      <>
        <AnimatePresence>
          {show && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}>
              <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
                <div className="d-flex align-items-center flex-column px-4">
                  <ClimbingBoxLoader color={'#3c44b1'} loading={true} />
                </div>
                <div className="text-muted font-size-xl text-center pt-3">
                  Please wait while we load the live preview examples
                  <span className="font-size-lg d-block text-dark">
                    This live preview instance can be slower than a real
                    production build!
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };
  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense fallback={<SuspenseLoading />}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            {/* <Route exact path={['/']}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route exact path="/" component={Index} />
                  </motion.div>
                </Switch>
              </PresentationLayout> 
            </Route> */}

            <Route
              path={[
                '/dashboard',
                '/transactions',
                '/profile-settings',
                '/import'
              ]}>
              {!loggedIn ? (
                <Redirect to="/" />
              ) : (
                <LeftSidebar>
                  <Switch location={location} key={location.pathname}>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}>
                      <Route path="/dashboard" component={Dashboard} />
                      <Route
                        exact
                        path="/transactions"
                        render={() => <Redirect to="/dashboard" />}
                      />
                      <Route
                        path="/transactions/:year/:month"
                        component={Transactions}
                      />
                      <Route path="/import" component={Import} />
                      <Route
                        path="/profile-settings"
                        component={ProfileSettings}
                      />
                    </motion.div>
                  </Switch>
                </LeftSidebar>
              )}
            </Route>

            {/* <Route
              path={[
                '/PageCalendar',
                '/PageChat',
                '/PageProjects',
                '/PageFileManager',
                '/PageProfile'
              ]}>
              <CollapsedSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/PageCalendar" component={PageCalendar} />
                    <Route path="/PageChat" component={PageChat} />
                    <Route path="/PageProjects" component={PageProjects} />
                    <Route
                      path="/PageFileManager"
                      component={PageFileManager}
                    />
                    <Route path="/PageProfile" component={PageProfile} />
                  </motion.div>
                </Switch>
              </CollapsedSidebar>
            </Route> */}

            {/* <Route
              path={[
                '/',
                '/signup',
                '/PageLoginOverlay',
                '/PageRegisterOverlay',
                '/PageRecoverOverlay',
                '/PageError404',
                '/PageError500',
                '/PageError505'
              ]}>
              <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route exact path="/" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route
                      path="/PageRegisterOverlay"
                      component={PageRegisterOverlay}
                    />
                    <Route
                      path="/PageRecoverOverlay"
                      component={PageRecoverOverlay}
                    />
                    <Route path="/PageError404" component={PageError404} />
                    <Route path="/PageError500" component={PageError500} />
                    <Route path="/PageError505" component={PageError505} />
                  </motion.div>
                </Switch>
              </MinimalLayout>
            </Route> */}
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
