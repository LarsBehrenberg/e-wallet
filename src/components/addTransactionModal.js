import React, { useState } from 'react';

// Redux & Firestore
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

// Material UI Components
import DescriptionIcon from '@material-ui/icons/Description';

import {
  InputAdornment,
  Dialog,
  DialogContent,
  Button,
  TextField
} from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

const AddTransactionModal = () => {
  // handle form state
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectionOptions = {
    type: ['Income', 'Expense'],
    wallet: ['Visa', 'Cash', 'Debit'],
    currency: [
      {
        value: 'EUR',
        label: '€'
      },
      {
        value: 'JPY',
        label: '¥'
      }
    ]
  };

  const [currency, setCurrency] = useState('EUR');
  const [wallet, setWallet] = useState(selectionOptions.wallet[0]);
  const [type, setType] = useState(selectionOptions.type[1]);

  const handleSelectChange = (event) => {
    switch (event.target.id) {
      case 'select-currency':
        setCurrency(event.target.value);
        return;
      case 'select-wallet':
        setWallet(event.target.value);
        return;
      case 'select-type':
        setType(event.target.value);
        return;
      default:
        return;
    }
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().toJSON().slice(0, 10).replace(/-/g, '/'))
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // handle firestore
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  const addNewTransaction = () => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('transactions')
      .add({
        description: 'someting',
        amount: 284,
        currency: currency,
        wallet: wallet,
        type: type,
        date: selectedDate
      })
      .then((docRef) => {
        docRef.update({
          transactionsID: docRef.id
        });
      });
    handleClose();
  };

  return (
    <>
      <Button className="m-2 btn-primary" onClick={handleClickOpen}>
        Enter transaction
      </Button>
      <Dialog
        classes={{ paper: 'modal-content' }}
        fullWidth
        // maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title2">
        <DialogContent className="p-0">
          <div>
            <div className="bg-secondary border-0">
              <div className="card-body px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-3">
                  <small>Add a transaction</small>
                </div>
                <div className="mb-3"></div>
                <div className="mb-3">
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    id="textfield-description"
                    label="Description"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </div>

                <div className="mb-3">
                  <TextField
                    style={{
                      marginTop: '12px',
                      maxWidth: '170px',
                      marginRight: '1rem'
                    }}
                    variant="outlined"
                    size="small"
                    id="textfield-value"
                    label="Value"
                    type="number"
                  />

                  <TextField
                    className="mr-3"
                    id="select-currency"
                    select
                    label="Currency"
                    value={currency}
                    onChange={handleSelectChange}
                    SelectProps={{
                      native: true
                    }}
                    helperText="Please select your currency">
                    {selectionOptions.currency.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>

                  <TextField
                    id="select-wallet"
                    select
                    label="Wallet"
                    value={wallet}
                    onChange={handleSelectChange}
                    SelectProps={{
                      native: true
                    }}
                    helperText="Please select your wallet">
                    {selectionOptions.wallet.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      style={{ marginRight: '1rem' }}
                      disableToolbar
                      variant="inline"
                      format="yyyy/MM/dd"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date picker inline"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </MuiPickersUtilsProvider>

                  <TextField
                    style={{ minWidth: '150px', marginTop: '1rem' }}
                    id="select-type"
                    select
                    label="Income / Expense"
                    value={type}
                    onChange={handleSelectChange}
                    SelectProps={{
                      native: true
                    }}>
                    {selectionOptions.type.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div className="text-center">
                  <Button
                    variant="contained"
                    className="font-weight-bold btn-second px-4 my-2"
                    onClick={() => addNewTransaction()}>
                    Add transaction
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTransactionModal;
