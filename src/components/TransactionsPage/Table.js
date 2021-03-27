import React, { useState, useEffect } from 'react';

// Redux & Firebase
import { useSelector, useDispatch } from 'react-redux';
import { removeTransactionsAction } from '../../redux/reducers/AuthReducer';

// Components
import {
  Table,
  Card,
  CardContent,
  Button,
  MenuItem,
  TextField
} from '@material-ui/core';
import Transaction from './TableItem';

// Utils
import { getCurrencySymbol } from '../../utils/getCurrencySymbol';
import { firstBy } from 'thenby';

export default function Transactions({ props }) {
  // Redux
  const {
    transactions,
    profile: { currencies },
    user: { uid }
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Create date specific to the month transaction page
  const currentDate = new Date(1970, 0, 1);
  currentDate.setFullYear(parseInt(props.year));
  currentDate.setMonth(props.month);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter transaction based on the month this transaction page
  const getCurrentMonthTransactions = [...transactions].filter((e) => {
    // Get Date string from current transaction
    const newDate = new Date(1970, 0, 1);
    newDate.setSeconds(e.date.seconds);
    const string = newDate.toJSON().slice(0, 10);

    var [year, month] = string.split('-');
    return currentMonth === +month && currentYear === +year;
  });

  // State for transactions array
  const [currentMonthTransactions, setCurrentMonthTransactions] = useState([]);

  // State for sort & filter transactions
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const handleSelectedCurrency = (event) => {
    event.preventDefault();
    setSelectedCurrency(event.target.value);
  };
  const [type, setType] = useState('All Transactions');
  const handleType = (event) => {
    event.preventDefault();
    setType(event.target.value);
  };

  // From here deal with check status
  const setChecked = (id) => {
    // Create shallow copy of selected item and reverse checked status
    const currentItem = currentMonthTransactions.find(
      (item) => item.transactionsID === id
    );
    currentItem.isChecked = !currentItem.isChecked;
    // Create copy of all transactions and replace old item with new checked/unchecked item
    const updatedTransactions = [
      ...currentMonthTransactions.filter((item) => item.transactionsID !== id),
      currentItem
    ];
    // Update state with new checked/unchecked item
    setCurrentMonthTransactions(updatedTransactions);
  };

  const deleteTransactions = async () => {
    // Get ids of all checked items
    const transactionsToDelete = currentMonthTransactions
      .filter((item) => item.isChecked === true)
      .map((item) => item.transactionsID);
    // Fire Redux Action
    Promise.resolve().then(() =>
      dispatch(removeTransactionsAction(uid, transactionsToDelete))
    );
    // .then(() => {
    //   window.location.reload();
    // });
  };

  useEffect(() => {
    if (getCurrentMonthTransactions) {
      setCurrentMonthTransactions(
        Object.keys(getCurrentMonthTransactions).map((item) => {
          return { ...getCurrentMonthTransactions[item], isChecked: false };
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  return (
    <>
      <Card className="card-box mb-spacing-6-x2 overflow-auto">
        <div className="card-header--title text-center">
          <h4 className="font-size-xl mb-0 mt-3 pt-2 font-w eight-bold">
            {`${props.monthName} ${props.year}`}
          </h4>
        </div>
        <div className="card-header d-block">
          <div className="d-flex align-items-center ">
            <div>
              <h4 className="font-size-lg mb-0 pt-3 font-w eight-bold">
                Transaction list
              </h4>
            </div>

            <div className="mr-0 ml-auto d-flex align-items-center ">
              {!!currentMonthTransactions
                .filter((item) => {
                  if (type === 'All Transactions') {
                    return true;
                  }
                  return item.type === type;
                })
                .find((item) => item.isChecked === true) && (
                <Button
                  size="small"
                  className="btn-neutral-danger mr-3 mt-2"
                  onClick={deleteTransactions}>
                  Delete Items
                </Button>
              )}
              <TextField
                style={{ marginTop: '16px', width: '140px' }}
                id="type-select"
                fullWidth
                name="type"
                select
                value={type}
                onChange={handleType}>
                <MenuItem selected value="All Transactions">
                  All Transactions
                </MenuItem>
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expenses</MenuItem>
              </TextField>
              <TextField
                style={{ marginTop: '16px', width: '50px' }}
                className="ml-3"
                id="type-select"
                fullWidth
                name="type"
                select
                value={selectedCurrency}
                onChange={handleSelectedCurrency}>
                {currencies.map((option) => (
                  <MenuItem key={option} name="currency" value={option}>
                    {`${getCurrencySymbol(option)}`}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </div>
        <CardContent className="px-0 pt-2 pb-3">
          {currentMonthTransactions.length === 0 && (
            <div className="text-center my-4">
              We couldn't find any transactions for this category!
            </div>
          )}

          {currentMonthTransactions && currentMonthTransactions.length > 0 && (
            <Table className="table table-borderless table-hover table-alternate text-nowrap mb-0">
              <thead>
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>Name</th>
                  {/* <th className="text-center">Income/Expense</th> */}
                  <th className="text-center">Amount</th>
                  <th className="text-center">Wallet</th>
                </tr>
              </thead>
              <tbody>
                {currentMonthTransactions &&
                  currentMonthTransactions
                    .filter((item) => {
                      if (type === 'All Transactions') {
                        return true;
                      }
                      return item.type === type;
                    })
                    .sort(
                      firstBy(function (a, b) {
                        const aDate = new Date(1970, 0, 1),
                          bDate = new Date(1970, 0, 1);
                        aDate.setSeconds(a.createdAt.seconds);
                        bDate.setSeconds(b.createdAt.seconds);
                        return bDate - aDate;
                      }).thenBy(function (a, b) {
                        return ('' + a.transactionsID).localeCompare(
                          b.transactionsID
                        );
                      })
                    )
                    .map(({ transactionsID, ...otherProps }) => {
                      return (
                        <Transaction
                          currentMonth={props.monthName}
                          selectedCurrency={selectedCurrency}
                          key={transactionsID}
                          transactionsID={transactionsID}
                          {...otherProps}
                          setChecked={setChecked}
                        />
                      );
                    })}
              </tbody>
            </Table>
          )}
          {/* <div className="text-center">
            <Button variant="contained" color="primary">
              <span className="btn-wrapper--label">View more</span>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'chevron-right']} />
              </span>
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </>
  );
}
