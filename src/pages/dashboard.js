import React from 'react';

import Profile from '../components/DashboardProfile';
import NumbersOverview from '../components/DashboardNumbersOverview';
import Analytics from '../components/DashboardAnalyticsYear';

export default function Dashboard() {
  return (
    <>
      <Profile />
      <NumbersOverview />
      <Analytics />
    </>
  );
}
