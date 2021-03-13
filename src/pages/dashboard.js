import React from 'react';

import DashboardStatistics from '../components/DashboardStatistics';
import DashboardProfile from '../components/DashboardProfile';

export default function Dashboard() {
  return (
    <>
      <DashboardProfile />
      <div className="m-3 m-md-5">
        <DashboardStatistics />
      </div>
    </>
  );
}
