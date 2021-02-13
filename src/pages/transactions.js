import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Checkbox, Card, CardContent, Button } from '@material-ui/core';

export default function Transactions() {
  return (
    <>
      <Card className="card-box mb-spacing-6-x2">
        <div className="card-header">
          <div className="card-header--title">
            <h4 className="font-size-lg mb-0 py-2 font-weight-bold">
              Transaction list
            </h4>
          </div>

          <div className="card-header--actions">
            <div>
              <Button size="small" className="btn-neutral-success">
                Actions
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="px-0 pt-2 pb-3">
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
              <tr>
                <td className="">
                  <Checkbox color="primary" id="checkboxProjects15" />
                </td>
                <td>
                  <div className="d-flex">
                    <div>
                      <span className="font-weight-bold text-black">
                        {new Date().toJSON().slice(0, 10).replace(/-/g, '/')}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="d-flex">
                    <div>
                      <span className="font-weight-bold text-black">
                        ETC fee
                      </span>
                      <span className="text-black-50 d-block">
                        Transportation
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold ">Expense</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold text-danger">-$254</span>
                </td>
                <td className="text-center">
                  <span className="font-weight-bold">Visa</span>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="divider mb-3" />
          <div className="text-center">
            <Button variant="contained" color="primary">
              <span className="btn-wrapper--label">View more</span>
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={['fas', 'chevron-right']} />
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
