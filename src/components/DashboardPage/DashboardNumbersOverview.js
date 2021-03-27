import React from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Card, CardContent } from '@material-ui/core';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import {
  totalIncomeCurrentMonth as tICM,
  relationIncomeLastCurrentMonth,
  totalExpenseCurrentMonth as tECM
} from '../../utils/transactionsCalculations';

export default function LivePreviewExample() {
  const { transactions } = useSelector((state) => state.auth);

  const totalIncomeCurrentMonth = tICM(transactions);
  const incomeComparison = relationIncomeLastCurrentMonth(transactions);
  const totalExpenseCurrentMonth = tECM(transactions);

  return (
    <>
      <div className="mb-spacing-6 mt-5 mx-md-5 mx-3">
        <Grid container spacing={6}>
          <Grid item sm={4}>
            <Card className="card-box bg-premium-dark border-0 text-light">
              <CardContent>
                <div className="align-box-row align-items-start">
                  <div className="font-weight-bold">
                    <small className="text-white-50 d-block mb-1 text-uppercase">
                      Current Income
                    </small>
                    <span className="font-size-xxl mt-1">
                      ¥ {totalIncomeCurrentMonth.toLocaleString()}
                    </span>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-white text-center text-success font-size-xl d-50 rounded-circle btn-icon">
                      <FontAwesomeIcon icon={['fas', 'dollar-sign']} />
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  {incomeComparison ? (
                    Math.sign(parseInt(incomeComparison)) >= 0 ? (
                      <>
                        <FontAwesomeIcon
                          icon={['fas', 'arrow-up']}
                          className="text-success"
                        />
                        <span className="text-success px-1">
                          {incomeComparison}%
                        </span>
                        <span className="text-white-50">
                          increase this month
                        </span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={['fas', 'arrow-down']}
                          className="text-danger"
                        />
                        <span className="text-danger px-1">
                          {incomeComparison}%
                        </span>
                        <span className="text-white-50">
                          decrease this month
                        </span>
                      </>
                    )
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={4}>
            <Card className="card-box bg-night-sky text-light">
              <CardContent>
                <div className="align-box-row align-items-start">
                  <div className="font-weight-bold">
                    <small className="text-white-50 d-block mb-1 text-uppercase">
                      Current Expenses
                    </small>
                    <span className="font-size-xxl mt-1">
                      ¥ {totalExpenseCurrentMonth.toLocaleString()}
                    </span>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-white text-center text-primary font-size-xl d-50 rounded-circle btn-icon">
                      <FontAwesomeIcon icon={['fas', 'funnel-dollar']} />
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  {/* <FontAwesomeIcon
                    icon={['fas', 'arrow-up']}
                    className="text-success"
                  />
                  <span className="text-success px-1">12.65%</span>
                  <span className="text-white-50">same as before</span> */}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={4}>
            <Card className="card-box bg-midnight-bloom text-white">
              <CardContent>
                <div className="align-box-row align-items-start">
                  <div className="font-weight-bold">
                    <small className="text-white-50 d-block mb-1 text-uppercase">
                      This Month's Budget
                    </small>
                    <span className="font-size-xxl mt-1">
                      ¥{totalExpenseCurrentMonth.toLocaleString()} / ¥90,000
                    </span>
                  </div>
                  <div className="ml-auto">
                    <div className="text-center text-danger font-size-xl d-50 rounded-circle btn-icon">
                      <CircularProgressbar
                        value={84}
                        text={84 + '%'}
                        strokeWidth={5}
                        styles={buildStyles({
                          // Rotation of path and trail, in number of turns (0-1)
                          rotation: 0.25,

                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: 'butt',

                          // Text size
                          textSize: '1.7rem',

                          // How long animation takes to go from one percentage to another, in seconds
                          pathTransitionDuration: 0.5,

                          // Can specify path transition in more detail, or remove it entirely
                          // pathTransition: 'none',

                          // Colors
                          pathColor: `#fff`,
                          textColor: '#fff',
                          trailColor: '#ffffff30'
                        })}
                        className="circular-progress-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  {/* <FontAwesomeIcon
                    icon={['fas', 'arrow-up']}
                    className="text-warning"
                  />
                  <span className="text-warning px-1">4.2%</span>
                  <span className="text-white-50">compared to last month</span> */}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
