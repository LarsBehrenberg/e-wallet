import React from 'react';

import Profile from '../components/DashboardPage/DashboardProfile';
import NumbersOverview from '../components/DashboardPage/DashboardNumbersOverview';
import Analytics from '../components/DashboardPage/DashboardAnalyticsYear';

export default function Dashboard() {
  return (
    <>
      <Profile />
      <NumbersOverview />
      <Analytics />
    </>
  );
}
