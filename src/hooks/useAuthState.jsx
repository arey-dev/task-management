import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";

export function useAuthState() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return user;
}
