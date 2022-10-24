import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loding, setLoding] = useState(true);

  // Create User
  const handelUserCreate = (email, password) => {
    setLoding(false);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // user name and profile update
  const userProfileAndNameUpdate = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  // user email verify function
  const handelUserVeryfy = () => {
    return sendEmailVerification(auth.currentUser);
  };

  // Login
  const handelLoginGmailPassword = (email, password) => {
    setLoding(false);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // login google
  const providerLogin = (provider) => {
    setLoding(false);
    return signInWithPopup(auth, provider);
  };

  // unSubscribe mount
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("current User", currentUser);
      if (currentUser === null || currentUser.emailVerified) {
        setUser(currentUser);
      }
      setLoding(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // sing out
  const singOutAccount = () => {
    setLoding(false);
    signOut(auth);
  };

  const authInfo = {
    user,
    setUser,
    providerLogin,
    singOutAccount,
    handelUserCreate,
    handelLoginGmailPassword,
    loding,
    setLoding,
    userProfileAndNameUpdate,
    handelUserVeryfy,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
