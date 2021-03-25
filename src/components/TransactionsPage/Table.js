import React, { useState, useEffect } from 'react';

// Redux & Firebase
import { useSelector } from 'react-redux';

// Components
import { Table, Card, CardContent, Button } from '@material-ui/core';
import Transaction from './TableItem';

export default function Transactions({ props }) {
  const { transactions } = useSelector((state) => state.auth);
  const [state, setState] = useState([]);

  // Create date specific to the month transaction page
  const currentDate = new Date(1970, 0, 1);
  currentDate.setFullYear(parseInt(props.year));
  currentDate.setMonth(props.month);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter transaction based on the month this transaction page
  const currentTransactions = [...transactions].filter((e) => {
    // Get Date string from current transaction
    const newDate = new Date(1970, 0, 1);
    newDate.setSeconds(e.date.seconds);
    const string = newDate.toJSON().slice(0, 10);

    var [year, month] = string.split('-'); // Or, var month = e.date.split('-')[1];
    return currentMonth === +month && currentYear == year;
  });

  useEffect(() => {
    // Instead of using firestore transactions state we want to use local state for displaying all transactions. However, we need to wait with useEffect until transactions have loaded in to store them in the local state.
    if (currentTransactions) {
      setState(
        Object.keys(currentTransactions).map((item) => {
          return { ...currentTransactions[item], isChecked: false };
        })
      );
    }
  }, [transactions]);

  const setChecked = (id) => {
    // Create shallow copy of selected item and reverse checked status
    const currentItem = { ...state.find((item) => item.transactionsID === id) };
    currentItem.isChecked = !currentItem.isChecked;

    // Create copy of all transactions and replace old item with new checked/unchecked item
    const updatedTransactions = [
      ...state.filter((item) => item.transactionsID !== id),
      currentItem
    ];

    // Update state with new checked/unchecked item
    setState(updatedTransactions);
  };

  const deleteTransactions = () => {
    // Get ids of all checked items
    // const transactionsToDelete = state
    //   .filter((item) => item.isChecked === true)
    //   .map((item) => item.transactionsID);
    // // Create batch commit
    // const batch = firestore.batch();
    // // Go through checked items and add to batch delete
    // transactionsToDelete.forEach((id) => {
    //   const ref = firestore
    //     .collection('users')
    //     .doc(uid)
    //     .collection('transactions')
    //     .doc(id);
    //   batch.delete(ref);
    // });
    // // Fire batch delete
    // batch.commit();
  };

  return (
    <>
      <Card className="card-box mb-spacing-6-x2 overflow-auto">
        <div className="card-header--title text-center">
          <h4 className="font-size-xl mb-0 mt-3 pt-2 font-w eight-bold">
            {`${props.monthName} ${props.year}`}
          </h4>
        </div>
        <div className="card-header justify-content-between">
          <div className="card-header--title">
            <h4 className="font-size-lg mb-0 py-2 font-w eight-bold">
              Transaction list
            </h4>
          </div>

          <div className="card-header--actions">
            <div>
              {!!state?.find((item) => item.isChecked === true) && (
                <Button
                  size="small"
                  className="btn-neutral-danger"
                  onClick={deleteTransactions}>
                  Delete Items
                </Button>
              )}
            </div>
          </div>
        </div>
        <CardContent className="px-0 pt-2 pb-3">
          {!currentTransactions && (
            <div className="text-center my-4">Loading...</div>
          )}

          {currentTransactions && (
            <Table className="table table-borderless table-hover table-alternate text-nowrap mb-0">
              <thead>
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>Name</th>
                  <th className="text-center">Income/Expense</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Wallet</th>
                </tr>
              </thead>
              <tbody>
                {state &&
                  state
                    .sort(function (a, b) {
                      // Sort by
                      return (
                        new Date(b.date.seconds) - new Date(a.date.seconds) ||
                        new Date(b.createdAt.seconds) -
                          new Date(a.createdAt.seconds)
                      );
                    })
                    .map(({ transactionsID, ...otherProps }, index) => {
                      return (
                        <Transaction
                          key={transactionsID ? transactionsID : index}
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
