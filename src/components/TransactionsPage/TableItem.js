import React from 'react';
import { Checkbox } from '@material-ui/core';

const TableItem = ({
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
          {`${amount['JPY'].toLocaleString()} (JPY)`}
        </span>
      </td>
      <td className="text-center">
        <span className="font-weight-bold">{wallet}</span>
      </td>
    </tr>
  );
};

export default TableItem;
