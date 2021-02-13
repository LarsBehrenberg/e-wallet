import { provider } from '../firebase/firebase.utils';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_WITH_GOOGLE = 'SIGN_IN_WITH_GOOGLE';
export const SIGN_IN_ERR = 'SIGN_IN_ERR';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_ERR = 'SIGN_UP_ERR';

export const signInWithEmailAndPassword = (creds) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then(() => {
        dispatch({ type: SIGN_IN });
      })
      .catch((err) => {
        dispatch({ type: SIGN_IN_ERR }, err);
      });
  };
};

export const signInWithGoogle = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        dispatch({ type: SIGN_IN_WITH_GOOGLE });
      })
      .catch((err) => {
        dispatch({ type: SIGN_IN_ERR }, err);
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: SIGN_OUT });
      });
  };
};

export const signUp = (creds) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password)
      .then(() => {
        dispatch({ type: SIGN_UP });
      })
      .catch((err) => {
        dispatch({ type: SIGN_UP_ERR }, err);
      });
  };
};

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      console.log('Welcome back..');
      return state;
    case SIGN_IN_WITH_GOOGLE:
      console.log('Google');
      return state;
    case SIGN_IN_ERR:
      console.error('Sign in error...');
      return state;
    case SIGN_OUT:
      console.log('You signed out..');
      return state;
    case SIGN_UP:
      console.log('Welcome..');
      return state;
    case SIGN_UP_ERR:
      console.error('Sign up error...');
      return state;
    default:
      return state;
  }
};

export default authReducer;