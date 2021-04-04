import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";  
  
var firebaseConfig = {
apiKey: "AIzaSyA1dE9dodWGKk0DOEK5L1OW0553xXrlYUs",
authDomain: "blockchain-berkeley.firebaseapp.com",
projectId: "blockchain-berkeley",
storageBucket: "blockchain-berkeley.appspot.com",
messagingSenderId: "757129228193",
appId: "1:757129228193:web:bb10892b7980b6badf65e0"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Handle sign in with Google as a popup window
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = async () => {
  auth.signInWithPopup(provider);
};


export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};