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

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
