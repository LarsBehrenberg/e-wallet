import React, { useState } from 'react';

import { Button, Dialog } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FormStepper from './FormStepper';

const AddTransactionButton = () => {
  // Open and close dialog => handle dialog state
  const [showDialog, setShowDialog] = useState(false);
  const toggleDialog = (bool) => setShowDialog(bool);

  // First

  return (
    <>
      <Button
        className="btn-icon btn-pill d-60 p-0 m-2 bg-royal"
        onClick={() => toggleDialog(true)}>
        <span className="btn-wrapper--icon">
          <FontAwesomeIcon
            icon={['fa', 'plus']}
            className="font-size-xl text-white"
          />
        </span>
      </Button>
      <Dialog
        classes={{ paper: 'rounded-lg modal-light m-0 m-sm-1' }}
        open={showDialog}
        onClose={() => toggleDialog(false)}>
        <FormStepper toggleDialog={toggleDialog} />
      </Dialog>
    </>
  );
};

export default AddTransactionButton;
