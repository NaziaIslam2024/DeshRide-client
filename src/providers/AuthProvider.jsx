/* eslint-disable react-refresh/only-export-components */
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // Create a new user
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in with email and password
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // todo: reset password [this will work only if the user is logged in]
  const changePassword = async (email, oldPassword, newPassword) => {
    // const auth = getAuth();
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(email, oldPassword);

    try {
      // Step 1: Re-authenticate
      await reauthenticateWithCredential(user, credential);

      // Step 2: Update password
      await updatePassword(user, newPassword);

      console.log("✅ Password updated successfully!");
    } catch (error) {
      console.error("❌ Error changing password:", error.message);
    }
  };

  // Update user profile
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // console.log(currentUser);

      // if (currentUser?.email) {
      //   const user = { email: currentUser.email };
      //   axiosPublic
      //     .post("/jwt", user, { withCredentials: true })
      //     .then((res) => {
      //       console.log("login token", res.data);
      //       setLoading(false);
      //     });
      // } else {
      //   axiosPublic
      //     .post("/logout", {}, { withCredentials: true })
      //     .then((res) => {
      //       console.log("logout data : ", res.data);
      //       setLoading(false);
      //     });
      // }
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    setUser,
    createNewUser,
    signInUser,
    logOut,
    updateUser,
    loading,
    signInWithGoogle,
    resetPassword,
    changePassword,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
