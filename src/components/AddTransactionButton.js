import React from 'react';

import { Button } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddTransactionButton = () => {
  return (
    <Button className="btn-icon btn-pill d-80 p-0 m-2 bg-royal">
      <span className="btn-wrapper--icon">
        <FontAwesomeIcon
          icon={['fa', 'plus']}
          className="font-size-xl text-white"
        />
      </span>
    </Button>
  );
};

export default AddTransactionButton;
