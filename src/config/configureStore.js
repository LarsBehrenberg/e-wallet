import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    applyMiddleware(...middlewares)
  );
}
