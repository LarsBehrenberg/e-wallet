import React from 'react';

// Redux & Firebase
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';

// Components
import AddTransactionModal from '../components/addTransactionModal';
import { Table, Checkbox, Card, CardContent, Button } from '@material-ui/core';

// TRANSACTION REMOVE DUMMY FUNCTION
// const remove = () => {
//   firestore
//     .collection('users')
//     .doc(uid)
//     .collection('transactions')
//     .doc('bjAW4G045rDZ1cC1Xzr6')
//     .delete();
// };

const Transaction = ({
  description,
  type,
  wallet,
  amount,
  date,
  currency,
  category
}) => (
  <tr>
    <td>
      <Checkbox color="primary" id="checkboxProjects15" />
    </td>
    <td>
      <div className="d-flex">
        <div>
          <span className="font-weight-bold text-black">
            {new Date(date.seconds * 1000).toISOString().split('T')[0]}
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

export default function Transactions() {
  const { transactions } = useSelector((state) => state.firestore.data);

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
              <Button size="small" className="btn-neutral-danger">
                More Actions
              </Button>
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
                {Object.keys(transactions).map((key, id) => (
                  <Transaction
                    key={key}
                    id={id}
                    date={transactions[key].date}
                    name={transactions[key].name}
                    currency={transactions[key].currency}
                    amount={transactions[key].amount}
                    wallet={transactions[key].wallet}
                    description={transactions[key].description}
                    type={transactions[key].type}
                    category={transactions[key].category}
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
