import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import ThemeOptions from './ThemeOptions';
import authReducer from './AuthReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const rootReducer = combineReducers({
  ThemeOptions,
  auth: authReducer
});

export default persistReducer(persistConfig, rootReducer);
