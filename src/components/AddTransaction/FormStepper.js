import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTransactionAction } from '../../redux/reducers/AuthReducer';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Formating functions
import NumberFormat from 'react-number-format';
import { getCurrencySymbol } from '../../utils/getCurrencySymbol';

// Material ui
import {
  Grid,
  Container,
  MenuItem,
  Button,
  TextField,
  Chip,
  Switch
} from '@material-ui/core';

// Mui Date
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

// Mui Stepper
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

// Icons
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ClassIcon from '@material-ui/icons/Class';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: parseFloat(values.value)
          }
        });
      }}
      thousandSeparator
      isNumericString
      prefix={`${props.currency} `}
    />
  );
}

const Step1 = ({ handleChange, values, nextModal }) => {
  const { currencies } = useSelector((state) => state.auth.profile);
  const [currentAmount, setCurrentAmount] = useState(null);
  const [error, setError] = useState(false);

  const handleDateChange = (date) => {
    handleChange({
      target: {
        name: 'date',
        value: date
      }
    });
  };

  const buttonDisabled =
    typeof currentAmount !== 'number' || isNaN(currentAmount);

  const currenciesString = currencies
    .filter((i) => i !== values.currency)
    .join();

  const handleSubmit = async (name, value) => {
    console.log(values.date.toJSON().slice(0, 10));
    console.log(values.currency);
    console.log(currenciesString);
    console.log(
      `https://api.xchangeapi.com/historical/${values.date
        .toJSON()
        .slice(0, 10)}?base=${values.currency}`
    );
    fetch(
      `https://api.xchangeapi.com/historical/${values.date
        .toJSON()
        .slice(0, 10)}?base=${values.currency}`,
      {
        headers: {
          'api-key': process.env.REACT_APP_XCHANGE_API_KEY
        }
      }
    )
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then(function ({ rates }) {
        const objectDuplicate = { ...rates, [values.currency]: 1 };
        for (const [key, value] of Object.entries(objectDuplicate)) {
          objectDuplicate[key] = parseFloat((value * currentAmount).toFixed(2));
        }
        return objectDuplicate;
      })
      .then((data) =>
        handleChange({
          target: {
            name: 'amount',
            value: data
          }
        })
      )
      .then((data) =>
        handleChange(
          {
            target: {
              name,
              value
            }
          },
          data
        )
      )
      .then(() => nextModal())
      .catch((error) => {
        console.error("The exchange couldn't be fetched...", error);
        setError(true);
      });
  };

  return (
    <Container>
      <div className="p-4">
        {!error ? (
          <>
            <h5 className="font-size-xl mb-1 font-weight-bold text-center">
              Amount &amp; Type
            </h5>
            <p className="text-black-50 mb-4  text-center">
              Small section summary description can be added here!
            </p>
          </>
        ) : (
          <>
            <p className="text-black-50 mb-2  text-center">
              Please try again soon.
            </p>
            <h5 className="font-size-xl mb-3 font-weight-bold text-center">
              We are sorry the exchange rates for your other currencies couldn't
              be fetched.
            </h5>
          </>
        )}

        {!error && (
          <Grid container spacing={1} justify="center">
            <Grid item xs={10} className="d-flex justify-content-center my-2">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  style={{ margin: '0 auto' }}
                  disableToolbar
                  variant="inline"
                  format="yyyy/MM/dd"
                  margin="normal"
                  id="date"
                  label="Date"
                  name="date"
                  value={values.date}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Amount"
                value={currentAmount}
                currency="true"
                onChange={(e) => setCurrentAmount(e.target.value)}
                name="amount"
                autoComplete="off"
                inputProps={{
                  currency: getCurrencySymbol(values.currency)
                }}
                id="amount"
                InputProps={{
                  inputComponent: NumberFormatCustom
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                style={{ marginTop: '16px' }}
                fullWidth
                id="currency"
                name="currency"
                select
                value={values.currency}
                onChange={(e) => handleChange(e)}>
                {currencies.map((option) => (
                  <MenuItem key={option} name="currency" value={option}>
                    {`${getCurrencySymbol(option)}`}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={10}>
              <div className="rounded mt-4 p-4 d-flex align-items-center justify-content-around bg-secondary">
                <Button
                  className="btn-primary font-weight-bold px-5"
                  value="Income"
                  name="type"
                  onClick={() => handleSubmit('type', 'Income')}
                  disabled={buttonDisabled}>
                  Income
                </Button>
                <Button
                  className="btn-primary font-weight-bold px-5"
                  disabled={buttonDisabled}
                  onClick={() => handleSubmit('type', 'Expense')}
                  value="Expense"
                  name="type">
                  Expense
                </Button>
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    </Container>
  );
};
const Step2 = ({ handleChange, values, nextModal }) => {
  const { profile } = useSelector((state) => state.auth);

  const categories = profile[values.type.toLowerCase() + 'Categories'];

  const handleSubmit = (name, value) => {
    handleChange({
      target: {
        name,
        value
      }
    });

    nextModal();
  };

  return (
    <Container>
      <div className="p-4">
        <h5 className="font-size-xl mb-1 font-weight-bold text-center">
          Category &amp; Description
        </h5>
        <p className="text-black-50 mb-4  text-center">
          Small section summary description can be added here!
        </p>
        <Grid container spacing={1} justify="center">
          <Grid item xs={10}>
            <TextField
              label="Description"
              value={values.description}
              currency="true"
              fullWidth
              onChange={handleChange}
              name="description"
              id="description"
            />
          </Grid>
          <Grid
            item
            xs={10}
            className="my-3 d-flex justify-content-center flex-wrap">
            {values.description &&
              categories.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  name="category"
                  value={value}
                  className="mx-1 my-2 btn btn-primary"
                  onClick={() => handleSubmit('category', value)}
                />
              ))}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
const Step3 = ({ handleChange, values }) => {
  const { wallets } = useSelector((state) => state.auth.profile);

  const handleSubmit = (name, value) =>
    handleChange({
      target: {
        name,
        value
      }
    });

  return (
    <Container>
      <div className="p-4">
        <h5 className="font-size-xl mb-1 font-weight-bold text-center">
          Choose your account
        </h5>
        <Grid container>
          <Grid
            item
            xs={12}
            className="d-flex flex-row my-3 mx-3 align-items-center">
            <p className="text-black-50 m-0">
              Choose to make this transaction relevant for your tax declaration
              at the end of the year.
            </p>
            <Switch
              checked={values.taxRelevant}
              onClick={() =>
                handleChange({
                  target: {
                    name: 'taxRelevant',
                    value: !values.taxRelevant
                  }
                })
              }
              className="switch-medium toggle-switch-primary ml-4 mr-2"
            />
          </Grid>
          <Grid
            item
            xs={12}
            className="d-flex flex-row justify-content-center flex-wrap">
            {wallets.map((value) => (
              <Button
                key={value}
                className="btn-primary font-weight-bold p-3 px-5 rounded m-2 font-size-md"
                onClick={() => handleSubmit('wallet', value)}
                value="Expense"
                name="type">
                {value}
              </Button>
            ))}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

function StepIcon(props) {
  const { active, completed } = props;

  const icons = {
    1: <AttachMoneyIcon />,
    2: <ClassIcon />,
    3: <AccountBalanceIcon />
  };

  return (
    <div
      className={clsx(
        'd-50 transition-base d-flex align-items-center bg-gray-400 justify-content-center rounded',
        {
          'd-80 bg-primary text-white shadow-primary-sm': active,
          'd-50 bg-success text-white shadow-success-sm': completed
        }
      )}>
      {completed ? <Check className="completed" /> : icons[String(props.icon)]}
    </div>
  );
}

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

function getStepContent(step, handleChange, values, handleNext) {
  switch (step) {
    case 0:
      return (
        <Step1
          handleChange={handleChange}
          values={values}
          nextModal={handleNext}
        />
      );
    case 1:
      return (
        <Step2
          handleChange={handleChange}
          values={values}
          nextModal={handleNext}
        />
      );
    case 2:
      return <Step3 handleChange={handleChange} values={values} />;
    default:
      return <Step1 />;
  }
}

export default function LivePreviewExample({ toggleDialog }) {
  // Redux
  const {
    profile: { currencies },
    user: { uid }
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Handle the stepper
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Amount', 'Category', 'Wallet'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Transaction info initial state
  const initialState = {
    amount: null,
    currency: currencies[0],
    type: '',
    description: '',
    category: '',
    wallet: '',
    date: new Date(new Date().toJSON().slice(0, 10).replace(/-/g, '/')),
    taxRelevant: false
  };

  // Handle transaction information state
  const [values, setValues] = useState(initialState);

  const handleChange = (event, previousState = { ...values }) => {
    const newState = {
      ...previousState,
      [event.target.name]: event.target.value
    };
    setValues(newState);

    return newState;
  };

  const handleSuccess = () => {
    // Make asynchrous setState calls synchronous with promise
    Promise.resolve()
      .then(() => dispatch(addTransactionAction(uid, values))) // Dispatch the redux action
      .then(() => setValues(initialState)) // Reset values before useEffect runs again when closing the modal window
      .then(() => toggleDialog(false)); // Closing the window
  };

  // Trigger addTransaction Firestore when wallet value is valid
  React.useEffect(() => {
    if (values.wallet) {
      handleSuccess();
    }
  });

  return (
    <div>
      <div className="bg-secondary mb-3 pt-3">
        <Stepper
          className="stepper-horizontal-1"
          alternativeLabel
          activeStep={activeStep}
          connector={<StepConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div>
        <div>
          {getStepContent(activeStep, handleChange, values, handleNext)}
        </div>
      </div>
    </div>
  );
}
