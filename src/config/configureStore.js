import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from '../reducers';

const middlewares = [logger];

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    applyMiddleware(...middlewares)
  );
}
