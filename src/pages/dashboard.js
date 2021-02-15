import React from 'react';

// Redux & Firebase
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

export default function Dashboard() {
  const { uid } = useSelector((state) => state.firebase.auth);
  const { user } = useSelector((state) => state.firestore.data);

  // handle firestore
  const firestore = useFirestore();

  useFirestoreConnect([
    {
      collection: 'users',
      doc: `${uid}`,
      storeAs: 'user'
    }
  ]);

  // Create default categories for expenses if not existent
  if (user && user.expenseCategories === undefined) {
    firestore.update(`users/${uid}/`, {
      expenseCategories: [
        'Food',
        'Transportation',
        'Utility Bill',
        'Medical',
        'Savings',
        'Rent',
        'Clothing',
        'Necessaries',
        'Other'
      ]
    });
  }

  // Create default categories for income if not existent
  if (user && user.incomeCategories === undefined) {
    firestore.update(`users/${uid}/`, {
      incomeCategories: [
        'Salary',
        'Freelance Work',
        'Pocket Money',
        'Carried Over',
        'Other'
      ]
    });
  }

  return (
    <>
      {/* <DashboardCommerce1 />
      <DashboardCommerce2 />
      <DashboardCommerce3 />
      <DashboardCommerce4 />
      <DashboardCommerce5 />
      <DashboardCommerce6 /> */}
    </>
  );
}
