import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as serviceWorker from './serviceWorker';

// Redux
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './config/configureStore';

// Firestore
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import firebase from './firebase/firebase.utils';
import { createFirestoreInstance } from 'redux-firestore';

import { RingLoader } from 'react-spinners';

const { store, persistor } = configureStore();

const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <section className="vh-100">
        <header className="container vh-100">
          <div className="d-flex align-items-center justify-content-center vh-100">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ width: '150px', height: '80px' }}>
              <RingLoader color={'var(--primary)'} loading={true} />
            </div>
          </div>
        </header>
      </section>
    );
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={'loading'} persistor={persistor}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
