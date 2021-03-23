import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBWktr2V9sxKtTkpIiIHuieRtENCgv0fQw',
  authDomain: 'e-wallet-294df.firebaseapp.com',
  projectId: 'e-wallet-294df',
  storageBucket: 'e-wallet-294df.appspot.com',
  messagingSenderId: '98548500657',
  appId: '1:98548500657:web:3a5c384d211eb11d45fa90',
  measurementId: 'G-BZFYL61L7H'
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

// Get income and expense categories and create default values if not existent in user profile
export const receiveIncomeExpenseCategories = async (uid) => {
  if (!uid) return;

  const userRef = firestore.doc(`users/${uid}`);

  const categories = await userRef.get().then((doc) => {
    const categories = {
      incomeCategories: [],
      expenseCategories: [],
      currencies: [],
      wallets: []
    };
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      // Check for expense Categories
      if (doc.get('expenseCategories') == null) {
        userRef.update({
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
        categories.expenseCategories = [
          ('Food',
          'Transportation',
          'Utility Bill',
          'Medical',
          'Savings',
          'Rent',
          'Clothing',
          'Necessaries',
          'Other')
        ];
      } else {
        categories.expenseCategories = doc.get('expenseCategories');
      }

      if (doc.get('incomeCategories') == null) {
        userRef.update({
          incomeCategories: [
            'Salary',
            'Freelance Work',
            'Pocket Money',
            'Carried Over',
            'Other'
          ]
        });
        categories.incomeCategories = [
          'Salary',
          'Freelance Work',
          'Pocket Money',
          'Carried Over',
          'Other'
        ];
      } else {
        categories.incomeCategories = doc.get('incomeCategories');
      }

      if (doc.get('currencies') == null) {
        userRef.update({
          currencies: ['JPY', 'EUR', 'USD']
        });
        categories.currencies = ['JPY', 'EUR', 'USD'];
      } else {
        categories.currencies = doc.get('currencies');
      }

      if (doc.get('wallets') == null) {
        userRef.update({
          wallets: ['Cash', 'Debit', 'Credit']
        });
        categories.wallets = ['Cash', 'Debit', 'Credit'];
      } else {
        categories.wallets = doc.get('wallets');
      }
    }
    return categories;
  });
  return categories;
};

// Get transactions
export const receiveTransactions = async (uid) => {
  if (!uid) return;
  const userRef = await firestore.collection(`users/${uid}/transactions`).get();
  const transactions = userRef.docs.map((doc) => doc.data());

  console.log(transactions);
  return transactions;
};

// Create new user with email
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};
