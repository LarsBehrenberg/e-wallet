import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import ThemeOptions from './ThemeOptions';
import authReducer from './AuthReducer';

export default {
  ThemeOptions,
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
};
