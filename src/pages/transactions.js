import React, { useState, useEffect } from 'react';

// Redux & Firebase
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';

// Date Utils
import { format } from 'date-fns';

// Components
import AddTransactionModal from '../components/addTransactionModal';
import { Table, Checkbox, Card, CardContent, Button } from '@material-ui/core';

const Transaction = ({
  description,
  type,
  wallet,
  amount,
  date,
  currency,
  category,
  isChecked,
  transactionsID,
  setChecked
}) => {
  return (
    <tr>
      <td>
        <Checkbox
          color="primary"
          onChange={() => setChecked(transactionsID)}
          checked={isChecked}
        />
      </td>
      <td>
        <div className="d-flex">
          <div>
            <span className="font-weight-bold text-black">
              {format(new Date(date.seconds * 1000), 'do LLLL yyyy')}
            </span>
          </div>
        </div>
      </td>

      <td>
        <div className="d-flex">
          <div>
            <span className="font-weight-bold text-black">{description}</span>
            <span className="text-black-50 d-block">{category}</span>
          </div>
        </div>
      </td>
      <td className="text-center">
        <span className="font-weight-bold ">{type}</span>
      </td>
      <td className="text-center">
        <span
          className={`font-weight-bold ${
            type === 'Expense' ? 'text-danger' : 'text-success'
          }`}>
          {type === 'Expense' ? '-' : ''}
          {`${amount} (${currency})`}
        </span>
      </td>
      <td className="text-center">
        <span className="font-weight-bold">{wallet}</span>
      </td>
    </tr>
  );
};

export default function Transactions() {
  const { transactions } = useSelector((state) => state.firestore.data);
  const [state, setState] = useState([]);

  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  useEffect(() => {
    // Instead of using firestore transactions state we want to use local state for displaying all transactions. However, we need to wait with useEffect until transactions have loaded in to store them in the local state.
    if (transactions) {
      setState(
        Object.keys(transactions).map((item) => {
          return { ...transactions[item], isChecked: false };
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
    const transactionsToDelete = state
      .filter((item) => item.isChecked === true)
      .map((item) => item.transactionsID);

    // Create batch commit
    const batch = firestore.batch();

    // Go through checked items and add to batch delete
    transactionsToDelete.forEach((id) => {
      const ref = firestore
        .collection('users')
        .doc(uid)
        .collection('transactions')
        .doc(id);

      batch.delete(ref);
    });

    // Fire batch delete
    batch.commit();
  };

  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header">
          <div className="card-header--title">
            <h4 className="font-size-lg mb-0 py-2 font-w eight-bold">
              Transaction list
            </h4>
          </div>

          <div className="card-header--actions">
            <div>
              <AddTransactionModal />
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
          {!isLoaded(transactions) && (
            <div className="text-center my-4">Loading...</div>
          )}

          {isLoaded(transactions) && isEmpty(transactions) && (
            <div className="text-center my-4">
              There are currently no transactions in your database.
            </div>
          )}

          {isLoaded(transactions) && !isEmpty(transactions) && (
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
                    .map(({ ...props }) => (
                      <Transaction
                        key={props.transactionsID}
                        {...props}
                        setChecked={setChecked}
                      />
                    ))}
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
