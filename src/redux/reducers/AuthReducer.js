import firebase, {
  provider,
  receiveIncomeExpenseCategories,
  receiveTransactions,
  addTransaction
} from '../../firebase/firebase.utils';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_WITH_GOOGLE = 'SIGN_IN_WITH_GOOGLE';
export const SIGN_IN_ERR = 'SIGN_IN_ERR';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_ERR = 'SIGN_UP_ERR';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';

export const signInWithGoogle = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(({ user }) => {
        // Create default income and expense categories if not already existent in user profile
        receiveIncomeExpenseCategories(user.uid)
          .then((categories) => {
            // Receive transactions if existent
            receiveTransactions(user.uid)
              .then((transactions) => {
                dispatch({
                  type: SIGN_IN_WITH_GOOGLE,
                  payload: { user, categories, transactions }
                });
              })
              .catch((err) => {
                // Catch error and reset redux store to initial empty state
                dispatch({ type: SIGN_IN_ERR }, err);
              });
            // Dispatch login and set user object in redux store
          })
          .catch((err) => {
            // Catch error and reset redux store to initial empty state
            dispatch({ type: SIGN_IN_ERR }, err);
          });
      })
      .catch((err) => {
        // Catch error and reset redux store to initial empty state
        dispatch({ type: SIGN_IN_ERR }, err);
      });
  };
};

export const addTransactionAction = (uid, transaction) => {
  return (dispatch) => {
    addTransaction(uid, transaction)
      .then(() => {
        return receiveTransactions(uid);
      })
      .then((transactions) => {
        dispatch({
          type: ADD_TRANSACTION,
          payload: { transactions }
        });
      })
      .catch((err) => {
        // Catch error and reset redux store to initial empty state
        dispatch({ type: SIGN_IN_ERR }, err);
      });
  };
};

export const signInWithEmailAndPassword = (creds) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then((data) => {
        console.log(data);
        dispatch({ type: SIGN_IN });
      })
      .catch((err) => {
        dispatch({ type: SIGN_IN_ERR }, err);
      });
  };
};

export const signOut = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: SIGN_OUT });
      });
  };
};

export const signUp = (creds) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password)
      .then((data) => {
        console.log(data);
        dispatch({ type: SIGN_UP });
      })
      .catch((err) => {
        dispatch({ type: SIGN_UP_ERR }, err);
      });
  };
};

const initialState = {
  user: {},
  transactions: {},
  profile: {},
  loggedIn: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      console.log('Welcome back..');
      return state;
    case SIGN_IN_WITH_GOOGLE:
      return {
        ...state,
        user: action.payload.user,
        profile: action.payload.categories,
        transactions: action.payload.transactions,
        loggedIn: true
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: action.payload.transactions
      };
    case SIGN_IN_ERR:
      console.error('Sign in error...');
      return state;
    case SIGN_OUT:
      console.log('You signed out..');
      return initialState;
    case SIGN_UP:
      console.log('Welcome..');
      return state;
    case SIGN_UP_ERR:
      console.error('Sign up error...');
      return initialState;
    default:
      break;
  }

  return state;
};

export default authReducer;
