import React from 'react';
import { Checkbox } from '@material-ui/core';

// Utils
import { getCurrencySymbol } from '../../utils/getCurrencySymbol';

const TableItem = ({
  description,
  type,
  wallet,
  amount,
  date,
  category,
  isChecked,
  transactionsID,
  setChecked,
  selectedCurrency,
  currentMonth
}) => {
  const transactionDate = new Date(1970, 0, 1);
  transactionDate.setSeconds(date.seconds);
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
              {`${transactionDate.getDate()}th ${currentMonth}`}
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
      {/* <td className="text-center">
        <span className="font-weight-bold ">{type}</span>
      </td> */}
      <td className="text-center">
        <span
          className={`font-weight-bold ${
            type === 'Expense' ? 'text-danger' : 'text-success'
          }`}>
          {type === 'Expense' ? '-' : ''}
          {`${getCurrencySymbol(selectedCurrency)} ${amount[
            selectedCurrency
          ].toLocaleString()}`}
        </span>
      </td>
      <td className="text-center">
        <span className="font-weight-bold">{wallet}</span>
      </td>
    </tr>
  );
};

export default TableItem;
