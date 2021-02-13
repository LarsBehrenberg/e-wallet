import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

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

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export default function configureStore() {
  let store = createStore(persistedReducer, applyMiddleware(...middlewares));
  let persistor = persistStore(store);
  return { store, persistor };
}
