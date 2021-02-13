import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// redux persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// firebase
import { getFirebase } from 'react-redux-firebase';

import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    ...reducers
  })
);

const middlewares = [thunk.withExtraArgument({ getFirebase })];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

let store = createStore(persistedReducer, applyMiddleware(...middlewares));
let persistor = persistStore(store);

export default function configureStore() {
  return { store, persistor };
}
