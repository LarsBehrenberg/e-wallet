import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as serviceWorker from './serviceWorker';

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import createStore from './redux/configureStore';

import { RingLoader } from 'react-spinners';

const { store, persistor } = createStore;

function isLoading() {
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
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={isLoading} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
