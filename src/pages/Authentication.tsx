import { useEffect, useState } from "react";
import { Signin } from "../components/auth/Signin";
import { Signup } from "../components/auth/Signup";
import { auth } from "../config/firebase";
import Loading from "../components/Loading";

export const Authentication = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
  console.log(auth);
  useEffect(() => {
    const checkAuth = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const { uid, displayName, email } = authUser;
        setUser({ uid, displayName, email });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => checkAuth();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div>
      {isRegistered ? (
        <Signin
          user={user}
          setUser={setUser}
          setIsRegistered={setIsRegistered}
        />
      ) : (
        <Signup setIsRegistered={setIsRegistered} />
      )}
    </div>
  );
};
