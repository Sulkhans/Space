import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { userType } from "../types/types";

const useAuthLoad = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<userType | null>(null);

  useEffect(() => {
    const checkAuth = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const { displayName, email, photoURL } = authUser;
        setUser({ email, displayName, photoURL });
      }
      setLoading(false);
    });
    return () => checkAuth();
  }, []);

  return { loading, user, setUser };
};

export default useAuthLoad;
