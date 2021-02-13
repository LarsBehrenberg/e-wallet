import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

import { Button } from '@material-ui/core';

export default function Dashboard() {
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  const addNewTodo = () => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('transactions')
      .add({
        title: 'new one',
        amount: 284
      })
      .then((docRef) => {
        docRef.update({
          transactionsID: docRef.id
        });
      });
  };
  const remove = () => {
    firestore
      .collection('users')
      .doc(uid)
      .collection('transactions')
      .doc('bjAW4G045rDZ1cC1Xzr6')
      .delete();
  };

  return (
    <>
      <Button
        variant="contained"
        className="btn-primary m-2"
        onClick={(event) => {
          event.preventDefault();
          addNewTodo();
        }}>
        Add transaction
      </Button>
      <Button
        variant="contained"
        className="btn-primary m-2"
        onClick={(event) => {
          event.preventDefault();
          remove();
        }}>
        Remove transaction
      </Button>

      {/* <DashboardCommerce1 />
      <DashboardCommerce2 />
      <DashboardCommerce3 />
      <DashboardCommerce4 />
      <DashboardCommerce5 />
      <DashboardCommerce6 /> */}
    </>
  );
}
