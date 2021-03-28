import React, { useState } from 'react';

// Redux & Firebase
import { useSelector, useDispatch } from 'react-redux';
import { importTransactionsAction } from '../../redux/reducers/AuthReducer';

// Parse CSV
import Papa from 'papaparse';

import { Card, Button, List, ListItem } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { useDropzone } from 'react-dropzone';

import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import CloudUploadTwoToneIcon from '@material-ui/icons/CloudUploadTwoTone';
import CheckIcon from '@material-ui/icons/Check';

export default function ImportCSV() {
  const {
    user: { uid },
    profile: { currencies }
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: '.csv',
    maxFiles: 1
  });

  const files = acceptedFiles.map((file) => (
    <ListItem
      className="font-size-sm px-3 py-2 text-primary d-flex justify-content-between align-items-center"
      key={file.path}>
      <span>{file.path}</span>
      <span className="badge badge-pill bg-neutral-warning text-warning">
        {file.size} bytes
      </span>
    </ListItem>
  ));

  const parseFile = (file) => {
    Promise.resolve().then(() => {
      Papa.parse(file, {
        complete: (data) =>
          dispatch(importTransactionsAction(uid, currencies, data, setError)),
        error: () => setError(true),
        header: true
      });
    });
  };

  return (
    <>
      <Card className="m-4 p-3 p-lg-5 shadow-xxl">
        {error ? (
          <div className="text-center">
            <h3 className="mb-3">
              There has been an error importing your transactions!
            </h3>
            <p>
              Please try refreshing the page and repeat the process. If the
              error persists, please feel free to reach out to us!
            </p>
          </div>
        ) : (
          <>
            <div className="dropzone">
              <div {...getRootProps({ className: 'dropzone-upload-wrapper' })}>
                <input {...getInputProps()} />
                <div className="dropzone-inner-wrapper">
                  {isDragAccept && (
                    <div>
                      <div className="d-100 btn-icon mb-3 hover-scale-lg bg-success shadow-success-sm rounded-circle text-white">
                        <CheckIcon className="d-50" />
                      </div>
                      <div className="font-size-sm text-success">
                        All files will be uploaded!
                      </div>
                    </div>
                  )}
                  {isDragReject && (
                    <div>
                      <div className="d-100 btn-icon mb-3 hover-scale-lg bg-danger shadow-danger-sm rounded-circle text-white">
                        <CloseTwoToneIcon className="d-50" />
                      </div>
                      <div className="font-size-sm text-danger">
                        Some files will be rejected!
                      </div>
                    </div>
                  )}
                  {!isDragActive && (
                    <div>
                      <div className="d-100 btn-icon mb-3 hover-scale-lg bg-white shadow-light-sm rounded-circle text-primary">
                        <CloudUploadTwoToneIcon className="d-50" />
                      </div>
                      <div className="font-size-sm">
                        Drag and drop files here{' '}
                        <span className="font-size-xs text-dark">(.csv)</span>
                      </div>
                    </div>
                  )}

                  <small className="py-2 text-black-50">or</small>
                  <div>
                    <Button className="btn-primary hover-scale-sm font-weight-bold btn-pill px-4">
                      <span className="px-2">Browse Files</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {files.length <= 0 && (
                <div className="text-info text-center font-size-sm mt-4">
                  Uploaded demo files will appear here!
                </div>
              )}
              {files.length > 0 && (
                <div>
                  <Alert severity="success" className="text-center mb-3">
                    You have uploaded <b>{files.length}</b> files!
                  </Alert>
                  <List component="div" className="font-size-sm">
                    {files}
                  </List>
                </div>
              )}
              {files.length > 0 && (
                <Button
                  className="btn-primary hover-scale-sm font-weight-bold btn-pill px-4"
                  onClick={() => parseFile(acceptedFiles[0])}>
                  <span className="px-2">Import Transactions from CSV</span>
                </Button>
              )}
            </div>
          </>
        )}
      </Card>
    </>
  );
}
