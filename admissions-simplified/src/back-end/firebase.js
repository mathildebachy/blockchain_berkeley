import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";  
import { db, firebaseConfig } from './firebase.config'


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

export const updateUserDocument = async (uid, new_information) => {
  try {
    db.collection('users').doc(uid).set(new_information)
  } catch (error) {
    console.error("Error updating user info:", error)
  }
}