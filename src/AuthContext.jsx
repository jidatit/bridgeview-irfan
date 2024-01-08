import React, { createContext, useState, useEffect } from 'react'
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userhere, setuserhere] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "managers", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap) {
            setCurrentUser(user);
            setuserhere(true)
          }

        } catch (err) {
          console.log(err);
        }
      } else {
        setCurrentUser(null);
        setuserhere(false)
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userhere }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext