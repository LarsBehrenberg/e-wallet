import React from 'react';

import Table from '../components/TransactionsPage/Table';

const TransActionPage = (props) => {
  const {
    location: {
      state: { monthName }
    },
    match
  } = props;

  return <Table props={{ ...match.params, monthName }} />;
};

export default TransActionPage;
