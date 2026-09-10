/* eslint-disable react-refresh/only-export-components, no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });

    return unSubscribe;
  }, []);

  const signup = async (email, password) => {
    setAuthLoading(true);

    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    setAuthLoading(true);

    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setAuthLoading(false);
    }
  };

  const signOut = () => firebaseSignOut(auth);

  return (
    <AuthContext.Provider value={{ user, signup, login, signOut, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
