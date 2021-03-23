import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTransactionAction } from '../../redux/reducers/AuthReducer';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import {
  Grid,
  Container,
  MenuItem,
  Button,
  TextField,
  Chip
} from '@material-ui/core';

// Formating functions
import NumberFormat from 'react-number-format';
import { getCurrencySymbol } from '../../utils/getCurrencySymbol';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
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
          Amount &amp; Type
        </h5>
        <p className="text-black-50 mb-4  text-center">
          Small section summary description can be added here!
        </p>
        <Grid container spacing={1} justify="center">
          <Grid item xs={5}>
            <TextField
              label="Amount"
              value={values.amount}
              currency="true"
              onChange={handleChange}
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
              onChange={handleChange}>
              {currencies.map((option) => (
                <MenuItem key={option} value={option}>
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
                disabled={typeof values.amount !== 'number'}>
                Income
              </Button>
              <Button
                className="btn-primary font-weight-bold px-5"
                disabled={typeof values.amount !== 'number'}
                onClick={() => handleSubmit('type', 'Expense')}
                value="Expense"
                name="type">
                Expense
              </Button>
            </div>
          </Grid>
        </Grid>
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
const Step3 = ({ handleChange, nextModal }) => {
  const { wallets } = useSelector((state) => state.auth.profile);

  const handleSubmit = (name, value) => {
    Promise.resolve()
      .then(() => {
        handleChange({
          target: {
            name,
            value
          }
        });
      })
      .then(() => {
        nextModal();
      });
  };
  return (
    <Container>
      <div className="p-4">
        <h5 className="font-size-xl mb-1 font-weight-bold text-center">
          Choose your account
        </h5>
        <p className="text-black-50 mb-4 text-center">
          The next and previous buttons help you to navigate through your
          content.
        </p>
        <Grid container spacing={6}>
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
      return <Step3 handleChange={handleChange} nextModal={handleNext} />;
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

  const handleSuccess = () => {
    Promise.resolve()
      .then(() => dispatch(addTransactionAction(uid, values)))
      .then(() => toggleDialog(false));
  };

  // Handle transaction information state
  const [values, setValues] = useState({
    amount: null,
    currency: currencies[0],
    type: '',
    description: '',
    category: '',
    wallet: ''
  });

  const handleChange = (event) =>
    setValues({ ...values, [event.target.name]: event.target.value });

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
      {activeStep === steps.length ? (
        handleSuccess()
      ) : (
        <div>
          <div>
            {getStepContent(activeStep, handleChange, values, handleNext)}
          </div>
          {/* <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
            <Button
              disabled={activeStep === 0}
              className="btn-primary font-weight-bold"
              onClick={handleBack}>
              Back
            </Button>
            <Button
              className="btn-primary font-weight-bold"
              onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div> */}
        </div>
      )}
    </div>
  );
}