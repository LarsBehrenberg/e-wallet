import React, { useState, useReducer, useContext } from 'react';

// Redux & Firestore
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

// Components
import {
  Grid,
  Card,
  Dialog,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Input,
  Chip
} from '@material-ui/core';

// Assets & Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import illustration1 from '../assets/images/illustrations/pack1/analysis.svg';
import illustration2 from '../assets/images/illustrations/pack1/businessman.svg';

// Currencies
const possibleCurrencies = ['EUR', 'USD', 'JPY'];

const ITEM_HEIGHT = 24;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6.5,
      width: 200
    }
  }
};

// Context
const Context = React.createContext();

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case 'toggleDialogProfileInformation':
      return {
        ...state,
        dialogProfileInformationOpen: !state.dialogProfileInformationOpen,
        userName: action.payload?.name || state.userName,
        userEmail: action.payload?.email || state.userEmail
      };
    case 'toggleDialogAccountSettings':
      return {
        ...state,
        dialogAccountSettingsOpen: !state.dialogAccountSettingsOpen,
        userExpenseCategories:
          action.payload?.expenseCategories || state.userExpenseCategories,
        userIncomeCategories:
          action.payload?.incomeCategories || state.userIncomeCategories,
        currencies: action.payload?.currencies || state.currencies
      };
    case 'addCategory':
      if (action.payload.category === 'expense') {
        if (
          action.payload.name.length !== 0 &&
          state.userExpenseCategories.find(
            (element) => element === action.payload.name
          ) === undefined
        ) {
          return {
            ...state,
            userExpenseCategories: [
              ...state.userExpenseCategories,
              action.payload.name
            ]
          };
        }
      } else if (action.payload.category === 'income') {
        if (
          action.payload.name.length !== 0 &&
          state.userIncomeCategories.find(
            (element) => element === action.payload.name
          ) === undefined
        ) {
          return {
            ...state,
            userIncomeCategories: [
              ...state.userIncomeCategories,
              action.payload.name
            ]
          };
        }
      }
      return { ...state };
    case 'removeCategory':
      if (action.payload.category === 'expense') {
        return {
          ...state,
          userExpenseCategories: state.userExpenseCategories.filter(
            (word) => word !== action.payload.name
          )
        };
      } else if (action.payload.category === 'income') {
        return {
          ...state,
          userIncomeCategories: state.userIncomeCategories.filter(
            (word) => word !== action.payload.name
          )
        };
      }
      return { ...state };
    case 'changeCurrencies':
      return { ...state, currencies: action.payload };
    default:
      return state;
  }
}

export default function LivePreviewExample() {
  // Access firestore data and set state
  const { uid } = useSelector((state) => state.firebase.auth);
  const { user } = useSelector((state) => state.firestore.data);

  useFirestoreConnect([
    {
      collection: 'users',
      doc: uid,
      storeAs: 'user'
    }
  ]);

  const initialState = {
    userName: '',
    userEmail: '',
    userExpenseCategories: [],
    userIncomeCategories: [],
    currencies: [],
    dialogProfileInformationOpen: false,
    dialogAccountSettingsOpen: false
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Grid container spacing={6}>
        <Grid item md={6} lg={12} xl={6}>
          <Card
            onClick={() =>
              dispatch({
                type: 'toggleDialogProfileInformation',
                payload: { name: user.displayName, email: user.email }
              })
            }
            style={{ cursor: 'pointer' }}>
            <div className="p-4">
              <Grid container spacing={0}>
                <Grid item md={3}>
                  <img
                    alt="..."
                    className="img-fluid"
                    style={{ minHeight: '100px', maxHeight: '150px' }}
                    src={illustration1}
                  />
                </Grid>
                <Grid item md={9} className="d-flex align-items-center">
                  <div>
                    <div className="font-size-lg font-weight-bold mb-1">
                      Profile Information
                    </div>
                    <p className="opacity-7 font-size-md mb-0">
                      Acccess this page in order to manage and customize all
                      aspects of your profile data and accounts.
                    </p>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="divider" />
            <span className="px-4 py-3 text-first btn btn-white shadow-none d-flex justify-content-between align-items-center">
              <div>Manage account</div>
              <FontAwesomeIcon icon={['fas', 'chevron-right']} />
            </span>
          </Card>
        </Grid>
        <Grid item md={6} lg={12} xl={6}>
          <Card
            onClick={() =>
              dispatch({
                type: 'toggleDialogAccountSettings',
                payload: {
                  incomeCategories: user.incomeCategories,
                  expenseCategories: user.expenseCategories,
                  currencies: user.currencies
                }
              })
            }
            style={{ cursor: 'pointer' }}>
            <div className="p-4">
              <Grid container spacing={0}>
                <Grid item md={3}>
                  <img
                    alt="..."
                    className="img-fluid"
                    style={{ minHeight: '100px', maxHeight: '150px' }}
                    src={illustration2}
                  />
                </Grid>
                <Grid item md={9} className="d-flex align-items-center">
                  <div>
                    <div className="font-size-lg font-weight-bold mb-1">
                      Account Settings
                    </div>
                    <p className="opacity-7 font-size-md mb-0">
                      Control everything related to your profile and trading
                      accounts as shown in this page.
                    </p>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="divider" />
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="px-4 py-3 text-first btn btn-white shadow-none d-flex justify-content-between align-items-center">
              <div>Manage settings</div>
              <FontAwesomeIcon icon={['fas', 'chevron-right']} />
            </a>
          </Card>
        </Grid>
      </Grid>
      <DialogProfileInformation />
      <DialogAccountSettings />
    </Context.Provider>
  );
}

function DialogProfileInformation() {
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);
  const { user } = useSelector((state) => state.firestore.data);

  const { state, dispatch } = useContext(Context);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState({
    email: '',
    error: false
  });

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.id === 'textfield-email') {
      // eslint-disable-next-line no-useless-escape
      const emailChecker = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (emailChecker.test(e.target.value)) {
        setUserEmail({ email: e.target.value, error: false });
      } else {
        setUserEmail({ email: user.email, error: true });
      }
    } else {
      setUserName(e.target.value);
    }
  };

  const handleSubmit = () => {
    // Update userName and userEmail if empty with firestore values
    if (!userName) {
      setUserName(state.userName);
    }
    if (!userEmail.email) {
      setUserEmail({ email: state.userEmail, error: false });
    }

    // Update firestore with name and email
    if (
      (userEmail.email !== user.email && userEmail.email.length > 1) ||
      (user.displayName !== userName && userName.length > 1)
    ) {
      firestore.update(`users/${uid}/`, {
        email: userEmail.email,
        displayName: userName
      });
    }

    // Close Dialog
    dispatch({ type: 'toggleDialogProfileInformation' });
  };

  return (
    <Dialog
      scroll="body"
      classes={{ paper: 'bg-transparent' }}
      maxWidth="md"
      open={state.dialogProfileInformationOpen}
      onClose={() => dispatch({ type: 'toggleDialogProfileInformation' })}>
      <Grid container spacing={0}>
        <div className="bg-white rounded">
          <div className="p-4 text-center">
            <h4 className="font-size-lg font-weight-bold my-2">
              Profile Information
            </h4>

            <p className="text-muted mb-4 mx-4">
              Access your profile information and change them if necessary.
            </p>

            <div className="divider my-4" />

            <Grid container spacing={4}>
              <Grid item xs={12} lg={12}>
                <div className="p-3">
                  <TextField
                    fullWidth
                    className="m-2 mb-3"
                    variant="outlined"
                    id="textfield-name"
                    label="Name"
                    onChange={(e) => handleChange(e)}
                    defaultValue={state.userName}
                  />
                  <TextField
                    fullWidth
                    className="m-2"
                    variant="outlined"
                    id="textfield-email"
                    helperText={
                      userEmail.error && 'Please enter a valid email address.'
                    }
                    error={userEmail.error}
                    label="Email"
                    onChange={(e) => handleChange(e)}
                    defaultValue={state.userEmail}
                  />
                </div>
              </Grid>
            </Grid>

            <div className="divider my-4" />
            <Button
              onClick={!userEmail.error ? () => handleSubmit() : null}
              className="btn btn-primary font-weight-bold text-uppercase text-black-70 text-center mb-3"
              style={userEmail.error ? { cursor: 'not-allowed' } : {}}>
              Save Changes
            </Button>
          </div>
        </div>
      </Grid>
    </Dialog>
  );
}

function DialogAccountSettings() {
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  const { state, dispatch } = useContext(Context);

  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const [newIncomeCategory, setNewIncomeCategory] = useState('');

  const handleSubmit = () => {
    // Update firestore with categories and currencies

    if (
      state.userExpenseCategories.length > 0 &&
      state.userIncomeCategories.length > 0 &&
      state.currencies.length > 0
    ) {
      firestore.update(`users/${uid}/`, {
        currencies: state.currencies,
        incomeCategories: state.userIncomeCategories,
        expenseCategories: state.userExpenseCategories
      });
    }

    // Close Dialog
    dispatch({ type: 'toggleDialogAccountSettings' });
  };

  return (
    <Dialog
      scroll="body"
      classes={{ paper: 'bg-transparent' }}
      maxWidth="md"
      open={state.dialogAccountSettingsOpen}
      onClose={() => dispatch({ type: 'toggleDialogAccountSettings' })}>
      <Grid container spacing={0}>
        <div className="bg-white rounded p-4 text-center">
          <h4 className="font-size-lg font-weight-bold my-2">
            Account Settings
          </h4>

          <p className="text-muted mb-4 mx-4">
            Set your income and expense currencies as well as the currency you
            want to store your transactions in.
          </p>

          <div className="divider my-4" />
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <p className="font-weight-bold mb-1">Income Categories</p>
              <p className="text-muted mb-2 font-size-sm">
                Click a category to remove it from the list.
              </p>
              {state.userIncomeCategories.map((category) => (
                <div
                  key={category}
                  onClick={() =>
                    dispatch({
                      type: 'removeCategory',
                      payload: { category: 'income', name: category }
                    })
                  }
                  className="badge badge-pill badge-neutral-first text-first mx-1"
                  style={{ cursor: 'pointer', textTransform: 'none' }}>
                  {category}
                </div>
              ))}
              <div className="d-flex align-content-center mt-3 justify-content-center">
                <TextField
                  style={{
                    maxWidth: '170px',
                    marginRight: '1rem'
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setNewIncomeCategory(e.target.value);
                  }}
                  variant="outlined"
                  size="small"
                  id="textfield-income-category"
                  label="New Category"
                  type="text"
                />
                <Button
                  className="btn btn-neutral-first p-2"
                  onClick={() =>
                    dispatch({
                      type: 'addCategory',
                      payload: { category: 'income', name: newIncomeCategory }
                    })
                  }>
                  Add
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={6} className="mt-4 mt-md-0">
              <p className="font-weight-bold mb-1">Expense Categories</p>
              <p className="text-muted mb-2 font-size-sm">
                Click a category to remove it from the list.
              </p>

              {state.userExpenseCategories.map((category) => (
                <div
                  key={category}
                  onClick={() =>
                    dispatch({
                      type: 'removeCategory',
                      payload: { category: 'expense', name: category }
                    })
                  }
                  className="badge badge-pill badge-neutral-first text-first mx-1"
                  style={{ cursor: 'pointer', textTransform: 'none' }}>
                  {category}
                </div>
              ))}
              <div className="d-flex align-content-center mt-3 justify-content-center">
                <TextField
                  style={{
                    maxWidth: '170px',
                    marginRight: '1rem'
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setNewExpenseCategory(e.target.value);
                  }}
                  variant="outlined"
                  size="small"
                  id="textfield-expense-category"
                  label="New Category"
                  type="text"
                />
                <Button
                  className="btn btn-neutral-first p-2"
                  onClick={() =>
                    dispatch({
                      type: 'addCategory',
                      payload: { category: 'expense', name: newExpenseCategory }
                    })
                  }>
                  Add
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={6} className="mx-auto mt-4">
              <p className="font-weight-bold mb-1">Your Currencies</p>

              <FormControl variant="outlined" fullWidth>
                <InputLabel id="mutiple-chip-label">Currencies</InputLabel>
                <Select
                  labelId="mutiple-chip-label"
                  id="mutiple-chip"
                  multiple
                  variant="outlined"
                  value={state.currencies}
                  onChange={(e) =>
                    dispatch({
                      type: 'changeCurrencies',
                      payload: e.target.value
                    })
                  }
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((value) => (
                        <Chip
                          className={`bg-primary text-white mr-2`}
                          key={value}
                          label={value}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}>
                  {possibleCurrencies.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <div className="divider my-4" />
          <Button
            onClick={() => handleSubmit()}
            className="btn btn-primary font-weight-bold text-uppercase text-black-70 text-center mb-3">
            Save Changes
          </Button>
        </div>
      </Grid>
    </Dialog>
  );
}
