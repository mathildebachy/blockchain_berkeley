import firebase from 'firebase'

export const firebaseConfig = {
    apiKey: "AIzaSyA1dE9dodWGKk0DOEK5L1OW0553xXrlYUs",
    authDomain: "blockchain-berkeley.firebaseapp.com",
    databaseURL: "https://blockchain-berkeley-default-rtdb.firebaseio.com",
    projectId: "blockchain-berkeley",
    storageBucket: "blockchain-berkeley.appspot.com",
    messagingSenderId: "757129228193",
    appId: "1:757129228193:web:bb10892b7980b6badf65e0"
  };

firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

export default db;