import React, { useState } from 'react';

// Redux & Firestore
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

// Components
import { Grid, Card, Dialog, TextField, Button } from '@material-ui/core';

// Assets & Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import illustration1 from '../assets/images/illustrations/pack1/analysis.svg';
import illustration2 from '../assets/images/illustrations/pack1/businessman.svg';

export default function LivePreviewExample() {
  // Access firestore data and set state
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);
  const { user } = useSelector((state) => state.firestore.data);

  useFirestoreConnect([
    {
      collection: 'users',
      doc: uid,
      storeAs: 'user'
    }
  ]);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState({});
  const [userExpenseCategories, setUserExpenseCategories] = useState([]);
  const [userIncomeCategories, setUserIncomeCategories] = useState([]);
  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const [newIncomeCategory, setNewIncomeCategory] = useState('');

  // Modal toggle state
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  const toggle1 = () => {
    setModal1(!modal1);
    setUserEmail({ email: user.email, error: false });
    setUserName(user.displayName);
  };

  const handleChange = (e, setState) => {
    e.preventDefault();
    setState(e.target.value);
  };
  const handleEmail = (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-useless-escape
    const emailChecker = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailChecker.test(e.target.value)) {
      setUserEmail({ email: e.target.value, error: false });
    } else {
      setUserEmail({ email: user.email, error: true });
    }
  };

  const handleSubmitToFireStore = () => {
    if (userEmail.email !== user.email || user.displayName !== userName) {
      firestore.update(`users/${uid}/`, {
        email: userEmail.email,
        displayName: userName
      });
    }
    setModal1(!modal1);
  };

  const toggle2 = () => {
    setModal2(!modal2);
    setUserExpenseCategories(user.expenseCategories);
    setUserIncomeCategories(user.incomeCategories);
  };

  const removeCategory = (category, state, setState) => {
    setState(state.filter((word) => word !== category));
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={6} lg={12} xl={6}>
          <Card onClick={() => toggle1()} style={{ cursor: 'pointer' }}>
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
          <Card onClick={() => toggle2()} style={{ cursor: 'pointer' }}>
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
      <Dialog
        scroll="body"
        classes={{ paper: 'bg-transparent' }}
        maxWidth="md"
        open={modal1}
        onClose={toggle1}>
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
                      onChange={(e) => handleChange(e, setUserName)}
                      defaultValue={userName}
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
                      onChange={(e) => handleEmail(e)}
                      defaultValue={userEmail.email}
                    />
                  </div>
                </Grid>
              </Grid>

              <div className="divider my-4" />
              <Button
                onClick={
                  !userEmail.error ? () => handleSubmitToFireStore() : null
                }
                className="btn btn-primary font-weight-bold text-uppercase text-black-70 text-center mb-3"
                style={userEmail.error ? { cursor: 'not-allowed' } : {}}>
                Save Changes
              </Button>
            </div>
          </div>
        </Grid>
      </Dialog>
      <Dialog
        scroll="body"
        classes={{ paper: 'bg-transparent' }}
        maxWidth="md"
        open={modal2}
        onClose={toggle2}>
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
                {userIncomeCategories.map((category) => (
                  <div
                    key={category}
                    onClick={() =>
                      removeCategory(
                        category,
                        userIncomeCategories,
                        setUserIncomeCategories
                      )
                    }
                    className="badge badge-pill badge-neutral-first text-first mx-1"
                    style={{ cursor: 'pointer' }}>
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
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        newIncomeCategory.length !== 0 &&
                        userIncomeCategories.find(
                          (element) => element === newIncomeCategory
                        ) === undefined
                      ) {
                        setUserIncomeCategories([
                          ...userIncomeCategories,
                          newIncomeCategory
                        ]);
                      }
                    }}>
                    Add
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} md={6} className="mt-4 mt-md-0">
                <p className="font-weight-bold mb-1">Expense Categories</p>
                <p className="text-muted mb-2 font-size-sm">
                  Click a category to remove it from the list.
                </p>

                {userExpenseCategories.map((category) => (
                  <div
                    key={category}
                    onClick={() =>
                      removeCategory(
                        category,
                        userExpenseCategories,
                        setUserExpenseCategories
                      )
                    }
                    className="badge badge-pill badge-neutral-first text-first mx-1"
                    style={{ cursor: 'pointer' }}>
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
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        newExpenseCategory.length !== 0 &&
                        userExpenseCategories.find(
                          (element) => element === newExpenseCategory
                        ) === undefined
                      ) {
                        setUserExpenseCategories([
                          ...userExpenseCategories,
                          newExpenseCategory
                        ]);
                      }
                    }}>
                    Add
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} md={6} className="mx-auto mt-4">
                <p className="font-weight-bold mb-1">Your Currencies</p>
                <p className="text-muted mb-2 font-size-sm">
                  Click a category to remove it from the list.
                </p>
              </Grid>
            </Grid>

            <div className="divider my-4" />
            <Button
              onClick={() => toggle2()}
              className="btn btn-primary font-weight-bold text-uppercase text-black-70 text-center mb-3">
              Save Changes
            </Button>
          </div>
        </Grid>
      </Dialog>
    </>
  );
}
