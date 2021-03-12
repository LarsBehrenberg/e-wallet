import React from 'react';

// import ImportCSV from '../components/importCSV';
import CloudUploadTwoToneIcon from '@material-ui/icons/CloudUploadTwoTone';

export default function Import() {
  return (
    <>
      <div className="app-page-title app-page-title--shadow py-4 px-5 mt-0 ml-0 mb-3">
        <div>
          <div className="app-page-title--first">
            <div className="app-page-title--iconbox d-70">
              <div className="d-100 d-flex align-items-center justify-content-center display-1">
                <CloudUploadTwoToneIcon className="d-40 text-primary" />
              </div>
            </div>
            {/* )} */}
            <div className="app-page-title--heading">
              <h1>Import</h1>
              <div className="app-page-title--description">
                Import your CSV and add transactions to your E-Wallet database.
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center"></div>
      </div>
      {/* <ImportCSV /> */}
    </>
  );
}
