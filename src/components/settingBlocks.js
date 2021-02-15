import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card } from '@material-ui/core';

import illustration1 from '../assets/images/illustrations/pack1/analysis.svg';
import illustration2 from '../assets/images/illustrations/pack1/businessman.svg';

export default function LivePreviewExample() {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={6} lg={12} xl={6}>
          <Card>
            <div className="p-4">
              <Grid container spacing={0}>
                <Grid item md={3}>
                  <img
                    alt="..."
                    className="img-fluid"
                    style={{ minHeight: '100px', maxHeight: '150px' }}
                    src={illustration1}
                  />
                </Grid>
                <Grid item md={9} className="d-flex align-items-center">
                  <div>
                    <div className="font-size-lg font-weight-bold mb-1">
                      Informations
                    </div>
                    <p className="opacity-7 font-size-md mb-0">
                      Acccess this page in order to manage and customize all
                      aspects of your profile data and accounts.
                    </p>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="divider" />
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="px-4 py-3 text-first btn btn-white shadow-none d-flex justify-content-between align-items-center">
              <div>Manage account</div>
              <FontAwesomeIcon icon={['fas', 'chevron-right']} />
            </a>
          </Card>
        </Grid>
        <Grid item md={6} lg={12} xl={6}>
          <Card>
            <div className="p-4">
              <Grid container spacing={0}>
                <Grid item md={3}>
                  <img
                    alt="..."
                    className="img-fluid"
                    style={{ minHeight: '100px', maxHeight: '150px' }}
                    src={illustration2}
                  />
                </Grid>
                <Grid item md={9} className="d-flex align-items-center">
                  <div>
                    <div className="font-size-lg font-weight-bold mb-1">
                      Account Settings
                    </div>
                    <p className="opacity-7 font-size-md mb-0">
                      Control everything related to your profile and trading
                      accounts as shown in this page.
                    </p>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="divider" />
            <a
              href="#/"
              onClick={(e) => e.preventDefault()}
              className="px-4 py-3 text-first btn btn-white shadow-none d-flex justify-content-between align-items-center">
              <div>Manage settings</div>
              <FontAwesomeIcon icon={['fas', 'chevron-right']} />
            </a>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
