import { combineReducers } from 'redux';

import ThemeOptions from './ThemeOptions';
import authReducer from './AuthReducer';

const rootReducer = combineReducers({
  ThemeOptions,
  auth: authReducer
});

export default rootReducer;
