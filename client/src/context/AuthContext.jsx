// AuthContext.jsx
// Provides authentication state and helper functions to the whole app.
// Uses Firebase Authentication under the hood.

import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,  // register
  signInWithEmailAndPassword,       // login
  signOut,                          // logout
  onAuthStateChanged,               // listen for auth state changes
  updateProfile,                    // save the user's display name
} from 'firebase/auth';
import { auth } from '../firebase';

// Create the context
const AuthContext = createContext(null);

// AuthProvider wraps the whole app and shares the auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // Firebase user object (or null)
  const [loading, setLoading] = useState(true); // true while Firebase checks the session

  // onAuthStateChanged fires once on mount with the stored session,
  // then again whenever the user logs in or out.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // null if logged out, user object if logged in
      setLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Register a new user with name, email and password
  const register = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Save the display name so we can show "Hi, <name>" in the Navbar
    await updateProfile(userCredential.user, { displayName: name });
    // Update local state so Navbar shows the name immediately
    setUser({ ...userCredential.user, displayName: name });
  };

  // Log in with email and password
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will update `user` automatically
  };

  // Log out
  const logout = async () => {
    await signOut(auth);
    // onAuthStateChanged will set `user` to null automatically
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook — use this in any component: const { user } = useAuth();
export const useAuth = () => useContext(AuthContext);
